const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

// contexto.drawImage(sprites, larguraRecorte, alturaRec, larguraReal, alturaReal, repete)
//contexto.drawImage(sprites, 0, 0, 35, 25, 10, 50, 35, 25);
//contexto.drawImage(sprites, 0, 168, 53, 401, 100, 168, 53, 401);
function loop() {
    pintarCeu();
    fundo.desenha();
    flappyBird.desenha();
    chao.desenha();
    requestAnimationFrame(loop);
}


const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
        )
    }
}
const fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: 275,
    desenha() {
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura
        )
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            (fundo.x + fundo.largura), fundo.y,
            fundo.largura, fundo.altura
        )
    }
}
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 113,
    x: 0,
    y: 370,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        )
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
        )
    }
}
function pintarCeu() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height)
}

loop();