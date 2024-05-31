import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import datastore from '../datastore';
import { Product, Property, Operator } from '../interfaces';

const Table: React.FC = () => {
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
    const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null);
    const [selectedPropertyValue, setSelectedPropertyValue] = useState<string | null>(null);

    const products: Product[] = datastore.getProducts();
    const properties: Property[] = datastore.getProperties();
    const operators: Operator[] = datastore.getOperators();

    const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedPropertyId(value !== '' ? parseInt(value) : null);
        setSelectedOperatorId(null);
        setSelectedPropertyValue(null);
    };

    const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOperatorId(event.target.value);
    };

    const handlePropertyValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPropertyValue(event.target.value);
    };

    const renderPropertyOptions = () => {
        return properties.map(property => (
            <option key={property.id} value={property.id}>
                {property.name}
            </option>
        ));
    };

    const renderOperatorOptions = () => {
        return operators.map(operator => (
            <option key={operator.id} value={operator.id}>
                {operator.text}
            </option>
        ));
    };

    const getPropertyValues = () => {
        if (selectedPropertyId === null) return [];
        const selectedProperty = properties.find(property => property.id === selectedPropertyId);
        if (!selectedProperty) return [];

        const values = new Set<string>();
        products.forEach(product => {
            product.property_values.forEach(pv => {
                if (pv.property_id === selectedProperty.id) {
                    values.add(pv.value.toString());
                }
            });
        });

        const valuesArray = Array.from(values);
        console.log(`Values for selected property (ID: ${selectedPropertyId}):`, valuesArray);

        return valuesArray;
    };

    const filteredProducts = products.filter(product => {
        if (selectedPropertyId === null || selectedOperatorId === null || (selectedPropertyValue === null && selectedOperatorId !== 'any' && selectedOperatorId !== 'none')) return true;

        const selectedProperty = properties.find(property => property.id === selectedPropertyId);
        const selectedOperator = operators.find(operator => operator.id === selectedOperatorId);

        if (!selectedProperty || !selectedOperator) return true;

        const propertyValue = product.property_values.find(pv => pv.property_id === selectedPropertyId)?.value;
        if (propertyValue === undefined || propertyValue === null || selectedPropertyValue === null) return false;

        switch (selectedOperator.id) {
            case 'equals':
                return propertyValue.toString() === selectedPropertyValue;
            case 'greater_than':
                return parseFloat(propertyValue.toString()) > parseFloat(selectedPropertyValue);
            case 'less_than':
                return parseFloat(propertyValue.toString()) < parseFloat(selectedPropertyValue);
            case 'any':
                return propertyValue !== undefined && propertyValue !== null;
            case 'none':
                return propertyValue === undefined || propertyValue === null;
            case 'in':
                return selectedPropertyValue.split(',').includes(propertyValue.toString());
            case 'contains':
                return propertyValue.toString().includes(selectedPropertyValue);
            default:
                return true;
        }
    });

    return (
        <div>
            <select value={selectedPropertyId !== null ? selectedPropertyId : ''} onChange={handlePropertyChange}>
                <option value="">Select Property</option>
                {renderPropertyOptions()}
            </select>

            <select value={selectedOperatorId !== null ? selectedOperatorId : ''} onChange={handleOperatorChange}>
                <option value="">Select Operator</option>
                {renderOperatorOptions()}
            </select>

            {selectedPropertyId !== null && (
                <select value={selectedPropertyValue !== null ? selectedPropertyValue : ''} onChange={handlePropertyValueChange}>
                    <option value="">Select Value</option>
                    {getPropertyValues().map(value => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            )}

            {filteredProducts.length > 0 ? (
                <table>
                    <thead><TableHeader properties={properties} /></thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <TableCell product={product} properties={properties} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default Table;
