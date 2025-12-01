let gamePlaying = true;
let playerscore = 0;
let totalscore = 0;
let totalturns = 0;

const rolldie = document.getElementById('rolldie');
const hold = document.getElementById('hold');
const reset = document.getElementById('reset');

const playerscoretext = document.getElementById('playerscore');
const totalscoretext = document.getElementById('totalscore');
const totalturnstext = document.getElementById('totalturns');
const message = document.getElementById('message');
const playername = document.getElementById('playername');
const storedName = localStorage.getItem('playerName');

if (storedName) {
    playername.textContent = storedName;
} else {
    playername.textContent = 'Player';
};

function DieRoll(min,max) {
    const result = Math.random() * (max - min) + min;
    return Math.floor(result)
};

rolldie.addEventListener('click', function() {
    if (gamePlaying) {
        rolldie.disabled = true;
        hold.disabled = true;
        
        let animationCount = 0;
        const animationRolls = 9;
        const animationInterval = 100;
        
        const animateRoll = setInterval(() => {
            const tempDie = DieRoll(1, 7);
            const dieDOM = document.getElementById('diecontroller');
            const dieTable = ['one','two','three','four','five','six'];
            
            dieDOM.innerHTML = '';
            dieDOM.className = 'die ' + dieTable[tempDie - 1];
            for (let i = 0; i < tempDie; i++) {
                const dot = document.createElement('div');
                dieDOM.appendChild(dot);
            }
            
            animationCount++;
            
            if (animationCount >= animationRolls) {
                clearInterval(animateRoll);
                const die = DieRoll(1, 7);
                
                dieDOM.innerHTML = '';
                dieDOM.className = 'die ' + dieTable[die - 1];
                for (let i = 0; i < die; i++) {
                    const dot = document.createElement('div');
                    dieDOM.appendChild(dot);
                }
                
                if (die !== 1) {
                    playerscore += die;
                    playerscoretext.textContent = playerscore;
                } else {
                    totalturns++;
                    totalturnstext.textContent = totalturns;
                    playerscore = 0;
                    playerscoretext.textContent = playerscore;
                }
                
                rolldie.disabled = false;
                hold.disabled = false;
            }
        }, animationInterval);
    }
});

hold.addEventListener('click', function() {
    if (gamePlaying) {
        totalscore += playerscore;
        playerscore = 0;
        totalturns++;
        totalturnstext.textContent = totalturns;
        playerscoretext.textContent = playerscore;
        totalscoretext.textContent = totalscore;

        if (totalscore >= 100) {
            message.textContent = 'You Win after ' + totalturns + ' turns!';
            gamePlaying = false;
        }
    }
});

reset.addEventListener('click', function() {
    gamePlaying = true;
    playerscore = 0;
    totalscore = 0;
    totalturns = 0;
    playerscoretext.textContent = playerscore;
    totalscoretext.textContent = totalscore;
    message.textContent = '';
});
