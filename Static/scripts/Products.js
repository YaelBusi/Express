var count = 0;
//var countOfBag;
/*sessionStorage.setItem("countOfBag", 0);*/
sessionStorage.setItem("categories", new Array());
function earse() {
    window.location.href("Products.html");
}
function getProducts() {
    fetch("../api/product")
        .then(res => {
            if (res.ok == true)
                return res.json();
            else if (res.status == 204)
                throw new Error("status code is " + res.status);
        })
        .then(data => {
            if (data) {
                data.forEach(prod => drawProduct(prod));
                document.getElementById("counter").innerText = count;
                document.getElementsByClassName("Clear").href = "Products.html";
                var countOfBag = JSON.parse(sessionStorage.getItem("countOfBag"));
                if (countOfBag != null)
                    document.getElementById("ItemsCountText").innerText = countOfBag;
                else
                    document.getElementById("ItemsCountText").innerText = "0";
                getCategories();
            }
            else {
                alert("there is no products in store");
            }
        });
}

function drawProduct(prod) {
    count++;
    var card = document.getElementById("temp-card");
    var cardCopy = card.content.cloneNode(true);
    var url = "./Image/";
    cardCopy.querySelector("img").src = url + prod.image;
    cardCopy.querySelector(".h-name").innerText = prod.prud_name;
    cardCopy.querySelector(".price").innerText = prod.price + "ש'ח";
    cardCopy.querySelector(".description").innerText = prod.desc;
    cardCopy.querySelector(".btnAddToBag").addEventListener("click", () => { addToBag(prod) });
    document.getElementById("PoductList").appendChild(cardCopy);
}



function getCategories() {
    fetch("../api/Category")
        .then(res => {
            if (res.ok == true)
                return res.json();
            else if (res.status == 204)
                throw new Error("status code is " + res.status);
        })
        .then(data => {
            if (data) {
                data.forEach(category => drawCategory(category));
                document.getElementById("counter").innerText = count;
            }
            else {
                alert("there is no category in store");
            }
        })
}


function drawCategory(category) {
    var card = document.getElementById("temp-category");
    var cardCopy = card.content.cloneNode(true);
    cardCopy.querySelector(".lbl-cat").for = category._id;
    cardCopy.querySelector(".opt").id = category._id;
    cardCopy.querySelector(".OptionName").innerText = category.category_name;
    cardCopy.querySelector(".opt").addEventListener("change", () => { checkCategory(category._id) });
    document.getElementById("filters").appendChild(cardCopy);
}
var categories = [];
function checkCategory(categoryId) {
    count = 0;
    document.getElementById("PoductList").innerHTML = "";
    var url = "../api/product/byCategory";
    if (document.getElementById(categoryId).checked == true) {
        categories.push(categoryId);
    }
    else {
        for (var i = 0; i < categories.length; i++) {
            if (categories[i] === categoryId) {
                categories.splice(i, 1);
                break;
            }
        }
    }
    for (var i = 0; i < categories.length; i++) {
        if (i == 0) {
            url += '?categoryId=' + categories[i];
        }
        else {
            url += '&categoryId=' + categories[i];
        }
    }

    getProductByCategory(url);
}

function getProductByCategory(url) {
    fetch(url)
        .then(res => {
            if (res.ok == true)
                return res.json();
            else if (res.status == 204)
                throw new Error("status code is " + res.status);
        })
        .then(data => {
            if (data) {
                data.forEach(prod => drawProduct(prod));
                document.getElementById("counter").innerText = count;
            }
            else {
                alert("there is no category in store");
            }
        })

}

function addToBag(prod) {
    var countOfBag = JSON.parse(sessionStorage.getItem("countOfBag"))
    countOfBag++;
    sessionStorage.setItem("countOfBag", JSON.stringify(countOfBag));
    var bool = false;
    tmpCart = sessionStorage.getItem("cart");

    if (tmpCart) {
        var cart = JSON.parse(tmpCart);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i][0]._id == prod._id) {
                bool = true;
                cart[i][1]++;
            }

        }

        if (bool == false) {
            var p = [];
            p.push(prod);
            p.push(1);
            cart.push(p);
        }
    }
    else {
        var cart = [];
        var p = [];
        p.push(prod);
        p.push(1);
        cart.push(p);
    }
    alert("נוסף פריט לסל בהצלחה 👍");
    sessionStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("ItemsCountText").innerText = JSON.parse(sessionStorage.getItem("countOfBag"));


}
