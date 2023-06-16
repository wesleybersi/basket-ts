import { memo, useState, useEffect } from "react";
import Parameter from "./components/Parameters/Parameter";
import { allMethods } from "../../store/methods";
import { useStore } from "../../store/store";
import Method from "./components/Method/Method";
import ChangeMethod from "./components/ChangeMethod/ChangeMethod";

import "./input.scss";

interface Props {}

const Input: React.FC<Props> = () => {
  const { set, method } = useStore();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    for (const { title } of allMethods) {
      if (title === method.title) {
        setIndex(allMethods.findIndex((method) => title === method.title));
      }
    }
    set({ parameters: method.parameters });
  }, [method.title]);

  return (
    <section className="active-method">
      <ChangeMethod direction="Left" index={index} />
      <ChangeMethod direction="Right" index={index} />
      <div className="input-wrapper">
        <section className="parameters">
          {Array.from({ length: 4 }).map((_, index) => (
            <Parameter index={index} />
          ))}
        </section>
        <Method />
      </div>
    </section>
  );
};

export default memo(Input);
