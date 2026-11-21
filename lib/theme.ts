export const THEME_KEY = "mf-site-theme";

/** Runs in <head> before paint so a saved light theme never flashes dark. */
export const themeBootScript = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.classList.add("light")}catch(e){}`;
