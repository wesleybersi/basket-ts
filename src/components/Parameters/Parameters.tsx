import Parameter from "./Parameter";
import "./parameters.scss";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { Emoji } from "../../utils/getEmoji";

export interface IParameter {
    name: string;
    type: "Emoji Picker" | "Number";
    defaultValue?: number;
    required?: boolean;
    hide?: boolean;
    min?: number;
    max?: number;
}

interface Props {
    parameter1: IParameter | null;
    parameter2: IParameter | null;
    parameter3: IParameter | null;
    parameter4: IParameter | null;
    parameterValues: (number | Emoji | null)[];
    setParameterValues: React.Dispatch<
        React.SetStateAction<(number | Emoji | null)[]>
    >;
}

const Parameters: React.FC<Props> = ({
    parameter1,
    parameter2,
    parameter3,
    parameter4,
    parameterValues,
    setParameterValues,
}) => {
    const [active1, setActive1] = useState<boolean>(false);
    const [active2, setActive2] = useState<boolean>(false);
    const [active3, setActive3] = useState<boolean>(false);
    const [active4, setActive4] = useState<boolean>(false);
    const [activeParameters, setActiveParameters] = useState<boolean[]>([
        active1,
        active2,
        active3,
        active4,
    ]);

    const { state, dispatch } = useContext(BasketContext);

    function updateValue(
        index: number,
        name: string,
        value: Emoji | number | null
    ) {
        parameterValues[index] = value;
        setParameterValues([...parameterValues]);

        if (typeof value === "number" || value === null) {
            if (name === "index") {
                dispatch({ type: "Select Items", index: value });
            } else if (
                name === "start" ||
                (name === "fromIndex" && state.method !== "LastIndexOf")
            ) {
                dispatch({ type: "Select Items", start: value });
            } else if (name === "fromIndex" && state.method === "LastIndexOf") {
                dispatch({ type: "Select Items", start: 0, amount: value });
            } else if (name === "end") {
                dispatch({ type: "Select Items", end: value });
            } else if (name === "target") {
                dispatch({ type: "Select Items", target: value });
            } else if (name === "deleteCount") {
                dispatch({ type: "Select Items", amount: value });
            }
        }
    }

    useEffect(() => {
        // console.log(parameterValues);
    }, [parameterValues]);

    useEffect(() => {
        parameterValues.forEach((value, index) => {
            let name = "";
            if (index === 0) {
                name = parameter1?.name ?? "";
            } else if (index === 1) {
                name = parameter2?.name ?? "";
            } else if (index === 2) {
                name = parameter3?.name ?? "";
            } else if (index === 3) {
                name = parameter4?.name ?? "";
            }
            updateValue(index, name, value);
        });
    }, [state.basket.length]);

    function updateActive(index: number, open: boolean) {
        if (index === 0) {
            setActive1(open);
        }
        if (index === 1) {
            setActive2(open);
        }
        if (index === 2) {
            setActive3(open);
        }
        if (index === 3) {
            setActive4(open);
        }
    }

    // useEffect(() => {
    //     console.log(activeParameters);
    // }, [JSON.stringify(activeParameters)]);

    useEffect(() => {
        setActiveParameters([active1, active2, active3, active4]);
    }, [active1, active2, active3, active4]);

    return (
        <section className="parameters">
            {[parameter1, parameter2, parameter3, parameter4].map(
                (param, index, arr) => (
                    <Parameter
                        currentMethod={state.method}
                        index={index}
                        name={param ? param.name : ""}
                        type={param ? param.type : "Hidden"}
                        defaultValue={param?.defaultValue}
                        hide={param?.hide}
                        required={param?.required}
                        min={param?.min}
                        max={param?.max}
                        updateValue={updateValue}
                        updateActive={updateActive}
                        activeParameters={activeParameters}
                        theme={state.theme}
                    />
                )
            )}
        </section>
    );
};

export default Parameters;
