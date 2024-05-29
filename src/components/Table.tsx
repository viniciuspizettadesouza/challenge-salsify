import React from 'react';
import datastore from '../datastore';
import { Product, Property } from '../interfaces';

const Table: React.FC = () => {
    const products: Product[] = datastore.getProducts();
    const properties: Property[] = datastore.getProperties();
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {properties.map(property => (
                            <th key={property.id}>{property.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            {product.property_values.map((pv, index) => {
                                const property = properties.find(p => p.id === pv.property_id);
                                console.log(property)
                                return (
                                    <td key={index}>{pv.value}</td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
