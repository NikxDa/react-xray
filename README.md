# react-xray
> Accessible image component that reveals images on user interaction

## Installation
```bash
npm install react-xray
```

## Try it online

The storybook is available here: https://react-xray.vercel.app/

## Preview

![React XRay](assets/xray.gif)

# Features

- :gear:&nbsp;&nbsp;Fully customizable
- :sparkles:&nbsp;&nbsp;Custom `feColorMatrix` effects
- :computer:&nbsp;&nbsp;Responsive out of the box
- :iphone:&nbsp;&nbsp;Touch support
- :eyeglasses:&nbsp;&nbsp;Basic accessibility built-in
- :tada:&nbsp;&nbsp;Custom transitions
- :mag:&nbsp;&nbsp;Zoom mode

## Usage

```jsx
import XRay from 'react-xray';

const ExampleComponent = () => (
    <div>
        <h1>An Example Image</h1>
        <XRay href="http://picsum.photos/1920/1080" alt="Lorem Picsum">
    </div>
)
```

## Component Props

The following properties are available:

```js
{
    // Image attributes
    href,
    alt,

    // XRay attributes
    blur = 15,
    radiusScale = 1,
    fixedRadius = null,

    // Event handlers
    onClick = () => { },

    // Custom effects
    effects = [],
    imageLayerEffects = [],
    blurLayerEffects = [],

    // Transitions
    circleInTransition = "elastic.out(1, 0.3)",
    circleInDuration = 0.5,
    circleOutTransition = "expo.out",
    circleOutDuration = 0.2,

    // Zoom
    zoom = 1,
}
```

## Accessibility

React XRay provides basic accessibility out of the box. It features touch support for mobile devices and incorporates responsive behaviour by default.

## License

MIT