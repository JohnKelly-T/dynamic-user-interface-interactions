import { setupDropdown } from "@johnkelly-t/dropdown-menu";
import "./styles/reset.css";
import "./styles/global.css";


let dropdowns = document.querySelectorAll('.dropdown-trigger');

setupDropdown(dropdowns[0], "hover");
setupDropdown(dropdowns[1], "hover", "center");
setupDropdown(dropdowns[2], "hover", "right");