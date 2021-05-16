# react-xray
> Accessible image component that reveals images on user interaction

## Installation
```bash
npm install @nikxda/react-xray
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
import XRay from '@nikxda/react-xray';

const ExampleComponent = () => (
 <div>
  <h1>An Example Image</h1>
  <XRay href="http://picsum.photos/1920/1080" alt="Lorem Picsum" />
 </div>
)
```

## Component Props

The following properties are available:

|Prop Name|Type|Default Value|Description|Required|
|---|---|---|---|---|
|href|`string`|-|The image URL.|Yes|
|alt|`string`|-|A description of the image.|Yes|
|blur|`number`|`15`|The amount of blur.|No|
|radiusScale|`number`|`1`|The factor by which to scale the default responsive radius.|No|
|fixedRadius|`number`|`null`|If no responsive radius is desired, a fixed radius can be applied.|No|
|onClick|`function`|`()=>{}`|An onClick handler.|No|
|effects|`string[]`|`[]`|Effects to be applied globally, see [Effects](#effects).|No|
|imageLayerEffects|`string[]`|`[]`|Effects to be applied to the image layer, see [Effects](#effects).|No|
|blurLayerEffects|`string[]`|`[]`|Effects to be applied to the blur layer, see [Effects](#effects).|No|
|circleInTransition|`string`|`"elastic.out(1, 0.3)"`|The GSAP transition which will be used to transition the circle in.|No|
|circleInDuration|`number`|`0.5`|The duration of the `circleInTransition`|No|
|circleOutTransition|`string`|`"expo.out"`|The GSAP transition which will be used to transition the circle out.|No|
|circleOutDuration|`number`|`0.2`|The duration of the `circleOutTransition`|No|
|canReveal|`boolean`|`true`|Whether the revealed state can be toggled using the keyboard on focus.|No|
|autoReveal|`boolean`|`false`|Whether the image should automatically reveal itself upon focus.|No|
|persistReveal|`boolean`|`false`|Whether the image should stay visible after it has been revealed for the first time.|No|
|zoom|`number`|`1`|The amount of zoom.|No|

## Effects

XRay supports custom effects on three layers:

- The global layer effects are applied to the whole component, therefore affecting all visuals. The corresponding property is `effects`.
- The image layer effects are applied only to the revealed image, therefore to what is visible in the circular cutout. The corresponding property is `imageLayerEffects`.
- The blur layer effects are applied only to the blurred section of the image. The corresponding property is `blurLayerEffects`.

Each of the three proprties take a `string[]` with each entry of the array being an effect matrix as per the [MDN specification found here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix).
For example, to darken the blurry part of the image, one may supply the value `[".3 0 0 0 0 0 .3 0 0 0 0 0 .3 0 0 0 0 0 1 0"]` for `blurLayerEffects`.

## Accessibility & Responsiveness

React XRay provides basic accessibility out of the box. It features touch support for mobile devices and will allow the image to be revealed when the element has the focus and the mouse is not currently over the image.
In this case, the component will display a message saying that the image can be revealed by pressing space. The responsiveness comes from the fact that a single radius given in pixels will likely not be suitable for all screen sizes.
XRay therefore calculates a "responsive" radius by tracking the wrapper dimensions. The default diameter of the circular cutout is half the length of the shorter side. If this choice is not suitable, the responsive radius 
can be scaled using `radiusScale` or set to a fixed value using `fixedRadius`.

## License

MIT