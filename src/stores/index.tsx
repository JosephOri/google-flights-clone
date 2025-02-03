import { createContext, useContext } from "react";
import ThemeStore from "./themeStore";
import FlightStore from "./flightStore";

class RootStore {
  themeStore: ThemeStore;
  flightStore: FlightStore;

  constructor() {
    this.themeStore = new ThemeStore();
    this.flightStore = new FlightStore();
  }
}

const RootStoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = new RootStore();
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error("useStore must be used within a StoreProvider");
  return store;
};