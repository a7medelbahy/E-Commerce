// Navbar
let navbar = document.querySelector(".navbar");
let navLinks = document.querySelectorAll(".navbar .nav-item .nav-link");
let navMenu = document.querySelector(".navbar-collapse");
let upBtn = document.getElementById("up-btn");
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 100) {
    navbar.classList.add("fixed-nav");
    upBtn.classList.add("show-up");
  } else {
    navbar.classList.remove("fixed-nav");
    upBtn.classList.remove("show-up");
  }
});
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((element) => {
      element.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    let itLink = e.currentTarget.getAttribute("href");
    window.location.href = itLink;
    console.log(itLink);
    navMenu.classList.remove("show");
  });
});

// Up Btn
upBtn.addEventListener("click", () => {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
});

// Cart
let cartLocal = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let cartCounter = document.querySelector(".navbar .cart .cart-count");
let cartNum = document.querySelector(".cart-num");
let openCart = document.querySelector(".navbar .cart");
let shopCart = document.querySelector(".shop-cart");
let closeCart1 = document.querySelector(".close-cart1");
let closeCart2 = document.querySelector(".close-cart2");
let clearCart = document.querySelector(".clear-cart");
let emptyCart = document.querySelector(".empty-cart");
cartCounter.textContent = cartLocal.length;
cartNum.textContent = cartLocal.length;

openCart.addEventListener("click", (e) => {
  shopCart.classList.add("show-cart");
  CheckEmpty();
});
closeCart1.addEventListener("click", (e) => {
  shopCart.classList.remove("show-cart");
});
closeCart2.addEventListener("click", (e) => {
  shopCart.classList.remove("show-cart");
});
clearCart.addEventListener("click", (e) => {
  localStorage.clear();
  localStorage.setItem("cart", []);
  cartLocal = [];
  cartItemShow();
  CheckEmpty();
  cartNum.textContent = 0;
  cartCounter.textContent = 0;
});
function CheckEmpty() {
  if (!cartLocal || cartLocal.length == 0) {
    emptyCart.classList.add("show-empty");
  } else {
    emptyCart.classList.remove("show-empty");
  }
}

let cartContainer = document.querySelector(".cart-items");
let totalPrice = document.querySelector(".total-price");
function cartItemShow() {
  let sumPrice = 0;
  let cartProds = cartLocal
    .map((prodItem) => {
      let prodPrice = prodItem.price * prodItem.cartQuantity;
      sumPrice += prodPrice;
      return `<div class="cart-prod bg-white rounded-3 p-1 d-flex flex-wrap justify-content-between align-items-center" id=${prodItem.id}>
      <div class="prod-img rounded-3 overflow-hidden">
        <img src=${prodItem.img} class="img-fluid d-block" alt="prod">
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center text-center">
        <p>${prodItem.title}</p>
        <small>${prodItem.category}</small>
        <div class="d-flex gap-2">
          <button class="button secondary-button dec-quan">-</button>
          <p class="button main-button quan-num" style='cursor: default;'>${prodItem.cartQuantity}</p>
          <button class="button secondary-button inc-quan">+</button>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="quan-price fw-bold">$${prodPrice}</p>
        <button class="button secondary-button del-prod"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
    })
    .join("");
  cartContainer.innerHTML = cartProds;
  totalPrice.textContent = sumPrice;
  cartCounter.textContent = cartLocal.length;
  cartNum.textContent = cartLocal.length;

  let delBtns = document.querySelectorAll(".cart-items .del-prod");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      let delId =
        e.currentTarget.parentElement.parentElement.getAttribute("id");
      const removedItems = cartLocal.filter((item) => item.id !== delId);
      cartLocal = removedItems;
      localStorage.setItem("cart", JSON.stringify(cartLocal));
      cartItemShow();
      CheckEmpty();
      cartNum.textContent = cartLocal.length;
    });
  });

  let increaseBtns = document.querySelectorAll(".cart-items .inc-quan");
  increaseBtns.forEach((incBtn) => {
    incBtn.addEventListener("click", (e) => {
      let incId =
        e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
          "id"
        );
      const itemIndex = cartLocal.findIndex((item) => item.id === incId);
      if (itemIndex >= 0) {
        cartLocal[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(cartLocal));
      cartItemShow();
      CheckEmpty();
      cartNum.textContent = cartLocal.length;
    });
  });

  let decreaseBtn = document.querySelectorAll(".cart-items .dec-quan");
  decreaseBtn.forEach((decBtn) => {
    decBtn.addEventListener("click", (e) => {
      let incId =
        e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
          "id"
        );

      const itemIndex = cartLocal.findIndex((item) => item.id === incId);
      if (cartLocal[itemIndex].cartQuantity > 1) {
        cartLocal[itemIndex].cartQuantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(cartLocal));
      cartItemShow();
      CheckEmpty();
      cartNum.textContent = cartLocal.length;
    });
  });
}
openCart.addEventListener("click", () => {
  cartItemShow();
});

// Form Validation
let userName = document.getElementById("userName");
let userMail = document.getElementById("userMail");
let userPhone = document.getElementById("userPhone");
let userMessage = document.getElementById("userMessage");
let messageSubmit = document.getElementById("message-submit");
let messageStatus = document.getElementById("message-status");

let mailPattern = /[a-zA-Z0-9]{1,15}@[a-zA-Z]{1,7}.com/g;
let validName = false;
let validMail = false;
let validPhone = false;
let validMessage = false;

messageSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (userName.value.length < 5) {
    userName.style.border = "1px solid red";
    document.getElementById("name-valid").textContent =
      "Your Name is Not Valid";
    validName = false;
  } else {
    userName.style.border = "1px solid green";
    document.getElementById("name-valid").textContent = "";
    validName = true;
  }

  if (mailPattern.test(userMail.value) == false) {
    userMail.style.border = "1px solid red";
    document.getElementById("mail-valid").textContent =
      "Your Mail is Not Valid";
    validMail = false;
  } else {
    userMail.style.border = "1px solid green";
    document.getElementById("mail-valid").textContent = "";
    validMail = true;
  }
  if (
    isNaN(Number(userPhone.value)) ||
    userPhone.value.length != 11 ||
    (!/^012/.test(userPhone.value) &&
      /^011/.test(userPhone.value) &&
      /^010/.test(userPhone.value))
  ) {
    userPhone.style.border = "1px solid red";
    document.getElementById("Phone-valid").textContent =
      "Your Phone Num Is Not Valid";
    validPhone = false;
  } else {
    userPhone.style.border = "1px solid green";
    document.getElementById("Phone-valid").textContent = "";
    validPhone = true;
  }
  if (userMessage.value.length < 10) {
    document.getElementById("message-valid").textContent =
      "You Message Is Not Valid";
    userMessage.style.border = "1px solid red";
    validMessage = false;
  } else {
    document.getElementById("message-valid").textContent = "";
    userMessage.style.border = "1px solid green";
    validMessage = true;
  }

  if (validName && validMail && validPhone && validMessage) {
    messageStatus.textContent = "Message Sent";
    messageStatus.style.color = "green";
    userName.value = "";
    userMail.value = "";
    userPhone.value = "";
    userMessage.value = "";
  } else {
    messageStatus.textContent = "Message Not Sent";
    messageStatus.style.color = "red";
  }
});
