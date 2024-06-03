export interface PropertyValue {
  property_id: number;
  value: string | number;
}

export interface Product {
  id: number;
  property_values: PropertyValue[];
}

export interface Property {
  id: number;
  name: string;
  type: "string" | "number" | "enumerated";
  values?: string[];
}

export interface Operator {
  text: string;
  id: string;
}

export interface Datastore {
  getProducts: () => Product[];
  getProperties: () => Property[];
  getOperators: () => Operator[];
  products: Product[];
  properties: Property[];
  operators: Operator[];
}

export interface Filter {
  selectedPropertyId: number | null;
  selectedOperatorId: string | null;
  selectedPropertyValue: string | null;
}
