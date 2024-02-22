import { useEffect } from "react";
import { useStore } from "../../../../store/store";
import MethodName from "./components/MethodName";
const Method: React.FC = () => {
  const { set, loading, method, methods } = useStore();

  useEffect(() => {
    //Cleanup just in case
    set({
      itemsToAdd: [],
      itemsToProcess: [],
      itemsToRemove: [],
      itemsToReplace: [],
      spliceAdd: null,
      spliceRemove: [],
    });
  }, [method.title]);

  return (
    <div
      className="method"
      onClick={() => {
        if (!loading) methods[method.title]();
      }}
    >
      <MethodName />
    </div>
  );
};

export default Method;
