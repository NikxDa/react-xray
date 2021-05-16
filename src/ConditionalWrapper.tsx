import React from "react";

export default ({
    condition,
    wrapper,
    children
}: {
    condition: boolean,
    wrapper: (children: React.ReactChild | React.ReactChild[]) => JSX.Element,
    children: JSX.Element
}) => condition ? wrapper(children) : children;