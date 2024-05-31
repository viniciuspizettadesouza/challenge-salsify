import { Property } from '../interfaces';

interface TableHeaderProps {
    properties: Property[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ properties }) => (
    <tr>
        {properties.map(property => (
            <th key={property.id}>{property.name}</th>
        ))}
    </tr>
);

export default TableHeader;
