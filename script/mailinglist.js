//this js code is responsible for validating the data and posting it to the server so it can be added to the mailing list
window.onload = () => {

    document.getElementById("submitMail").addEventListener("click", submitToMailing)
};

// validation for name and email using regular expressions
function ValidateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

function ValidateName(name) {
    if (name.length >= 6) {
        return (/^[a-zA-Z-'. ]+$/.test(name));
    } else {
        return false;
    }
}

//function responsible for sending data to the server with the use of xmlhttprequest
function submitToMailing() {
    var respBox = document.getElementById("respBox");
    respBox.classList.remove("success"); //removing the existing design classes so the appropriate styling can be selected later
    respBox.classList.remove("warning");
    const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";
    var request = new XMLHttpRequest();
    var name = document.querySelector('#inpName').value;
    var email = document.querySelector('#inpEmail').value;
    //calling the validating functions in the conditional statements, leading to appropriate next steps 
    if (ValidateName(name)) {
        if (!ValidateEmail(email)) {
            respBox.className = 'warning'
            respBox.innerHTML = "You have entered an invalid email address!";
        } else {
            request.open("POST", url);
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function() {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        var response = JSON.parse(request.responseText);
                        var message = "Hi " + response.data.name + "! " + response.message + ". Your name (" + response.data.name + ") and your email (" + response.data.email + ") has been added to the mailing list.";
                        respBox.innerHTML = message;
                        respBox.className = 'success';
                        console.log(response);
                    } else {
                        respBox.className = 'warning';
                        respBox.innerHTML = "There has been an error in submission, please re-check your details or try again later. Thanks";
                    }

                }
            };

            var data = {
                "name": name,
                "email": email
            };
            data = JSON.stringify(data);
            request.send(data);
        }
    } else {
        respBox.className = 'warning'
        respBox.innerHTML = "You have entered an invalid name! It must only contain alphabets and be atleast 6 characters long.";
    }
}