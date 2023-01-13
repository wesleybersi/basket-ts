import { useContext, memo, useState, useRef, useEffect, Children } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import useCSSProperty from "../../hooks/useCSSProperty";
import { randomEmoji, randomEmojis, Emoji } from "../../utils/getEmoji";
import { ImArrowUp as IconArrow } from "react-icons/im";

import { IoMdClose as IconTarget } from "react-icons/io";
import "./basket.scss";

import audioPop01 from "../../assets/audio/pop_01.wav";
import audioPop02 from "../../assets/audio/pop_02.wav";
import audioPop03 from "../../assets/audio/pop_03.wav";
import audioPop04 from "../../assets/audio/pop_04.wav";
import audioPop05 from "../../assets/audio/pop_05.wav";
import audioPop06 from "../../assets/audio/pop_06.wav";

const audioPops = [
    audioPop01,
    audioPop02,
    audioPop03,
    audioPop04,
    audioPop05,
    audioPop06,
];

interface Props {}

const Basket: React.FC<Props> = () => {
    const { state, dispatch } = useContext(BasketContext);
    const basketRef = useRef<HTMLUListElement | null>(null);
    const [duration, setDuration] = useState<number>(250);
    const [animationOffset, setAnimationOffset] = useState<string>("0");
    const [allBaskets, setAllBaskets] = useState<Emoji[][]>([
        [...state.basket],
    ]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    useCSSProperty(basketRef.current, "--animation-offset", animationOffset);

    function itemState(item: HTMLElement, state: "Zero" | "Normalize") {
        if (state === "Zero") {
            item.style.animation = "";
            item.style.fontSize = "0";
            item.style.padding = "0";
            item.style.flex = "0";
            item.style.opacity = "0";
        } else if (state === "Normalize") {
            item.style.animation = "";
            item.style.fontSize = "2.5rem";
            item.style.padding = "1rem";
            item.style.flex = "1";
            item.style.opacity = "1";
        }
    }

    function playSound() {
        const pop = new Audio(
            audioPops[Math.floor(Math.random() * audioPops.length)]
        );
        pop.volume = 0.5;
        pop.play();
    }

    useEffect(() => {
        if (!state.itemsToAdd || !basketRef.current || !state.loading) {
            return;
        }
        setAnimationOffset("0");

        let accumulator = 0;

        if (state.method === "Push") {
            setAnimationOffset("2rem");
            for (const index of state.itemsToAdd) {
                console.log(index);
                const child = basketRef.current.children[index] as HTMLElement;
                child.addEventListener("animationend", end);
                child.style.animation = `addItem ${duration}ms ease ${accumulator}ms`;
                accumulator += duration;

                function end() {
                    itemState(child, "Normalize");
                    playSound();
                    if (
                        index === state.itemsToAdd[state.itemsToAdd.length - 1]
                    ) {
                        dispatch({ type: "Items Added" });
                    }
                    child.removeEventListener("animationend", end);
                }
            }
        } else if (state.method === "Unshift") {
            setAnimationOffset("-2rem");

            // Normalize original items
            for (const index of state.itemsToAdd) {
                const child = basketRef.current.children[
                    basketRef.current.children.length - 1 - index
                ] as HTMLElement;
                itemState(child, "Normalize");
            }

            //Zero and animate new items
            for (const index of state.itemsToAdd) {
                const child = basketRef.current.children[index] as HTMLElement;
                itemState(child, "Zero");
                child.classList.add("basket-item-add");
                child.addEventListener("animationend", end);
                child.style.animation = `addItem ${duration}ms ease ${accumulator}ms`;
                accumulator += duration;
                function end() {
                    itemState(child, "Normalize");
                    playSound();
                    if (
                        index === state.itemsToAdd[state.itemsToAdd.length - 1]
                    ) {
                        dispatch({ type: "Items Added" });
                    }
                    child.removeEventListener("animationend", end);
                }
            }
        }
    }, [state.itemsToAdd]);

    useEffect(() => {
        if (!state.itemsToRemove || !basketRef.current || !state.loading) {
            return;
        }
        let accumulator = 0;
        for (const index of state.itemsToRemove) {
            const child = basketRef.current.children[index] as HTMLElement;
            child.addEventListener("animationend", end);
            itemState(child, "Zero");
            child.style.animation = `removeItem ${duration}ms ease-out ${accumulator}ms`;

            accumulator += duration;
            function end() {
                playSound();

                if (accumulator === state.itemsToRemove.length * duration) {
                    dispatch({ type: "Items Removed" });
                }
                child.removeEventListener("animationend", end);
            }
        }
    }, [state.itemsToRemove]);

    useEffect(() => {
        if (!basketRef.current) {
            return;
        }
        if (!state.loading) {
            const children = basketRef.current.children.length;
            [...new Array(children)].forEach((_, index) => {
                if (basketRef.current) {
                    const child = basketRef.current.children[
                        index
                    ] as HTMLElement;
                    itemState(child, "Normalize");
                }
            });
        }
    }, [state.loading]);

    useEffect(() => {
        if (!basketRef.current) {
            return;
        }
        if (state.itemsToAdd.length === 0) {
            setAnimationOffset("0");
        }

        const children = basketRef.current.children.length;
        [...new Array(children)].forEach((_, index) => {
            if (basketRef.current) {
                const child = basketRef.current.children[index] as HTMLElement;
                child.style.animation = `addItem ${duration}ms ease-out`;
                child.addEventListener("animationend", end);
                function end() {
                    itemState(child, "Normalize");
                    child.removeEventListener("animationend", end);
                }
            }
        });
    }, [currentIndex]);

    return (
        <section className="basket-wrapper">
            <div className="basket-header">
                <h2>const basket =</h2>
                <div className="basket-picker">
                    {allBaskets.map((basket, index) => (
                        <button
                            style={
                                currentIndex === index
                                    ? {
                                          backgroundColor: "var(--blue)",
                                          color: "white",
                                          fontWeight: 600,
                                      }
                                    : {}
                            }
                            onClick={() => {
                                dispatch({
                                    type: "Change Basket",
                                    newBasket: allBaskets[index],
                                });
                                setCurrentIndex(index);
                            }}
                        >
                            {basket.length}
                        </button>
                    ))}
                    <button
                        onClick={
                            allBaskets.length < 11
                                ? () => {
                                      setAllBaskets((prev) => [...prev, []]);
                                      dispatch({
                                          type: "Change Basket",
                                          newBasket: [],
                                      });
                                      setCurrentIndex(allBaskets.length);
                                  }
                                : undefined
                        }
                    >
                        +
                    </button>
                </div>
            </div>
            <ul className="basket" ref={basketRef}>
                {state.basket.map((item, index) => (
                    <li className="basket-item">
                        {item.emoji}

                        {state.selectedItems.includes(index) && (
                            <span className="basket-item-selected" />
                        )}
                        {state.targetedItems.includes(index) && (
                            <>
                                <span className="basket-item-selected basket-item-selected-red" />{" "}
                                <div className="basket-item-target">
                                    <IconTarget color="red" size="6rem" />
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default memo(Basket);
