const container = document.querySelector('.box1');
let tc = 6;
let n = 6;
let attempts = [];

// scores
let totalWins = 0;
let totalLosses = 0;

container.addEventListener('click', (e) => {
    const pe = e.target.parentElement;
    const animal = pe.querySelector('img').alt;
    pe.style.transform = 'rotateY(180deg)';

    tc--;
    attempts.push(animal);

    if (tc != 6 && tc % 2 == 0) {
        if (attempts[attempts.length - 1] != attempts[attempts.length - 2]) {
            setTimeout(() => loose(), 100);
        }
    }

    if (tc == 0) {
        setTimeout(() => win(), 100);
    }
});

// MODAL 
const text = document.querySelector('#winLoose');
const myModalEl = document.getElementById('exampleModal');
const modelBg = document.getElementById('textBg');
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    Keyboard: false
});

function loose() {
    text.textContent = "You Loose";
    myModal.show();

    modelBg.style.backgroundColor = '#FF7C7C';
    modelBg.style.color = '#fff'

    // update the score
    let scores = storeScore.getScores();
    totalWins = parseInt(scores[0]);
    totalLosses = parseInt(scores[1]) + 1;
    storeScore.setScores();

    // reloading after the modal is closed
    myModalEl.addEventListener('hide.bs.modal', function(event) {
        location.reload();
    });
}

function win() {
    text.textContent = "You Win !!";
    myModal.show();

    modelBg.style.backgroundColor = '#9CFF59';
    modelBg.style.color = '#8E8F8E'

    // update the scores
    let scores = storeScore.getScores();
    totalWins = parseInt(scores[0]) + 1;
    totalLosses = parseInt(scores[1]);
    storeScore.setScores();

    // reloading after the modal is closed
    myModalEl.addEventListener('hide.bs.modal', function(event) {
        location.reload();
    });
}

// score-board
class storeScore {
    static getScores() {
        let scores;
        if (localStorage.getItem('scores') == null) {
            scores = ['0', '0'];
        } else {
            scores = JSON.parse(localStorage.getItem('scores'));
        }

        return scores;
    }

    static setScores() {
        let scores = storeScore.getScores();
        scores[0] = totalWins;
        scores[1] = totalLosses;

        console.log(totalLosses);
        displayScore();

        localStorage.setItem('scores', JSON.stringify(scores));
    }
}

// displaying scores
setScore();
displayScore();

function setScore() {
    let totalScores = storeScore.getScores();
    totalWins = parseInt(totalScores[0]);
    totalLosses = parseInt(totalScores[1]);
}

function displayScore() {
    document.querySelector('#scoreWin').textContent = totalWins;
    document.querySelector('#scoreLoose').textContent = totalLosses;

    // progress bar
    let totalWidth = (totalWins + totalLosses);
    let winWidth = (totalWins / totalWidth) * 100;
    let lossWidth = (totalLosses / totalWidth) * 100;

    console.log(winWidth, lossWidth);

    document.querySelector('#pgWin').style.width = `${winWidth}%`;
    document.querySelector('#pgLoss').style.width = `${lossWidth}%`;
}

// clearing the scores board
document.querySelector('#clearScores').addEventListener('click', (e) => {
    const scores = ['0', '0'];
    localStorage.setItem('scores', JSON.stringify(scores));
    location.reload();
    // displayScore();
});