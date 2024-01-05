let elementCounter = 1;

function addForm() {
    const formElements = document.getElementById('form-elements');
    const lineBreak = document.createElement('br');
    const div = document.createElement('div');
    div.className = 'form-element';

    const labelName = document.createElement('label');
    labelName.textContent = 'Element Name:';
    div.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'elementName' + elementCounter;
    inputName.isRequired = true;
    // div.appendChild(lineBreak);
    div.appendChild(inputName);

    div.innerHTML += "</br>";
    // div.appendChild(lineBreak);
    // div.appendChild(lineBreak);
    // div.appendChild(lineBreak);


    const labelType = document.createElement('label');
    labelType.textContent = 'Element Type:';
    div.appendChild(labelType);

    const selectType = document.createElement('select');
    selectType.name = 'elementType' + elementCounter;

    const optionText = document.createElement('option');
    optionText.value = 'text';
    optionText.textContent = 'Text';
    selectType.appendChild(optionText);

    const optionEmail = document.createElement('option');
    optionEmail.value = 'email';
    optionEmail.textContent = 'Email';
    selectType.appendChild(optionEmail);

    const optionPassword = document.createElement('option');
    optionPassword.value = 'password';
    optionPassword.textContent = 'Password';
    selectType.appendChild(optionPassword);

    const optionSelect = document.createElement('option');
    optionSelect.value = 'select';
    optionSelect.textContent = 'Select';
    selectType.appendChild(optionSelect);

    div.appendChild(selectType);
    const optionsInput = document.createElement('input');
    optionsInput.type = 'text';
    optionsInput.name = 'options' + elementCounter;
    optionsInput.placeholder = 'Enter options (comma-separated)';
    optionsInput.style.display = 'none';

    div.appendChild(optionsInput);
    div.appendChild(lineBreak);
    const labelRequired = document.createElement('label');
    // labelRequired.className = 'checkbox-label';
    labelRequired.textContent = 'Required:';
    div.appendChild(labelRequired);

    const inputRequired = document.createElement('input');
    inputRequired.type = 'checkbox';
    inputRequired.id='checkbox-label';
    inputRequired.name = 'isRequired' + elementCounter;
    div.appendChild(inputRequired);

    selectType.addEventListener('change', function() {
        optionsInput.style.display = (this.value === 'select') ? 'block' : 'none';
    });

    formElements.appendChild(div);
    elementCounter++;
}

function createFinalForm() {
    const finalForm = document.getElementById("final-form");
    // console.log("yes" + finalForm.style.display);
    // if(finalForm.style.display === none ){
    //     finalForm.style.display = "block";
    // }
    finalForm.style.display = "block";
    console.log("Came in createFinalForm() function");
    const heading = document.getElementsByClassName("finalFormHeading")[0];
    console.log(heading.innerHTML);
    heading.innerHTML = "Final Generated Form";
    console.log(heading.innerHTML);
    const formElements = document.getElementById('form-elements');
    const generatedForm = document.getElementById('generated-form');
    generatedForm.innerHTML = '';

    for (let i = 0; i < formElements.children.length; i++) {
        const elementName = formElements.children[i].querySelector('[type="text"]').value;
        const elementType = formElements.children[i].querySelector('select').value;
        const optionsInput = formElements.children[i].querySelector('[name^="options"]');
        const options = optionsInput ? optionsInput.value.split(',').map(option => option.trim()) : [];
        const isRequired = formElements.children[i].querySelector('[type="checkbox"]').checked;

        const label = document.createElement('label');
        label.textContent = elementName + ':';
        generatedForm.appendChild(label);

        if (elementType === 'select') {
            const select = document.createElement('select');
            select.name = elementName;

            for (const option of options) {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            }

            generatedForm.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.name = elementName;

            switch (elementType) {
                case 'text':
                    input.type = 'text';
                    if (isRequired) {
                        input.required = true;
                    }
                    break;

                case 'email':
                    input.type = 'email';
                    if (isRequired) {
                        input.required = true;
                    }
                    input.pattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
                    input.title = 'Enter a valid email address';
                    break;

                case 'password':
                    input.type = 'password';
                    if (isRequired) {
                        input.required = true;
                    }
                    input.pattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}';
                    input.title = 'Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number';
                    break;

                default:
                    input.type = 'text';
            }

            generatedForm.appendChild(input);
        }

        generatedForm.appendChild(document.createElement('br'));
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    generatedForm.appendChild(submitButton);
}
