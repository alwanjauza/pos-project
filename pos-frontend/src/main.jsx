import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterManagement from "./routes/RouterManagement.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterManagement />
  </StrictMode>
);
