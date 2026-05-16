import type { CartItem } from "../types";

const delay = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function addToCart(item: CartItem): Promise<{ cartCountDelta: number }> {
  await delay(350);

  if (new URLSearchParams(window.location.search).get("error") === "cart") {
    throw new Error("Cart service is temporarily unavailable.");
  }

  return { cartCountDelta: item.quantity };
}
