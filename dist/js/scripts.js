const navBtn = document.querySelector(".head__nav--btn")
const navMenu = document.querySelector(".head__menu")
navBtn.addEventListener("click", function(event){
 navMenu.classList.toggle("head__menu--mobile")
})

window.addEventListener("resize", function(event){
    if(window.innerWidth > 768){
        navMenu.classList.remove("head__menu--mobile")
    }
})