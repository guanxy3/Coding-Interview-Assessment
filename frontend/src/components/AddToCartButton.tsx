interface AddToCartButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export function AddToCartButton({ disabled, loading, onClick }: AddToCartButtonProps) {
  return (
    <button
      type="button"
      className="add-to-cart"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
