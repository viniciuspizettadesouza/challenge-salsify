import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableCell from './TableCell'; // Import TableCell component
import datastore from '../datastore';
import { Product, Property } from '../interfaces';

const Table: React.FC = () => {
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
    const products: Product[] = datastore.getProducts();
    const properties: Property[] = datastore.getProperties();

    const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPropertyId(parseInt(event.target.value));
    };

    return (
        <div>
            <select value={selectedPropertyId || ''} onChange={handlePropertyChange}>
                <option value="">Category</option>
                {properties.map(property => (
                    <option key={property.id} value={property.id}>
                        {property.name}
                    </option>
                ))}
            </select>
            {products.length > 0 && (
                <table>
                    <thead><TableHeader properties={properties} /></thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <TableCell product={product} properties={properties} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {properties.length === 0 && <p>No properties available.</p>}
            {products.length === 0 && <p>No products available.</p>}
        </div>
    );
};

export default Table;
