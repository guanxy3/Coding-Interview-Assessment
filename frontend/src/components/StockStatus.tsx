interface StockStatusProps {
  stock: number;
}

export function StockStatus({ stock }: StockStatusProps) {
  if (stock === 0) {
    return <p className="stock out">Out of stock</p>;
  }

  if (stock <= 3) {
    return <p className="stock low">Only {stock} left</p>;
  }

  return <p className="stock in">In stock</p>;
}
