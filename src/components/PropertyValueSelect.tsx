interface PropertyValueSelectProps {
    selectedPropertyValue: string | null;
    getPropertyValues: () => string[];
    handlePropertyValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PropertyValueSelect: React.FC<PropertyValueSelectProps> = ({
    selectedPropertyValue,
    getPropertyValues,
    handlePropertyValueChange,
}) => {
    return (
        <select value={selectedPropertyValue !== null ? selectedPropertyValue : ''} onChange={handlePropertyValueChange}>
            <option value="">Select Value</option>
            {getPropertyValues().map(value => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
};

export default PropertyValueSelect;
