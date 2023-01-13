import { createContext, useEffect, useReducer } from "react";
import { randomEmojis, Emoji } from "../utils/getEmoji";
import { Action, BasketState } from "./types";

interface IBasketContext {
    state: BasketState;
    dispatch: React.Dispatch<Action>;
}

export const BasketContext = createContext<IBasketContext>(
    {} as IBasketContext
);

const initialState: BasketState = {
    loading: false,
    method: "Push",
    basket: randomEmojis(4),
    selection: {
        start: null,
        end: null,
        index: null,
        amount: null,
        target: null,
    },
    selectedItems: [],
    targetedItems: [],
    itemsToAdd: [],
    itemsToRemove: [],
    allBaskets: [],
    output: [],
};

const gridReducer = (state: BasketState, action: Action): BasketState => {
    const basket = state.basket;
    switch (action.type) {
        case "Initialise":
            return { ...state, allBaskets: [basket] };
        case "Set Method":
            return { ...state, method: action.method };
        case "Change Basket":
            return {
                ...state,
                basket: action.newBasket,
            };
        case "Select Items":
            const children = basket.length;
            let selectedItems: number[] = [];
            let targetedItems: number[] = [];
            let start: number | null = null;
            let end: number | null = null;
            let index: number | null = null;
            let target: number | null = null;
            let amount: number | null = null;
            if (!action.reset && !action.selectAll) {
                start =
                    action.start || action.start === 0 || action.start === null
                        ? action.start
                        : state.selection.start;
                end =
                    action.end || action.end === 0 || action.end === null
                        ? action.end
                        : state.selection.end;
                index =
                    action.index || action.index === 0 || action.index === null
                        ? action.index
                        : state.selection.index;
                target =
                    action.target ||
                    action.target === 0 ||
                    action.target === null
                        ? action.target
                        : state.selection.target;
                amount =
                    action.amount ||
                    action.amount === 0 ||
                    action.amount === null
                        ? action.amount
                        : state.selection.amount;

                if (start && start < 0) {
                    const calcStart = basket.length + start;
                    start = calcStart;
                }

                if (end && end < 0) {
                    const calcEnd = basket.length + end;
                    end = calcEnd;
                }
                if (index && index < 0) {
                    const calcIndex = basket.length + index;
                    index = calcIndex;
                }
                if (target && target < 0) {
                    const calcTarget = basket.length + target;
                    target = calcTarget;
                }

                [...new Array(children)].forEach((_, i) => {
                    if (index !== null && i === index) {
                        selectedItems.push(i);
                    }
                    if (target !== null && i === target) {
                        targetedItems.push(i);
                    }

                    if (start !== null) {
                        if (end === null) {
                            if (amount === null) {
                                if (state.method !== "Splice") {
                                    if (i >= start) {
                                        selectedItems.push(i);
                                    }
                                } else {
                                    if (i >= start) {
                                        targetedItems.push(i);
                                    }
                                }
                            } else {
                                if (state.method !== "LastIndexOf") {
                                    if (i >= start && i < start + amount) {
                                        targetedItems.push(i);
                                    }
                                }
                            }
                        } else if (end !== null) {
                            if (i >= start && i <= end) {
                                selectedItems.push(i);
                            }
                        }
                    }

                    if (state.method === "LastIndexOf" && amount !== null) {
                        if (i >= 0 && i < 0 + amount) {
                            selectedItems.push(i);
                        }
                    }
                    if (end !== null && start === null) {
                        start = null;
                        end = null;
                    }
                });
            } else if (action.selectAll) {
                selectedItems = basket.map((_, index) => index);
            }

            return {
                ...state,
                selection: {
                    start,
                    end,
                    index,
                    target,
                    amount,
                },
                selectedItems,
                targetedItems,
            };
        case "Items Added":
            return {
                ...state,
                loading: false,
                itemsToAdd: [],
            };
        case "Items Removed":
            return {
                ...state,
                loading: false,
                basket: basket.filter(
                    (_, index) => !state.itemsToRemove.includes(index)
                ),
                itemsToRemove: [],
            };
        case "Pop":
            return {
                ...state,
                loading: true,
                itemsToRemove: [basket.length - 1],
                output: [...basket].pop(),
            };
        case "Shift":
            if (basket.length > 0) {
                return {
                    ...state,
                    loading: true,
                    itemsToRemove: [0],
                    output: [...basket].shift(),
                };
            } else {
                return { ...state, output: [...basket].shift() };
            }

        case "Push":
            return {
                ...state,
                basket: [...basket, ...action.items],
                loading: true,
                itemsToAdd: action.items.map((item, index) => {
                    return basket.length + index;
                }),
                output: [...basket].push(...action.items),
            };
        case "Unshift":
            const items = [...action.items];
            return {
                ...state,
                basket: [...items, ...basket],
                loading: true,
                itemsToAdd: action.items
                    .map((item, index) => {
                        return index;
                    })
                    .reverse(),
                output: [...basket].unshift(...action.items),
            };
        case "Reverse":
            const reversed = [...basket].reverse();
            return {
                ...state,
                basket: reversed,
                output: [...basket].reverse(),
            };
        case "Fill":
            return {
                ...state,
            };
        default:
            return state;
    }
};

export const BasketProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(gridReducer, initialState);

    useEffect(() => {
        dispatch({ type: "Initialise" });
    }, []);

    return (
        <BasketContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
