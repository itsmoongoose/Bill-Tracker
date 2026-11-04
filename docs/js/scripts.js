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
        let spentAmount = spentElement.textContent;
        spentAmount = spentAmount.replace("$", "");
        spentAmount = spentAmount.split(" ", 1);
        spentAmount = parseFloat(spentAmount);
        const leftElement = indivContainer.querySelector(".left-amount");
        let leftAmount = leftElement.textContent;
        leftAmount = leftAmount.replace("$", "");
        leftAmount = leftAmount.split(" ", 1);
        leftAmount = parseFloat(leftAmount);

        // Take Form Input
        formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            let userSpentInput = formInput.value;
            if (userSpentInput.includes("$")) {
                userSpentInput = userSpentInput.replace("$", "");
            }
            userSpentInput = parseFloat(userSpentInput.trim());
            
            // Calculations
            if (userSpentInput) {
                replaceSpentAmount = spentAmount + userSpentInput;
                replaceSpentAmount = replaceSpentAmount.toString();
                replaceLeftAmount = leftAmount - userSpentInput;
                replaceLeftAmount = replaceLeftAmount.toString();

                // Add trailing 0's if number is a whole number
                if (!replaceSpentAmount.includes(".")) {
                    replaceSpentAmount = `${replaceSpentAmount}.00`;
                }
                if (!replaceLeftAmount.includes(".")) {
                    replaceLeftAmount = `${replaceLeftAmount}.00`;
                }
            }

            // Remove And Update Elements
            indivContainer.removeChild(form);
            spentElement.textContent = `$${replaceSpentAmount} spent`;
            leftElement.textContent = `$${replaceLeftAmount} left`;

            // Display Change Button
            changeBtn.classList.remove("hidden");
        });
    });
});