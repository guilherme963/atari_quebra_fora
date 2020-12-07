var canvas = document.getElementById("idCanvas");
var tela = canvas.getContext("2d");
var pontos = 0

tela.beginPath();

class Inimizade {

  constructor(muro_coluna, muro_linha){
    this.muro_coluna =  muro_coluna;
    this.muro_linha = muro_linha;
    this.theigh = 30; this.twidht = canvas.width / muro_linha ;


    this.muro = [];
  for(let mc=0; mc < muro_coluna ; mc++) {
    this.muro[mc] = []
    for(let ml=0; ml< muro_linha; ml++) {
          let camaleao ="#" + Math.floor(Math.random()*16777215).toString(16);
          this.muro[mc][ml] = {x: mc, y: ml, cor : camaleao , estaVivo : true };

          }
        }
      }

  check_colisao(bolaX, bolaY){
    let bX = bolaX; let bY = bolaY
    for(let c = 0; c < this.muro_coluna; c++ ){
      for(let l = 0; l < this.muro_linha; l++ ){
        var tijolo_em_particular = this.muro[c][l];

        if (bX >= tijolo_em_particular.x && bX <= tijolo_em_particular.x + 75){
          if( bY >= tijolo_em_particular.y && bY <= tijolo_em_particular.y + 30 ){

            // Tratamento da colisão

            if (tijolo_em_particular.estaVivo){
              this.muro[c][l].estaVivo = false //Veio a obito
              this.muro[c][l].cor = "#10121d"
              return true
            }
          }
        }
      }
    }
  }

  desenhar(){

    for(var c=0; c< this.muro_coluna ; c++) {
      for(var l=0; l< this.muro_linha; l++) {
        this.muro[c][l].x  = (c * (75 ));
        this.muro[c][l].y =  (l * (30 ));
        tela.beginPath();
        tela.rect((c * 75), (l * 30) ,this.twidht, this.theigh);
        tela.fillStyle = this.muro[c][l].cor
        tela.fill();
        tela.closePath();

                }
            }
        }
    }





class Bola {

  constructor(pX, pY, velocidadeB = 1) {
    this.pX = pX; this.pY = pY;
    this.direcaoX =  0; this.direcaoY = -7;
    this.vel = velocidadeB;

  }

  balistica(direcaoX,direcaoY, ){ //Movimento
    this.pX += this.direcaoX * this.vel;
    this.pY += this.direcaoY * this.vel;

    if (this.pX + this.direcaoX > canvas.width - 10 || this.pX + this.direcaoX < 10  ){this.direcaoX = this.direcaoX * -1}
    //bater na parede

    if (this.pY + this.direcaoY < 0){ //bater no teto
      this.direcaoX = 1 * Math.floor(Math.random() * 20) - 10;
      this.direcaoY = this.direcaoY * -1
    }
  }

  desenhar(){
    tela.beginPath();
    tela.arc(this.pX, this.pY, 10, 0, Math.PI*2);
    tela.fillStyle = "blue";
    tela.fill();
    tela.closePath();
  }

  sucumbir(){
    if(this.pY - 10 > canvas.height){
        this.vel = 0
    }
  }

  mudar_direcao(){
  this.direcaoY = - this.direcaoY
  this.direcaoX = this.direcaoX = 1 * Math.floor(Math.random() * 20) - 10;
  //bem simples
  }


}

class Gamer {
  constructor(pX) {
    this.pX = pX;
    this.vidas = 3
  }


  desenhar(){
    tela.beginPath();
    tela.rect(this.pX, canvas.height- 30 , 110, 10);
    tela.fillStyle = "red";
    tela.fill();
    tela.closePath();


  }

  getInput(e) {
    this.pX = e.x -300
   };


  check_colidir(bY,bX){ //Colisão

    if(this.pX <= 0){this.pX = 0}
    if(this.pX + 110>= canvas.width ){this.pX = canvas.width - 110 }

    if(bX > this.pX && bX < (this.pX + 110)){
      if(bY > canvas.height - 40){
        return true
      }
    }
  }

  pontuar(){
    pontos = pontos + Math.floor((Math.random() * 20));
    document.getElementById('placar').innerHTML = pontos +" pontos"


  }


}




var Jogador = new Gamer(440)
var Ball = new Bola(1000, 1000, 0)
var TheWall = new Inimizade(14  ,7)

function nova_bola(vidas = Jogador.vidas){
  Jogador.vidas -= 1
  document.getElementById("painel1").innerHTML = "Você tem mais "+ vidas + " vidas";

  if (Ball.pX < canvas.height){console.log("opa amigo, deixou cair alí ")}

  if (vidas >= 0){    Ball = new Bola(Jogador.pX + 55, 450 + 100, 0.5) }

  else{document.getElementById("painel1").innerHTML = "Deseculpe amigo, Vocẽ não tem mais vidas, o jogo acabou camarada";}

}

document.addEventListener("mousemove", function(e) {Jogador.getInput(e)})
function loop(){


  tela.clearRect(0,0, canvas.width, canvas.height)




  if (Jogador.check_colidir(Ball.pY + Ball.direcaoY, Ball.pX)){Ball.direcaoY = -Ball.direcaoY};
  Ball.sucumbir();
  Ball.balistica();
  if (TheWall.check_colisao(Ball.pX + Ball.direcaoX, Ball.pY + Ball.direcaoY )){
    Ball.mudar_direcao()

    Jogador.pontuar()
  }


  TheWall.desenhar();
  Ball.desenhar();
  Jogador.desenhar();

}


setInterval(loop, 10   );
