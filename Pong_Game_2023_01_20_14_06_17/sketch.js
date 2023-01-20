//variáveis da bolinha
let x_bolinha = 250;
let y_bolinha = 200;
let diametro = 25

//velocidade da bolinha
let rapidez_x_da_bolinha = 5
let rapidez_y_da_bolinha = 5
let raio_da_bolinha = diametro / 2

//variáveis das raquetes
let x_raquete1 = 10
let y_raquete1 = 200
let tamanho_raquete1 = 70
let largura_raquete1 = 10

//variáveis do oponente
let x_raquete2 = 480
let y_raquete2 = 200
let tamanho_raquete2 = 70
let largura_raquete2 = 10
let rapidez_raquete2;
let chance_de_errar = 0;

let colidiu = false;

//placar do game
let ptos_jogador = 0;
let ptos_oponente = 0;

//Som do jogo 
let raquetada; 
let trilha;
let ponto; 

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(500, 400);
  trilha.loop()
}

function draw() {
  background(40);
  mostra_bolinha();
  movimentar_bolinha();
  verificar_colisao();
  mostrar_Raquetes(x_raquete1,y_raquete1);
  movimentar_Minha_Raquete();
  colisao_raquetes(x_raquete1,y_raquete1);
  mostrar_Raquetes(x_raquete2,y_raquete2);
  movimentar_raquete_oponente();
  colisao_raquetes(x_raquete2,y_raquete2);
  mostrar_placar();
  marcar_ptos();
  bolinhaNaoFicaPresa();
}

function mostra_bolinha(){
  circle(x_bolinha,y_bolinha,diametro);
}

function movimentar_bolinha(){
  x_bolinha += rapidez_x_da_bolinha;
  y_bolinha += rapidez_y_da_bolinha;
}

function verificar_colisao(){
  if(x_bolinha + raio_da_bolinha > width || x_bolinha - raio_da_bolinha < 0){
    rapidez_x_da_bolinha *= -1;
  }
  if( y_bolinha + raio_da_bolinha > height || y_bolinha - raio_da_bolinha < 0){
    rapidez_y_da_bolinha *= -1;
  }
}

function mostrar_Raquetes(x,y){
  rect(x,y,largura_raquete1,tamanho_raquete1)
}

function movimentar_Minha_Raquete(){
  
  if(keyIsDown(UP_ARROW)){
    y_raquete1 -= 7
}
  if(keyIsDown(DOWN_ARROW)){
    y_raquete1+= 7
  }
}

function colisao_raquetes(x,y){
   colidiu = collideRectCircle(x, y,largura_raquete1,tamanho_raquete1, x_bolinha, y_bolinha, raio_da_bolinha);
  if(colidiu){
    rapidez_x_da_bolinha *= -1
    raquetada.play();
  }
}

function movimentar_raquete_oponente(){
  velocidadeYOponente = y_bolinha -y_raquete2 - tamanho_raquete2 / 2 - 81;
  y_raquete2 += velocidadeYOponente + chance_de_errar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (ptos_oponente >= ptos_jogador) {
    chance_de_errar += 1
    if (chance_de_errar >= 39){
    chance_de_errar = 40
    }
  } else {
    chance_de_errar -= 1
    if (chance_de_errar <= 35){
    chance_de_errar = 35
    }
  }
}

function mostrar_placar(){
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(255,69,0));
  rect(100,10,40,20)
  fill(255)
  text(ptos_jogador,120,28);
  fill(color(255,69,0));
  rect(360,10,40,20)
  fill(255);
  text(ptos_oponente, 380,28) ;
 
}

function marcar_ptos(){
  if (x_bolinha > 487){
    ptos_jogador += 1;
    ponto.play();
  }
  if (x_bolinha < 11){
    ptos_oponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (x_bolinha - raio_da_bolinha < 0){
    x_bolinha = 23
    }
}






