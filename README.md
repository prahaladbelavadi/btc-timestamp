# btc-timestamp
Time stamp data on the bitcoin blockchain

Objective:
- To timestamp data on the bitcoin blockchain
- Non repudiation of owner
- Ability to prove ownership without revealing actual information

Assumption:
- Ownership of data is ensured by first entry owner policy

Approach:
- Generate an address with funds that a potential owner can spend
- Hash data and store it into the transaction using op_return to a non spendable address
- Prove ownership using zero knowledge proofs or signature proofs
