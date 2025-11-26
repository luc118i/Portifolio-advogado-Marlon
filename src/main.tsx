import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { showConsoleSignature } from "./utils/consoleSignature";
showConsoleSignature();

createRoot(document.getElementById("root")!).render(<App />);
