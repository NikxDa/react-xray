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

- :white_check_mark:&nbsp;&nbsp;Very flexible
- :white_check_mark:&nbsp;&nbsp;Custom effects
- :white_check_mark:&nbsp;&nbsp;Responsive by default
- :white_check_mark:&nbsp;&nbsp;Touch support
- :white_check_mark:&nbsp;&nbsp;Accessibility by default
- :white_check_mark:&nbsp;&nbsp;Custom transitions
- :white_check_mark:&nbsp;&nbsp;Zoom mode

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