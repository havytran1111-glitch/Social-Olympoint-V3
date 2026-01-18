"use server";

/* ================= TYPES ================= */

export interface CreateWalrusStorageData {
  imageUrl: string; // Walrus aggregator URL
  blobId: string;
  name?: string;
}

export interface WalrusStorage {
  id: string;
  name: string;
  imageUrl: string;
  blobId: string;
  userId: string;
  createdAt: string; // ISO string
  updatedAt: string;
}

/* ================= MOCK USER ================= */

const MOCK_USER_ID = "dev-user";

/* ================= MOCK STORE (DEV ONLY) ================= */

const mockWalrusStorage: WalrusStorage[] = [];

/* ================= ACTIONS ================= */

/**
 * Create Walrus Storage
 */
export async function createWalrusStorage(
  data: CreateWalrusStorageData,
) {
  try {
    const now = new Date().toISOString();

    const newItem: WalrusStorage = {
      id: crypto.randomUUID(),
      name: data.name ?? "Walrus Image",
      imageUrl: data.imageUrl,
      blobId: data.blobId,
      userId: MOCK_USER_ID,
      createdAt: now,
      updatedAt: now,
    };

    mockWalrusStorage.unshift(newItem);

    console.log("✅ [WALRUS STORAGE CREATED]");
    console.table(newItem);

    return {
      success: true,
      walrusStorage: newItem,
    };
  } catch (error) {
    console.error("❌ Walrus Storage creation error:", error);
    return {
      success: false,
      error: "Failed to create Walrus Storage",
    };
  }
}

/**
 * Get all Walrus Storage for current user
 */
export async function getUserWalrusStorage() {
  try {
    const userItems = mockWalrusStorage.filter(
      (item) => item.userId === MOCK_USER_ID,
    );

    return {
      success: true,
      walrusStorage: userItems,
    };
  } catch (error) {
    console.error("❌ Walrus Storage fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch Walrus Storage",
    };
  }
}

/* ================= CREDITS (FAKE / DEV) ================= */

export async function deductCredits(
  creditsToDeduct: number,
  operation?: string,
) {
  try {
    if (
      !creditsToDeduct ||
      creditsToDeduct <= 0 ||
      !Number.isInteger(creditsToDeduct)
    ) {
      return {
        success: false,
        error: "Invalid credit amount",
      };
    }

    const INITIAL_CREDITS = 10;
    const remainingCredits = Math.max(
      0,
      INITIAL_CREDITS - creditsToDeduct,
    );

    console.log(
      `💰 [CREDITS] Deduct ${creditsToDeduct} for ${
        operation ?? "unknown"
      } → remaining ${remainingCredits}`,
    );

    return {
      success: true,
      remainingCredits,
    };
  } catch (error) {
    console.error(
      `❌ Credit deduction error${
        operation ? ` for ${operation}` : ""
      }:`,
      error,
    );
    return {
      success: false,
      error: "Failed to deduct credits",
    };
  }
}
