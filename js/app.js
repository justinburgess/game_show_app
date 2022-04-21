document.addEventListener('DOMContentLoaded', () => {

    // document selectors
    const scoreBoard = document.getElementById('scoreboard');
    const qwertyElement = document.getElementById('qwerty');
    const phraseElement = document.getElementById('phrase');
    const btnResetClass = document.querySelector('.btn__reset');
 


    /* 
    *   game related objects
    */

    // number of incorrect guesses before losing game
    const startingHeartCount = 5; 
    const heartString = `<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>`;

    // returns hearts in HTML based on count variable
    const hearts = count => {
        const heartList = document.createElement('ol');
        heartList.innerHTML = heartString.repeat(count);
        return heartList;
    };

    // counts missed guesses
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



    /* 
    *   listeners
    */

    // action on all overlay buttons including 'Start Game, Play Again, Try Again'
    btnResetClass.addEventListener('click', () => {
        const overlay = btnResetClass.parentNode;
        overlay.style.display = 'none';
        resetGame();
        addPhraseToDisplay();
    });

    // actions when user clicks qwerty keyboard options on screen, not on keyboard
    qwertyElement.addEventListener('click', (event) => {
        const clickTarget = event.target;
        const letter = clickTarget.textContent;
        const letterFirstClick = clickTarget.className !== 'chosen';
        const heart = document.querySelector('.tries');

        // verifies button target and stops accidentally selecting a previous selection
        if ( clickTarget.tagName === 'BUTTON' && letterFirstClick) {
            clickTarget.classList.add('chosen');
            const letterInPhrase = checkLetter(letter);

            // if letter does not exist in phrase, decrements one heart
            if (!letterInPhrase){
                heart.className = '';
                heart.firstElementChild.src="images/lostHeart.png";
                missed++;
            }
        }

        // check to verify phrase completion status, and remaining hearts
        checkWin();
    });


    /*
    *   functions
    */

    // ingests a random phrase from the phrases array
    function getRandomPhraseAsArray() {
        const randomNumber = Math.floor(Math.random() * (phrases.length));
        return phrases[randomNumber];
    }
        
    // creates elements from phrase characters and adds them to the markup
    function addPhraseToDisplay() {
        const ul = phraseElement.firstElementChild;
        const chosenPhrase = getRandomPhraseAsArray();

        // breaks down ingested phrase into letters, appends them to html as list items
        for (let i = 0; i < chosenPhrase.length; i++) {
            const letter = chosenPhrase[i];
            let li = document.createElement('li');
            li.textContent = letter;
            ul.appendChild(li);            

            // identifies element as 'letter' for non-whitespace and 'space' for whitespace characters
            li.className = (letter !== ' ') ? 'letter' : 'space'; 
        }
    }

    // Shows chosen letter in phrase and returns a matching value if true
    function checkLetter(letter) {
        const lis = document.querySelectorAll('li.letter');
        let match;
        for (let i = 0; i < lis.length; i++){
            const li = lis[i];
            if (letter === li.textContent.toLowerCase()) {
                li.style.transition = 'all .5s';
                li.classList.add('show');
                match = li.textContent;
            }
        }
        return match; // to be evaluated as false on return
    }

    // applies win or loss overlay if phrase letters or hearts have been exhausted
    function checkWin(){
        const classLetter = document.getElementsByClassName('letter');
        const classShow = document.getElementsByClassName('show');
        const startOverlay = document.querySelector('#overlay');
        function gameStatusOverlay(status) {
            startOverlay.classList.add(status);
            startOverlay.firstElementChild.textContent = `You ${status}`;
            startOverlay.style.display = 'flex';
            addResetButton();
        }
        if (classLetter.length === classShow.length) {
            gameStatusOverlay('win');
        }
        if (missed >= startingHeartCount) {
            gameStatusOverlay('lose');
        }
    }

    // adjusts reset button display text depending on evaluation from checkWin()
    function addResetButton(){
        const winOrLoseOverlay = btnResetClass.parentElement.className;
        if (winOrLoseOverlay.includes('lose')) {
            btnResetClass.textContent = 'Try Again';
        }
        if (winOrLoseOverlay.includes('win')) {
            btnResetClass.textContent = 'Play Again';
        }
    }

    // resets all dynamic components of game to default
    function resetGame(){
        let startButtons = document.querySelectorAll('button.chosen');
        for (let i = 0; i < startButtons.length; i++) {
            let button = startButtons[i];
            button.classList.remove('chosen');
        }
        phraseElement.innerHTML = '<ul></ul>';
        scoreBoard.firstElementChild.remove();
        scoreBoard.appendChild(hearts(startingHeartCount));
        btnResetClass.parentElement.className = 'start';
        missed = 0;
    }
});