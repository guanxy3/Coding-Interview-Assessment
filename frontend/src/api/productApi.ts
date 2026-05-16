import { product } from "../data/product";
import type { Product } from "../types";

const delay = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function getProduct(): Promise<Product> {
  await delay(450);

  if (new URLSearchParams(window.location.search).get("error") === "product") {
    throw new Error("Product service is temporarily unavailable.");
  }

  return product;
}
