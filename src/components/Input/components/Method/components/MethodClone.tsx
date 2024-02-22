import styles from "./name.module.scss";
const MethodClone = ({ stringValue }: { stringValue: string }) => {
  return <div className={styles.name}>{stringValue}</div>;
};

export default MethodClone;
