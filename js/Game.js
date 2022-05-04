class Game {
  constructor() {this.botao = createButton ("RESET");
    this.mov = false
    this.direcao = false
}
  
posicao (){
    this.botao.position(width/2-900,height/2+400);
    this.botao.class("customButton");
  }
  
pressButton(){
  this.botao.mousePressed(()=>{
  database.ref ("/").set ({
    contagem:0,estado:0,players:{},rank:0
 })
  window.location.reload(); 
  })

}
  
  
  
  
  
  start (){
    formulario = new Form ()
    formulario.display ()
    
    jogador = new Player ()
    contagem = jogador.pegar()

    car1 = createSprite (1200,850);
    car1.scale = 0.13
    car1.addImage (carro1);
    car2 = createSprite (650,850);
    car2.scale = 0.13
    car2.addImage (carro2);
    kart = [car1,car2];

    gGasolina = new Group ();
    gMoeda = new Group ();
    gObstaculo1 = new Group ();
    gObstaculo2 = new Group ();
    
    this.controle (gGasolina,5,gasolina,0.03);
    this.controle (gMoeda,5,moeda,0.08);
    this.controle (gObstaculo1,10,obstaculo1,0.04);
    this.controle (gObstaculo2,10,obstaculo2,0.05);
  }

pegar(){
  var pegarValor = database.ref ("estado");
  pegarValor.on ("value",function(data){
  estado = data.val ()
  })
}

atualizar(dado){
  database.ref("/").update({
    estado:dado
    })
  
}

jogar (){
  this.esconder ();
  Player.pegarInf();
  image (pista,0,-height*5,width,height*6);
  
  jogador.pegarRank();
  
  this.movimento ();
  
  var pegarMatriz = 0

  for (var passarJogadores in InformacaoPlayer){
    pegarMatriz += 1
    var x
    var y
    x = InformacaoPlayer [passarJogadores].posx
    y = height-InformacaoPlayer [passarJogadores].posy - 100
    kart [pegarMatriz-1].position.x = x
    kart [pegarMatriz-1].position.y  = y
  
  if (pegarMatriz == jogador.indice){
    this.colisao (pegarMatriz);
    this.pegarMoeda (pegarMatriz);
    this.pegarGasolina (pegarMatriz);
    this.pegarObstaculo1 (pegarMatriz);
    this.pegarObstaculo2 (pegarMatriz);
    fill ("green");
    ellipse (x,y,150,150);
  if (kart[pegarMatriz-1].position.y <= 480 && kart[pegarMatriz-1].position.y >= -4220){
    camera.position.y = kart [pegarMatriz-1].position.y
  }
  
  }
  }
  
  this.posicao();
  
  this.pressButton();
  
  const finishLine = height*6-50
  
  if (jogador.posy >= finishLine){
    estado = 2
    jogador.rank += 1
    jogador.atualizarRank (jogador.rank);
    jogador.atualizarPos ();
    this.Venceu();  
  }

  this.Vida ();
  this.Gasolina ();

  drawSprites()
}


esconder (){
  formulario.hide()
  formulario.titulo.position (300,100)
}


movimento (){
  if (keyDown("UP")){
    jogador.posy += 5
    jogador.atualizarPos()
    this.mov = true
  }
  if (keyDown("RIGHT")&& jogador.posx<=1265){
    jogador.posx += 5
    jogador.atualizarPos()
    this.mov = true
    this.direcao = false
  }
  if (keyDown("LEFT") && jogador.posx>=565){
    jogador.posx -= 5
    jogador.atualizarPos()
    this.mov = true
    this.direcao = true
  }
  if (keyDown("DOWN")){
    jogador.posy -= 5
    jogador.atualizarPos()
    this.mov = true
  }

}  

controle (grupo,numero,imagem,escala){
  for (var i=0;i<numero;i++) {
    var x = random (565,1265);
    var y = random (-height*4.5,height-400);
    var sprite = createSprite (x,y);
    sprite.addImage ("sprite",imagem);
    sprite.scale = escala
    grupo.add (sprite);
  }

}

pegarGasolina (indice){
  kart [indice-1].overlap (gGasolina,function (collector,collected){
    collected.remove ();
    jogador.gasolina = 200
    jogador.atualizarPos ();
    });
    this.perderGasolina ();
}

pegarMoeda (indice){
  kart [indice-1].overlap (gMoeda,function (collector,collected){
    collected.remove ();
    jogador.moeda += 10
    jogador.atualizarPos ()
  });
}

pegarObstaculo1 (indice){
  kart [indice-1].overlap (gObstaculo1,function (collector,collected){
    collected.remove ();
    jogador.vida -= 30
    jogador.atualizarPos ();
  });
    this.perderVida(indice)
}

pegarObstaculo2 (indice){
  kart [indice-1].overlap (gObstaculo2,function (collector,collected){
    collected.remove ();
    jogador.vida -= 30
    jogador.atualizarPos ();
  });
    this.perderVida(indice)
}

Venceu (){
  swal ({
    title:"VOCÊ GANHOU",
    text:"Parabéns",
    imageUrl:"https://i.pinimg.com/236x/1c/f1/a0/1cf1a0bcc2f58d976aa1b10da7d57044.jpg",
    imageSize:"200x200",
    confirmButton:"Vai embora"
  })
}

Perdeu(){
  swal ({
    title:"VOCÊ PERDEU",
    text:"Estou desapontado ",
    imageUrl:"https://w7.pngwing.com/pngs/75/932/png-transparent-computer-icons-youtube-youtube-text-logo-smiley-thumbnail.png",
    imageSize:"200x200",
    confirmButton:"Vai embora"
  })
}

Vida (){
  image (Life,width/2-785,height-jogador.posy-230,40,40);
  fill (235,64,52);
  rect (width/2-780,height-jogador.posy-450,30,jogador.vida);
}

Gasolina (){
  image (gasolina,width/2+725,height-jogador.posy-230,40,40);
  fill (255,253,140);
  rect (width/2+737,height-jogador.posy-440,30,jogador.gasolina);
}

perderGasolina (){
  if (jogador.gasolina >= 0 && this.mov == true){
    jogador.gasolina -= 0.5
  }

  if (jogador.gasolina <= 0){
    estado = 2
    this.Perdeu()
  }

}
perderVida (indice){
  if (jogador.vida <= 0){
    this.Perdeu()
    kart[indice-1].addImage ("explosao",explosao);
    kart.changeImage ("explosao");
  }
}  

colisao(indice){
  if (indice == 1){
    if (kart [indice-1].collide(kart[1])){
      if (jogador.vida > 0){
        jogador.vida -= 50 
      }
        if (this.direcao == true){
        jogador.posx += 150
      }
        else {
          jogador.posx -=150
        }
          jogador.atualizarPos ();
      }
  }
    else {
      if (kart [indice-1].collide(kart[0])){
        if (jogador.vida > 0){
          jogador.vida -= 50 
        }
          if (this.direcao == true){
          jogador.posx += 150
        }
          else {
            jogador.posx -=150
          }
            jogador.atualizarPos ();
        }
    }   
}

}

