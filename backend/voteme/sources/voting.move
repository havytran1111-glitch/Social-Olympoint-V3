module voteme_v2::voting {

    use sui::object::{UID, ID};
    use sui::tx_context::TxContext;
    use sui::table::{Self, Table};
    use sui::transfer;

    /// Global Vote Store
    public struct VoteStore has key {
        id: UID,
        nft_votes: Table<ID, u64>,      // NFT ID -> votes
        wallet_votes: Table<address, u64>, // Wallet -> votes
    }

    /// Initialize the VoteStore (called once during deployment)
    fun init(ctx: &mut TxContext) {
        let store = VoteStore {
            id: object::new(ctx),
            nft_votes: table::new(ctx),
            wallet_votes: table::new(ctx),
        };
        transfer::share_object(store);
    }

    /// Vote for an NFT
    public fun vote_nft(
        store: &mut VoteStore,
        nft_id: ID,
        voter: address,
        _ctx: &mut TxContext
    ) {
        // Update NFT votes
        if (table::contains(&store.nft_votes, nft_id)) {
            let current_nft_votes = table::borrow_mut(&mut store.nft_votes, nft_id);
            *current_nft_votes = *current_nft_votes + 1;
        } else {
            table::add(&mut store.nft_votes, nft_id, 1);
        };

        // Update wallet votes
        if (table::contains(&store.wallet_votes, voter)) {
            let current_wallet_votes = table::borrow_mut(&mut store.wallet_votes, voter);
            *current_wallet_votes = *current_wallet_votes + 1;
        } else {
            table::add(&mut store.wallet_votes, voter, 1);
        };
    }

    /// Get votes for a specific NFT
    public fun get_nft_votes(
        store: &VoteStore,
        nft_id: ID
    ): u64 {
        if (table::contains(&store.nft_votes, nft_id)) {
            *table::borrow(&store.nft_votes, nft_id)
        } else {
            0
        }
    }

    /// Get votes for a specific wallet
    public fun get_wallet_votes(
        store: &VoteStore,
        wallet: address
    ): u64 {
        if (table::contains(&store.wallet_votes, wallet)) {
            *table::borrow(&store.wallet_votes, wallet)
        } else {
            0
        }
    }

    /// Get the VoteStore ID (for frontend use)
    public fun get_store_id(store: &VoteStore): ID {
        object::id(store)
    }
}