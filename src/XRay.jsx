import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import ConditionalWrapper from "./ConditionalWrapper";
import Effects from "./Effects";
import useImageLoad from "./hooks/useImageLoad";
import useTween from "./hooks/useTween";

import "./XRay.css";

export default forwardRef(({
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
}, ref) => {
    const normalizedZoom = Math.max(1, zoom);

    const wrapperRef = ref || useRef(null);
    const [responsiveRadius, setResponsiveRadius] = useState(useResponsiveRadius ? 50 : fixedRadius);
    const useResponsiveRadius = fixedRadius === null;

    const [clientRect, setClientRect] = useState(null);

    const [isFocused, setFocused] = useState(false);
    const [isRevealed, setRevealed] = useState(false);
    const [isMouseOver, setMouseOver] = useState(false);

    const canReveal = useMemo(() => {
        if (!isFocused || isMouseOver) return false;

        if (wrapperRef.current && wrapperRef.current.matches) {
            return !wrapperRef.current.matches(":hover");
        } else {
            return true;
        }
    }, [isFocused, isMouseOver]);

    const calculateResponsiveRadius = () => {
        if (!wrapperRef.current || !useResponsiveRadius) return;

        const radiusFactor = 0.5;
        const smallerSide = Math.min(
            wrapperRef.current.clientWidth,
            wrapperRef.current.clientHeight
        );

        const calculatedRadius = ((smallerSide * radiusFactor) / 2) * radiusScale;
        setResponsiveRadius(calculatedRadius);
    }

    useImageLoad(() => calculateResponsiveRadius(), [wrapperRef.current, radiusScale], href);

    useEffect(() => {
        const resizeHandler = () => {
            calculateResponsiveRadius();

            if (wrapperRef.current) {
                setClientRect(wrapperRef.current.getBoundingClientRect());
            }
        }

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, []);

    useEffect(() => {
        if (!wrapperRef.current && !wrapperRef.current.matches) return;
        setMouseOver(wrapperRef.current.matches(":hover"));
        setClientRect(wrapperRef.current.getBoundingClientRect());
    }, [wrapperRef])

    const [circleX, setCircleX] = useState(-1000);
    const [circleY, setCircleY] = useState(-1000);
    const [circleRadius, setCircleRadius, tweenCircleRadius] = useTween(0);

    const handleMouseEnter = () => {
        tweenCircleRadius(responsiveRadius, circleInDuration, circleInTransition);
        setMouseOver(true);
        setRevealed(false);
    };

    const handleMouseMove = (e) => {
        setCircleX(e.nativeEvent.offsetX);
        setCircleY(e.nativeEvent.offsetY);
        setMouseOver(true);
        setRevealed(false);
    };

    const handleMouseLeave = () => {
        tweenCircleRadius(0, circleOutDuration, circleOutTransition);
        setMouseOver(false);
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 0 || !clientRect) return;
        const touch = e.touches[0];
        
        tweenCircleRadius(responsiveRadius, circleInDuration, circleInTransition);
        setCircleX(touch.clientX - clientRect.left)
        setCircleY(touch.clientY - clientRect.top);
        setMouseOver(true);
        setRevealed(false);
    }

    const handleTouchEnd = (e) => {
        tweenCircleRadius(0, circleOutDuration, circleOutTransition);
        setMouseOver(false);
    }

    const handleTouchMove = (e) => {
        if (e.touches.length === 0 || !clientRect) return;
        const touch = e.touches[0];
        
        setCircleX(touch.clientX - clientRect.left)
        setCircleY(touch.clientY - clientRect.top);
        setMouseOver(true);
        setRevealed(false);
    }

    const handleFocus = () => {
        setFocused(true);
    }

    const handleBlur = () => {
        setFocused(false);
        setRevealed(false);
    }

    const handleKeyDown = (e) => {
        // Space key
        if (isFocused && canReveal && e.keyCode === 32) {
            setRevealed(!isRevealed);
        }
    }

    return (
        <div
            className="xray"

            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}

            onFocus={handleFocus}
            onBlur={handleBlur}

            onKeyDown={handleKeyDown}
            onClick={onClick}

            ref={wrapperRef}
            tabIndex={0}
        >
            <img className="xray__image" src={href} alt={alt} />
            <svg className="xray__svg">
                <defs>
                    <clipPath id="xray-circle">
                        <circle cx={circleX} cy={circleY} r={circleRadius} />
                        {isRevealed && <rect x="0" y="0" width="100%" height="100%" />}
                    </clipPath>

                    <filter id="blur-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
                    </filter>

                    <Effects id="effects-filter" effects={effects} />
                    <Effects id="image-effects-filter" effects={imageLayerEffects} />
                    <Effects id="blur-effects-filter" effects={blurLayerEffects} />
                </defs>

                <ConditionalWrapper condition={effects.length > 0} wrapper={children => <g filter="url(#effects-filter)">{children}</g>}>
                    <ConditionalWrapper condition={blurLayerEffects.length > 0} wrapper={children => <g filter="url(#blur-effects-filter">{children}</g>}>
                        <image xlinkHref={href} filter="url(#blur-filter)" x="0" y="0" width="100%" />
                    </ConditionalWrapper>
                    <ConditionalWrapper condition={imageLayerEffects.length > 0} wrapper={children => <g filter="url(#image-effects-filter">{children}</g>}>
                        <g clipPath="url(#xray-circle)">
                            <image xlinkHref={href} x="0" y="0" width="100%" transform={`scale(${normalizedZoom})`} transform-origin={`${circleX} ${circleY}`} />
                        </g>
                    </ConditionalWrapper>
                </ConditionalWrapper>

                {(isFocused && !isRevealed && canReveal && (
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor">Press 'Space' to reveal</text>    
                ))}
            </svg>
        </div>
    );
});
