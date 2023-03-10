import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";

function Aside() {
    const { state, dispatch } = useContext(BasketContext);
    return (
        <aside>
            {/* <h2>Methods</h2> */}
            <div className="method-grid">
                <div
                    className="method-selector"
                    onClick={() =>
                        dispatch({ type: "Set Method", method: "Pop" })
                    }
                >
                    <p>pop</p>
                </div>
                <div
                    className="method-selector"
                    onClick={() =>
                        dispatch({ type: "Set Method", method: "Push" })
                    }
                >
                    <p>push</p>
                </div>
                <div
                    className="method-selector"
                    onClick={() =>
                        dispatch({ type: "Set Method", method: "Shift" })
                    }
                >
                    <p>shift</p>
                </div>
                <div
                    className="method-selector"
                    onClick={() =>
                        dispatch({ type: "Set Method", method: "Unshift" })
                    }
                >
                    <p>unshift</p>
                </div>
            </div>
        </aside>
    );
}

export default Aside;
