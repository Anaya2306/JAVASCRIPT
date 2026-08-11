
let wrongCounter = 0;

function createStatusTracker() {
    let securitySystemName = "SecureLock v1.0"; 

    return function() {
    
        return "Protected by " + securitySystemName;
    };
}

const getSystemTag = createStatusTracker();

const flipTextBackward = function(originalText) {
    let letterList = originalText.split("");      
    let flippedList = letterList.reverse();       
    let mergedResult = flippedList.join("");      
    return mergedResult;
};


const verifyPalindrome = (userPin) => {
    let reversedPin = flipTextBackward(userPin); 
    
    if (userPin === reversedPin) {
        return true;
    } else {
        return false;
    }
};

function verifyPIN() {
    let inputField = document.getElementById("pinInput");
    let feedbackMsg = document.getElementById("statusText");
    let currentInput = inputField.value;

    
    if (currentInput === "") {
        feedbackMsg.innerText = "Error: Input box is blank!";
        feedbackMsg.style.color = "#ff8093";
        return;
    }

    
    let isPalindrome = verifyPalindrome(currentInput);

    if (isPalindrome === true) {
        wrongCounter = 0; 
        feedbackMsg.innerText = "SUCCESS: PALINDROME AUTHENTICATED! PRIVILEGED MSG PRINTED.";
        feedbackMsg.style.color = "#ffb6c1";
    } 
    else {
        wrongCounter = wrongCounter + 1; 
        
        if (wrongCounter >= 3) {
            feedbackMsg.innerText = "TERMINAL BLOCKED! " + getSystemTag();
            feedbackMsg.style.color = "#ff8093";
            inputField.value = "LOCKED";
        } else {
            let attemptsLeft = 3 - wrongCounter;
            feedbackMsg.innerText = "WRONG PIN! Tries remaining: " + attemptsLeft;
            feedbackMsg.style.color = "#ffffff";
        }
    }
}



function pressKey(keyDigit) {
    let inputField = document.getElementById("pinInput");
    if (inputField.value !== "LOCKED") {
        inputField.value = inputField.value + keyDigit;
    }
}

function eraseAll() {
    let inputField = document.getElementById("pinInput");
    if (inputField.value !== "LOCKED") {
        inputField.value = "";
        let feedbackMsg = document.getElementById("statusText");
        feedbackMsg.innerText = "Enter your PIN code";
        feedbackMsg.style.color = "#aaaaaa";
    }
}
