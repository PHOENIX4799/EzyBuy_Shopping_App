const showCartMessage = (message) => {
  const messageDiv = document.createElement("div");
  messageDiv.className = "cart-message";
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  messageDiv.style.position = "fixed";
  messageDiv.style.top = "0";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translate(-50%, -100%)";
  messageDiv.style.transition = "transform 0.5s ease-in-out";
  messageDiv.style.zIndex = "9999";

  messageDiv.style.backgroundColor = "#a9b1b3";
  messageDiv.style.color = "#fff";
  messageDiv.style.padding = "10px 30px";
  messageDiv.style.borderRadius = "6px";
  messageDiv.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";

  requestAnimationFrame(() => {
    messageDiv.style.transform = "translate(-50%, 0)";
  });

  setTimeout(() => {
    messageDiv.style.transform = "translate(-50%, -100%)";
    setTimeout(() => {
      messageDiv.remove();
    }, 500);
  }, 3000);
};

function closeModal() {
  document.getElementById("payment-modal").style.display = "none";
}

function openModal() {
  document.getElementById("payment-modal").style.display = "block";
}

function openWishlistSidebar() {
  document.getElementById("wishlist").classList.add("active");
}

function closeWishlistSidebar() {
  document.getElementById("wishlist").classList.remove("active");
}

// --- Orders Sidebar Functions ---
function openOrdersSidebar() {
  document.getElementById("orders").classList.add("active");
  renderOrdersList();
}

function closeOrdersSidebar() {
  document.getElementById("orders").classList.remove("active");
}

// Global orders array to hold order objects
let ordersData = [];

function renderOrdersList() {
  const ordersList = document.querySelector(".orders-list");
  if (!ordersList) return;

  ordersList.innerHTML = "";

  // If no orders yet
  if (ordersData.length === 0) {
    ordersList.innerHTML = `<p style="text-align:center; color:grey;">No orders yet.</p>`;
    return;
  }

  // For each order, display a summary
  ordersData.forEach((order, index) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-summary");
    orderDiv.innerHTML = `
      <div class="order-header">
        <span>Order placed on ${order.date} at ${order.time}</span>
        <span>Total: $${order.total.toFixed(2)}</span>
      </div>
      <button class="order-details-btn" data-index="${index}">Order Details</button>
      <div class="order-details" style="display: none;"></div>
    `;
    ordersList.appendChild(orderDiv);
  });

  // Attach click handlers for each "Order Details" button
  const detailsButtons = ordersList.querySelectorAll(".order-details-btn");
  detailsButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const detailsDiv = e.target.nextElementSibling;
      if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
        detailsDiv.style.display = "block";
        renderSingleOrderDetails(index, detailsDiv);
      } else {
        detailsDiv.style.display = "none";
      }
    });
  });
}

function renderSingleOrderDetails(orderIndex, container) {
  const order = ordersData[orderIndex];
  container.innerHTML = "";

  order.items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}"
           style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
      <span>${item.title} x ${item.quantity}</span>
      <span style="margin-left:auto;">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    container.appendChild(itemDiv);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // Cart open/close
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const cartClose = document.querySelector("#cart-close");
  if (cartIcon && cartClose) {
    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    cartClose.addEventListener("click", () => cart.classList.remove("active"));
  }

  // Wishlist open/close
  const wishlistIcon = document.querySelector("#wishlist-icon");
  const wishlistClose = document.querySelector("#wishlist-close");
  if (wishlistIcon && wishlistClose) {
    wishlistIcon.addEventListener("click", () => openWishlistSidebar());
    wishlistClose.addEventListener("click", () => closeWishlistSidebar());
  }

  // Orders open/close
  const ordersIcon = document.querySelector("#orders-icon");
  const ordersClose = document.querySelector("#orders-close");
  if (ordersIcon) {
    ordersIcon.addEventListener("click", () => openOrdersSidebar());
  }
  if (ordersClose) {
    ordersClose.addEventListener("click", () => closeOrdersSidebar());
  }

  //Add to cart
  const addCartButtons = document.querySelectorAll(".bxs-cart-add");
  addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      const productBox = event.target.closest(".product-box");
      addToCart(productBox);
    });
  });

  //Add to wishlist
  const addWishlistButtons = document.querySelectorAll(".bxs-heart");
  addWishlistButtons.forEach(button => {
    button.addEventListener("click", event => {
      const productBox = event.target.closest(".product-box");
      addToWishlist(productBox);
    });
  });
});

