import "./circles.scss";

interface Props {
  amount: number;
}

const Circles: React.FC<Props> = ({ amount }) => {
  return (
    <div className="circle-container">
      {Array.from({ length: amount }).map(() => (
        <div className="circle"></div>
      ))}
    </div>
  );
};

export default Circles;
