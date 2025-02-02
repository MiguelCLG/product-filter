export interface IPropertyValue {
  property_id: number;
  value: string | number | boolean;
}

export interface IProduct {
  id: number;
  property_values: IPropertyValue[];
}

export interface IProperty {
  id: number;
  name: string;
  type: "string" | "number" | "enumerated";
  values?: string[];
}

export interface IOperator {
  text: string;
  id: string;
}

export interface IFilteredData {
  productName: string;
  color: string;
  weight: string;
  category: string;
  wireless: string;
}
export interface IPropertyValues {
  id: string;
  value: string;
}
