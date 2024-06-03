import { Filter, Property } from "../interfaces";

interface PropertySelectProps {
  filter: Filter;
  properties: Property[];
  handlePropertyChange: (selectedPropertyId: number | null) => void;
}

const PropertySelect: React.FC<PropertySelectProps> = ({
  filter,
  properties,
  handlePropertyChange,
}) => {
  const { selectedPropertyId } = filter;

  const renderPropertyOptions = () => {
    return properties.map((property) => (
      <option key={property.id} value={property.id}>
        {property.name}
      </option>
    ));
  };

  return (
    <select
      className="p-2 rounded border border-gray-300"
      value={selectedPropertyId !== null ? selectedPropertyId : ""}
      onChange={(e) => handlePropertyChange(parseInt(e.target.value))}
      aria-label="Property Select"
    >
      <option value="">Select Property</option>
      {renderPropertyOptions()}
    </select>
  );
};

export default PropertySelect;
