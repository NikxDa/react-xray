import React from "react";

export default ({
    effects,
    id 
}: {
    effects: string[],
    id: string
}) => {
    if (effects.length === 0) return null;

    return (
        <filter id={id}>
            {effects.map((effect, index) => <feColorMatrix key={index} type="matrix" values={effect} />)}
        </filter>
    );
}