import type { VariantDimension, VariantOption } from "../types";

interface VariantSelectorProps {
  dimension: VariantDimension;
  options: VariantOption[];
  selectedValue: string;
  onChange: (dimension: VariantDimension, value: string) => void;
}

export function VariantSelector({
  dimension,
  options,
  selectedValue,
  onChange,
}: VariantSelectorProps) {
  return (
    <fieldset className="variant-group">
      <legend>{dimension === "color" ? "Color" : "Capacity"}</legend>
      <div className="variant-options">
        {options.map((option) => {
          const selected = option.value === selectedValue;

          return (
            <button
              key={option.value}
              type="button"
              className={`variant-option ${selected ? "selected" : ""}`}
              aria-pressed={selected}
              onClick={() => onChange(dimension, option.value)}
            >
              {option.swatch ? (
                <span
                  className="variant-swatch"
                  style={{ backgroundColor: option.swatch }}
                  aria-hidden="true"
                />
              ) : null}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
