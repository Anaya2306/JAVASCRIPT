
function addProduct() {

    let productInputs =
        document.getElementById("productInputs");

    let itemNumber =
        productInputs.children.length + 1;

    let newProduct = document.createElement("div");

    newProduct.className = "product-row";

    newProduct.innerHTML = `
        <span class="item-number">
            Item ${itemNumber}
        </span>

        <input type="text"
               class="product-name"
               placeholder="Product name">

        <input type="number"
               class="product-price"
               placeholder="Price">

        <input type="number"
               class="product-quantity"
               placeholder="Quantity"
               min="1">
    `;

    productInputs.appendChild(newProduct);
}


// Generate receipt
function generateReceipt() {

    let customerName =
        document.getElementById("customerName").value;

    let discount =
        Number(document.getElementById("discount").value);


    // Check customer name
    if (customerName.trim() === "") {

        document.getElementById("message").innerText =
            "Please enter customer name.";

        return;
    }


    // Check discount
    if (discount < 0 || discount > 100) {

        document.getElementById("message").innerText =
            "Please enter a discount between 0 and 100.";

        return;
    }


    // Create cart array
    let cart = [];

    let names =
        document.querySelectorAll(".product-name");

    let prices =
        document.querySelectorAll(".product-price");

    let quantities =
        document.querySelectorAll(".product-quantity");


    // Store products as objects
    for (let i = 0; i < names.length; i++) {

        let name = names[i].value;
        let price = Number(prices[i].value);
        let quantity = Number(quantities[i].value);


        // Ignore empty product rows
        if (name !== "" && price > 0 && quantity > 0) {

            let product = {
                name: name,
                price: price,
                quantity: quantity
            };

            cart.push(product);
        }
    }


    // Check if at least one product exists
    if (cart.length === 0) {

        document.getElementById("message").innerText =
            "Please enter at least one product.";

        return;
    }


    // Calculate subtotal using reduce()
    let subtotal = cart.reduce(function(total, item) {

        return total + (item.price * item.quantity);

    }, 0);


    // Calculate discount
    let discountAmount =
        (subtotal * discount) / 100;

    let finalTotal =
        subtotal - discountAmount;


    // Customer information
    document.getElementById("receiptCustomer").innerText =
        customerName;


    // Date
    let today = new Date();

    document.getElementById("receiptDate").innerText =
        today.toLocaleDateString();


    // Display products
    let receiptItems =
        document.getElementById("receiptItems");

    receiptItems.innerHTML = "";


    cart.map(function(item, index) {

        let itemTotal =
            item.price * item.quantity;

        receiptItems.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });


    // Display totals
    document.getElementById("receiptSubtotal").innerText =
        subtotal.toFixed(2);

    document.getElementById("receiptDiscount").innerText =
        discountAmount.toFixed(2);

    document.getElementById("receiptTotal").innerText =
        finalTotal.toFixed(2);


    // Display success message
    document.getElementById("message").innerText =
        discount + "% discount applied. Receipt generated!";
}


// Print receipt
function printReceipt() {

    window.print();
}

