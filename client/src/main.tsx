import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Helmet defaultTitle="Fusion Data Co - All-in-One Marketing Automation Platform" titleTemplate="%s | Fusion Data Co" />
    <App />
  </>
);
