// import Parameter from "./Parameter";
// import "./parameters.scss";
// import { useContext, useEffect, useState } from "react";
// import { BasketContext } from "../../../../contexts/BasketContext";
// import { Emoji } from "../../../../utils/emoji/emojis";
// import { useStore } from "../../../../store/store";

// const Parameters: React.FC = () => {
//   const { basket, method, parameters, set } = useStore();
//   const [active1, setActive1] = useState<boolean>(false);
//   const [active2, setActive2] = useState<boolean>(false);
//   const [active3, setActive3] = useState<boolean>(false);
//   const [active4, setActive4] = useState<boolean>(false);
//   const [activeParameters, setActiveParameters] = useState<boolean[]>([
//     active1,
//     active2,
//     active3,
//     active4,
//   ]);

//   function updateValue(
//     index: number,
//     name: string,
//     value: Emoji | number | null
//   ) {
//     parameterValues[index] = value;
//     set({ parameterValues: [...parameterValues] });

//     // if (typeof value === "number" || value === null) {
//     //   if (name === "index") {
//     //     dispatch({ type: "Select Items", index: value });
//     //   } else if (
//     //     name === "start" ||
//     //     (name === "fromIndex" && state.method !== "LastIndexOf")
//     //   ) {
//     //     dispatch({ type: "Select Items", start: value });
//     //   } else if (name === "fromIndex" && state.method === "LastIndexOf") {
//     //     dispatch({ type: "Select Items", start: 0, amount: value });
//     //   } else if (name === "end") {
//     //     dispatch({ type: "Select Items", end: value });
//     //   } else if (name === "target") {
//     //     dispatch({ type: "Select Items", target: value });
//     //   } else if (name === "deleteCount") {
//     //     dispatch({ type: "Select Items", amount: value });
//     //   }
//     // }
//   }

//   useEffect(() => {
//     parameterValues.forEach((value, index) => {
//       let name = "";
//       if (index === 0) {
//         name = method.parameters[0]?.name ?? "";
//       } else if (index === 1) {
//         name = method.parameters[1]?.name ?? "";
//       } else if (index === 2) {
//         name = method.parameters[2]?.name ?? "";
//       } else if (index === 3) {
//         name = method.parameters[3]?.name ?? "";
//       }
//       updateValue(index, name, value);
//     });
//   }, [basket.length]);

//   function updateActive(index: number, open: boolean) {
//     if (index === 0) {
//       setActive1(open);
//     }
//     if (index === 1) {
//       setActive2(open);
//     }
//     if (index === 2) {
//       setActive3(open);
//     }
//     if (index === 3) {
//       setActive4(open);
//     }
//   }

//   useEffect(() => {
//     setActiveParameters([active1, active2, active3, active4]);
//   }, [active1, active2, active3, active4]);

//   return (
//     <section className="parameters">
//       {Array.from({ length: 4 }).map((param, index) => (
//         <Parameter
//           index={index}
//           name={param ? param.name : ""}
//           type={param ? param.type : "Hidden"}
//           defaultValue={param?.default}
//           hide={param?.hide}
//           required={param?.required}
//           updateValue={updateValue}
//           updateActive={updateActive}
//           activeParameters={activeParameters}
//         />
//       ))}
//     </section>
//   );
// };

// export default Parameters;
