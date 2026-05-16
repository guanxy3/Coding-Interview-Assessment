interface QuantitySelectorProps {
  quantity: number;
  max: number;
  disabled: boolean;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({
  quantity,
  max,
  disabled,
  onChange,
}: QuantitySelectorProps) {
  const updateQuantity = (nextQuantity: number) => {
    onChange(Math.min(Math.max(nextQuantity, 1), Math.max(max, 1)));
  };

  return (
    <div className="quantity-row">
      <label htmlFor="quantity">Quantity</label>
      <div className="quantity-control">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={disabled || quantity <= 1}
          onClick={() => updateQuantity(quantity - 1)}
        >
          -
        </button>
        <input
          id="quantity"
          type="number"
          min={1}
          max={Math.max(max, 1)}
          value={quantity}
          disabled={disabled}
          onChange={(event) => updateQuantity(Number(event.target.value))}
        />
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={disabled || quantity >= max}
          onClick={() => updateQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
