export const mappedColumns = {
  0: "productName",
  1: "color",
  2: "weight",
  3: "category",
  4: "wireless",
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
