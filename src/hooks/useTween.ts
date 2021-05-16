import { TweenMax } from "gsap";
import { useState } from "react";

export default (initialValue: number): [number, (value: number) => void, (targetValue: number, duration: number, easing: string) => void] => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [tweenInstance, setTweenInstance] = useState<TweenMax | null>(null);

  const tweenTo = (
    targetValue: number,
    duration = 0.5,
    easing = "elastic.out(1, 0.3)"
  ) => {
    if (tweenInstance) {
        tweenInstance.kill();
    }

    const tweenObj = { val: currentValue };
    const tween = TweenMax.to(tweenObj, duration, {
      val: targetValue,
      ease: easing,
      onUpdate: () => setCurrentValue(tweenObj.val)
    });

    setTweenInstance(tween)
  };

  const setValue = (value: number) => {
      if (tweenInstance) {
          tweenInstance.kill();
          setTweenInstance(null);
      }

      setCurrentValue(value);
  }

  return [currentValue, setValue, tweenTo];
};
