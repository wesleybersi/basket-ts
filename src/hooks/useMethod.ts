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
                dispatch({ type: method });
                break;
            case "Shift":
                dispatch({ type: method });
                break;
            case "Push":
                dispatch({
                    type: method,
                    items: [...emojis],
                });
                break;
            case "Unshift":
                dispatch({ type: method, items: [...emojis] });
                break;
            case "Reverse":
                dispatch({ type: method });
                break;
            default:
                return;
        }

        setTrigger(false);
    }, [trigger]);

    return setTrigger;
};

export default useMethod;
