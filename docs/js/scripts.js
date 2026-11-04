// Define Variables
const changeBtns = document.querySelectorAll(".change-btn");
let replaceSpentAmount;
let replaceLeftAmount;

// Main Program
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

            // Display Change Button
            changeBtn.classList.remove("hidden");
        });
    });
});