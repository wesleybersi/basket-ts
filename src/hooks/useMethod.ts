import { BasketContext } from "../contexts/BasketContext";
import { useState, useContext, useEffect } from "react";
import { Emoji } from "../utils/getEmoji";

type MethodHook = (
    method: string | undefined,
    parameterValues: (Emoji | number | null)[]
) => React.Dispatch<React.SetStateAction<boolean>>;

const useMethod: MethodHook = (method, parameterValues) => {
    const { state, dispatch } = useContext(BasketContext);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (!method || !trigger || state.loading) {
            setTrigger(false);
            return;
        }

        const emojis: Emoji[] = [];
        const numbers: number[] = [];
        for (const value of parameterValues) {
            if (!value) {
                continue;
            }
            if (typeof value !== "number") {
                emojis.push(value);
            } else {
                numbers.push(value);
            }
        }

        switch (method) {
            case "Pop":
                if (state.basket.length === 0) {
                    break;
                }
                dispatch({ type: method });
                break;
            case "Shift":
                if (state.basket.length === 0) {
                    break;
                }
                dispatch({ type: method });
                break;
            case "Push":
                if (state.basket.length + emojis.length > 20) {
                    alert("Max limit: 20");
                    break;
                }
                dispatch({
                    type: method,
                    items: [...emojis],
                });
                break;
            case "Unshift":
                if (state.basket.length + emojis.length > 20) {
                    alert("Max limit: 20");
                    break;
                }
                dispatch({ type: method, items: [...emojis] });
                break;

            case "Reverse":
                if (state.basket.length === 0) {
                    break;
                }
                dispatch({ type: method });
                break;
            case "Fill":
                dispatch({
                    type: method,
                    item: emojis[0],
                });
                break;
            case "Splice":
                if (state.basket.length + emojis.length > 20) {
                    alert("Max limit: 20");
                    break;
                }
                dispatch({
                    type: method,
                    item1: emojis[0] ?? undefined,
                    item2: emojis[1] ?? undefined,
                });
                break;
            case "Slice":
            case "At":
            case "CopyWithin":
                dispatch({
                    type: method,
                });
                break;
            case "Includes":
                dispatch({
                    type: method,
                    item: emojis[0],
                });
                break;

            case "IndexOf":
            case "LastIndexOf":
                dispatch({
                    type: method,
                    item: emojis[0],
                });
                break;
            default:
                return;
        }

        setTrigger(false);
    }, [trigger]);

    return setTrigger;
};

export default useMethod;
