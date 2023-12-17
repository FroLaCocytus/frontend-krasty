import { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import DocumentStore from "./store/DocumentStore";
import MerchandiseStore from "./store/MerchandiseStore";


export const Context = createContext(null);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      documentStore: new DocumentStore(),
      merchandise: new MerchandiseStore()
  }}>
    <App />
  </Context.Provider>
);
