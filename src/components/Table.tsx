import { useState } from 'react';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import PropertySelect from './PropertySelect';
import OperatorSelect from './OperatorSelect';
import PropertyValueSelect from './PropertyValueSelect';
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
            <PropertySelect
                selectedPropertyId={selectedPropertyId}
                properties={properties}
                handlePropertyChange={handlePropertyChange}
            />

            <OperatorSelect
                selectedOperatorId={selectedOperatorId}
                operators={operators}
                handleOperatorChange={handleOperatorChange}
            />

            {selectedPropertyId !== null && (
                <PropertyValueSelect
                    selectedPropertyValue={selectedPropertyValue}
                    getPropertyValues={getPropertyValues}
                    handlePropertyValueChange={handlePropertyValueChange}
                />
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
