import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

import XRay, { XRayProps } from '../XRay';
import exampleImage from './example.jpeg';

export default {
  component: XRay,
  title: 'XRay',
};

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: 'sans-serif' }}>
    {children}
  </div>
)

const Citation = () => (
  <cite style={{ display: 'block', color: '#777', textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
    Image Credit: <a href="https://unsplash.com/photos/GuWOOf1HvH0" target="_blank" style={{ color: '#777' }}>Unsplash - john ko - @jko001</a>
  </cite>
)

const Template = forwardRef((args: Omit<XRayProps, "src" | "alt">, ref: ForwardedRef<HTMLDivElement>) => (
  <Wrapper>
    <XRay src={exampleImage} alt="Example Image" {...args} ref={ref} />
    <Citation />
  </Wrapper>
))

export const Default = () => <Template />

export const SideBySide = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
      <Template />
      <Template />
    </div>
  )

export const WithCustomBlur = () => <Template blur={2} />

export const WithEffects = () => <Template blurLayerEffects={[".3 0 0 0 0 0 .3 0 0 0 0 0 .3 0 0 0 0 0 1 0"]} />

export const WithFixedRadius = () => <Template fixedRadius={15} />

export const WithCustomTransitions = () => <Template circleInTransition="linear" circleInDuration={2} />

export const WithScaledRadius = () => <Template radiusScale={2} />

export const WithZoom = () => <Template zoom={2.5} blur={0} canReveal={false} />

export const WithRevealDisabled = () => <Template canReveal={false} />

export const WithRevealPersisted = () => <Template autoReveal persistReveal />

export const WithAutoReveal = () => <Template autoReveal />

export const CustomRefFocused = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, [ref])

  return (
    <Template ref={ref} />
  );
}