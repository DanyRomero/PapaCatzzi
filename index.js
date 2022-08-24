//audio
const audioCat = new Audio();
audioCat.src = "./Sounds/cat-fight.mp3";
audioCat.volume = 0.1;
audioCat.playbackRate = 2;


const audioCam = new Audio();
audioCam.src = "./Sounds/camera-flash.mp3"
audioCam.volume = 0.1;




const closeButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal");

function openToggleModal(){    
    modal.classList.add("show-modal");
}

function closeToggleModal(){
    modal.classList.remove("show-modal")
}

closeButton.addEventListener("click", ()=>{
    closeToggleModal();
    iniciarJuego();    
})

///win modal
const winButton = document.querySelector(".win-button");
const win = document.querySelector(".win");

function openToggleModalWin(){    
    win.classList.add("show-modal");
}

function closeToggleModalWin(){
    win.classList.remove("show-modal")
}

winButton.addEventListener("click", ()=>{
    closeToggleModalWin();
    iniciarJuego();
})

//////////////////////////CODIGO DE JUEGO////////////////////////////////////
//width 950
//height 713

//canvas
let lienzo = document.getElementById("lienzo")
let ctx = lienzo.getContext("2d");

//info
let camarasInfo = document.getElementById("cams");
let vidasInfo = document.getElementById("vidas");





 //imagenes
const michiImg = new Image();
michiImg.src = "./images/cat.png"
const competenciaImg = new Image();
competenciaImg.src = "./images/competencia.png"
const competencia2Img = new Image();
competencia2Img.src = "./images/competencia2.png"
const competencia3Img = new Image();
competencia3Img.src = "./images/competencia3.png"
const competencia4Img = new Image();
competencia4Img.src = "./images/competencia4.png"
const camaraImg = new Image();
camaraImg.src = "./images/camara2.png"

//michi
class Cat{
    constructor(x,y,w,h,vida,color,imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vida = vida;
        this.color= this.color
        this.imagen = imagen;
        this.score = 0;
    }

    moverDerecha(){
        if(this.x + this.w < 950){
            this.x += 20;
        } 
    }
    moverIzquierda(){
        if(this.x + this.w > 150){
            this.x -= 20;
        } 
    }
    moverArriba(){
        if(this.y + this.h > 120){
            this.y -= 20;
        }
        
    }
    moverAbajo(){
        if(this.y + this.h < 713){
            this.y += 20;
        }  
    }

    dibujarse(){
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w, this.h);
    }
    recibirDaño(){

    }
  
}

class Competencia{
    constructor(x,y,w,h,imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagen = imagen;
    }
    dibujarse(){
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
    }
}

class Camara{
    constructor(x,y,w,h,imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagen = imagen;
    }
    dibujarse(){
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
        
    }
}

//Escuhar Teclas
function teclas(michi){
    document.addEventListener("keydown", (evento) =>{
        console.log("Tecla tocada", evento.code);
        switch(evento.code) {
            case "ArrowRight":
            michi.moverDerecha();
            break;
            case "ArrowLeft":
            michi.moverIzquierda();
            break;
            case "ArrowDown":
            michi.moverAbajo();
            break;
            case "ArrowUp":
            michi.moverArriba();
            break;
           
        } 
    })
}

//Escoger cámara
let actualICam = 0;
function escogeCam(camaras) {
    let nuevoICam = Math.floor(Math.random() * camaras.length);
    while (actualICam === nuevoICam){
        nuevoICam = Math.floor(Math.random() * camaras.length);
    }
    actualICam = nuevoICam;   
}

//INICIO
function iniciarJuego(){
    const michi = new Cat(30,590,160,125,7,"violet",michiImg);
    const competencia = new Competencia(530,100,180,120,competenciaImg);
    const competencia2 = new Competencia(250,430,180,150,competencia2Img);
    const competencia3 = new Competencia(60,160,130,120,competencia3Img);
    const competencia4 = new Competencia(680,450,130,170,competencia4Img);
    const camara1= new Camara(430,250,150,120,camaraImg);
    const camara2= new Camara(50,30,150,120,camaraImg);
    const camara3= new Camara(450,500,150,120,camaraImg);
    const camara4= new Camara(780,100,150,120,camaraImg);
    const camaras = [camara1, camara2, camara3, camara4];
    const competenciasGatos = [competencia,competencia2, competencia3,competencia4];  
    
    
    teclas(michi);
    const intervalEscogeCam = setInterval(() => escogeCam(camaras), 4000);


    const intervalJuego = setInterval(()=>{
        ctx.clearRect(0,0,950,713);
        vidasInfo.innerHTML = michi.vida;
        camarasInfo.innerHTML = michi.score;

        michi.dibujarse();
        competenciasGatos.forEach((gato)=>{
            gato.dibujarse();
           if(
                michi.x + michi.w >= gato.x &&
                michi.y <= gato.y + gato.h &&
                michi.y + michi.h >= gato.y &&
                michi.x <= gato.x + gato.w
            ){
                audioCat.play();
                michi.vida -= 1;
                michi.x = 30;
                michi.y = 590;
            }

            if (michi.vida <= 0){
                clearInterval(intervalJuego);
                openToggleModal();
            }

            if(
                michi.x + michi.w >= camaras[actualICam].x &&
                michi.y <= camaras[actualICam].y + camaras[actualICam].h &&
                michi.y + michi.h >= camaras[actualICam].y &&
                michi.x <= camaras[actualICam].x + camaras[actualICam].w
            ){
                audioCam.play();
                michi.score += 1;
                escogeCam(camaras);
            
            }

            if(michi.score >= 5){
                clearInterval(intervalJuego);
                console.log("Ganaste!")
                openToggleModalWin();
            }
        })
        camaras[actualICam].dibujarse();
    },1000/30)

    
}

iniciarJuego();

