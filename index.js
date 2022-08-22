
//width 950
//height 713

//canvas
let lienzo = document.getElementById("lienzo")
let ctx = lienzo.getContext("2d");

//info
let camarasInfo = document.getElementById("cams");
let vidasInfo = document.getElementById("vidas");


//boton inicio
let botonIniciar = document.getElementsByTagName("button")[0];
botonIniciar.addEventListener("click", () =>{
   console.log("a jugar!")
} ) 

 //imagenes
const michiImg = new Image();
michiImg.src = "/images/cat.png"
const competenciaImg = new Image();
competenciaImg.src = "/images/competencia.png"
const competencia2Img = new Image();
competencia2Img.src = "/images/competencia2.png"
const camaraImg = new Image();
camaraImg.src = "/images/camara2.png"

//michi
class Cat{
    constructor(x,y,w,h,vida,color,imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vida = vida;
        this.color= color;
        this.imagen = imagen;
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
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w, this.h);
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
        ctx.fillStyle = "orange";
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
        ctx.fillStyle = "yellow";
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
    const michi = new Cat(30,590,150,120,7,"violet",michiImg);
    const competencia = new Competencia(550,80,160,150,competencia2Img);
    const competencia2 = new Competencia(700,170,150,90,competenciaImg);
    const competencia3 = new Competencia(240,430,160,150,competencia2Img);
    const competencia4 = new Competencia(680,550,150,90,competenciaImg);
    const camara1= new Camara(430,250,150,120,camaraImg);
    const camara2= new Camara(60,30,150,120,camaraImg);
    const camara3= new Camara(450,500,150,120,camaraImg);
    const camara4= new Camara(780,100,150,120,camaraImg);
    const camaras = [camara1, camara2, camara3, camara4];
    const competenciasGatos = [competencia,competencia2, competencia3,competencia4];  
    
    
    teclas(michi);
    setInterval(() => escogeCam(camaras), 4000);


    setInterval(()=>{
        ctx.clearRect(0,0,950,713);
        vidasInfo.innerHTML = michi.vida;
        michi.dibujarse();
        competenciasGatos.forEach((gato)=>{
            gato.dibujarse();
            console.log(gato);

            if(michi.x + michi.w >= gato.x && (michi.y >= gato.y + gato.h) ){
                console.log("vida menos")
                alert("");
            }

        })
        
        camaras[actualICam].dibujarse();

      


    },1000/30)
}

iniciarJuego();
