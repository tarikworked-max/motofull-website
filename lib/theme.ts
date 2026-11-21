export const THEME_KEY = "mf-site-theme";

/**
 * Runs in <head> before paint. Light is the default theme; the page is
 * server-rendered with class "light" and only a saved "dark" choice removes it.
 */
export const themeBootScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.classList.remove("light")}catch(e){}`;
