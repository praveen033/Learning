document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const totalCart = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  const removeBth = document.getElementsByClassName("removeButton");

  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
    { id: 4, name: "Product 4", price: 400 },
  ];

  const cart = [];

  products.forEach((product1) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product1.name} - ${product1.price}</span>
    <button data_id= "${product1.id}"> Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    else {
      // console.log("clicked");
      const product_id = parseInt(e.target.getAttribute("data_id"));
      const product = products.find((p) => p.id === product_id);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    runderCart();
  }

  function runderCart() {
    cartList.innerHTML = "";
    let total_Price = 0;

    if (cart.length > 0) {
      totalCart.classList.remove("hidden");
      cart.forEach((item, index) => {
        total_Price += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `<span>${item.name} - ${item.price}</span>
        <button id= "${item.id}" class="removeButton">Remove</button>`;
        cartItem.classList.add("product");
        // console.log(cartItem.innerHTML);
        cartList.appendChild(cartItem);
        console.log(total_Price);
        totalPrice.textContent = `${total_Price}`;
      });
    } else {
      totalCart.classList.add("hidden");
      // console.log(`@`);
    }
  }

  cartList.addEventListener("click", (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === "BUTTON") {
      let removeProductId = e.target.getAttribute("id");
      let removeProduct = products.find((f) => f.id === removeProductId);
      cart.pop(removeProduct);
      runderCart();

      if (cart.length < 1) {
        let emptyMsg = document.createElement("div");
        emptyMsg.innerHTML = `<span>Your cart is empty.</span>`;
        cartList.appendChild(emptyMsg);
      }
    } else {
      return;
    }
    // emptyCart.ATTRIBUTE_NODE.classList.remove("hidden");
  });

  checkOutBtn.addEventListener("click", (e) => {
    alert("Checkout completed");
    cart.length = 0;
    runderCart();
    const msg = document.createElement("div");
    msg.innerHTML = `<span>Your cart is empty.</span>`;
    cartList.appendChild(msg);
  });
});
