var count;
function getOrders() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    fetch('../api/user/' + user._id)
        .then(res => {
            if (res != null)
                return res.json();
            else if (res.status == 204)
                throw new Error("status code is " + res.status);
        })
        .then(data => {
            if (data) {
                count = 0;
                data.orders.forEach(order => drawOrder(order));
                document.getElementById("countOrder").innerText = count;
            }
            else {
                alert("there is no category in store");
            }
        });
}
function drawOrder(order) {
    count++;
    var card = document.getElementById("temp-row");
    var cardCopy = card.content.cloneNode(true);

    cardCopy.querySelector(".products").id = order._id;
    cardCopy.querySelector(".quntitydate").innerText = order.order_date;
    cardCopy.querySelector(".price").innerText = order.order_sum + "ש'ח";
    cardCopy.querySelector(".amount").innerHTML = order.products.length;

    order.products.forEach((p) => {
        var prod = document.createElement("option");
        prod.innerHTML = "מוצר:  "+ p.prud_id.prud_name + "  כמות:   " + p.quntity
        cardCopy.getElementById(order._id).appendChild(prod);
    });
    document.getElementById("items").appendChild(cardCopy);
}
