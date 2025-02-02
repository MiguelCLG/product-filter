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

And are mapped as such:

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

I decided to use a global store to manage filters. This keeps components independent and avoids prop-drilling, making the code more readable and maintainable. Filters are stored in the global state, and the filtered data is derived from it.

## Components

### Property Names

A dropdown component that allows the user to select a property name to filter by. It pulls available property names from the global state and updates the store when a selection is made.

- Default value: "-1" (shows the entire list initially). ( the value will be the property id, -1 is the default so we can display all products).
- Changing the selection applies the filters.

### Operators

A dropdown component that allows the user to select an operator for filtering. The selected operator is stored in the global store.

- Default value: "Any" (shows the entire list initially).
- Changing the operator applies the filters.

### Property Values

A multiselect list with checkboxes that allows the user to select multiple property values to filter by. The selected values are stored in the global store.

- ~~If no values are selected, all items are shown.~~
- Items are shown depending on the operator, even if there are no values.
- Selecting values applies the filters.

### Filtered List

Displays the filtered data based on the selected filters. The data is currently shown in a simple table, but we plan to move to a card-based layout for a better UI/UX.

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

Update Note: The table has been replaced with a card-based design.

---

## Implementation steps

- Started with creating simple tests for the components (i.e making sure they appear on screen when the app is launched).
- Constructed the filter components and added them to the main app page (`<PropertyNames/>`, `<Operators/>`, `<PropertyValues/>` and `<ClearButton/>`).
- Added a bit of css for the dropdowns, button and the table.
- Implemented the global context to store an object that will tell us what filters are selected.
- Updated tests for the onchange functionality and to make sure that the store is updated.
- Updated the components with a onchange feature to save the filters.
- Created tests for the FilteredList to return the values it needs with the operators
- Created the `<FilteredList/>` component and the `useFilter()` Hook
- The `useFilter()` hook's functionality would be to get the data from the datastore and save it in its state, then create an object that can be read in the `<FilteredList/>` component to display the filtered data. To achieve this, I created a few tests for the hook that will test the operators with different properties and property values.
- At first I used property names and an enum to map through the data, but then noticed that the property ids have a relationship with the products, so I switched to use the property ids for the filtering. This should allow to add more properties and products like it would come from a database.
- Adjusted the datastore file to use typescript and export the datastore directly (easier to import on other files).
- At this point I had everything I needed to have all the functionallity working, so alongside the tests created and some manual testing as well, I finished the filtering on the hook. This would now update the list depending on the filters added.
- Once all was working, I added a few comments to the code, prepared the github repo to have a github page and started working on the deployment of the app.
- In the end, I switched the table I had for the data and constructed a new `<Card/>` component that would substitute the table rows for cards (This change was purely for fun, just to show that we can display data in several ways) and adjusted the filters to be on the side of the card list.
- All in all, I must have spent around 7 to 10 hours with a few breaks in between.

## Challenges Faced

I had a few challenges working on this, mostly on the global store context and the useFilters hook:

### Global Store

- I'm used to using a library (`zustand`) to create a global store, this allows me not to have to create the actions and dispatch functions, usually it allows to create a state function much similar to the `useState()` hook.
- The reason I used the most basic type of context was to use as little packages as possible, only really relying on the React framework and typescript.
- This also helped me remember re-learn a few points I had forgotten about the `useContext` and `useReducer` hooks.

### useFilters() Hook:

- The first challenge was understanding the data and convert it to typings that I could use later:
  - This would help me make sure that the correct data is being passed through.
  - The challenge here was to get accustomed to the data that is available, which led to some manual testing and refactoring (i.e As stated previously, I started by using the names of the properties to filter, which then was changed to the propertyId).
- The second challenge was creating the algorithm to filter.
  - I needed to make sure it was running whenever the global state would change, so we can re-apply the filter to the data and propegate through the filter components and the list.
  - Then I tried to make a one-size fits all function, which proved to make the code a bit unreadable, so I decided to do divide this into two parts:
    - Constructing a default object with all the products in the format we want to propegate and eturn it when the property name or the operator haven't been selected.
    - Then, if there is an active selection, filter the default object with a switch case that runs through the current operator and selects the correct filter to apply.

### Github Pages:

- This last challenge was to get it running live in the github pages.
- I wanted to do this as it was a good oportunity to learn how, pretty simple, but had a few issues with the mapping of the scripts in the build.
- The solution was to add a `homepage` property in the package.json so it could map it properly.

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

The deploy script will automatically build and push the changes to the `gh-pages` branch which will make the app available at:
https://miguelclg.github.io/product-filter/
