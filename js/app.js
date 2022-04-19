// Document selectors
const qwertyElement = document.getElementById('qwerty');
const phraseElement = document.getElementById('phrase');
const btnResetClass = document.getElementsByClassName('btn__reset');

// Game related objects
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