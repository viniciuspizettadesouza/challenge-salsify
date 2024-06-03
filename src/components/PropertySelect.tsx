import { Property } from '../interfaces';

interface PropertySelectProps {
    selectedPropertyId: number | null;
    properties: Property[];
    handlePropertyChange: (selectedPropertyId: number | null) => void;
}

const PropertySelect: React.FC<PropertySelectProps> = ({ selectedPropertyId, properties, handlePropertyChange }) => {
    const renderPropertyOptions = () => {
        return properties.map(property => (
            <option key={property.id} value={property.id}>
                {property.name}
            </option>
        ));
    };

    return (
        <select value={selectedPropertyId !== null ? selectedPropertyId : ''} onChange={(e) => handlePropertyChange(parseInt(e.target.value))}>
            <option value="">Select Property</option>
            {renderPropertyOptions()}
        </select>
    );
};

export default PropertySelect;
