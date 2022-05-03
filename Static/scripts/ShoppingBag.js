var totalAmount = 0;
var counter = 0;
function getProductFromBag() {
    tmpCart = sessionStorage.getItem("cart");

    if (tmpCart) {
        var cart = JSON.parse(tmpCart);
        for (let i = 0; i < cart.length; i++) {
            drowProduct(cart[i][0], cart[i][1]);
        }
    }
    else {
        alert("אין מוצרים בסל !");
        window.location.href = "../HTML/Products.html";
    }
    document.getElementById("itemCount").innerText = counter;

    //var countOfBag = JSON.parse(sessionStorage.getItem("countOfBag"))
    //countOfBag++;
    sessionStorage.setItem("countOfBag", counter);

    document.getElementById("totalAmount").innerText = totalAmount;

}
function drowProduct(prod, amount) {
    var card = document.getElementById("temp-row");
    var cardCopy = card.content.cloneNode(true);
    counter += amount;
    sessionStorage.setItem("countOfBag", counter);


    totalAmount += prod.price * amount;

    var url = "../Image/";
    cardCopy.querySelector(".image").style.backgroundImage = "url(" + url + prod.image + ")";
    cardCopy.querySelector(".itemName").innerText = prod.prud_name;
    cardCopy.querySelector(".quntityColumn").innerText = amount;
    cardCopy.querySelector(".price").innerText = prod.price;
    cardCopy.querySelector(".expandoHeight").addEventListener("click", () => { deleteProduct(prod) });
    document.getElementById("items").appendChild(cardCopy);
}
function deleteProduct(prod) {
    tmpCart = sessionStorage.getItem("cart");
    cart = JSON.parse(tmpCart);
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0]._id == prod._id) {
            if (cart[i][1] > 1)
                cart[i][1]--;
            else {
                var tmpCart1 = cart.slice(0, i);
                var tmpCart2 = cart.slice(i + 1, cart.length);
                cart = tmpCart1.concat(tmpCart2);
            }
        }
    }
    count = 0;
    totalAmount = 0;
    var countOfBag = JSON.parse(sessionStorage.getItem("countOfBag"))
    countOfBag++;
    sessionStorage.setItem("countOfBag", JSON.stringify(countOfBag));
    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "../ShoppingBag.html";
}
function placeOrder() {
    tmpCart = sessionStorage.getItem("cart");
    cart = JSON.parse(tmpCart);
    if (!cart) {
        alert("אין מוצרים בסל😢")
        window.location.href = "../HTML/Products.html";
    }
    else {
        var itemOrders = [];
        for (let i = 0; i < cart.length; i++) {
            var itemOrder = {
                prud_id: cart[i][0],
                quntity: cart[i][1]
                // ProductName: cart[i][0].prud_name
            }
            itemOrders.push(itemOrder);
        }
        var order = {
            order_date: new Date(),
            order_sum: totalAmount,
            user_id: JSON.parse(sessionStorage.getItem("user"))._id,
            products: itemOrders
        }

        fetch("../api/order", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'POST',
            body: JSON.stringify(order)
        }).then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Security Error");
        }).then(data => {
            sessionStorage.setItem("countOfBag", 0);
            alert("order is " + data._id + " succes!, Thanks for shopping by us... ");
        })
            .then(data => { window.location.href = "Products.html"; })
            .catch(e => alert("ERROR"));
        sessionStorage.setItem("cart", []);
    }
}                                               