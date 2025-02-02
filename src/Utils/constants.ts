export const mappedColumns = {
  "Product Name": "productName",
  color: "color",
  "weight (oz)": "weight",
  category: "category",
  wireless: "wireless",
};

export const mappedOperators = {
  string: [
    { id: "equals", text: "Equals" },
    { id: "contains", text: "Contains" },
    { id: "any", text: "Has any value" },
    { id: "none", text: "Has no value" },
    { id: "in", text: "Is any of" },
  ],
  number: [
    { id: "equals", text: "Equals" },
    { id: "less_than", text: "Is less than" },
    { id: "any", text: "Has any value" },
    { id: "greater_than", text: "Is greater than" },
    { id: "none", text: "Has no value" },
    { id: "in", text: "Is any of" },
  ],
  enumerated: [
    { id: "equals", text: "Equals" },
    { id: "any", text: "Has any value" },
    { id: "none", text: "Has no value" },
    { id: "in", text: "Is any of" },
  ],
};
