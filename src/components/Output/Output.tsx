import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { Emoji } from "../../utils/getEmoji";
import "./output.scss";

interface Props {}

const Output: React.FC<Props> = () => {
    const outputRef = useRef<HTMLUListElement | null>(null);
    const { state } = useContext(BasketContext);

    return (
        <section className="output-wrapper">
            <h2>returns</h2>
            <ul className="output" ref={outputRef}>
                <>
                    {!state.output && (
                        <li className="state.output-item">{state.output}</li>
                    )}
                    {typeof state.output === "number" && (
                        <li className="state.output-item">{state.output}</li>
                    )}
                    {state.output instanceof Emoji && (
                        <li className="state.output-item">
                            {state.output.emoji}
                        </li>
                    )}
                    {Array.isArray(state.output) &&
                        state.output.map((item, index) => (
                            <li className="state.output-item">{item.emoji}</li>
                        ))}
                </>
            </ul>
        </section>
    );
};

export default Output;
