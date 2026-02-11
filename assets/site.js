(function () {
  const KEY = "solocloser-legal-lang";

  function detectSystemLang() {
    const lang = (navigator.language || "en").toLowerCase();
    return lang.startsWith("zh") ? "zh" : "en";
  }

  function getPreferredLang() {
    const saved = localStorage.getItem(KEY);
    if (saved === "zh" || saved === "en") {
      return saved;
    }
    return detectSystemLang();
  }

  function setLang(lang) {
    const nodes = document.querySelectorAll("[data-lang]");
    nodes.forEach((node) => {
      node.classList.toggle("active", node.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });

    const htmlLang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.setAttribute("lang", htmlLang);
    localStorage.setItem(KEY, lang);
  }

  function bindButtons() {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang-btn");
        if (lang === "zh" || lang === "en") {
          setLang(lang);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindButtons();
    setLang(getPreferredLang());
  });
})();
