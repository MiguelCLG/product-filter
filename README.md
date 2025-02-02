# Product Filter App

## Overview

This project focuses on filtering a list of data using two types of filters: **Property Names** and **Property Values**, along with an **Operator** that defines the relationship between the filters. The operators are:

| Operator        | Description                                 |
| --------------- | ------------------------------------------- |
| Equals          | Value exactly matches                       |
| Is greater than | Value is greater than                       |
| Is less than    | Value is less than                          |
| Has any value   | Value is present                            |
| Has no value    | Value is absent                             |
| Is any of       | Value exactly matches one of several values |
| Contains        | Value contains the specified text           |

| Property Type | Valid Operators |
| ------------- | --------------- |
| string        | Equals          |
|               | Has any value   |
|               | Has no value    |
|               | Is any of       |
|               | Contains        |
| number        | Equals          |
|               | Is greater than |
|               | Is less than    |
|               | Has any value   |
|               | Has no value    |
|               | Is any of       |
| enumerated    | Equals          |
|               | Has any value   |
|               | Has no value    |
|               | Is any of       |

## Data Management

We use a global store to manage filters. This keeps components independent and avoids prop-drilling, making the code more readable and maintainable. Filters are stored in the global state, and the filtered data is derived from it.

## Components

### Property Names

A dropdown component that allows the user to select a property name to filter by. It pulls available property names from the global store and updates the store when a selection is made.

- Default value: "-1" (shows the entire list initially). ( the value will be the property id, -1 is the default so we can display all products).
- Changing the selection applies the filters.

### Operators

A dropdown component that allows the user to select an operator for filtering. The selected operator is stored in the global store.

- Default value: "Any" (shows the entire list initially).
- Changing the operator applies the filters.

### Property Values

A multiselect list with checkboxes that allows the user to select multiple property values to filter by. The selected values are stored in the global store.

- If no values are selected, all items are shown.
- Selecting values applies the filters.

### Filtered List

Displays the filtered data based on the selected filters. The data is currently shown in a simple table, but we plan to move to a card-based layout for a better UI/UX experience.

### Clear Button

A button that resets all filters in the global store, clearing the selected filters and re-rendering the default list.

## Testing

We follow a test-driven development (TDD) approach to ensure robust functionality. Each component is tested individually, and integration tests ensure that filters work as expected across the application.

### Property Names Unit Testing

- Verify that the dropdown options match the expected values.
- Ensure selecting an option updates the global store correctly.

### Operators Unit Testing

- Verify that the dropdown options match the expected values.
- Ensure selecting an operator updates the global store correctly.

### Property Values Unit Testing

- Verify that the options in the multiselect list match the expected values.
- Ensure that selecting single and multiple values updates the global store correctly.

### Clear Button Unit Testing

- Verify that clicking the button resets the filters in the global store.

### Filtered List Integration Testing

For each operator:

- Verify that selecting a property name, operator, and property values filters the list correctly.

## UI/UX

For now, the UI features dropdowns for the filters and checkboxes for the property values. The data is displayed in a table, with plans to move to a card-based design in future iterations.

Note: The table has been replaced with a card-based design.

---

## Project Setup

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/miguelclg/product-filter.git
```

2. Navigate to the project directory:

```bash
cd product-filter
```

3. Install the dependencies using Yarn:

```bash
yarn install
```

4. Start the development server:

```bash
yarn start
```

5. The application will be available at `http://localhost:3000`

## Testing

Run the test suite

```bash
yarn test
```

## Deployment

To deploy the application to GitHub Pages:

1. Add the following property to package.json to specify the homepage:

```
"homepage": "https://miguelclg.github.io/product-filter"
```

2. Run the following command to build the project:

```bash
yarn build
```

3. Deploy the project:

```bash
yarn deploy
```

The deploy script will automatically build a push the changes to the `gh-pages` branch which will make the app available at:
https://miguelclg.github.io/product-filter/
