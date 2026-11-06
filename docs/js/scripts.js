// Define Variables
const changeBtns = document.querySelectorAll(".change-btn");
const divIndivContainer = document.querySelectorAll(".indiv-container");
const savingsAmountP = document.querySelector("#savings-amount");
const clearBtn = document.querySelector("#clear-btn");
const clearBtnDiv = document.querySelector("#clear-btn-container");
let replaceSpentAmount;
let replaceLeftAmount;
let totalSavings = 0;
let savingsNum;

// Event Listener -- window
window.addEventListener("load", () => {

    // Import Bill Stats -- from local storage
    divIndivContainer.forEach(div => {
        if (div.id != "savings") {
            if (localStorage.getItem(div.id)) {
                let divValue = localStorage.getItem(div.id);
                divValue = JSON.parse(divValue);
                const divSpentValue = divValue[0];
                const divLeftValue = divValue[1];            
                const divSpentElement = div.querySelector(".spent-amount");
                const divLeftElement = div.querySelector(".left-amount");
                divSpentElement.textContent = divSpentValue;
                divLeftElement.textContent = divLeftValue;
                savingsNum = divLeftValue.replace("$", "");
                savingsNum = savingsNum.split(" ", 1);
                savingsNum = parseFloat(savingsNum);
                totalSavings = totalSavings + savingsNum;
            } else {
                const savingsElement = div.querySelector(".left-amount");
                savingsNum = savingsElement.textContent;
                savingsNum = savingsNum.replace("$", "");
                savingsNum = savingsNum.split(" ", 1);
                savingsNum = parseFloat(savingsNum);
                totalSavings = totalSavings + savingsNum;
            }
        }
    });
    
    // Display Savings Summary
    totalSavings = totalSavings.toFixed(2);
    savingsAmountP.textContent = `$${totalSavings}`;
});

// Event Listener -- clear button
clearBtn.addEventListener("click", () => {
    clearBtn.classList.add("hidden");

    // Build and Display Warning Message
    const warningDiv = document.createElement("div");
    warningDiv.classList.add("warning-div");
    const warningP = document.createElement("p");
    warningP.textContent = "Are you sure? This action cannot be undone.";
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    const noBtn = document.createElement("button");
    const yesBtn = document.createElement("button");
    noBtn.textContent = "No";
    yesBtn.textContent = "Yes";
    buttonDiv.appendChild(noBtn);
    buttonDiv.appendChild(yesBtn);
    warningDiv.appendChild(warningP);
    warningDiv.appendChild(buttonDiv);
    clearBtnDiv.appendChild(warningDiv);

    // Event Listener -- no button
    noBtn.addEventListener("click", () => {
        clearBtnDiv.removeChild(warningDiv);
        clearBtn.classList.remove("hidden");
    });

    // Event Listener -- yes button
    yesBtn.addEventListener("click", () => {
        clearBtnDiv.removeChild(warningDiv);
        clearBtn.classList.remove("hidden");

        // Clear Local Storage
        localStorage.clear();
    });

});

// Event Listener -- change button
changeBtns.forEach(changeBtn => {
    changeBtn.addEventListener("click", () => {
        const indivContainer = changeBtn.closest("div");

        // Remove Change Button
        changeBtn.classList.add("hidden");

        // Create Form
        const form = document.createElement("form");
        const formLabel = document.createElement("label");
        formLabel.textContent = "Amount spent:";
        const formInput = document.createElement("input");
        formInput.placeholder = "19.52";
        const formSubmit = document.createElement("button");
        formSubmit.textContent = "Submit";

        // Build and Display Form
        form.appendChild(formLabel);
        form.appendChild(formInput);
        form.appendChild(formSubmit);
        indivContainer.appendChild(form);

        // Translate html Content to Numbers
        const spentElement = indivContainer.querySelector(".spent-amount");
        const spentElementContent = spentElement.textContent;
        let spentAmount = spentElementContent.replace("$", "");
        spentAmount = spentAmount.split(" ", 1);
        spentAmount = parseFloat(spentAmount);

        const leftElement = indivContainer.querySelector(".left-amount");
        const leftElementContent = leftElement.textContent;
        let leftAmount = leftElementContent.replace("$", "");
        leftAmount = leftAmount.split(" ", 1);
        leftAmount = parseFloat(leftAmount);

        // Take Form Input
        formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            let userSpentInput = formInput.value;
            userSpentInput = userSpentInput.trim();
            if (userSpentInput.includes("$")) {
                userSpentInput = userSpentInput.replace("$", "");
            }
            
            // Calculations
            if (userSpentInput == 0 || userSpentInput == "") { // Error Handling -- invalid inputs
                replaceSpentAmount = spentElementContent;
                replaceLeftAmount = leftElementContent;
            } else { // Error Handling -- valid input
                userSpentInput = parseFloat(userSpentInput);
                replaceSpentAmount = spentAmount + userSpentInput; // calculate
                replaceLeftAmount = leftAmount - userSpentInput;
                replaceSpentAmount = replaceSpentAmount.toFixed(2); // round/add trailing zeros
                replaceLeftAmount = replaceLeftAmount.toFixed(2);
                replaceSpentAmount = `$${replaceSpentAmount} spent`; // add text
                replaceLeftAmount = `$${replaceLeftAmount} left`;
            }

            // Remove And Update Elements
            indivContainer.removeChild(form);
            spentElement.textContent = replaceSpentAmount;
            leftElement.textContent = replaceLeftAmount;

            // Update Local Storage
            const storageKey = indivContainer.id;
            const storageValue = [replaceSpentAmount, replaceLeftAmount];
            localStorage.setItem(storageKey, JSON.stringify(storageValue));

            // Display Change Button
            changeBtn.classList.remove("hidden");
        });
    });
});