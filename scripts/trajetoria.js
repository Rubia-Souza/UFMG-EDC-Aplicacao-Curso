class Trajetoria {
    #posicaoX = 0;
    #posicaoY = 0;
    #velocidadeInicial = VALOR_VELOCIDADE_INICIAL_PADRAO;
    #anguloLancamento = VALOR_ANGULO_LANCAMENTO_PADRAO;
    #gravidade = VALOR_GRAVIDADE_PADRAO;
    #velocidadeHorizontal = 0;
    #velocidadeVertical = 0;
    #velocidadeInicialHorizontal = 0;
    #velocidadeInicialVertical = 0;

    constructor(posicaoInicialX, posicaoInicialY, velocidadeInicial, anguloLancamento, gravidade) {
        this.setPosicaoX(posicaoInicialX);
        this.setPosicaoY(posicaoInicialY);
        this.setVelocidadeInicial(velocidadeInicial);
        this.setAnguloLancamento(anguloLancamento);
        this.setGravidade(gravidade);
    }

    atualizarPosicao(timeStep) {
        // Velocidade horizontal é constante
        const atualizacaoHorizontal = this.getVelocidadeHorizontal();
        const atualizacaoVertical = this.getVelocidadeVertical() - this.getGravidade() * timeStep;

        const novaPosicaoX = this.getPosicaoX() + atualizacaoHorizontal * timeStep;
        const novaPosicaoY = this.getPosicaoY() + this.getVelocidadeVertical() * timeStep;

        this.setPosicao(novaPosicaoX, novaPosicaoY);
        this.setVelocidadeHorizontal(atualizacaoHorizontal);
        this.setVelocidadeVertical(atualizacaoVertical);
    }

    //#region .: Setters :.

    setPosicaoX(posicaoX) {
        this.#posicaoX = posicaoX;
    }

    setPosicaoY(posicaoY) {
        this.#posicaoY = posicaoY;
    }

    setPosicao(posicaoX, posicaoY) {
        this.setPosicaoX(posicaoX);
        this.setPosicaoY(posicaoY);
    }

    setVelocidadeHorizontal(velocidadeHorizontal) {
        this.#velocidadeHorizontal = velocidadeHorizontal;
    }

    setVelocidadeVertical(velocidadeVertical) {
        this.#velocidadeVertical = velocidadeVertical;
    }

    setAnguloLancamento(anguloLancamento) {
        this.#anguloLancamento = anguloLancamento;
        this.calcularVelocidadesIniciais();
    }

    setVelocidadeInicial(velocidadeInicial) {
        this.#velocidadeInicial = velocidadeInicial;
        this.calcularVelocidadesIniciais();
    }

    calcularVelocidadesIniciais() {
        this.#setVelocidadeInicialHorizontal(this.getVelocidadeInicial());
        this.#setVelocidadeInicialVertical(this.getVelocidadeInicial());

        this.setVelocidadeHorizontal(this.getVelocidadeInicialHorizontal());
        this.setVelocidadeVertical(this.getVelocidadeInicialVertical());
    }

    #setVelocidadeInicialHorizontal(velocidadeInicial) {
        this.velocidadeInicialHorizontal = velocidadeInicial * Math.cos(parseGrausParaRadianos(this.getAnguloLancamento()));
    }

    #setVelocidadeInicialVertical(velocidadeInicial) {
        this.velocidadeInicialVertical = velocidadeInicial * Math.sin(parseGrausParaRadianos(this.getAnguloLancamento()));
    }

    setGravidade(gravidade) {
        this.gravidade = gravidade;
    }

    //#endregion

    //#region .: Getters :.

    getPosicaoX() {
        return this.#posicaoX;
    }

    getPosicaoY() {
        return this.#posicaoY;
    }

    getAnguloLancamento() {
        return this.#anguloLancamento;
    }

    getGravidade() {
        return this.#gravidade;
    }

    getVelocidadeInicial() {
        return this.#velocidadeInicial;
    }

    getVelocidadeHorizontal() {
        return this.#velocidadeHorizontal;
    }

    getVelocidadeInicialHorizontal() {
        return this.velocidadeInicialHorizontal;
    }

    getVelocidadeVertical() {
        return this.#velocidadeVertical;
    }

    getVelocidadeInicialVertical() {
        return this.velocidadeInicialVertical;
    }

    //#endregion
}
