class Player {
  constructor() {
    this.nome = null
    this.indice = null
    this.posx = 0
    this.posy = 0
    this.gasolina = 200
    this.moeda = 0
    this.vida = 200
    this.rank = 0
  }
pegar (){
  
  var pegarValor = database.ref ("contagem");
  pegarValor.on ("value",data => {
  contagem = data.val ()
  })

}

atualizar (dado){
  
  database.ref("/").update({
  contagem:dado
  })

}

criarJogador (){
  
  var familia = "players/player" + this.indice;
  if (this.indice == 1 ){
    this.posx = 1200;
  }
  
  else {
  this.posx = 650;
  
}

database.ref (familia).set ({
  nome:this.nome,posx:this.posx,posy:this.posy,
  moeda:this.moeda,
  gasolina:this.gasolina
})

}

static pegarInf (){
  var InfPlayer = database.ref ("players").on ("value",data => {
   InformacaoPlayer = data.val ();
  })

}


atualizarPos (){
  var familia = "players/player" + this.indice;
    database.ref (familia).update({
      posx:this.posx,
      posy:this.posy,
      moeda:this.moeda,
      gasolina:this.gasolina
    });

}

atualizarRank (dado){
  database.ref("/").update({
    rank:dado
    })
}

pegarRank (){
  var pegarValor = database.ref ("rank");
  pegarValor.on ("value",data => {
  this.rank = data.val ()
  })
}

}

