import React, { useEffect, useRef } from 'react';

import XRay from '../XRay';
import exampleImage from './example.jpeg';

export default {
  component: XRay,
  title: 'XRay',
};

const Template = args => (
  <div style={{ maxWidth: "500px", margin: "50px auto" }}>
    <XRay href={exampleImage} alt="Example Image" {...args} />
  </div>
);

export const Default = () => <Template alt="Test" href={exampleImage} />

export const WithCustomBlur = () => <Template blur={2} />

export const WithEffects = () => <Template blurLayerEffects={[".3 0 0 0 0 0 .3 0 0 0 0 0 .3 0 0 0 0 0 1 0"]} />

export const WithFixedRadius = () => <Template fixedRadius={15} />

export const WithCustomTransitions = () => <Template circleInTransition="linear" circleInDuration={2} />

export const WithScaledRadius = () => <Template radiusScale={2} />

export const WithZoom = () => <Template zoom={2.5} blur={0} canReveal={false} />

export const WithRevealDisabled = () => <Template canReveal={false} />

export const WithAutoReveal = () => <Template autoReveal />

export const CustomRefFocused = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, [ref])

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <XRay href={exampleImage} alt="Example Image" ref={ref} />
    </div>
  );
}