import "./index.scss";
import { renderPresentation } from "./components/presentation/presentation.js";

const rootElement = document.getElementById("root");
const pageElement = document.createElement("main");

rootElement.appendChild(pageElement);

renderPresentation();
