const audio = new Audio();
audio.src = "./Sounds/CatWalk.mp3";
audio.volume = 0.1;
audio.play();


const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
    audio.play();
    
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
        
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

