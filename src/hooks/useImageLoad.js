import { useEffect, useState } from "react";

export default (callback, dependencies, imageUrl) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!imageLoaded) return;
        callback();
    }, [...dependencies, imageLoaded]);

    const imageToLoad = new Image();
    imageToLoad.src = imageUrl;
    imageToLoad.onload = () => setImageLoaded(true);
}