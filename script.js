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

let lotteryNums = [];

for (i = 1; i <= 60; i++) {
    lotteryNums.push(i);

    const number = document.createElement('div');
    number.className = 'numbers';
    number.setAttribute('id', `num${i}`)

    number.innerText = i;

    number.addEventListener('click', selectNumber);
    number.id = `num${i}`;

    document.getElementById('board').appendChild(number);
}

for (i = 1; i <= 6; i++) {
    const sortedNumber = document.createElement('div');
    sortedNumber.className = 'sortedNumbers';
    sortedNumber.setAttribute('id', `sortedNum${i}`);

    document.getElementById('sortedNums').appendChild(sortedNumber);
}


// Check selection of Lottery Numbers

let selectNums = [];

function selectNumber(evt) {
    let numberElem = document.getElementById(evt.currentTarget.id);
    let number = Number(numberElem.innerText);

    if (!(numberElem.style.color === 'white')) {
        selectNums.push(number);

        numberElem.style.backgroundColor = 'red';
        numberElem.style.color = 'white';

        // console.log(`You selected the number ${number}.`)
    } else {
        removeItemOnce(selectNums, number)

        numberElem.style.backgroundColor = 'rgb(170, 170, 170)';
        numberElem.style.color = 'black';

        // console.log(`You unselected the number ${number}.`)
    }
}


// Play Button
let playButton = document.querySelector('button#play');
playButton.addEventListener('click', play);

sortedLotteryNums = [];

let divMsgSpan = document.querySelector('div#msg span');

function play() {
    if (selectNums.length >= 6) {
        // let containerDiv = document.querySelector('div#container');
        sortedLotteryNums = choiceElems(arr = lotteryNums, num = 6);

        sortedLotteryNums.forEach((item, index) => {
            let sortedNumDiv = document.querySelector(`div#sortedNums div#sortedNum${index + 1}`);
            sortedNumDiv.innerText = item;
        })

        if (!(checker(selectNums, sortedLotteryNums))) {
            divMsgSpan.innerText = "You lost buddy. Don't feel bad, winners are persistent!"
        } else {
            divMsgSpan.innerText = 'You won the JACKPOTTTTTTT!!!!!!!! CONGRATSSSSSSSS!'
        }

        // console.log(sortedLotteryNums);
        // console.log(selectNums);

        // const sortedNums = document.createElement('div');
        // sortedNums.setAttribute('id', 'sortedNums');

        // containerDiv.insertBefore(sortedNums, playButton);   
    } else {
        window.alert('Invalid quantity of numbers selected. Minimum is six!');
        return null;
    }
}


// Generate Button

let generateSelect = document.querySelector('select#generate');
generateSelect.addEventListener('click', generate);

for (i=6; i <= 60; i++) {
    generateSelect.innerHTML += `<option value="${i}">Select ${i} values</option>`;
}

function generate() {
    if (selectNums.length) {
        allButton.click();
    }

    let selectNum = Number(generateSelect.value);

    let sortedLotteryNumsUser = choiceElems(arr = lotteryNums, num = selectNum);

    sortedLotteryNumsUser.forEach((item) => {
        // console.log(item);
        let numElem = document.querySelector(`div#board div#num${item}`);
        numElem.click();
    })
}


// Select/Unselect All Button
let allButton = document.querySelector('button#selectUnselect')
allButton.addEventListener('click', selectUnselectAll)

function selectUnselectAll() {
    // console.log(selectNums)
    // console.log(selectNums.length);
    if (selectNums.length) {
        for (i = 1; i <= 60; i++) {
            const number = document.getElementById(`num${i}`);
            // console.log(number.style.backgroundColor)
            if (number.style.backgroundColor === 'red') {
                number.click();
            }
        }
    } else {
        for (i = 1; i <= 60; i++) {
            const number = document.getElementById(`num${i}`);
            let numElemBgColor = number.style.backgroundColor;

            if (numElemBgColor === 'rgb(170, 170, 170)' || !(numElemBgColor)) {
                // console.log('inner if else')
                number.click();
            }
        }
    }

    for (i = 1; i <= 6; i++) {
        const sortedNum = document.getElementById(`sortedNum${i}`);
        sortedNum.innerText = '';
    }
}

// console.log(sortedLotteryNums);
// console.log(hasDuplicates(sortedLotteryNums));
