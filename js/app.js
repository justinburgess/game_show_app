// document selectors

const qwertyElement = document.getElementById('qwerty');
const phraseElement = document.getElementById('phrase');
const btnResetClass = document.querySelector('.btn__reset');
const scoreBoardClass = document.getElementById('scoreboard');

// game related objects

let missed = 0;
const phrases = [
    'Under the weather',
    'The last straw',
    'Bite the bullet',
    'Break the ice',
    'Take a rain check',
    'Burn bridges',
    'It takes two to tango',
    'We see eye to eye',
    'On cloud nine',
    'Time is money'
];
const hearts = `
    <ol>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
    </ol>
`

// listeners

btnResetClass.addEventListener('click', () => {
    const overlay = btnResetClass.parentNode;
    overlay.style.display = 'none';
    resetGame();
    addPhraseToDisplay();
});

qwertyElement.addEventListener('click', (event) => {
    const clickTarget = event.target;
    const letter = clickTarget.textContent;
    const letterExists = 'abcdefghijklmnopqrstuvwxyz'.includes(letter);
    const heart = document.getElementById('scoreboard').firstElementChild.firstElementChild;
    if ( clickTarget.tagName === 'BUTTON' && letterExists ) {
        clickTarget.classList.add('chosen');
        checkedLetter = checkLetter(letter);
        if (!checkedLetter){
            heart.remove();
            missed++;
        }
    }
    checkWin();
});

// functions

function getRandomPhraseAsArray() {
    const randomNumber = Math.floor(Math.random() * (phrases.length));
    return phrases[randomNumber];
}
    
function addPhraseToDisplay() {
    const ul = phraseElement.firstElementChild;
    const chosenPhrase = getRandomPhraseAsArray();
    for (let i = 0; i < chosenPhrase.length; i++) {
        const letter = chosenPhrase[i];
        let li = document.createElement('li')
        li.textContent = letter;
        ul.appendChild(li);
        if (letter !== ' ') {
            li.className = 'letter';
        }
        else {
            li.className = 'space';
        }   
    }
}

function checkLetter(letter) {
    const lis = document.getElementsByTagName('li');
    let match;
    for (let i = 0; i < lis.length; i++){
        const li = lis[i];
        if (letter === li.textContent.toLowerCase()) {
            li.classList.add('show');
            match = li.textContent;
        }
    }
    return match;
}


function checkWin(){
    const classLetter = document.getElementsByClassName('letter');
    const classShow = document.getElementsByClassName('show');
    const startOverlay = document.querySelector('#overlay');
    if (classLetter.length === classShow.length) {
        startOverlay.classList.add('win');
        startOverlay.firstChild.textContent = 'You win'
        startOverlay.style.display = 'flex'
        addResetButton();
    }
    if (missed > 4) {
        startOverlay.classList.add('lose');
        startOverlay.firstChild.textContent = 'You lost'
        startOverlay.style.display = 'flex'
        addResetButton();
    }
}

function addResetButton(){
    btnResetClass.textContent = 'Reset'
}

function resetGame(){
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        button = buttons[i]
        console.log(button.className);
        if (button.className === 'chosen') {
            button.classList.remove('chosen');
        }
    }
    phraseElement.innerHTML = '<ul></ul>'
    scoreBoardClass.innerHTML = hearts;
    btnResetClass.parentElement.className = 'start'
    missed = 0;
}