import { useState } from "react";
import { Filter } from "../interfaces";

interface PropertyValueSelectProps {
  filter: Filter;
  getPropertyValues: () => string[];
  setSelectedPropertyValue: (value: string | null) => void;
}

const PropertyValueSelect: React.FC<PropertyValueSelectProps> = ({
  filter,
  getPropertyValues,
  setSelectedPropertyValue,
}) => {
  const [error, setError] = useState<string | null>(null);
  const propertyValues = getPropertyValues();
  const { selectedOperatorId, selectedPropertyValue } = filter;

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (selectedOperatorId === "contains" && value.split(" ").length > 1) {
      setError("Please enter a single item without spaces.");
    } else {
      setError(null);
      setSelectedPropertyValue(value !== "" ? value : null);
    }
  };

  return (
    <>
      {selectedOperatorId === "contains" || selectedOperatorId === "in" ? (
        <>
          <input
            type="text"
            className="p-2 rounded border border-gray-300"
            value={selectedPropertyValue || ""}
            onChange={handleChange}
            placeholder="Enter value(s) to filter"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <select
          className="p-2 rounded border border-gray-300"
          value={selectedPropertyValue || ""}
          onChange={handleChange}
          aria-label="Property Value Select"
        >
          <option value="">Select a value</option>
          {propertyValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default PropertyValueSelect;
