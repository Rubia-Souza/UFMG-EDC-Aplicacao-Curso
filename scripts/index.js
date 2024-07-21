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
    context.arc(posicaoX, canvas.height - posicaoY, 9, 0, 2 * Math.PI);
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

function configurarNaveMouse() {
    const iconeMouse = document.getElementById('icone-mouse');
    iconeMouse.style.transform = `rotate(${-inputAngulo.value}deg)`;

    let numeroNave = Math.floor(Math.random() * 24);
    if(numeroNave < 10) {
        iconeMouse.src = `./imgs/naves/ship_000${numeroNave}.png`;
    }
    else {
        iconeMouse.src = `./imgs/naves/ship_00${numeroNave}.png`;
    }

    canvas.addEventListener('mousemove', (event) => {
        iconeMouse.style.display = 'block';
    
        const posicaoX = event.clientX - iconeMouse.width / 2;
        const posicaoY = event.clientY - iconeMouse.height / 2;
    
        iconeMouse.style.top = `${posicaoY}px`;
        iconeMouse.style.left = `${posicaoX}px`;
    });

    canvas.addEventListener('mouseleave', () => {
        iconeMouse.style.display = 'none';
    });
    
    inputAngulo.addEventListener('input', () => {
        iconeMouse.style.transform = `rotate(${-inputAngulo.value}deg)`;
    });
}

configurarNaveMouse();
