// Definindo variáveis visuais e variáveis valores
const state ={
    view: {
        //No HTML pega a classe square
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000) // vai execultar a function sem precisar chamar
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        alert("cabou");
        //state.values.currentTime = 10;
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy"); // acessando as classes e removendo enemy
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id; // Quarda a posição do enemy
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
 }

function addListinerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){ // compara posiço enemy com a clicada
                state.values.result++; // adiciona a pontuação
                state.view.score.textContent = state.values.result; // adiciona visualmente a pontuação
                state.values.hitPosition = null;
            }
        })
    })
}

// função principal que chama outras funções
function iniciar(){
   moveEnemy();
   addListinerHitBox();
}
iniciar(); 