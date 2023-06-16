// import { useContext, memo, useState, useRef, useEffect, Children } from "react";
// import { BasketContext } from "../../contexts/BasketContext";
// import useCSSProperty from "../../hooks/useCSSProperty";
// import { Emoji } from "../../utils/emoji/emojis";
// import { useStore } from "../../store/store";
// import { RiAddFill as IconAdd } from "react-icons/ri";

// import { IoMdClose as IconTarget } from "react-icons/io";
// import "./basket.scss";

// import audioPop01 from "../../assets/audio/pop_01.wav";
// import audioPop02 from "../../assets/audio/pop_02.wav";
// import audioPop03 from "../../assets/audio/pop_03.wav";
// import audioPop04 from "../../assets/audio/pop_04.wav";
// import audioPop05 from "../../assets/audio/pop_05.wav";
// import audioPop06 from "../../assets/audio/pop_06.wav";

// const audioPops = [
//   audioPop01,
//   audioPop02,
//   audioPop03,
//   audioPop04,
//   audioPop05,
//   audioPop06,
// ];

// const Basket: React.FC = () => {
//   const { settings } = useStore();
//   const { animationDuration: duration } = settings;
//   const { state, dispatch } = useContext(BasketContext);
//   const basketRef = useRef<HTMLUListElement | null>(null);

//   //Animation speeds 100, 250, 500
//   //Turtle, Normal, Rabbit
//   const [animationOffset, setAnimationOffset] = useState<string>("0");
//   const [allBaskets, setAllBaskets] = useState<Emoji[][]>([[...state.basket]]);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   useCSSProperty(basketRef.current, "--animation-offset", animationOffset);

//   function itemStyling(item: HTMLElement, state: "Zero" | "Normalize") {
//     if (state === "Zero") {
//       item.style.animation = "";
//       item.style.fontSize = "0";
//       item.style.flex = "0";
//       item.style.opacity = "0";
//       item.style.margin = "0";
//     } else if (state === "Normalize") {
//       item.style.animation = "";
//       item.style.fontSize = "var(--itemFont)";
//       item.style.flex = "1";
//       item.style.opacity = "1";
//     }
//   }

//   function normalizeAll(animation?: boolean) {
//     if (!basketRef.current) {
//       return;
//     }
//     const children = basketRef.current.children.length;
//     [...new Array(children)].forEach((_, index) => {
//       if (basketRef.current) {
//         const child = basketRef.current.children[index] as HTMLElement;
//         if (!animation) {
//           itemStyling(child, "Normalize");
//         } else {
//           setAnimationOffset("0");
//           child.style.animation = `addItem ${duration}ms ease`;
//           child.addEventListener("animationend", end);
//           function end() {
//             itemStyling(child, "Normalize");
//             child.removeEventListener("animationend", end);
//           }
//         }
//       }
//     });
//   }

//   function playPopSound() {
//     const pop = new Audio(
//       audioPops[Math.floor(Math.random() * audioPops.length)]
//     );
//     pop.volume = 0.25;
//     pop.play();
//   }

//   useEffect(() => {
//     //Sees when items need to be added to the basket. And animates them appropriately.
//     if (
//       !state.itemsToAdd ||
//       !basketRef.current ||
//       !state.loading ||
//       state.itemsToRemove.length !== 0
//     ) {
//       return;
//     }
//     if (state.method === "Splice" && !state.spliceTrigger) {
//       return;
//     }

//     const noItems = state.itemsToAdd.length === state.basket.length;

//     // Normalize original items

//     if ((!noItems && state.method === "Splice") || state.method === "Unshift") {
//       let count = 0;
//       for (const index of state.itemsToAdd) {
//         if (index === basketRef.current.children.length - 1 - count) {
//           continue;
//         }
//         const child = basketRef.current.children[
//           basketRef.current.children.length - 1 - count
//         ] as HTMLElement;
//         itemStyling(child, "Normalize");
//         count++;
//       }
//     }

//     function animationOffset() {
//       if (state.method === "Push") {
//         setAnimationOffset("1rem");
//       } else if (state.method === "Unshift") {
//         setAnimationOffset("-1rem");
//       }
//     }
//     setAnimationOffset("0");
//     let accumulator = 0;

//     for (const index of state.itemsToAdd) {
//       const child = basketRef.current.children[index] as HTMLElement;
//       if (!child) {
//         return;
//       }
//       child.style.flex = "0";
//       itemStyling(child, "Zero");

//       if (accumulator === 0) {
//         if (noItems) {
//           console.log("NO ITEMS");
//           setAnimationOffset("0");
//           setTimeout(() => {
//             animationOffset();
//           }, duration);
//         } else {
//           animationOffset();
//         }
//       }

//       child.addEventListener("animationend", end);
//       if (state.method !== "Splice") {
//         child.style.animation = `addItem ${duration}ms ease ${accumulator}ms`;
//         accumulator += duration;
//       } else {
//         child.style.animation = `spliceItemAdd ${duration * 2}ms ease`;
//       }

//       function end() {
//         itemStyling(child, "Normalize");
//         playPopSound();
//         if (index === state.itemsToAdd[state.itemsToAdd.length - 1]) {
//           dispatch({ type: "Items Added" });
//         }
//         child.removeEventListener("animationend", end);
//       }
//     }
//   }, [state.itemsToAdd, state.spliceTrigger]);