// --- Add to Cart Functionality ---
const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      showCartMessage("This item is already in the cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button class="decrement">-</button>
        <span class="number">1</span>
        <button class="increment">+</button>
      </div>
    </div>
    <i class='bx bx-trash'></i>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".bx-trash").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
  });

  cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector(".decrement");
    let quantity = parseInt(numberElement.textContent);

    if (event.target.classList.contains("decrement") && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color = "#999";
      }
    } else if (event.target.classList.contains("increment")) {
      quantity++;
      decrementButton.style.color = "#333";
    }

    numberElement.textContent = quantity;
    updateTotalPrice();
  });

  updateCartCount(1);
  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const qty = parseInt(quantityElement.textContent);
    total += price * qty;
  });
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

let wishlistItems = [];
let wishlistCount = 0;

const updateWishlistCount = () => {
  wishlistCount = wishlistItems.length;
  const wishlistCountBadge = document.querySelector(".wishlist-item-count");
  if (wishlistCountBadge) {
    wishlistCountBadge.textContent = wishlistCount;
    wishlistCountBadge.style.visibility = wishlistCount > 0 ? "visible" : "hidden";
  }
  updateWishlistSidebar();
};

const addWishlistButtons = document.querySelectorAll(".bxs-heart");
addWishlistButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToWishlist(productBox);
  });
});

const addToWishlist = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  if (wishlistItems.some(item => item.title === productTitle)) {
    showCartMessage("This item is already in your wishlist.");
    return;
  }

  wishlistItems.push({
    img: productImgSrc,
    title: productTitle,
    price: productPrice
  });

  updateWishlistCount();
  showCartMessage("Added to your wishlist!");
};

const updateWishlistSidebar = () => {
  const wishlistContent = document.querySelector(".wishlist-content");
  wishlistContent.innerHTML = "";

  if (wishlistItems.length === 0) {
    const emptyHeading = document.createElement("h3");
    emptyHeading.textContent = "Wishlist Empty";
    emptyHeading.style.textAlign = "center";
    emptyHeading.style.marginTop = "20px";
    emptyHeading.style.color = "grey";
    wishlistContent.appendChild(emptyHeading);
    return;
  }

  wishlistItems.forEach((item, index) => {
    const wishlistBox = document.createElement("div");
    wishlistBox.classList.add("wishlist-box");
    wishlistBox.innerHTML = `
      <img src="${item.img}" class="wishlist-img">
      <div class="wishlist-detail">
        <h2 class="wishlist-product-title">${item.title}</h2>
        <span class="wishlist-price">${item.price}</span>
      </div>
      <div class="wishlist-actions">
        <i class='bx bxs-cart-add' data-tooltip="Add to Cart"></i>
        <i class='bx bx-trash' data-tooltip="Remove"></i>
      </div>
    `;

    wishlistBox.querySelector(".bx-trash").addEventListener("click", () => {
      wishlistItems.splice(index, 1);
      updateWishlistCount();
      showCartMessage("Item removed from wishlist.");
    });

    wishlistBox.querySelector(".bxs-cart-add").addEventListener("click", () => {
      const fakeProductBox = document.createElement("div");
      fakeProductBox.innerHTML = `
        <img src="${item.img}">
        <div class="product-title" >${item.title}</div>
        <span class="price">${item.price}</span>
      `;
      addToCart(fakeProductBox);
      wishlistItems.splice(index, 1);
      updateWishlistCount();
      showCartMessage("Item added to cart from wishlist.");
    });

    wishlistContent.appendChild(wishlistBox);
  });
};

const btnBuy = document.querySelector(".btn-buy");
const paymentModal = document.getElementById("payment-modal");
const proceedBuyButton = document.getElementById("proceed-buy");

