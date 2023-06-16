export interface Store {
  settings: {
    isOpen: boolean;
    animationDuration: number;
    theme: "Fruit" | "Veggies";
  };
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}
