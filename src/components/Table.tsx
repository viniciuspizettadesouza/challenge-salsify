import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import datastore from '../datastore';
import { Product, Property, Operator } from '../interfaces';

const Table: React.FC = () => {
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
    const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null);

    const products: Product[] = datastore.getProducts();
    const properties: Property[] = datastore.getProperties();
    const operators: Operator[] = datastore.getOperators();

    const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPropertyId(parseInt(event.target.value));
        setSelectedOperatorId(null);
    };

    const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOperatorId(event.target.value);
    };

    const renderOptions = (options: (Property | Operator)[]) => {
        return options.map(option => (
            <option key={option.id} value={option.id}>
                {'name' in option ? (option as Property).name : (option as Operator).text}
            </option>
        ));
    };

    const filteredProducts = products.filter(product => {
        console.log(product)
        console.log(selectedPropertyId)
        console.log(selectedOperatorId)
        if (!selectedPropertyId || !selectedOperatorId) return true;

        const selectedProperty = properties.find(property => property.id === selectedPropertyId);
        const selectedOperator = operators.find(operator => operator.id === selectedOperatorId);

        console.log(selectedProperty)
        console.log(selectedOperator)

        if (!selectedProperty || !selectedOperator) return true;

        return true;
    });

    return (
        <div>
            <select value={selectedPropertyId || ''} onChange={handlePropertyChange}>
                <option value="">Category</option>
                {renderOptions(properties)}
            </select>

            <select value={selectedOperatorId || ''} onChange={handleOperatorChange}>
                <option value="">Select Operator</option>
                {renderOptions(operators)}
            </select>

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
