import "./style.css";
import { generate_home } from "./generate_home_page";
import { generate_menu } from "./generate_menu_page";
import { generate_about } from "./generate_about_page";

generate_home();

let home_a = document.querySelector("#nav-home");
home_a.addEventListener("click", generate_home);

let menu_a = document.querySelector("#nav-menu");
menu_a.addEventListener("click", generate_menu);

let about_a = document.querySelector("#nav-about");
about_a.addEventListener("click", generate_about);
