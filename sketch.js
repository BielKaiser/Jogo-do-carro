var canvas;
var database;
var formulario,jogador;
var playerCount;
var fundo;
var inicio;
var estado;
var contagem;
var carro1,carro2;
var pista;
var car1,car2;
var kart = []
var InformacaoPlayer;
var gasolina,obstaculo1,obstaculo2,moeda;
var gMoeda,gGasolina,gObstaculo1,gObstaculo2;
var Life
var explosao

function preload() {
  fundo = loadImage("assets/planodefundo.png");
  carro1 = loadImage ("assets/car1.png");
  carro2 = loadImage ("assets/car2.png");
  pista = loadImage ("assets/track.jpg");
  gasolina = loadImage ("assets/fuel.png");
  obstaculo1 = loadImage ("assets/obstacle1.png");
  obstaculo2 = loadImage ("assets/obstacle2.png");
  moeda = loadImage ("assets/goldCoin.png");
  Life = loadImage ("assets/life.png");
  explosao = loadImage ("assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  
  inicio = new Game ()
  inicio.pegar ()
  inicio.start ()

}

function draw() {
  background(fundo);

  if (contagem==2){
    inicio.atualizar (1);
  }
  
  if (estado==1){
    inicio.jogar()
  }

}


