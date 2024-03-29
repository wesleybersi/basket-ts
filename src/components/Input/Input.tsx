import { memo, useState, useEffect } from "react";
import Parameter from "./components/Parameters/Parameter";
import { allMethods } from "../../store/methods";
import { useStore } from "../../store/store";
import Method from "./components/Method/Method";
import ChangeMethod from "./components/ChangeMethodUpDown/ChangeMethod";
import { Emoji } from "../../utils/emoji/emojis";
import { useNavigate } from "react-router-dom";
import "./input.scss";
import Secondary from "../Basket/Secondary";

interface Props {}

const Input: React.FC<Props> = () => {
  const {
    set,
    loading,
    method,
    triggerSplice,
    selection,
    parameters,
    basket,
    ascendAll,
    updateParameterState,
    updateAllParameters,
    selectedIndexes,
    basketIndex,
    secondaryIndex,
    allBaskets,
  } = useStore();
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    for (const { title } of allMethods) {
      if (title === method.title) {
        setIndex(allMethods.findIndex((method) => title === method.title));
      }
      for (const [index, param] of method.parameters) {
        if (!param) continue;
        param.value = undefined;
        param.active = undefined;
      }

      const updatedBaskets = [...allBaskets];
      updatedBaskets[basketIndex] = [...basket];

      set({
        parameters: method.parameters,
        output: undefined,
        allBaskets: updatedBaskets,
        selection: {
          show: false,
          start: undefined,
          end: undefined,
          index: undefined,
          target: undefined,
          amount: undefined,
          highlight: undefined,
        },
        secondary: updatedBaskets[secondaryIndex],
        selectedIndexes: [],
        showSecondary: method.title === "concat",
      });
    }
  }, [method.title]);

  // useEffect(() => {
  //   if (triggerSplice) {
  //     // for (const [index, parameter] of parameters) {
  //     //   if (!parameter) continue;
  //     //   updateParameterState(
  //     //     index,
  //     //     parameter.value,
  //     //     parameter.active ? true : false
  //     //   );
  //     // }

  //     const updatedBasket = [...basket];
  //     const items = [];
  //     const value1 = parameters.get(2)?.value;
  //     const value2 = parameters.get(3)?.value;
  //     const index = selectedIndexes[0] ?? 0;
  //     let itemsToAdd: number[] = [];
  //     if (value1 instanceof Emoji) items.push(value1);
  //     if (value2 instanceof Emoji) items.push(value2);
  //     if (items.length === 1) itemsToAdd = [index];
  //     if (items.length === 2) itemsToAdd = [index, index + 1];

  //     updatedBasket.splice(index, 0, ...items);

  //     set({
  //       loading: true,
  //       basket: updatedBasket,
  //       itemsToAdd,
  //     });
  //   } else {
  //     set({ selection: { ...selection, show: true } });
  //   }
  // }, [triggerSplice]);

  useEffect(() => {
    if (!loading && !triggerSplice) {
      updateAllParameters();
    }
  }, [
    loading,
    basketIndex,
    parameters.get(0)?.active,
    parameters.get(1)?.active,
    parameters.get(2)?.active,
    parameters.get(3)?.active,
  ]);

  return (
    <section className="active-method">
      <div className="up-down" style={{ opacity: 0 }}>
        <ChangeMethod direction="Left" index={index} />
        {/* <ChangeMethod direction="Center" index={index} /> */}
        <ChangeMethod direction="Right" index={index} />
      </div>
      <div className="input-wrapper">
        <section className="parameters">
          {Array.from({ length: 4 }).map((_, index) => (
            <Parameter index={index} />
          ))}
        </section>

        <Method />
      </div>
      {/* <ChangeMethod direction="Right" index={index} /> */}
      <div className="up-down">
        <ChangeMethod direction="Left" index={index} />
        {/* <ChangeMethod direction="Center" index={index} /> */}
        <ChangeMethod direction="Right" index={index} />
      </div>
    </section>
  );
};

export default memo(Input);
