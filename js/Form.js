class Form {
  constructor() {
    this.botao = createButton ("PLAY");
    this.titulo = createImg ("assets/TITULO.png");
    this.mensagem = createElement ("h2");
    this.entrada = createInput ("").attribute("placeholder","Username");
  }

position (){
  this.botao.position(width/2-115,height/2+50);
  this.titulo.position(300,300);
  this.mensagem.position(width/2-420,height/2);
  this.entrada.position(width/2-130,height/2-70);
}

style (){
  this.botao.class("customButton");
  this.titulo.class("gameTitle");
  this.mensagem.class("greeting");
  this.entrada.class("customInput");
}

display (){
  this.position();
  this.style();
  
  this.pressButton();
}

pressButton(){
  this.botao.mousePressed(()=>{
    this.botao.hide();
    this.entrada.hide();
    
    var mess = "Esperando outros jogadores"
    this.mensagem.html(mess);
  
    contagem += 1
    
    jogador.nome = this.entrada.value();
    jogador.indice = contagem;
    jogador.criarJogador();
    jogador.atualizar(contagem);
  
  })
}

hide (){
  this.mensagem.hide ();
  this.botao.hide ();
  this.entrada.hide ();
  this.titulo.hide();
}

}