function openModal() {
  paymentModal.style.display = "flex";
}

function closeModal() {
  paymentModal.style.display = "none";
}

// Optional: Hide warning on load
document.getElementById("warning-message").style.display = "none";

btnBuy.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    showCartMessage("Your Cart is empty! Add items to buy");
    return;
  } else {
    openModal();
  }
});

proceedBuyButton.addEventListener("click", () => {
  const fullName = document.getElementById("full-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();
  const address = document.getElementById("address").value.trim();
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;

  if (!fullName || !phoneNumber || !address || !country || !city) {
    document.getElementById("warning-message").style.display = "block";
    return;
  } else {
    document.getElementById("warning-message").style.display = "none";
  }

  const cartBoxes = Array.from(cartContent.querySelectorAll(".cart-box"));
  let orderItems = [];
  let orderTotal = 0;
  cartBoxes.forEach(cartBox => {
    const image = cartBox.querySelector("img").src;
    const title = cartBox.querySelector(".cart-product-title").textContent;
    const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("$", ""));
    const quantity = parseInt(cartBox.querySelector(".number").textContent);
    orderItems.push({ image, title, price, quantity });
    orderTotal += price * quantity;
  });

  const now = new Date();
  const order = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    total: orderTotal,
    items: orderItems
  };

  ordersData.push(order);
  cartBoxes.forEach(cartBox => cartBox.remove());
  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  closeModal();
  showCartMessage("Thanks for shopping! Your order has been placed.");
  renderOrdersList();
});



// --- Chat Widget Functionality ---
const autoResponses = [
  "Thanks for your message! We will get back to you soon.",
  "Got it! Our support team is on it.",
  "Your message has been received. We'll reply shortly.",
  "Thank you! We appreciate your inquiry.",
  "We've noted your message. Stay tuned for our response."
];

