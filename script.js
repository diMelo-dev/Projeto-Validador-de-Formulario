let validator = {
    handleSubmit: (e) => {
        e.preventDefault();
        let send = false;

        let inputs = form.querySelectorAll("label input");

        validator.clearErrors();

        for (input of inputs) {
            let check = validator.checkInput(input);
            
            if (check !== true) {
                send = false;
                validator.showError(input, check);
                //Exibir o erro
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute("data-rules");

        if (rules !== null) {
            rules = rules.split('|');
            for (x in rules) {
                let rDetails = rules[x].split("=");

                switch(rDetails[0]) {
                    case "required":
                        if (input.value == "") {
                            return "Campo obrigatório";
                        };
                    break;
                    case "min":
                        if (input.value.length < rDetails[1]) {
                            return `Campo requere ${rDetails[1]} caracteres`;
                        };
                    break;
                    case "email":
                        if (input.value != "") {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value)) {
                                return "Formato de email incorreto";
                            }
                        };
                    break;
                    case "especial":
                        if (input.value != "") {
                            let especialCharacter = rDetails[1];

                            if (!input.value.includes(especialCharacter)) {
                                return `O campo precisa conter ${especialCharacter}`;
                            }
                        }
                    break;
                }

                if (rDetails !== null) {

                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.border = "3px solid #F00";

        let errorContainer = document.createElement("div");
        errorContainer.classList.add("error");
        errorContainer.innerHTML = error;
        input.parentElement.insertBefore(errorContainer, input.nextSibling);
    },
    clearErrors: () => {
        let inputs = document.querySelectorAll("label input");

        for (input of inputs) {
            input.style.border = "1px solid rgb(118, 118, 118)";
        }

        let errors = document.querySelectorAll(".error");

        for (errorElement of errors) {
            errorElement.remove();
        }
    }
};

let form = document.querySelector(".form-validator");

form.addEventListener("submit", validator.handleSubmit);

