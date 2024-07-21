const trajetoria = new Trajetoria(0, 0, VALOR_VELOCIDADE_INICIAL_PADRAO, VALOR_ANGULO_LANCAMENTO_PADRAO, VALOR_GRAVIDADE_PADRAO);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tempoAtualizacao = VALOR_TEMPO_ATUALIZACAO_PADRAO;

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharProjetil(posicaoX, posicaoY) {
    context.beginPath();
    context.arc(posicaoX, canvas.height - posicaoY, 5, 0, 2 * Math.PI);
    context.fillStyle = COR_PROJETIL;
    context.fill();
}

function simularProjetil() {
    clearCanvas();

    if(trajetoria.getPosicaoY() < 0) {
        return;
    }

    trajetoria.atualizarPosicao(tempoAtualizacao);
    desenharProjetil(trajetoria.getPosicaoX(), trajetoria.getPosicaoY());
    setTimeout(simularProjetil, tempoAtualizacao * 1000);
}

const inputAngulo = document.getElementById('input-angulo');
const inputGravidade = document.getElementById('input-gravidade');
const inputVelocidade = document.getElementById('input-velocidade');

function iniciarSimulacao() {
    function configurarTrajetoria() {
        trajetoria.resetarTrajetoria();

        trajetoria.setAnguloLancamento(parseFloat(inputAngulo.value));
        trajetoria.setGravidade(parseFloat(inputGravidade.value));
        trajetoria.setVelocidadeInicial(parseFloat(inputVelocidade.value));
    }   

    configurarTrajetoria();
    simularProjetil();
}

const botaoIniciar = document.getElementById('botao-iniciar');
botaoIniciar.addEventListener('click', iniciarSimulacao);
