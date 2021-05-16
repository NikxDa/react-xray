import { CSSProperties } from "react";

export const WrapperStyles: CSSProperties = {
    position: 'relative',
    isolation: 'isolate',
    display: 'block',
    color: 'white',
    fontFamily: 'sans-serif',
};

export const ImageStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    visibility: 'hidden',
    display: 'block',
}

export const SVGStyles: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 5,
}