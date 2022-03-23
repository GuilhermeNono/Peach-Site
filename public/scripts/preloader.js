const { userResquest } = require("../../src/routes/discordAuthRoutes");

window.addEventListener("load", () => {
  const loginButton = document.querySelector(".login-button");
  const p1 = document.querySelector(".p1");
  const p2 = document.querySelector(".p2");

  if (userResquest) {
    loginButton.classList.toggle("off", true);
  } else {
    const loader = document.querySelector(".preloader");

    loader.className += " hidden";
  }
});
