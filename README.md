# Overview

The project relies on filtering a list of data with 2 types of filters and an operator. The filters are: Property names and Property values. The operator will be the relationship between the filter. Operators can be as described in the specification as such:

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
| enumerated    | equals          |
|               | Has any value   |
|               | Has no value    |
|               | Is any of       |

## Data management

I believe a good way to store various types of filters is to store it in a global store. This will have the functionality of storing the filters of different types and return functions to apply filters and return the filtered data. Why global? We want to divide and conquer and have the components uncoupled from the main objects and avoid prop-drilling as it turns the code a bit more unreadable.

## Components

Starting the project, I wanted to properly plan out what components we have to create and what their functions are.

### Property Names

This component as shown in the mockups, is a dropdown with the options. We can use it to get the names from data store and when an option is selected, update the global store for the specific type of filters.

- We can apply a default of "All" to show the whole list in the beggining.
- Changing this filter will apply the current filters.

### Operators

This component is another dropdown, where we select the type of operator that we want to set for the filters. This will also be stored in the global store.

- We can apply an "Any" default so we can show the whole list in the beggining.
- Changing the operator will apply the current filters.

### Property Values

This component will be a list with multiselect capabilities. As per the other ones, we save this list in the global store.

- When no values are selected we show them all
- Selecting one value will apply the current filters

### Filtered List

This component will be the list with the filtered data. We are going to get the data from the state of the global store and list it. For now we are going to create a simple table as per the mockups. If we have the time, we will change the design.

### Clear Button

This component will be a simple button that will reset the filters in the store and the components and re-render the list.

## Testing

I want to approach this issue with a TDD mindset. I want to create tests for a component, then implement the component. I think it will help accelarate the development and ensure the quality of the functionality at the same time.
We will use unit tests for the filter components and an integration test for the whole list, testing a couple of Properties and Values (a couple should be enough as the logic is the same for all) and all the operators (each operator has a different functionality, so we need to test them all).

### Property Names Unit Testing

- Get the option values for the dropdown and assert the values with the mockup values.
- Be a able to open the dropdown and select an option, asserting it is stored in the global store.

### Operators Unit Testing

- Get the option values for the dropdown and assert the values with the mockup values.
- Be a able to open the dropdown and select an option, asserting it is stored in the global store.

### Property Values Unit Testing

- Get the option values for the list and assert the values with the mockup values.
- Be a able to select one option, asserting it is stored in the global store.
- Be able to select multiple options, asserting they are stored in the global store.

### Clear Button Unit Testing

- On click of the button, the state of the filters in the global store should be cleared.

### Filtered List Integration Testing

For each operator:

- Be able to select a property name, an operator and a property value and assert the result in the list.

- When filters are applied, clicking the clear button will reset the filters in the filter components and the list will display the default state.

## UI/UX

I'm not sure if there is some design system in place, I could use some design system like Material UI, but for this simple project I'm going to use css modules for each component and code a bit of css.

Ultimately, the mockups are really simple, but I would like to change it a bit. Instead of a list in a table-like structure, I would create a Card component that will have the values of each product (row in the table) and instead of filtering a table, we filter cards. For the filters, I would do an accordion like column on the left side that would show the options for each type of filter. For now, we will use the table for the data as it is simpler to get the functionality working and the dropdowns/multiselect for the filters.
