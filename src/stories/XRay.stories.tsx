import React, { useEffect, useRef } from 'react';

import XRay, { XRayProps } from '../XRay';
import exampleImage from './example.jpeg';

export default {
  component: XRay,
  title: 'XRay',
};

const Wrapper = ({ children }) => (
  <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: 'sans-serif' }}>
    {children}
  </div>
)

const Citation = () => (
  <cite style={{ display: 'block', color: '#777', textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
    Image Credit: <a href="https://unsplash.com/photos/GuWOOf1HvH0" target="_blank" style={{ color: '#777' }}>Unsplash - john ko - @jko001</a>
  </cite>
)

const Template = (args: Omit<XRayProps, "href" | "alt">) => (
  <Wrapper>
    <XRay href={exampleImage} alt="Example Image" {...args} />
    <Citation />
  </Wrapper>
);

export const Default = () => <Template />

export const WithCustomBlur = () => <Template blur={2} />

export const WithEffects = () => <Template blurLayerEffects={[".3 0 0 0 0 0 .3 0 0 0 0 0 .3 0 0 0 0 0 1 0"]} />

export const WithFixedRadius = () => <Template fixedRadius={15} />

export const WithCustomTransitions = () => <Template circleInTransition="linear" circleInDuration={2} />

export const WithScaledRadius = () => <Template radiusScale={2} />

export const WithZoom = () => <Template zoom={2.5} blur={0} canReveal={false} />

export const WithRevealDisabled = () => <Template canReveal={false} />

export const WithAutoReveal = () => <Template autoReveal />

export const CustomRefFocused = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, [ref])

  return (
    <Wrapper>
      <XRay href={exampleImage} alt="Example Image" ref={ref} />
      <Citation />
    </Wrapper>
  );
}