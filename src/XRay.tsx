import React, { forwardRef, KeyboardEvent, MouseEventHandler, MutableRefObject, SyntheticEvent, TouchEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import ConditionalWrapper from "./ConditionalWrapper";
import Effects from "./Effects";
import useImageLoad from "./hooks/useImageLoad";
import useTween from "./hooks/useTween";
import PropTypes from "prop-types";

import * as Styles from "./XRay.styles";

export interface XRayProps {
    href: string,
    alt: string,

    blur?: number,
    radiusScale?: number,
    fixedRadius?: number,

    canReveal?: boolean,
    autoReveal?: boolean,
    persistReveal?: boolean,

    onClick?: MouseEventHandler<HTMLDivElement>,

    effects?: string[],
    imageLayerEffects?: string[],
    blurLayerEffects?: string[],

    circleInTransition?: string,
    circleInDuration?: number,
    circleOutTransition?: string,
    circleOutDuration?: number,

    zoom?: number
}

const XRay = forwardRef<HTMLDivElement, XRayProps>(({
    // Image attributes
    href,
    alt,

    // XRay attributes
    blur = 15,
    radiusScale = 1,
    fixedRadius = null,

    // Reveal settings
    canReveal: revealAllowed = true,
    autoReveal = false,
    persistReveal = false,

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
    const id = useId()

    const circleId = `xray-circle-${id}`;
    const blurId = `blur-filter-${id}`;
    const effectsId = `effects-filter-${id}`;
    const imageEffectsId = `image-effects-filter-${id}`;
    const blurEffectsId = `blur-effects-filter-${id}`;

    const circleUrl = `url(#${circleId})`;
    const blurUrl = `url(#${blurId})`;
    const effectsUrl = `url(#${effectsId})`;
    const imageEffectsUrl = `url(#${imageEffectsId})`;
    const blurEffectsUrl = `url(#${blurEffectsId})`;

    const normalizedZoom = Math.max(1, zoom);

    const wrapperRef = ref as MutableRefObject<HTMLDivElement> || useRef<HTMLDivElement>(null);
    const useResponsiveRadius = fixedRadius === null;

    const [responsiveRadius, setResponsiveRadius] = useState(useResponsiveRadius ? 50 : fixedRadius);

    const [clientRect, setClientRect] = useState<DOMRect | null>(null);

    const [isFocused, setFocused] = useState(false);
    const [isRevealed, setRevealedMain] = useState(false);
    const [isMouseOver, setMouseOver] = useState(false);

    const setRevealed = (revealed: boolean) => {
        if (!revealed && persistReveal) return;
        setRevealedMain(revealed);
    }

    const canReveal = useMemo(() => {
        if (!revealAllowed || autoReveal || !isFocused || isMouseOver) return false;
        
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
        if (!wrapperRef.current || !wrapperRef.current.matches) return;
        setMouseOver(wrapperRef.current.matches(":hover"));
        setClientRect(wrapperRef.current.getBoundingClientRect());
    }, [wrapperRef])

    const [circleX, setCircleX] = useState(-1000);
    const [circleY, setCircleY] = useState(-1000);
    const [circleRadius,, tweenCircleRadius] = useTween(0);

    const handleMouseEnter = () => {
        if (!responsiveRadius) return;

        tweenCircleRadius(responsiveRadius, circleInDuration, circleInTransition);
        setMouseOver(true);
        if (!autoReveal) setRevealed(false);
    };

    const handleMouseMove = (e: SyntheticEvent) => {
        console.log("Mouse move", e, circleX, circleY)
        const nativeEvent: MouseEvent = e.nativeEvent as MouseEvent;
        setCircleX(nativeEvent.offsetX);
        setCircleY(nativeEvent.offsetY);
        setMouseOver(true);
        if (!autoReveal) setRevealed(false);
    };

    const handleMouseLeave = () => {
        tweenCircleRadius(0, circleOutDuration, circleOutTransition);
        setMouseOver(false);
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 0 || !clientRect || !responsiveRadius) return;
        const touch = e.touches[0];

        tweenCircleRadius(responsiveRadius, circleInDuration, circleInTransition);
        setCircleX(touch.clientX - clientRect.left)
        setCircleY(touch.clientY - clientRect.top);
        setMouseOver(true);
        setRevealed(false);
    }

    const handleTouchEnd = () => {
        tweenCircleRadius(0, circleOutDuration, circleOutTransition);
        setMouseOver(false);
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 0 || !clientRect) return;
        const touch = e.touches[0];

        setCircleX(touch.clientX - clientRect.left)
        setCircleY(touch.clientY - clientRect.top);
        setMouseOver(true);
        setRevealed(false);
    }

    const handleFocus = () => {
        setFocused(true);
        if (autoReveal) setRevealed(true);
    }

    const handleBlur = () => {
        setFocused(false);
        setRevealed(false);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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

            role="img"
            aria-label={alt}

            style={Styles.WrapperStyles}
        >
            <img className="xray__image" src={href} alt={alt} style={Styles.ImageStyles} />
            <svg className="xray__svg" style={Styles.SVGStyles}>
                <defs>
                    <clipPath id={circleId}>
                        <circle cx={circleX} cy={circleY} r={circleRadius} />
                        {isRevealed && <rect x="0" y="0" width="100%" height="100%" />}
                    </clipPath>

                    <filter id={blurId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
                    </filter>

                    <Effects id={effectsId} effects={effects} />
                    <Effects id={imageEffectsId} effects={imageLayerEffects} />
                    <Effects id={blurEffectsId} effects={blurLayerEffects} />
                </defs>

                <ConditionalWrapper condition={effects.length > 0} wrapper={children => <g filter={effectsUrl}>{children}</g>}>
                    <>
                        <ConditionalWrapper condition={blurLayerEffects.length > 0} wrapper={children => <g filter={blurEffectsUrl}>{children}</g>}>
                            <image xlinkHref={href} filter={blurUrl} x="0" y="0" width="100%" />
                        </ConditionalWrapper>
                        <ConditionalWrapper condition={imageLayerEffects.length > 0} wrapper={children => <g filter={imageEffectsUrl}>{children}</g>}>
                            <g clipPath={circleUrl}>
                                <image xlinkHref={href} x="0" y="0" width="100%" style={{ transform: `scale(${isRevealed ? 1 : normalizedZoom})`, transformOrigin: `${circleX}px ${circleY}px` }} />
                            </g>
                        </ConditionalWrapper>
                    </>
                </ConditionalWrapper>

                {(isFocused && !isRevealed && canReveal && (
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor">Press 'Space' to reveal</text>
                ))}
            </svg>
        </div>
    );
});

XRay.propTypes = {
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,

    // XRay attributes
    blur: PropTypes.number,
    radiusScale: PropTypes.number,
    fixedRadius: PropTypes.number,

    // Reveal settings
    canReveal: PropTypes.bool,
    autoReveal: PropTypes.bool,
    persistReveal: PropTypes.bool,

    // Event handlers
    onClick: PropTypes.func,

    // Custom effects
    effects: PropTypes.arrayOf(PropTypes.string.isRequired),
    imageLayerEffects: PropTypes.arrayOf(PropTypes.string.isRequired),
    blurLayerEffects: PropTypes.arrayOf(PropTypes.string.isRequired),

    // Transitions
    circleInTransition: PropTypes.string,
    circleInDuration: PropTypes.number,
    circleOutTransition: PropTypes.string,
    circleOutDuration: PropTypes.number,

    // Zoom
    zoom: PropTypes.number
}

export default XRay