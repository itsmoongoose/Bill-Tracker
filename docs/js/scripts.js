// Define Variables
const changeBtns = document.querySelectorAll(".change-btn");
const divIndivContainer = document.querySelectorAll(".indiv-container");
let replaceSpentAmount;
let replaceLeftAmount;

// Event Listener -- window
window.addEventListener("load", () => {
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
            }
        }
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
            if (userSpentInput == 0 || userSpentInput == "") { // Error Handling -- input is empty or is 0
                replaceSpentAmount = spentElementContent;
                replaceLeftAmount = leftElementContent;

                // Add trailing 0's if number is a whole number
                if (!replaceSpentAmount.includes(".")) {
                    replaceSpentAmount = `${replaceSpentAmount}.00`;
                }
                if (!replaceLeftAmount.includes(".")) {
                    replaceLeftAmount = `${replaceLeftAmount}.00`;
                }
            } else { // Error Handling -- input exists and is not 0
                userSpentInput = parseFloat(userSpentInput);
                replaceSpentAmount = spentAmount + userSpentInput;
                replaceSpentAmount = replaceSpentAmount.toString();
                replaceLeftAmount = leftAmount - userSpentInput;
                replaceLeftAmount = replaceLeftAmount.toString();

                // Add trailing 0's if number is a whole number
                if (!replaceSpentAmount.includes(".")) {
                    replaceSpentAmount = `$${replaceSpentAmount}.00 spent`;
                }
                if (!replaceLeftAmount.includes(".")) {
                    replaceLeftAmount = `$${replaceLeftAmount}.00 left`;
                }
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