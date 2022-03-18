let showMenu = true;
let showImage = true;

const menuSection = document.querySelector(".menu-section")
const menuToggle = menuSection.querySelector(".menu-toggle")
const logo = document.querySelector(".logo-shake")
const aboutH1 = document.querySelector(".about_text")

menuToggle.addEventListener("click", () => {

    document.body.style.overflow = showMenu ? "hidden" : "initial";

    menuSection.classList.toggle("on", showMenu);

    showMenu = !showMenu;
})

if(window.matchMedia("(max-width: 425px)").matches){

    logo.classList.toggle("off", showImage);

    aboutH1.classList.toggle("on", showImage)
    
    showImage = !showImage


}