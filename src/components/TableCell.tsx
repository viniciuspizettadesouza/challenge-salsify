import React from 'react';
import { Product, Property } from '../interfaces';

interface TableCellProps {
    product: Product;
    properties: Property[];
}

const TableCell: React.FC<TableCellProps> = ({ product, properties }) => (
    <>
        {properties.map(property => {
            const productPropertyValue = product.property_values.find(pv => pv.property_id === property.id);
            return <td key={property.id}>{productPropertyValue ? productPropertyValue.value : ''}</td>;
        })}
    </>
);

export default TableCell;
