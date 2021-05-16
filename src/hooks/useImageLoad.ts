import { useEffect, useState } from "react";

export default (callback: () => void, dependencies: React.DependencyList, imageUrl: string) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!imageLoaded) return;
        callback();
    }, [...dependencies, imageLoaded]);

    const imageToLoad = new Image();
    imageToLoad.src = imageUrl;
    imageToLoad.onload = () => setImageLoaded(true);
}