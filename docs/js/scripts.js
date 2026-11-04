// Define Variables
const changeBtns = document.querySelectorAll(".change-btn");
let replaceSpentAmount;
let replaceLeftAmount;

// Main Program
changeBtns.forEach(changeBtn => {
    changeBtn.addEventListener("click", (event) => {
        const indivContainer = changeBtn.closest("div");

        // Remove Change Button
        indivContainer.removeChild(changeBtn);

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
                replaceLeftAmount = leftAmount - userSpentInput;
            }

            // Remove Old Elements
            indivContainer.removeChild(spentElement);
            indivContainer.removeChild(leftElement);
            indivContainer.removeChild(form);

            // Display Updated Elements
            const updatedSpentElement = document.createElement("p");
            updatedSpentElement.classList.add("spent-amount");
            updatedSpentElement.textContent = `$${replaceSpentAmount} spent`;
            const updatedLeftElement = document.createElement("p");
            updatedLeftElement.classList.add("left-amount");
            updatedLeftElement.textContent = `$${replaceLeftAmount} left`;
            indivContainer.appendChild(updatedSpentElement);
            indivContainer.appendChild(updatedLeftElement);

            // Recreate and Display Change Button
            const newChangeBtn = document.createElement("button");
            newChangeBtn.classList.add("change-btn");
            newChangeBtn.textContent = "Change";
            indivContainer.appendChild(newChangeBtn);
        });
    });
});