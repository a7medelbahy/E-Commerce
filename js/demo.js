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

// Landing Slider
let myImgs = document.querySelectorAll(".landing-slider");
let nextBtn = document.querySelector(".landing .next-slide");
let prevtBtn = document.querySelector(".landing .prev-slide");
let slideCount = 0;
myImgs.forEach((image, index) => {
  image.style.left = `${index * 100}%`;
});

function sliding() {
  if (slideCount > myImgs.length - 1) {
    slideCount = 0;
  } else if (slideCount < 0) {
    slideCount = myImgs.length - 1;
  }
  myImgs.forEach((element) => {
    element.style.transform = `translateX(-${slideCount * 100}%)`;
  });
}
let slideInt = setInterval(() => {
  sliding();
  slideCount++;
}, 10000);
nextBtn.addEventListener("click", (e) => {
  slideCount++;
  sliding();
});
prevtBtn.addEventListener("click", (e) => {
  slideCount--;
  sliding();
});

// Products

const productsArr = [
  {
    id: "id_1",
    category: "women",
    title: "Short Sleeve",
    price: 50,
    img: "../E-Commerce/images/women1.jpg",
  },
  {
    id: "id_2",
    category: "women",
    title: "Pockets Dress",
    price: 40,
    img: "../images/women2.jpg",
  },
  {
    id: "id_3",
    category: "watches",
    title: "DIAMOND LUMINE",
    price: 260,
    img: "../images/watches1.jpg",
  },
  {
    id: "id_4",
    category: "men",
    title: "Neck Casual",
    price: 29,
    img: "../images/men1.jpg",
  },
  {
    id: "id_5",
    category: "women",
    title: "Felted Merino",
    price: 30,
    img: "../images/women3.jpg",
  },
  {
    id: "id_6",
    category: "bags",
    title: "Tote Black",
    price: 110,
    img: "../images/bags1.jpg",
  },
  {
    id: "id_7",
    category: "bags",
    title: "Overwatch Bag",
    price: 240,
    img: "../images/bags2.jpg",
  },
  {
    id: "id_8",
    category: "shoes",
    title: "Iconic Suede",
    price: 120,
    img: "../images/shoes1.jpeg",
  },
  {
    id: "id_9",
    category: "men",
    title: "V-Neck Shirt",
    price: 70,
    img: "../images/men2.jpg",
  },
  {
    id: "id_10",
    category: "women",
    title: "Classic Dress",
    price: 180,
    img: "../images/women4.jpg",
  },
  {
    id: "id_11",
    category: "women",
    title: "High-Waist",
    price: 69,
    img: "../images/women5.jpg",
  },
  {
    id: "id_12",
    category: "men",
    title: "Kirby Shirt",
    price: 29,
    img: "../images/men3.jpg",
  },
  {
    id: "id_13",
    category: "bags",
    title: "Capsule Pack",
    price: 95,
    img: "../images/bags3.jpg",
  },
  {
    id: "id_14",
    category: "shoes",
    title: "Hand Ambor",
    price: 80,
    img: "../images/shoes2.webp",
  },
  {
    id: "id_15",
    category: "men",
    title: "Brown Belt",
    price: 20,
    img: "../images/men4.jpg",
  },
  {
    id: "id_16",
    category: "men",
    title: "Bomber Vest",
    price: 60,
    img: "../images/men5.jpg",
  },
  {
    id: "id_17",
    category: "women",
    title: "Cool T-shirt",
    price: 65,
    img: "../images/women6.jpg",
  },
  {
    id: "id_18",
    category: "bags",
    title: "Dior Adore",
    price: 450,
    img: "../images/bags4.webp",
  },
  {
    id: "id_19",
    category: "watches",
    title: "PRESSED ASHFI",
    price: 300,
    img: "../images/watches2.jpg",
  },
  {
    id: "id_20",
    category: "watches",
    title: "PUREGOLD",
    price: 600,
    img: "../images/watches3.jpg",
  },
];

let cartLocal = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

