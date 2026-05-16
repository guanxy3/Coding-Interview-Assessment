interface ProductImageProps {
  imageUrl: string;
  name: string;
}

export function ProductImage({ imageUrl, name }: ProductImageProps) {
  return (
    <div className="product-image-shell">
      <img src={imageUrl} alt={name} loading="lazy" className="product-image" />
    </div>
  );
}
