// Velocidade em m/s^2
const gravidade = 9.81;

// Deve ser dado em (s)
const timeStep = 0.01;

let posicaoX = 0;
let posicaoY = 0;

// Velocidade inicial em (m/s)
const velocidadeInicial = 30;

// Angulo em graus
const anguloLancamento = 45;

function parseGrausParaRadianos(angulo) {
  return (angulo * Math.PI) / 180;
}

// Velocidade horizontal (m/s)
let velocidadeInicialEixoX = velocidadeInicial * Math.cos(parseGrausParaRadianos(anguloLancamento));

// Velocidade vertical (m/s)
let velocidadeInicialEixoY = velocidadeInicial * Math.sin(parseGrausParaRadianos(anguloLancamento));

let velocidadeHorizontalX = velocidadeInicialEixoX;
let velocidadeVerticalY = velocidadeInicialEixoY;

function moverProjetil() {
    // Velocidade horizontal constante
    let atualizacaoVelocidadeHorizontalX = velocidadeHorizontalX;

    // Velocidade vertical altera devido a gravidade
    let atualizacaoVelocidadeVerticalY = velocidadeVerticalY - gravidade * timeStep;

    let novaPosicaoX = posicaoX + atualizacaoVelocidadeHorizontalX * timeStep;
    let novaPosicaoY = posicaoY + velocidadeVerticalY * timeStep;

    posicaoX = novaPosicaoX;
    posicaoY = novaPosicaoY;
    velocidadeHorizontalX = atualizacaoVelocidadeHorizontalX;
    velocidadeVerticalY = atualizacaoVelocidadeVerticalY;
}

function simularMovimento() {
    while(posicaoY >= 0) {
        moverProjetil();
        console.log(`Position: (${posicaoX.toFixed(2)}, ${posicaoY.toFixed(2)})m`);
    }
}

simularMovimento();
