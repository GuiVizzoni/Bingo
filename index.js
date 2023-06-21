var cards = [];
var numbersCalled = [];
var isGameComplete = null;

function addCard() {
    const cardName = document.getElementById('cardName').value;
    if (cardName === '') {
        alert('Digite um nome para a cartela!');
        return;
    }
    if (cards.find(card => card.name === cardName)) {
        alert('Este nome já foi utilizado para outra cartela!');
        return;
    }
    const card = generateCard();
    cards.push({ name: cardName, card: card, isComplete: false });
    createCard(cardName, card);
}

function generateCard() {
    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    const card = [];
    let index = 0;

    for (let i = 0; i < 5; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
                row.push('X');
            } else {
                row.push(numbers[index]);
                index++;
            }
        }
        card.push(row);
    }

    return card;
}

function createCard(cardName, card) {
    const table = document.getElementById('cards');
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const cardCell = document.createElement('td');

    nameCell.innerHTML = cardName;
    row.appendChild(nameCell);

    const cardTable = document.createElement('table');
    cardTable.className = 'bingo-card';

    for (let i = 0; i < card.length; i++) {
        const cardRow = document.createElement('tr');
        for (let j = 0; j < card[i].length; j++) {
            const cardCell = document.createElement('td');
            cardCell.innerHTML = card[i][j];
            cardRow.appendChild(cardCell);
        }
        cardTable.appendChild(cardRow);
    }

    cardCell.appendChild(cardTable);
    row.appendChild(cardCell);
    table.appendChild(row);
}

function markNumber(cell) {
    cell.classList.toggle('marked');
}

function reset() {
    location.reload();
}

function clearCards() {
    const cells = document.querySelectorAll('.bingo-card td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('marked');
    }
}

function startBingo() {
    if (numbersCalled.length === 99) {
        alert('Todos os números já foram chamados!');
        return;
    }

    if (isGameComplete) {
        alert('O jogo já foi finalizado!');
        return;
    }

    const randomNumber = generateRandomNumber();
    numbersCalled.push(randomNumber);

    const numberCell = document.createElement('td');
    numberCell.innerHTML = randomNumber;

    const numbersCalledTable = document.getElementById('numbersCalled');
    const row = document.createElement('tr');
    row.appendChild(numberCell);
    numbersCalledTable.appendChild(row);

    highlightCards(randomNumber);

    checkBingo();
}

function generateRandomNumber() {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 99) + 1;
    } while (numbersCalled.includes(randomNumber));
    return randomNumber;
}

function highlightCards(number) {
    const cells = document.querySelectorAll('.bingo-card td');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === String(number)) {
            cells[i].classList.add('highlighted');
        }
    }
}

function checkBingo() {
    const tables = document.getElementsByClassName('bingo-card');
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].isComplete) continue;
  
      const cardCells = tables[i].getElementsByTagName('td');
      const markedCount = Array.from(cardCells).filter(cell =>
        cell.classList.contains('highlighted')
      ).length;
  
      if (markedCount === 24) {
        cards[i].isComplete = true;
        isGameComplete = true;
        alert(`Parabéns! O jogador "${cards[i].name}" foi o vencedor!`);
        break;
      }
    }
  }

function autoPlayBingo() {
    const intervalId = setInterval(() => {
        if (numbersCalled.length === 99) {
            clearInterval(intervalId);
            alert('Todos os números já foram chamados!');
            return;
        }

        if (isGameComplete) {
            clearInterval(intervalId);
            alert('O jogo já foi finalizado!');
            return;
        }

        const randomNumber = generateRandomNumber();
        numbersCalled.push(randomNumber);

        const numberCell = document.createElement('td');
        numberCell.innerHTML = randomNumber;

        const numbersCalledTable = document.getElementById('numbersCalled');
        const row = document.createElement('tr');
        row.appendChild(numberCell);
        numbersCalledTable.appendChild(row);

        highlightCards(randomNumber);

        checkBingo();
    }, 100);
}
