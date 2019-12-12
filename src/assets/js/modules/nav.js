const navMenu = document.querySelector(".js-navmenu");
const menuButtons = document.querySelectorAll(".js-toggle-menu");
const activeClass = "is-active";

function init() {
    for(let i=0; i < menuButtons.length; i++) {
        let el = menuButtons[i];
        el.addEventListener("click", (event) => {
            event.preventDefault();
            navMenu.classList.toggle(activeClass);
        })
    }
}

export {
    init
}