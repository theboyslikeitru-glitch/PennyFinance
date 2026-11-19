(() => {
  const key = "penny-theme";
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const apply = theme => {
    root.dataset.theme = theme;
    try { localStorage.setItem(key, theme); } catch (_) {}
    if (button) {
      const dark = theme === "dark";
      button.querySelector(".theme-icon").textContent = dark ? "☀" : "☾";
      button.querySelector(".theme-label").textContent = dark ? "Светлая тема" : "Тёмная тема";
      button.setAttribute("aria-label", dark ? "Включить светлую тему" : "Включить тёмную тему");
    }
  };
  let saved = "light";
  try { saved = localStorage.getItem(key) || "light"; } catch (_) {}
  apply(saved === "dark" ? "dark" : "light");
  button?.addEventListener("click", () => {
    button.classList.add("theme-switching");
    apply(root.dataset.theme === "dark" ? "light" : "dark");
    window.setTimeout(() => button.classList.remove("theme-switching"), 420);
  });
})();
