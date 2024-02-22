import React from "react";

interface Props {
  children: JSX.Element;
}
const Parentheses: React.FC<Props> = ({ children }) => {
  return (
    <>
      <span style={{ fontFamily: "Spline Sans Mono", fontWeight: 600 }}>(</span>
      {children}
      <span style={{ fontFamily: "Spline Sans Mono", fontWeight: 600 }}>)</span>
    </>
  );
};

export default Parentheses;
