interface PropertyValueSelectProps {
    selectedPropertyValue: string | null;
    getPropertyValues: () => string[];
    setSelectedPropertyValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const PropertyValueSelect: React.FC<PropertyValueSelectProps> = ({
    selectedPropertyValue,
    getPropertyValues,
    setSelectedPropertyValue,
}) => {
    return (
        <select value={selectedPropertyValue !== null ? selectedPropertyValue : ''}
            onChange={(event) => setSelectedPropertyValue(event.target.value)}>
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