let filterBtns = document.querySelectorAll(
  ".products .filter-btns .filter-btn"
);
let productContainer = document.querySelector(".products .product-boxes");
filterBtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    let productCat = e.currentTarget.dataset.filter;
    let filterProd = productsArr.filter((oneItme) => {
      if (productCat === oneItme.category) {
        return oneItme;
      }
    });
    if (productCat === "all") {
      productShow(productsArr);
    } else {
      productShow(filterProd);
    }
  });
});
const productShow = (productItems) => {
  let prodItems = productItems
    .map((items) => {
      return `<div class="col-md-6 col-lg-3 text-center">
      <div class="product-box rounded-3 p-3 d-flex flex-column gap-3" id=${items.id}>
        <div class="img-box position-relative bg-white rounded-3 overflow-hidden p-1">
          <img src=${items.img} class="img-fluid w-100 d-block rounded-3" alt="product">
          <div class="product-btns p-3 d-flex flex-column align-items-center justify-content-between">
            <ul class="d-flex gap-2">
              <li><i class="fa-solid fa-heart"></i></li>
              <li><i class="fa-solid fa-arrow-right-arrow-left"></i></li>
              <li><i class="fa-solid fa-eye"></i></li>
            </ul>
            <button class="add-cart button main-button rounded-4">Add to Cart</button>
            </div>
            </div>
        <p class="product-title">${items.title}</p>
        <p class="fw-bolder">$${items.price}</p>
      </div>
    </div>`;
    })
    .join("");
  productContainer.innerHTML = prodItems;

  // Add To Cart
  AddToCart();
  cartCounter.textContent = cartLocal.length;
};
window.addEventListener("load", () => {
  productShow(productsArr);
});

// Add To Cart
let cartArr = [];
let cartCounter = document.querySelector(".navbar .cart .cart-count");
let cartNum = document.querySelector(".cart-num");
function AddToCart() {
  let addBtns = document.querySelectorAll(
    ".products .product-boxes .product-box .add-cart"
  );
  addBtns.forEach((butn) => {
    butn.addEventListener("click", (e) => {
      let prodId =
        butn.parentElement.parentElement.parentElement.getAttribute("id");
      let cartList = productsArr.filter((oneItme) => {
        if (prodId === oneItme.id) {
          const itemIndex = cartLocal.findIndex(
            (item) => item.id === oneItme.id
          );
          if (itemIndex >= 0) {
            cartLocal[itemIndex].cartQuantity += 1;
          } else {
            const temp = { ...oneItme, cartQuantity: 1 };
            cartLocal.push(temp);
            localStorage.setItem("cart", JSON.stringify(cartLocal));
          }
        }
      });
      cartCounter.textContent = cartLocal.length;
      cartNum.textContent = cartLocal.length;
    });
  });
}

// Cart

let openCart = document.querySelector(".navbar .cart");
let shopCart = document.querySelector(".shop-cart");
let closeCart1 = document.querySelector(".close-cart1");
let closeCart2 = document.querySelector(".close-cart2");
let clearCart = document.querySelector(".clear-cart");
let emptyCart = document.querySelector(".empty-cart");

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

  increaseQuant();
  decreaseQuant();
  delProduct ();
};

openCart.addEventListener("click", () => {
  cartItemShow();
});


// Cart Functions
function increaseQuant () {
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
}

function decreaseQuant () {
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

function delProduct () {
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
}



// Week Deal
let myTimers = document.querySelectorAll(".week-deal .count-down div span");

let tempDate = new Date(),
  tempYear = tempDate.getFullYear(),
  tempMonth = tempDate.getMonth(),
  tempDay = tempDate.getDate();

let futDate = new Date(tempYear, tempMonth, tempDay + 2, 15, 30, 0);
const futTime = futDate.getTime();

function remainingTime() {
  const myTime = new Date().getTime(),
    remain = futTime - myTime,
    oneDay = 24 * 60 * 60 * 1000,
    oneHour = 60 * 60 * 1000,
    oneMin = 60 * 1000;

  let rDays = Math.floor(remain / oneDay),
    rHours = Math.floor((remain % oneDay) / oneHour),
    rMins = Math.floor((remain % oneHour) / oneMin),
    rSecs = Math.floor((remain % oneMin) / 1000);
  function decorateTime() {
    if (rDays < 10) {
      rDays = "0" + rDays;
    }
    if (rHours < 10) {
      rHours = "0" + rHours;
    }
    if (rMins < 10) {
      rMins = "0" + rMins;
    }
    if (rSecs < 10) {
      rSecs = "0" + rSecs;
    }
  }
  decorateTime();

  myTimers[0].textContent = `${rDays}`;
  myTimers[1].textContent = `${rHours}`;
  myTimers[2].textContent = `${rMins}`;
  myTimers[3].textContent = `${rSecs}`;
  if (remain <= 0) {
    clearInterval(Counting);
    myTimers[0].textContent = `sorry,`;
    myTimers[1].textContent = `this`;
    myTimers[2].textContent = `has`;
    myTimers[3].textContent = `ended`;
  }
}

let Counting = setInterval(remainingTime, 1000);
