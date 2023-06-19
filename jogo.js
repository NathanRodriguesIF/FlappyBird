const jogo = {}
//Parte1
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

const som_punch = new Audio();
som_punch.src = './som/punch.wav';

let animation_frame = 0;

// contexto.drawImage(sprites, larguraRecorte, alturaRec, larguraReal, alturaReal, repete)
//contexto.drawImage(sprites, 0, 0, 35, 25, 10, 50, 35, 25);
//contexto.drawImage(sprites, 0, 168, 53, 401, 100, 168, 53, 401);

function fazColisao() {
    if (jogo.flappyBird.y < 0 || jogo.flappyBird.y > 345) {
        return true;
    } else {
        return false;
    }
}

function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 35,
        altura: 25,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            )
        },
        gravidade: 0.25,
        velocidade: 0,
        frameAtual: 0,
        movimentos: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 },
            { spriteX: 0, spriteY: 26 }
        ],
        atualizaFrame() {
            if ((animation_frame % 9) === 0) {
                flappyBird.frameAtual = flappyBird.frameAtual + 1;
                flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
                flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
            }
        },
        atualiza() {
            if (fazColisao()) {
                som_punch.play();
                telaAtiva = TelaGameOver;
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
            flappyBird.atualizaFrame();
        }
    }
    return flappyBird
}
function criaFundo(){
    const fundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 276,
        altura: 204,
        x: 0,
        y: 275,
        desenha() {
            contexto.fillStyle = '#70c5ce';
            contexto.fillRect(0, 0, canvas.width, canvas.height)
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
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x + (fundo.largura - 0.5) * 2, fundo.y,
                fundo.largura, fundo.altura
            )
        },
        atualiza() {
            fundo.x = fundo.x - 0.5;
            fundo.x = fundo.x % (fundo.largura);
        }
    }
    return fundo
}
function criaChao() {
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
        },
        atualiza() {
            chao.x = chao.x - 1.5;
            chao.x = chao.x % (chao.largura / 2);
        }
    }
    return chao
}

function fazColisaoObstaculo(par) {
    if(jogo.flappyBird.x >= par.x && jogo.flappyBird.x <= par.x + jogo.canos.largura || jogo.flappyBird.x + jogo.flappyBird.largura >= par.x && jogo.flappyBird.x + jogo.flappyBird.largura <= par.x + jogo.canos.largura){
        const alturaCabeçaFlappy = jogo.flappyBird.y;
        const alturaPeFlappy = jogo.flappyBird.y + jogo.flappyBird.altura;
        const botaoCanoCeuY = par.y + jogo.canos.altura;
        const botaoCanoChaoY = par.y + jogo.canos.altura + jogo.canos.espacamentoEntreCanos;
        if (alturaCabeçaFlappy <= botaoCanoCeuY) {
            return true;
        }
        if (alturaPeFlappy >= botaoCanoChaoY) {
            return true;
        }
    }
    return false;
}
function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        ceu: {
            spriteX: 52,
            spriteY: 169,
            x: 120,
            y: -150
        },
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        pares: [],
        espacamentoEntreCanos: 100,
        desenha() {
            for(i=0; i<canos.pares.length; i++) {
                canos.ceu.x = canos.pares[i].x;
                canos.ceu.y = canos.pares[i].y;
    
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura
                )
        
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + canos.espacamentoEntreCanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                )
            }
        },
        atualiza() {
            const passou100Frames = (animation_frame % 100 === 0);
            if (passou100Frames) {
                const novoPar = {
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }
                canos.pares.push(novoPar);
            }
            for(i=0; i<canos.pares.length; i++) {
                const par = canos.pares[i];
                par.x = par.x -2;
                if(fazColisaoObstaculo(par)) {
                    som_punch.play();
                    telaAtiva = TelaGameOver;
                    return;
                }
            }
        }
    }
    return canos
}


//Parte2
const inicio = {
    spriteX: 133,
    spriteY: 0,
    largura: 186,
    altura: 152,
    x: 75,
    y: 130,
    desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura
        )
    }
}

const gameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,
    desenha() {
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura
        )
    }
}
function criaPlacar() {
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'left';
            contexto.fillStyle = 'white';
            contexto.fillText("Pontuação: " + placar.pontos, 25, 35)
        },
        atualiza(){
            const intervaloDeFrames = 20;
            const passouOIntervalo = animation_frame % intervaloDeFrames === 0;
            if(passouOIntervalo){
                placar.pontos = placar.pontos + 1;
            }
        }
    }
    return placar
}


const TelaInicio = {
    desenha() {
        jogo.fundo.desenha();
        jogo.chao.desenha();
        jogo.flappyBird.desenha();
        inicio.desenha();
    },
    click() {
        telaAtiva = TelaJogo;
    }
}
const TelaJogo = {
    desenha() {
        jogo.fundo.desenha();
        jogo.fundo.atualiza();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.chao.desenha();
        jogo.chao.atualiza();
        jogo.flappyBird.desenha();
        jogo.flappyBird.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
    },
    click(){
        jogo.flappyBird.pula();
    }
}
const TelaGameOver = {
    desenha(){
        gameOver.desenha();
    },
    click(){
        inicializa();
        telaAtiva = TelaJogo;
    }
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva() {
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);



function loop() {
    telaAtiva.desenha();
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}

function inicializa(){
    jogo.flappyBird = criaFlappyBird();
    jogo.fundo = criaFundo();
    jogo.chao = criaChao();
    jogo.canos = criaCanos();
    jogo.placar = criaPlacar();
}

inicializa()
loop();