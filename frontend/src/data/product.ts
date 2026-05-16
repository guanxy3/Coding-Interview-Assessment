import type { Product } from "../types";

export const product: Product = {
  id: "pdp-weekender-pack",
  name: "AeroFlex Weekender Pack",
  description:
    "A lightweight travel backpack with a weather-resistant shell, padded laptop storage, and modular packing space for short trips.",
  imageUrl:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
  variants: {
    color: [
      { value: "graphite", label: "Graphite", swatch: "#343a40" },
      { value: "sage", label: "Sage", swatch: "#829b7c" },
      { value: "cobalt", label: "Cobalt", swatch: "#2453a6" },
    ],
    size: [
      { value: "20l", label: "20L" },
      { value: "30l", label: "30L" },
    ],
  },
  skus: [
    { id: "sku-graphite-20l", color: "graphite", size: "20l", price: 89, stock: 8 },
    { id: "sku-graphite-30l", color: "graphite", size: "30l", price: 109, stock: 3 },
    { id: "sku-sage-20l", color: "sage", size: "20l", price: 92, stock: 0 },
    { id: "sku-sage-30l", color: "sage", size: "30l", price: 112, stock: 5 },
    { id: "sku-cobalt-20l", color: "cobalt", size: "20l", price: 94, stock: 2 },
    { id: "sku-cobalt-30l", color: "cobalt", size: "30l", price: 114, stock: 0 },
  ],
};
