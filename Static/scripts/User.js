
function Rool() {
    let user = {
        email: document.getElementById("mail").value,
        password: document.getElementById("password").value,
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value
    };

    fetch('/api/user', {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status == 400) {
                alert("this user in unvalid ! enter user");
                window.location.href = 'user.html';
                throw new Error("status code is " + res.status);
            
            
            
            }
            else
               return response.json();
        }
        )
        .then(data => {
            alert("נרשמת בהצלחה" + data.first_name);
            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.href = "success.html";
            
        }).then(data => {
            if (!data.errors) window.location.href = "success.html";
        }).catch(err => {
            console.log(err);
        })
    var x = 1;
};

function login() {
    var email = document.getElementById("Dmail").value;
    var password = document.getElementById("Dpassword").value;
    if(email!=""&&password!=""){
    fetch('../api/user/' + email + "/" + password)
        .then(res => {
            if (res.ok && res != null && res.status != 502)
                return res.json();
            else if (res.status == 204)
                throw new Error("status code is " + res.status);
        })
        .then(data => {
            if (data) {
                sessionStorage.setItem("user", JSON.stringify(data))
                window.location.href = "Products.html";
                alert("Hello to " + data.first_name + " " + data.last_name);
                localStorage.setItem('user', JSON.stringify(data));
            }
            else {
                alert("this user is undefined 🙄, enter user  ");
                /*window.location.href = "user.html";*/
            }
        }
        )
    }
    else{
        alert("this user is undefined 🙄, enter user  ");
    }
};

function rooling() {
    document.getElementById("login").style.display = "block";
}
function editDetails() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById("mailE").value = user.email;
    document.getElementById("passwordE").value = user.password;
    document.getElementById("firstNameE").value = user.first_name;
    document.getElementById("lastNameE").value = user.last_name;
}
let ID = JSON.parse(sessionStorage.getItem("user"))._id;
function upDate() {
    let user = {
        email: document.getElementById("mailE").value,
        password: document.getElementById("passwordE").value,
        first_name: document.getElementById("firstNameE").value,
        last_name: document.getElementById("lastNameE").value
    };
    fetch('../api/user/' + ID,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'PUT',
            body: JSON.stringify(user)
        })
        .then(data => {
            alert("הפרטים עודכנו בהצלחה");
        }).then(data => { window.location.href = "htmlpage.html"; })
        .catch(e => alert("לא התחבר"));
};
function helloFunc() {
    document.getElementById("hello").innerHTML = " wellcome to" + JSON.parse(sessionStorage.getItem("user").first_name);
};