const predefinedQA = {
  "what is your name?": "I'm your friendly chat assistant!",
  "how can i track my order?": "You can track your order in the 'Orders' section on your profile.",
  "what are your working hours?": "We operate 24/7 to assist you anytime.",
  "how do i return a product?": "You can return a product within 30 days of purchase. Please visit our Returns page for details.",
  "what payment methods do you accept?": "We accept credit cards, PayPal, and bank transfers.",
  "do you offer discounts?": "Yes, we often have discounts. Keep an eye on our promotions page!",
  "i want to place an order": "Thats a simple task, just add items to your wishlist or cart then place order.",
  "ok": "Thanks for understanding! Need anything else?",
  "hey": "Hello! How can I help you?",
  "hi": "Hi there! What can I do for you today?",
  "hello": "Hello! How may I assist you?",
  "hello!": "Hello! How may I assist you?",
  "how are you?": "I'm just a bot, but I'm doing great! How about you?",
  "what's up?": "Not much, just here to help you shop! What’s up with you?",
  "who are you?": "I'm your friendly shopping assistant! Ask me anything.",
  "what can you do?": "I can help you find products, check orders, suggest deals, and more!",
  "tell me a joke": "Sure! Why did the shopping cart break up with the checkout page? It felt abandoned!",
  "do you like shopping?": "Of course! Helping you find great deals is my favorite thing to do.",
  "what’s your favorite product?": "I like all products equally, but I can show you some bestsellers!",
  "can you recommend something random?": "Sure! How about checking out this cool product: [random product link]",
  "do you work 24/7?": "Yep! I'm always here to help, anytime you need.",
  "what's your name?": "You can call me your shopping assistant!",
  "are you real?": "I’m as real as an AI can be! Here to make your shopping experience easier.",
  "do you sleep?": "Nope! I'm always online to assist you.",
  "do you have feelings?": "Not really, but I’m here to help and make your experience enjoyable!",
  "how smart are you?": "Smart enough to help you find the best deals! Try asking me something tricky.",
  "what’s trending right now?": "Let me check… Here are some of the hottest products right now: [Trending products]",
  "do you know my name?": "I might, but I respect privacy! Want me to remember it for next time?",
  "can you sing?": "I would, but my voice module is still in development! 🎤",
  "can you dance?": "Only if you imagine me doing a little robot dance. 🤖💃",
  "what's the meaning of life?": "For me, it's helping you find the perfect products!",
  "surprise me": "Alright! Here’s something you might like: [random product or fun fact]",
  "can you tell me a fun fact?": "Sure! Did you know online shopping sales are expected to hit trillions this year?",
  "what is your favorite color?": "I like all colors, but gradients are pretty cool!",
  "do you get bored?": "Nope! Helping people like you keeps me busy and happy.",
  "are you a human?": "Nope, just a chatbot here to assist you with shopping!",
  "why are you so helpful?": "Because that’s my job! I love making shopping easier for you.",
  "what's your favorite emoji?": "I like 🤖, but 🛍️ is also great for shopping!",
  "bye": "See you later! Happy shopping!",
  "do you have [product name]?": "Let me check that for you! Can you specify any particular brand or features you're looking for?",
  "what are the latest arrivals?": "Here are our newest products! [Link or details]",
  "can you suggest a good [category name] product?": "Sure! Here are some top-rated products in that category.",
  "are there any discounts on [product name]?": "Let me check our current offers for you!",
  "what are the best-rated products?": "Here are some of our highest-rated items!",
  "do you have [brand name] products?": "Yes, we do! Here are some options from [brand name].",
  "how do I add an item to my cart?": "Just click on the 'Add to Cart' button next to the product!",
  "can I remove an item from my cart?": "Yes, go to your cart and click the remove button next to the item.",
  "how do I apply a discount code?": "Enter your discount code at checkout in the 'Promo Code' field.",
  "how do I check my order status?": "You can check your order status in the 'My Orders' section.",
  "where can I find my order history?": "Go to your account and click on 'Order History'.",
  "do you offer free shipping?": "Yes! We offer free shipping on orders over a certain amount.",
  "how long does delivery take?": "Delivery times vary by location. Typically, it takes 3-7 business days.",
  "do you ship internationally?": "Yes, we do! Shipping fees may vary depending on your location.",
  "can I track my order?": "Yes! Use the tracking link provided in your order confirmation email.",
  "is my payment information secure?": "Yes! We use encrypted transactions to keep your information safe.",
  "how do I request a refund?": "You can request a refund through our return policy page.",
  "how do I add an item to my wishlist?": "Click the heart icon next to the product to save it to your wishlist.",
  "how do I create an account?": "Click on 'Sign Up' and enter your details to create an account.",
  "I forgot my password. How can I reset it?": "Click 'Forgot Password' on the login page to reset it.",
  "how do I return a product?": "Visit our 'Returns & Refunds' section for step-by-step instructions.",
  "return product": "Visit our 'Returns & Refunds' section for step-by-step instructions.",
  "what is your return policy?": "We accept returns within 30 days of purchase. Please check our policy for more details.",
  "how do I contact customer support?": "You can reach us via live chat, email, or phone support.",
  "are there any ongoing sales?": "Yes! Check out our latest deals and discounts here: [Link].",
  "do you have any coupon codes?": "We might! Check our promotions page for the latest coupon codes.",
  "when is your next sale?": "Stay tuned! Sign up for our newsletter to get notified about upcoming sales.",
  "goodbye": "Goodbye! Have a great day!",
  "i want to order": "Thats nice, proceed to the products and click the 'Add to cart button'",
  "help": "We got your complaint. Chat with us to get better info <a href='https://wa.me/7303939001?text=Hello%2C%20I%20need%20assistance.' target='_blank' style='color: #25D366; text-decoration: none; font-weight: bold;'>here</a>."
};

function getResponseForQuestion(message) {
  const normalizedMessage = message.toLowerCase().trim();
  for (let question in predefinedQA) {
    if (question === normalizedMessage) {
      return predefinedQA[question];
    }
  }
  return null;
}

function getRandomResponse() {
  const randomIndex = Math.floor(Math.random() * autoResponses.length);
  return autoResponses[randomIndex];
}

