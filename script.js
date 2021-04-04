let lastSelect = true;

// Functionalities
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

let checker = (arr, target) => target.every(v => arr.includes(v));

function randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function choiceElems(arr, num) {
    let sortedNums = [];
    let copyArr = [...arr];
    for (i = 0; i < num; i++) {
        let sortedNum = randomElem(copyArr);

        removeItemOnce(copyArr, sortedNum)

        sortedNums.push(sortedNum);
    }

    return sortedNums;
}

// function hasDuplicates(arr) {
//     return new Set(arr).size !== arr.length; 
// }


// Lottery Numbers

const lotteryLength = 60;

let lotteryNums = [];

for (i = 1; i <= lotteryLength; i++) {
    lotteryNums.push(i);

    const number = document.createElement('div');
    number.className = 'numbers';
    number.setAttribute('id', `num${i}`)

    number.innerText = i;

    number.addEventListener('click', selectNumber);
    number.id = `num${i}`;

    document.getElementById('board').appendChild(number);
}

const sortedNumsLength = 6;

for (i = 1; i <= sortedNumsLength; i++) {
    const sortedNumber = document.createElement('div');
    sortedNumber.className = 'sortedNumbers';
    sortedNumber.setAttribute('id', `sortedNum${i}`);

    document.getElementById('sortedNums').appendChild(sortedNumber);
}


// Check selection of Lottery Numbers

let selectedNums = [];

function selectNumber(evt) {
    lastSelect = false;

    let numberElem = document.getElementById(evt.currentTarget.id);
    let number = Number(numberElem.innerText);

    if (!(numberElem.style.color === 'white')) {
        selectedNums.push(number);

        numberElem.style.backgroundColor = 'red';
        numberElem.style.color = 'white';

        // console.log(`You selected the number ${number}.`)
    } else {
        removeItemOnce(selectedNums, number)

        numberElem.style.backgroundColor = '';
        numberElem.style.color = '';

        // console.log(`You unselected the number ${number}.`)
    }
}


// Play Button
let playButton = document.querySelector('button#play');
playButton.addEventListener('click', play);

sortedLotteryNums = [];

let divMsgSpan = document.querySelector('div#msg span');

let validSelect = true;

function play() {
    if (lastSelect) {
        buttonSelect.click()
    }

    if (validSelect) {
        if (selectedNums.length >= sortedNumsLength) {
            // let containerDiv = document.querySelector('div#container');
            sortedLotteryNums = choiceElems(arr = lotteryNums, num = sortedNumsLength);
    
            sortedLotteryNums.forEach((item, index) => {
                let sortedNumDiv = document.querySelector(`div#sortedNums div#sortedNum${index + 1}`);
                sortedNumDiv.innerText = item;
            })
    
            if (!(checker(selectedNums, sortedLotteryNums))) {
                divMsgSpan.innerText = "You lost. 🙁"
            } else {
                divMsgSpan.innerText = 'You won the jackpot! Congratulations! 🎉'
                confetti.start(timeout=5000, min=100, max=200);
            }
    
            // console.log(sortedLotteryNums);
            // console.log(selectedNums);
    
            // const sortedNums = document.createElement('div');
            // sortedNums.setAttribute('id', 'sortedNums');
    
            // containerDiv.insertBefore(sortedNums, playButton);
        } else {
            window.alert(`Invalid quantity of numbers selected. Minimum is ${sortedNumsLength}!`);
            return null;
        }
    }
}


// Select Values input

let valuesInput = document.querySelector('input#values');
valuesInput.value = sortedNumsLength;
// valuesInput.addEventListener('click', selectNums);

const selectDiv = document.querySelector('div#select').addEventListener('click', () => {
    lastSelect = true;
})

let buttonSelect = document.querySelector('button#select-values')
buttonSelect.addEventListener('click', selectNums)

// for (i=sortedNumsLength; i <= lotteryLength; i++) {
//     selectButton.innerHTML += `<option value="${i}">Select ${i} values</option>`;
// }

let playClear = false;

function selectNums() {
    let selectValue = valuesInput.value;

    if (selectValue) {
        let selectNum = Number(selectValue)
        if (selectNum >= 1 && selectNum <= lotteryLength) {

            // Gambiarra (`-`) {
            playClear = true;
            clearGame()
            playClear = false;
            // }

            if (selectNum < lotteryLength) {
                let sortedLotteryNumsUser = choiceElems(arr = lotteryNums, num = selectNum);

                sortedLotteryNumsUser.forEach((item) => {
                    // console.log(item);
                    const numElem = document.querySelector(`div#board div#num${item}`);
                    numElem.click();
                })
            } else { // if (selectNum === lotteryLength)
                // console.log('got sixty')
                for (i = 1; i <= lotteryLength; i++) {
                    const number = document.getElementById(`num${i}`);
                    let numElemBgColor = number.style.backgroundColor;

                    if (numElemBgColor === 'rgb(170, 170, 170)' || !(numElemBgColor)) {
                        // console.log('inner if else')
                        number.click();
                    }
                }
            }
            validSelect = true;
        } else {
            alert(`Invalid number. It should be between 1 and ${lotteryLength}.`)
            validSelect = false
        }
    } else {
        alert('You should enter a number.')
        validSelect = false
    }
}


// Clear Button
let clearButton = document.querySelector('button#clear')
clearButton.addEventListener('click', clearGame)

function clearGame() {
    if (selectedNums.length) {
        // console.log('cleaned')
        for (i = 1; i <= lotteryLength; i++) {
            const number = document.getElementById(`num${i}`);
            // console.log(number.style.backgroundColor)
            if (number.style.backgroundColor === 'red') {
                number.click();
            }
        }
    }

    for (i = 1; i <= sortedNumsLength; i++) {
        const sortedNum = document.getElementById(`sortedNum${i}`);
        sortedNum.innerText = '';
    }

    if (!playClear) {
        divMsgSpan.innerText = '';
        lastSelect = true;
        valuesInput.value = sortedNumsLength;
    }
}

// console.log(sortedLotteryNums);
// console.log(hasDuplicates(sortedLotteryNums));
