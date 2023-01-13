import { useEffect } from "react";

const useCSSProperty = (
    ref: HTMLElement | null,
    property: string,
    to: string
) => {
    useEffect(() => {
        if (ref) {
            ref.style.setProperty(property, to);
        }
    }, [ref, property, to]);
};

export default useCSSProperty;
