const trajetoria = new Trajetoria(0, 0, VALOR_VELOCIDADE_INICIAL_PADRAO, VALOR_ANGULO_LANCAMENTO_PADRAO, VALOR_GRAVIDADE_PADRAO);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tempoAtualizacao = VALOR_TEMPO_ATUALIZACAO_PADRAO;
var intervaloSimulacao = null;

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharProjetil(posicaoX, posicaoY) {
    context.beginPath();
    context.arc(posicaoX, canvas.height - posicaoY, 5, 0, 2 * Math.PI);
    context.fillStyle = COR_PROJETIL;
    context.fill();
}

function getPosicaoMouse(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return { x, y };
}

function simularProjetil() {
    clearCanvas();

    if(trajetoria.getPosicaoY() < 0) {
        return;
    }

    trajetoria.atualizarPosicao(tempoAtualizacao);
    desenharProjetil(trajetoria.getPosicaoX(), trajetoria.getPosicaoY());
    intervaloSimulacao = setTimeout(simularProjetil, tempoAtualizacao * 100);
}

const inputAngulo = document.getElementById('input-angulo');
const inputGravidade = document.getElementById('input-gravidade');
const inputVelocidade = document.getElementById('input-velocidade');

canvas.addEventListener('click', (event) => {
    if(intervaloSimulacao) {
        clearTimeout(intervaloSimulacao);
    }

    const { x, y } = getPosicaoMouse(canvas, event);
    
    trajetoria.resetarTrajetoria();
    trajetoria.setPosicao(x, canvas.height - y);
    trajetoria.setAnguloLancamento(parseFloat(inputAngulo.value));
    trajetoria.setGravidade(parseFloat(inputGravidade.value));
    trajetoria.setVelocidadeInicial(parseFloat(inputVelocidade.value));

    simularProjetil();
});
