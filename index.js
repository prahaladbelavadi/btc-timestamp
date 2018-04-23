var bitcoin = require('bitcoinjs-lib')
var regtestUtils = require('./_regtest')

//
// // // Predictable Randomness
// // function rng () {
// //   return Buffer.from('YT8dAtK4d16A3P1wffwfwefwewefwefewefwfz+TpwB2dsdadajJ4aFH3g9M1EioIBkLEV4=', 'base64')
// // }
//
// // import private key
// var senderPrivKey = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy')
//
// var txb = new bitcoin.TransactionBuilder()
//
// // var miner_fees = prevUTXO - 12000
//
// txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0) // Sender's previous transaction output, has x satoshis
// txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000) //output 12000 satoshis
//
// txb.sign(0, senderPrivKey)
//
// console.log( 'Transaction to be broadcasted to Bitcoin network in hex format :'+'\n'+txb.build().toHex())

var keyPair = bitcoin.ECPair.makeRandom({ network: regtest })

    regtestUtils.faucet(keyPair.getAddress(), 2e5, function (err, unspent) {
      if (err) return done(err)

      var txb = new bitcoin.TransactionBuilder(regtest)
      var data = Buffer.from('bitcoinjs-lib', 'utf8')
      var dataScript = bitcoin.script.nullData.output.encode(data)

      txb.addInput(unspent.txId, unspent.vout)
      txb.addOutput(dataScript, 1000)
      txb.addOutput(regtestUtils.RANDOM_ADDRESS, 1e5)
      txb.sign(0, keyPair)

      // build and broadcast to the RegTest network
      regtestUtils.broadcast(txb.build().toHex(), done)
    })
