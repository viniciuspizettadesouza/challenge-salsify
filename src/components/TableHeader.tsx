import { Property } from "../interfaces";

interface TableHeaderProps {
  properties: Property[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ properties }) => (
  <tr className="bg-gray-200">
    {properties.map((property) => (
      <th className="text-left" key={property.id}>
        {property.name}
      </th>
    ))}
  </tr>
);

export default TableHeader;
