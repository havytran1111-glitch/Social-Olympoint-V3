# VoteMe Smart Contract

A Sui Move smart contract for voting on AI-generated content.

## Contract Overview

The VoteMe contract allows users to vote on NFTs and tracks both NFT-specific votes and wallet-specific votes.

### Features

- **VoteStore**: Shared object that stores all voting data
- **NFT Voting**: Vote on specific NFTs
- **Wallet Tracking**: Track votes per wallet address
- **Real-time Queries**: Get vote counts for NFTs and wallets

## Contract Functions

### `vote_nft(store, nft_id, voter, ctx)`
Vote for a specific NFT. Updates both NFT vote count and wallet vote count.

### `get_nft_votes(store, nft_id)`
Get the total votes for a specific NFT.

### `get_wallet_votes(store, wallet)`
Get the total votes cast by a specific wallet.

### `get_store_id(store)`
Get the ID of the VoteStore object.

## Deployment

1. Ensure you have Sui CLI installed and configured
2. Navigate to this directory
3. Run: `sui client publish --gas-budget 20000000 .`

The contract will automatically create a VoteStore shared object during deployment.

### Finding the Deployed IDs

After deployment, you can find the relevant IDs:

```bash
# Get recent transactions to find the deployment
sui client txns

# Get the package ID from the deployment transaction
sui client object <DEPLOYMENT_TXN_DIGEST>

# Find the VoteStore object (look for shared objects created during deployment)
sui client objects --owner shared
```

## Frontend Integration

Update `src/app/(dashboard)/dashboard/voteme/page.tsx`:

```typescript
// Replace with actual deployed IDs
const VOTEME_PACKAGE_ID = "0xYOUR_DEPLOYED_PACKAGE_ID";
const VOTESTORE_OBJECT_ID = "0xYOUR_VOTESTORE_OBJECT_ID";
```

## Testing

You can test the contract functions using Sui CLI:

```bash
# Get NFT votes
sui client call --package <PACKAGE_ID> --module voting --function get_nft_votes --args <VOTESTORE_ID> <NFT_ID>

# Get wallet votes
sui client call --package <PACKAGE_ID> --module voting --function get_wallet_votes --args <VOTESTORE_ID> <WALLET_ADDRESS>

# Vote for NFT
sui client call --package <PACKAGE_ID> --module voting --function vote_nft --args <VOTESTORE_ID> <NFT_ID> <YOUR_ADDRESS>
```</content>
</xai:function_call">Backend: README.md created