//   useEffect(() => {
//     if (!state.itemsToReplace || !basketRef.current || !state.loading) {
//       return;
//     }
//     let accumulator = 0;
//     let fillDuration = duration / 2;
//     let count = 0;
//     for (const { index, replacement } of state.itemsToReplace) {
//       setTimeout(() => {
//         dispatch({ type: "Replace Item", index, replacement });
//         playPopSound();
//         count++;
//         if (count === state.itemsToReplace.length) {
//           dispatch({ type: "Items Replaced" });
//         }
//       }, accumulator);
//       accumulator += fillDuration;
//     }
//   }, [state.itemsToReplace]);

//   useEffect(() => {
//     //Sees when items need to be removed from array, and animates them appropriately.
//     if (!state.itemsToRemove || !basketRef.current || !state.loading) {
//       return;
//     }
//     let accumulator = 0;
//     let count = 0;
//     for (const index of state.itemsToRemove) {
//       const child = basketRef.current.children[index] as HTMLElement;
//       if (!child) {
//         return;
//       }
//       itemStyling(child, "Normalize");
//       child.addEventListener("animationend", end);

//       if (state.method === "Splice") {
//         child.style.animation = `spliceItemRemove ${duration * 2}ms ease`;
//       } else {
//         child.style.animation = `removeItem ${duration}ms ease ${accumulator}ms`;
//       }

//       // accumulator += duration;
//       function end() {
//         itemStyling(child, "Zero");
//         playPopSound();
//         count++;
//         if (count === state.itemsToRemove.length) {
//           dispatch({ type: "Items Removed" });
//         }

//         child.removeEventListener("animationend", end);
//       }
//     }
//   }, [state.itemsToRemove]);

//   useEffect(() => {
//     console.log("LOADING:", state.loading);
//     if (!state.loading && state.itemsToReplace.length === 0) {
//       const baskets = [...allBaskets];
//       baskets[currentIndex] = [...state.basket];
//       setAllBaskets(baskets);
//       normalizeAll();
//     }

//     if (
//       state.loading &&
//       (state.method === "Includes" ||
//         state.method === "At" ||
//         state.method === "IndexOf" ||
//         state.method === "LastIndexOf")
//     ) {
//       dispatch({ type: "Method Done" });
//     }
//   }, [state.loading]);

//   useEffect(() => {
//     if (!state.loading) {
//       normalizeAll(true);
//     }
//   }, [currentIndex]);

//   return (
//     <section className="basket-wrapper">
//       <div className="basket-header">
//         <p>const basket =</p>
//         <div className="basket-picker">
//           {allBaskets.map((basket, index) => (
//             <button
//               style={
//                 currentIndex === index
//                   ? {
//                       backgroundColor:
//                         basket.length === 20 ? "var(--red)" : "var(--blue)",
//                       color: "#222",
//                       fontWeight: 600,
//                     }
//                   : {
//                       background: "#22222211",
//                       color: "#555",
//                     }
//               }
//               onClick={
//                 !state.loading
//                   ? () => {
//                       if (!basketRef.current) {
//                         return;
//                       }
//                       const children = basketRef.current.children.length;
//                       [...new Array(children)].forEach((_, index) => {
//                         if (basketRef.current) {
//                           const child = basketRef.current.children[
//                             index
//                           ] as HTMLElement;
//                           setAnimationOffset("0");
//                           child.style.animation = `removeItem ${duration}ms ease`;
//                           child.addEventListener("animationend", end);
//                           function end() {
//                             if (!basketRef.current) {
//                               return;
//                             }
//                             if (
//                               child ===
//                               basketRef.current.children[
//                                 basketRef.current.children.length - 1
//                               ]
//                             ) {
//                               dispatch({
//                                 type: "Change Basket",
//                                 newBasket: allBaskets[index],
//                               });
//                               setCurrentIndex(index);
//                             }
//                             child.removeEventListener("animationend", end);
//                           }
//                         }
//                       });
//                     }
//                   : undefined
//               }
//             >
//               <p>{basket.length}</p>
//             </button>
//           ))}
//           <button
//             style={{ background: "#22222211", color: "#555" }}
//             onClick={
//               !state.loading && allBaskets.length < 11
//                 ? () => {
//                     setAllBaskets((prev) => [...prev, []]);
//                     dispatch({
//                       type: "Change Basket",
//                       newBasket: [],
//                     });
//                     setCurrentIndex(allBaskets.length);
//                   }
//                 : undefined
//             }
//           >
//             <IconAdd size="24px" />
//           </button>
//         </div>
//       </div>
//       <ul className="basket" ref={basketRef}>
//         {state.basket.length === 0 && <li></li>}
//         {state.basket.map((item, index) => (
//           <li className="basket-item">
//             {item.emoji}

//             {!state.loading && (
//               <>
//                 {state.selectedItems.includes(index) && (
//                   <span className="basket-item-selected" />
//                 )}
//                 {state.targetedItems.includes(index) && (
//                   <>
//                     <span className="basket-item-selected basket-item-selected-red" />{" "}
//                     <div className="basket-item-target">
//                       <IconTarget color="red" size="6rem" />
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default memo(Basket);