function addChatMessage(sender, message, isHTML = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message");

  if (sender === "You") {
    msgDiv.classList.add("outgoing");
  } else {
    msgDiv.classList.add("incoming");
  }

  // Allow HTML in the message only when necessary
  if (isHTML) {
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  } else {
    msgDiv.textContent = `${sender}: ${message}`;
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}


const chatWidget = document.getElementById("chat-widget");
const chatClose = document.getElementById("chat-close");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatBody = document.getElementById("chat-body");
const chatToggle = document.getElementById("chat-toggle");
const helpMessage = "<div style='padding: 10px; border-left: 4px solid #25D366; background:rgb(238, 238, 238); border-radius: 5px;'>" +
  "<strong>🔹 How to Use the Chat Box:</strong><br><br>" +
  "✅ <strong>Track Order:</strong> Type <code>how can i track my order?</code> to check your order status.<br>" +
  "✅ <strong>Return a Product:</strong> Type <code>return product</code> to get return policy details.<br>" +
  "✅ <strong>Payment Options:</strong> Type <code>payment methods</code> to see available payment options.<br>" +
  "✅ <strong>Placing an Order:</strong> Type <code>place order</code> for ordering instructions.<br>" +
  "✅ <strong>Live Support:</strong> Chat with us on WhatsApp <a href='https://wa.me/7303938001?text=Hello%2C%20I%20need%20assistance.' target='_blank' style='color: #25D366; text-decoration: none; font-weight: bold;'>here</a>.<br><br>" +
  "ℹ️ <em>Type your query and get instant answers! Need more help? Click the WhatsApp link above.</em>" +
  "</div>";


chatClose.addEventListener("click", () => {
  chatWidget.style.display = "none";
  chatToggle.style.display = "block";
});

chatToggle.addEventListener("click", () => {
  chatWidget.style.display = "flex";
  chatToggle.style.display = "none";

  if (!chatWidget.dataset.helpDisplayed) {
    addChatMessage("Support", helpMessage, true);
    chatWidget.dataset.helpDisplayed = "true";
  }
});

chatSend.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    addChatMessage("You", message);
    chatInput.value = "";

    const response = getResponseForQuestion(message) || getRandomResponse();

    setTimeout(() => {
      // If response contains a WhatsApp link, render as HTML
      if (message.toLowerCase().trim() === "help") {
        addChatMessage("Support", response, true);
      } else {
        addChatMessage("Support", response);
      }
    }, 1000);
  }
});


chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatSend.click();
  }
});

function updateTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // Set the formatted time to the element with id "current-time"
  document.getElementById("current-time").textContent = formattedTime;
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize the time
updateTime();


function showSuggestions() {
  const searchInput = document.getElementById("search-bar");
  const suggestionsDiv = document.getElementById("suggestions");
  const slider1 = document.querySelector("#slider1 .product-content"); // Ensures only slider1 is affected

  if (!searchInput || !suggestionsDiv || !slider1) return;

  const searchTerm = searchInput.value.toLowerCase();
  const productBoxes = slider1.querySelectorAll(".product-box");
  let matchCount = 0;

  suggestionsDiv.innerHTML = ""; // Clear previous suggestions

  if (searchTerm === "") {
    // Show all slider1 products if search is empty
    productBoxes.forEach((box) => (box.style.display = "flex"));
    suggestionsDiv.style.display = "none";
    return;
  }

  // Create suggestion items based on matching product titles in slider1
  productBoxes.forEach((box) => {
    const titleElement = box.querySelector(".product-title");
    if (!titleElement) return;

    const titleText = titleElement.textContent.toLowerCase();
    if (titleText.includes(searchTerm)) {
      matchCount++;
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerText = titleElement.textContent;

      suggestionItem.addEventListener("click", () => {
        // Set search input to selected suggestion
        searchInput.value = titleElement.textContent;
        suggestionsDiv.style.display = "none";

        // Show only matching products in slider1
        productBoxes.forEach((b) => {
          const productTitle = b.querySelector(".product-title").textContent.toLowerCase();
          b.style.display = productTitle.includes(titleElement.textContent.toLowerCase()) ? "flex" : "none";
        });
      });

      suggestionsDiv.appendChild(suggestionItem);
    }
  });

  suggestionsDiv.style.display = matchCount === 0 ? "none" : "block";
}

