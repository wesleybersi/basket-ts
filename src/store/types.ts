export interface Store {
  settings: {
    isOpen: boolean;
    theme: "Fruit" | "Veggies";
    animationDuration: number;
  };
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}
