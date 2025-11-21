const form = document.getElementById('nameForm');
const nameinput = document.getElementById('nameInput');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const playerName = nameinput.value.trim();

    if (playerName) {
        localStorage.setItem('playerName', playerName);
        window.location.href = 'pig.html';
    } else {
        alert('Please enter a valid name.');
    }
});