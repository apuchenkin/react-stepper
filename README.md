# React material stepper

Implementation of [Material Stepper] for React. **React material stepper** encapsulates logic of step state maintianing, and provides API for control over the step resolution

[Material Stepper]: https://material.io/archive/guidelines/components/steppers.html

## Features

- Simple, declarative configuration
- Typescript typings
- Horizontal and vertical layouts
- Dynamic steps
- locking
- Default material themes provided
- Customizable by SCSS

## Getting started

```jsx
import Stepper, { Step } from "react-material-stepper";

const StepperExample = () => (
  <Stepper>
    <Step
      stepId={STEP1}
      data="Step 1 initial state"
      title="Step One"
      description="This step is optional"
    >
      <Step1 />
    </Step>
    <Step stepId={STEP2} title="Step Two" description="Name is required">
      <Step2 />
    </Step>
    <Step stepId={STEP3} title="Step Three" >
      <Step3 />
    </Step>
  </Stepper>
);

```
*Example1: Bascic stepper configuration, where `Step1`, `Step2` and `Step3` is arbitary user defined components*

In order to work with stepper controller we could use provided react context:

```jsx
import {
  StepperAction,
  StepperContent,
  StepperContext
} from "react-material-stepper";

export const STEP1 = "step-one";

const Step1 = ({ vertical = false }) => {
  const { resolve, getData } = React.useContext(StepperContext);

  const data = getData(STEP1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resolve("step1 resolved data");
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <StepperAction align="right" type="submit">
          Continue
        </StepperAction>
      }
    >
      Step1 resolved:
      <pre>{data}</pre>
    </StepperContent>
  );
};
```
*Example2: Stepper context allows step data resolution. Saved data is accessibble by `getData` method*


## API

### `Stepper`

| Prop        | Type                                | Description                                                          |
|-------------|-------------------------------------|----------------------------------------------------------------------|
| initialStep | string \| number                    | Stets initital step by `StepId`                                      |
| onResolve   | (stepId) => {}                      | Callback that will be executed on each step resolution               |
| onReject    | (stepId) => {}                      | Callback that will be executed on each step rejection                |
| contextRef  | MutableRefObject<StepperController> | Stepper controller reference                                         |
| className   | string                              | Custom classname will be added to the root stepper container         |
| vertical    | boolean                             | Indicates either horizontal or vertical steppr layout should be used |

### `Step`

```jsx
<Step
  stepId="2"
  title="Step Two"
  loading={isLoading(STEP2)}
  description="Login is required"
>
  ...
</Step>
```
*Example: `Step` component*

| Prop        | Type            | Description                                      |
|-------------|-----------------|--------------------------------------------------|
| **title***  | string          | Step title. Required                             |
| **stepId*** | string \| number | Unique step identifier. Required                |
| **children*** | ReactNode     | React component that will be rendered when step is activated |
| description | string          | Step description or hint. Optional               |
| loading     | boolean         | Indicates whether step content is beign loading. |
| disabled    | boolean         | Indicates whether step is beign disabled         |
| data        | any             | Initial state of step                            |
| className   | string          | Custom classname                                 |
| index       | number          | Step index                                       |

### `StepperContext`

Provides API for control over stepper

| Prop           | Type                         | Description                                                       |
|----------------|------------------------------|-------------------------------------------------------------------|
| updateStep     | (stepId, state) => {}        | Updates step state by id.                                         |
| goAt           | stepId => {}                 | Activates certain step at provided stepId                         |
| resolve        | data => {}                   | Resolves current step with provided data                          |
| reject         | (message, description) => {} | Rejects current step with error and description                   |
| isLoading      | () => boolean                | Indicates whether any of stepper steps is being loading           |
| getCurrentStep | () => StepState              | Returns current step state                                        |
| getStep        | stepId => StepState          | Returns step state by stepId                                      |
| getData        | (stepId, fallback)           | Returns step data, fallback is used when step data is not defined |

### `StepperContent`

`StepperContent` extends `form` interface, Could be used in custom steps for convenience and styling.
Additionally `StepperContent` accept `actions` prop, that will be rendered in the footer of stepper content

### `StepperAction`

`StepperAction` extends `button` interface, Could be used in custom steps for convenience and styling.
Additionally `StepperAction` accept `align` ('left' or 'right') prop.

<!-- ## Customization

### As part of [material theme]

```jsx
```

[Material theme]: https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme

### By SCSS variables


```jsx

```

### By CSS override

```jsx

``` -->

<!-- ## Examples

- [Simple horizontal stepper][simple]
- [Simple verical stepper][vertical]
- [Full featured stepper][advanced]


[simple]: example/src/simple
[vertical]: example/src/vertical
[advanced]: example/src/advanced -->