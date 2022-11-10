// function for a shopping cart with updates to cart items and total price
if (document.readyState = "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {

    let removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeItem)

    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    let addItem = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addItem.length; i++) {
        let button = addItem[i];
        button.addEventListener("click", addToCart);

    }
    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
    alert("Thank you for your business!");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    adjustQuantity();
}


function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    adjustQuantity();
}

//remove Item from cart and updates total price, pulls from the div as well as the parent div
function removeItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();

    adjustQuantity()
}


// Function to add items to cart as well as update the total price. shop item and get elements by class name calls the class name of the item and gets the elements by class name specific item that is clicked
function addToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title, price, imageSrc);
    adjustQuantity();
}

// function to add a cart row to the end of the cart items list
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("You already added this item to your cart");
            return;
        }

    }   
let cartRowContents = `
    <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeItem);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);

    }


//function for adjusting quantity of items in cart and price
function adjustQuantity() {
    let totalPrice = 0;
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        let quantity = quantityElement.value;
        let priceElement = cartRow.getElementsByClassName("cart-price")[0];
        let price = priceElement.innerText.replace("$", "");
        itemPrice = price * quantity;
        totalPrice = itemPrice + totalPrice;
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + totalPrice;
    total = Math.round(totalPrice * 100) / 100;
}

