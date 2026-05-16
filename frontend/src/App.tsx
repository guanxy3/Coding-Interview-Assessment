import { useEffect, useMemo, useState } from "react";
import { addToCart } from "./api/cartApi";
import { getProduct } from "./api/productApi";
import { AddToCartButton } from "./components/AddToCartButton";
import { ProductImage } from "./components/ProductImage";
import { QuantitySelector } from "./components/QuantitySelector";
import { StockStatus } from "./components/StockStatus";
import { VariantSelector } from "./components/VariantSelector";
import type { Product, Sku, VariantDimension } from "./types";

type Selection = Record<VariantDimension, string>;

function trackAddToCart(product: Product, sku: Sku, quantity: number) {
  console.info("analytics:add_to_cart", {
    productId: product.id,
    skuId: sku.id,
    quantity,
    value: sku.price * quantity,
  });
}

export default function App() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const nextProduct = await getProduct();
      setProduct(nextProduct);
      setSelection({
        color: nextProduct.variants.color[0].value,
        size: nextProduct.variants.size[0].value,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProduct();
  }, []);

  const selectedSku = useMemo(() => {
    if (!product || !selection) {
      return null;
    }

    return (
      product.skus.find(
        (sku) => sku.color === selection.color && sku.size === selection.size,
      ) ?? null
    );
  }, [product, selection]);

  useEffect(() => {
    if (selectedSku) {
      setQuantity((currentQuantity) =>
        Math.min(Math.max(currentQuantity, 1), Math.max(selectedSku.stock, 1)),
      );
      setCartError(null);
      setSuccessMessage(null);
    }
  }, [selectedSku]);

  const handleVariantChange = (dimension: VariantDimension, value: string) => {
    setSelection((currentSelection) =>
      currentSelection ? { ...currentSelection, [dimension]: value } : currentSelection,
    );
  };

  const handleAddToCart = async () => {
    if (!product || !selectedSku || selectedSku.stock === 0) {
      return;
    }

    setAdding(true);
    setCartError(null);
    setSuccessMessage(null);

    try {
      const response = await addToCart({
        productId: product.id,
        skuId: selectedSku.id,
        quantity,
      });

      setCartCount((currentCount) => currentCount + response.cartCountDelta);
      setSuccessMessage(`${quantity} item${quantity > 1 ? "s" : ""} added to cart.`);
      trackAddToCart(product, selectedSku, quantity);
    } catch (caughtError) {
      setCartError(caughtError instanceof Error ? caughtError.message : "Unable to add item.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="page">
        <section className="status-panel">Loading product...</section>
      </main>
    );
  }

  if (error || !product || !selection || !selectedSku) {
    return (
      <main className="page">
        <section className="status-panel">
          <p>{error ?? "Product variant is unavailable."}</p>
          <button type="button" onClick={loadProduct}>
            Retry
          </button>
        </section>
      </main>
    );
  }

  const outOfStock = selectedSku.stock === 0;

  return (
    <main className="page">
      <header className="top-bar">
        <strong>Assessment Shop</strong>
        <span className="cart-count">Cart: {cartCount}</span>
      </header>

      <section className="pdp">
        <ProductImage imageUrl={product.imageUrl} name={product.name} />

        <article className="product-details">
          <div>
            <p className="eyebrow">Travel Gear</p>
            <h1>{product.name}</h1>
            <p className="price">${selectedSku.price.toFixed(2)}</p>
            <StockStatus stock={selectedSku.stock} />
          </div>

          <p className="description">{product.description}</p>

          <div className="selectors">
            <VariantSelector
              dimension="color"
              options={product.variants.color}
              selectedValue={selection.color}
              onChange={handleVariantChange}
            />
            <VariantSelector
              dimension="size"
              options={product.variants.size}
              selectedValue={selection.size}
              onChange={handleVariantChange}
            />
          </div>

          <QuantitySelector
            quantity={quantity}
            max={selectedSku.stock}
            disabled={outOfStock}
            onChange={setQuantity}
          />

          <AddToCartButton
            disabled={outOfStock}
            loading={adding}
            onClick={handleAddToCart}
          />

          {successMessage ? <p className="feedback success">{successMessage}</p> : null}
          {cartError ? <p className="feedback error">{cartError}</p> : null}
        </article>
      </section>
    </main>
  );
}
