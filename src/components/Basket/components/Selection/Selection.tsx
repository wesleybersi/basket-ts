interface Props {
  type: "red" | "blue" | "target" | "highlight";
}
const Selection: React.FC<Props> = ({ type }) => {
  // if (type === "target") return <span className="basket-item-target" />;

  if (type === "highlight")
    return (
      <span
        style={{ backgroundColor: "var(--highlight)" }}
        className="basket-item-selected"
      />
    );

  return (
    <span
      style={{
        backgroundColor:
          type === "blue" ? "var(--selection)" : "var(--deleteCount)",
      }}
      className="basket-item-selected"
    />
  );
};

export default Selection;
