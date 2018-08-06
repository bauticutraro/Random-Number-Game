(function () {
    // Components
    const inputMin = document.getElementById('inputMin'), // Input Min
          textMin = document.getElementById('textMin'); // Text error msg min

    const inputMax = document.getElementById('inputMax'), // Input Max
          textMax = document.getElementById('textMax'); // Text error msg max

    const textInterval = document.getElementById('textInterval'); // Text error msg Interval

    const inputResult = document.getElementById('inputResult'), // Input Result
          textResult = document.getElementById('textResult'); // Input error msg Result

    const buttonResult = document.getElementById('buttonResult'), // Button Try!
          buttonReset = document.getElementById('buttonReset'), // Button Reset Interval
          buttonNewGame = document.getElementById('buttonNewGame'); // Button New Game

    const lifesText = document.getElementById('lifesText'); // Lifes: 3
    const difficultyText = document.getElementById('difficultyText'); // Difficulty: -
    const probabiltyText = document.getElementById('probabilityText') // Probability of Winning: -

    const gameResult = document.getElementById('gameResult'); // Victory / Game Over
    const lifesQuantity = document.getElementById('lifesQuantity'); // Oh!, try again, you still have 1/2 life/s
    const numberResult = document.getElementById('numberResult'); //  The number was ...

    let result, min = 0, max = 0;

    // Reset min values from the min and max inputs;
    const minValue = 1;

    let lifes = 3;
    lifesText.textContent = `Lifes: ${lifes}`

    inputMin.setAttribute('min', `${minValue}`);
    inputMax.setAttribute('min', `${minValue}`);

    // Object State
    let state = {
        minCamp: false,
        minCampCero: false,
        maxCamp: false,
        maxCampCero: false, 
        validMinMaxValue: false,
        randomNumber: false,
        finalResult: false
    }

    // Error and Valid fields functions
    let minCampError = function () {
        inputMin.classList.add('input-error');
        textMin.classList.add('text-error');

        inputMin.classList.remove('input-valid');
        textMin.classList.remove('text-valid');
    }

    let minCampValid = function () {
        inputMin.classList.add('input-valid');
        textMin.classList.add('text-valid');

        inputMin.classList.remove('input-error');
        textMin.classList.remove('text-error');
    }

    let maxCampError = function () {
        inputMax.classList.add('input-error');
        textMax.classList.add('text-error');

        inputMax.classList.remove('input-valid');
        textMax.classList.remove('text-valid');
    }

    let maxCampValid = function () {
        inputMax.classList.add('input-valid');
        textMax.classList.add('text-valid');

        inputMax.classList.remove('input-error');
        textMax.classList.remove('text-error');
    }

    let resultCampError = function () {
        inputResult.classList.add('input-error');
        textResult.classList.add('text-error');

        inputResult.classList.remove('input-valid');
        textResult.classList.remove('text-valid');
    }

    let resultCampValid = function () {
        inputResult.classList.add('input-valid');
        textResult.classList.add('text-valid');

        inputResult.classList.remove('input-error');
        textResult.classList.remove('text-error');
    }

    // Probability Function
    let probabilityFunction = function () {
        probability = lifes * 100 / (interval + 1);
        probability = probability.toFixed(3)

        return probability;
    }

    // Generate random num
    let functionRandom = function () {

        min = parseInt(inputMin.value);
        max = parseInt(inputMax.value);

        lifes = 3;
        interval = max - min;

        probabilityFunction();

        // Min Camp
        state.minCamp = (!inputMin.value.length) ? true : false;
        state.minCampCero = (min <= 0) ? true : false;
        if (state.minCamp) {
            minCampError();
            textMin.textContent = 'Complete the field!';
        } else if (state.minCampCero) { 
            minCampError();
            textMin.textContent = 'You must enter a number greater than 0!';
        } else {
            minCampValid();
            textMin.textContent = '';
        }

        // Max Camp
        state.maxCamp = (!inputMax.value.length) ? true : false;
        state.maxCampCero = (max <= 0) ? true : false;
        if (state.maxCamp) {
            maxCampError();
            textMax.textContent = 'Complete the field!';
        } else if (state.maxCampCero) { 
            maxCampError();
            textMax.textContent = 'You must enter a number greater than 0!';
        } else {
            maxCampValid();
            textMax.textContent = '';
        }

        // Min and Max field valid interval values
        state.validMinMaxValue = (max - min < 5 && !state.minCamp && !state.minCampCero && !state.maxCamp && !state.maxCampCero) ? true : false;
        if (state.validMinMaxValue) {
            minCampError();
            maxCampError();
            textInterval.textContent = 'The interval must be greater than 5!';
        } else {
            textInterval.textContent = '';
            (interval <= 10 ) ? difficultyText.textContent = `Difficulty: Very Easy` :
            (interval <= 30 ) ? difficultyText.textContent = `Difficulty: Easy` :
            (interval <= 100 ) ? difficultyText.textContent = `Difficulty: Medium` :
            (interval <= 500 ) ? difficultyText.textContent = `Difficulty: Hard` :
            (interval <= 1000 ) ? difficultyText.textContent = `Difficulty: Very Hard` :
            (interval > 1000) ? difficultyText.textContent = `Difficulty: Impossible`:
            difficultyText.textContent = `Difficulty: -`

            probabiltyText.textContent = `Probabilty of Winning: ${probability}%`;
            textInterval.textContent = '';
            inputResult.setAttribute('min', `${min}`)
            inputResult.setAttribute('max', `${max}`)
            resultCampValid();
            inputResult.value = '';
            textResult.textContent = '';

            const randomNum = (min, max) => Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
        
            result = (!state.minCamp && !state.minCampCero && !state.maxCamp && !state.maxCampCero && !state.validMinMaxValue) ? randomNum(min, max) : false;
        } 
        return (result !== false) ? result : false;
    }

    // Validation of random num
    let functionResult = function () {
        min = parseInt(inputMin.value);
        max = parseInt(inputMax.value);
        let resultValue = parseInt(inputResult.value);
        let finalResult = (resultValue === result) ? true : false;

        if (state.minCamp || state.minCampCero || state.maxCamp || state.maxCampCero || state.validMinMaxValue) {
            resultCampError();
            textResult.textContent = `Add a New Interval!`;
        } else if (resultValue < min || resultValue > max) {
            resultCampError();
            textResult.textContent = `You must enter a number between ${min} and ${max}!`;
        } else if (!inputResult.value.length) {
            resultCampError();
            textResult.textContent = `Complete the field!`;
        } else if (!inputMin.value || !inputMax.value) {
            resultCampError();
            textResult.textContent = `Complete the min and max camps first!`;
        } else if(result === undefined || result === NaN || result === null || state.minCamp || state.minCampCero || state.maxCamp || state.maxCampCero || state.validMinMaxValue) {
            return false;
        } else {
            resultCampValid();
            textResult.textContent = '';

            let disabledFunction = function () {
                inputMin.setAttribute('disabled', 'disabled');
                inputMax.setAttribute('disabled', 'disabled');
                inputResult.setAttribute('disabled', 'disabled');
                buttonReset.setAttribute('disabled', 'disabled');
                buttonResult.setAttribute('disabled', 'disabled');
                lifesQuantity.textContent = '';
                buttonNewGame.style.setProperty('display', 'block');
            }

            if (finalResult) {
                gameResult.style.setProperty('color', '#23C040');
                numberResult.textContent = '';
                disabledFunction();

                return gameResult.textContent = 'Victory!';
            } else {
                lifes--;
                lifesText.textContent = `Lifes: ${lifes}`
                if (lifes === 0) {
                    gameResult.style.setProperty('color', '#F53040');
                    numberResult.textContent= `The number was ${result}`;
                    disabledFunction();

                    return gameResult.textContent = `Game Over!`;;
                } else {
                    probabilityFunction();
                    probabiltyText.textContent = `Probabilty of Winning: ${probability}%`;

                    return (lifes === 1) ? lifesQuantity.textContent = `Oh!, try again, you still have ${lifes} life` : lifesQuantity.textContent = `Oh!, try again, you still have ${lifes} lifes`;
                } 
            }   
        }
    }
 
    // Reset values
    let functionNewGame = function() {
        result = false;
        state.minCamp = true;
        state.maxCamp = true;
        inputMin.value = '';
        inputMax.value = '';
        inputResult.value = '';

        textInterval.textContent = '';
        textMax.textContent = '';
        textMin.textContent = '';
        textResult.textContent = '';

        gameResult.textContent = '';
        lifesQuantity.textContent = '';
        difficultyText.textContent = 'Difficulty: -';
        lifesText.textContent = 'Lifes: 3';
        probabiltyText.textContent = 'Probability of Winning: -';
        numberResult.textContent = '';

        inputMin.removeAttribute('disabled');
        inputMax.removeAttribute('disabled');
        inputResult.removeAttribute('disabled');
        buttonReset.removeAttribute('disabled');
        buttonResult.removeAttribute('disabled');
        buttonNewGame.style.setProperty('display', 'none');
    }

    buttonReset.addEventListener('click', functionRandom);
    buttonResult.addEventListener('click', functionResult);
    buttonNewGame.addEventListener('click', functionNewGame);    
})();