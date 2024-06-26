import { useState } from "react";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";
import PropertySelect from "./PropertySelect";
import OperatorSelect from "./OperatorSelect";
import PropertyValueSelect from "./PropertyValueSelect";
import datastore from "../datastore";
import { Filter, Product, Property, Operator } from "../interfaces";

const Table: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({
    selectedPropertyId: null,
    selectedOperatorId: null,
    selectedPropertyValue: null,
  });

  const products: Product[] = datastore.getProducts();
  const properties: Property[] = datastore.getProperties();
  const operators: Operator[] = datastore.getOperators();

  const handlePropertyChange = (selectedPropertyId: number | null) => {
    setFilter({
      ...filter,
      selectedPropertyId,
      selectedOperatorId: null,
      selectedPropertyValue: null,
    });
  };

  const handleOperatorChange = (selectedOperatorId: string | null) => {
    setFilter({ ...filter, selectedOperatorId, selectedPropertyValue: null });
  };

  const handlePropertyValueChange = (selectedPropertyValue: string | null) => {
    setFilter({ ...filter, selectedPropertyValue });
  };

  const handleClear = () => {
    setFilter({
      selectedPropertyId: null,
      selectedOperatorId: null,
      selectedPropertyValue: null,
    });
  };

  const getPropertyValues = (): string[] => {
    const selectedProperty = properties.find(
      (property) => property.id === filter.selectedPropertyId,
    );
    if (!selectedProperty) return [];
    const values = new Set<string>();
    products.forEach((product) => {
      product.property_values.forEach((pv) => {
        if (pv.property_id === selectedProperty.id) {
          values.add(pv.value.toString());
        }
      });
    });
    return Array.from(values);
  };

  const filteredProducts = products.filter((product) => {
    const selectedProperty = properties.find(
      (property) => property.id === filter.selectedPropertyId,
    );
    const selectedOperator = operators.find(
      (operator) => operator.id === filter.selectedOperatorId,
    );
    if (!selectedProperty || !selectedOperator) return true;
    const propertyValue = product.property_values.find(
      (pv) => pv.property_id === filter.selectedPropertyId,
    )?.value;
    switch (filter.selectedOperatorId) {
      case "equals":
        return propertyValue?.toString() === filter.selectedPropertyValue;
      case "greater_than":
        return (
          parseFloat(propertyValue?.toString() || "") >
          parseFloat(filter.selectedPropertyValue || "")
        );
      case "less_than":
        return (
          parseFloat(propertyValue?.toString() || "") <
          parseFloat(filter.selectedPropertyValue || "")
        );
      case "any":
        return propertyValue !== undefined && propertyValue !== null;
      case "none":
        return propertyValue === undefined || propertyValue === null;
      case "in": {
        const values =
          filter.selectedPropertyValue?.split(",").map((val) => val.trim()) ||
          [];
        return values.includes(propertyValue?.toString() || "");
      }
      case "contains":
        return propertyValue
          ?.toString()
          .toLowerCase()
          .includes(filter.selectedPropertyValue?.toLowerCase() || "");
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Salsify Product Table</h1>

      <div className="flex justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <PropertySelect
            filter={filter}
            properties={properties}
            handlePropertyChange={handlePropertyChange}
          />
          <OperatorSelect
            filter={filter}
            operators={operators}
            setSelectedOperatorId={handleOperatorChange}
          />
          {filter.selectedPropertyId !== null && (
            <PropertyValueSelect
              filter={filter}
              getPropertyValues={getPropertyValues}
              setSelectedPropertyValue={handlePropertyValueChange}
            />
          )}
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <TableHeader properties={properties} />
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <TableCell product={product} properties={properties} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Table;
