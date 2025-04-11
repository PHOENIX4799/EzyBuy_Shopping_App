const productCategories = {
  slider1: [
    { image: "./images/01.png", title: "01", price: "$50" },
    { image: "./images/Blender.png", title: "Blender", price: "$80" },
    { image: "./images/Bodycon.png", title: "Bodycon", price: "$40" },
    { image: "./images/Books.png", title: "Books", price: "$25" },
    { image: "./images/02.png", title: "02", price: "$60" },
    { image: "./images/03.png", title: "03", price: "$70" },
    { image: "./images/Dell.png", title: "Dell", price: "$500" },
    { image: "./images/Dresses.png", title: "Dresses", price: "$55" },
    { image: "./images/Drift-RC.png", title: "Drift-RC", price: "$120" },
    { image: "./images/04.png", title: "04", price: "$65" },
    { image: "./images/05.png", title: "05", price: "$75" },
    { image: "./images/06.png", title: "06", price: "$85" },
    { image: "./images/Food-procesor.png", title: "Food Processor", price: "$90" },
    { image: "./images/Gadgets.png", title: "Gadgets", price: "$110" },
    { image: "./images/Heels.png", title: "Heels", price: "$45" },
    { image: "./images/07.png", title: "07", price: "$55" },
    { image: "./images/08.png", title: "08", price: "$65" },
    { image: "./images/Cold-Coffee.png", title: "Cold Coffee", price: "$15" },
    { image: "./images/Cold-Flats.png", title: "Cold Flats", price: "$35" },
    { image: "./images/Cookies.png", title: "Cookies", price: "$10" },
    { image: "./images/09.png", title: "09", price: "$75" },
    { image: "./images/10.png", title: "10", price: "$85" },
    { image: "./images/11.png", title: "11", price: "$95" },
    { image: "./images/12.png", title: "12", price: "$105" },
    { image: "./images/g.png", title: "G", price: "$115" },
    { image: "./images/h.png", title: "H", price: "$125" },
    { image: "./images/i.png", title: "I", price: "$135" },
    { image: "./images/A-15 Blue cover.png", title: "A-15 Blue Cover", price: "$20" },
    { image: "./images/A-15 Sky.png", title: "A-15 Sky", price: "$22" },
    { image: "./images/A-15.png", title: "A-15", price: "$24" },
    { image: "./images/Portable.png", title: "Portable", price: "$130" },
    { image: "./images/Sample.png", title: "Sample", price: "$140" },
    { image: "./images/Iphone 11.png", title: "iPhone 11", price: "$699" },
    { image: "./images/Iphone 12.png", title: "iPhone 12", price: "$799" },
    { image: "./images/Iphone 13.png", title: "iPhone 13", price: "$899" },
    { image: "./images/Pixel.png", title: "Pixel", price: "$850" },
    { image: "./images/Acer.png", title: "Acer", price: "$450" },
    { image: "./images/Air-Frier.png", title: "Air Frier", price: "$100" },
    { image: "./images/Alexa.png", title: "Alexa", price: "$120" },
    { image: "./images/A-line Dress.png", title: "A-line Dress", price: "$65" },
    { image: "./images/Apple Laptop.png", title: "Apple Laptop", price: "$1500" },
    { image: "./images/Asus Laptop.png", title: "Asus Laptop", price: "$1300" },
    { image: "./images/Bars.png", title: "Bars", price: "$10" },
    { image: "./images/Boots.png", title: "Boots", price: "$85" },
    { image: "./images/Buds.png", title: "Buds", price: "$50" },
    { image: "./images/Chipps.png", title: "Chips", price: "$5" },
    { image: "./images/Chocolate-Ice.png", title: "Chocolate Ice Cream", price: "$8" },
    { image: "./images/Coffee-Maker.png", title: "Coffee Maker", price: "$90" },
    { image: "./images/Cook-Top.png", title: "Cook-Top", price: "$110" },
    { image: "./images/Drinks.png", title: "Drinks", price: "$12" },
    { image: "./images/Electric-Kit.png", title: "Electric Kit", price: "$140" },
    { image: "./images/Fiction-Books.png", title: "Fiction Books", price: "$30" },
    { image: "./images/Flats.png", title: "Flats", price: "$40" },
    { image: "./images/Hp Laptop.png", title: "HP Laptop", price: "$1000" },
    { image: "./images/Ketle.png", title: "Kettle", price: "$45" },
    { image: "./images/Kitchen-Utensils.png", title: "Kitchen Utensils", price: "$35" },
    { image: "./images/Laptop.png", title: "Laptop", price: "$900" },
    { image: "./images/Lenovo.png", title: "Lenovo", price: "$800" },
    { image: "./images/Lotion.png", title: "Lotion", price: "$20" },
    { image: "./images/Maxi-Dress.png", title: "Maxi Dress", price: "$70" },
    { image: "./images/Microwave.png", title: "Microwave", price: "$150" },
    { image: "./images/MilkShake.png", title: "MilkShake", price: "$10" },
    { image: "./images/Moisturizer.png", title: "Moisturizer", price: "$25" },
    { image: "./images/MSI Laptop.png", title: "MSI Laptop", price: "$1100" },
    { image: "./images/Non-Fiction.png", title: "Non-Fiction Books", price: "$35" },
    { image: "./images/Nuts.png", title: "Nuts", price: "$15" },
    { image: "./images/OffRoad Rc.png", title: "OffRoad RC", price: "$160" },
    { image: "./images/Phones.png", title: "Phones", price: "$700" },
    { image: "./images/Pop-Corn.png", title: "Pop Corn", price: "$5" },
    { image: "./images/Power Bank.png", title: "Power Bank", price: "$45" },
    { image: "./images/Projector.png", title: "Projector", price: "$250" },
    { image: "./images/RC Car.png", title: "RC Car", price: "$120" },
    { image: "./images/Riz-Beer.png", title: "Riz Beer", price: "$20" },
    { image: "./images/Sandals.png", title: "Sandals", price: "$40" },
    { image: "./images/Shoe.png", title: "Shoe", price: "$75" },
    { image: "./images/SlowCooker.png", title: "Slow Cooker", price: "$100" },
    { image: "./images/Snacks.png", title: "Snacks", price: "$10" },
    { image: "./images/Speaker.png", title: "Speaker", price: "$200" },
    { image: "./images/VR.png", title: "VR", price: "$400" },
    { image: "./images/Watch.png", title: "Watch", price: "$180" },
    { image: "./images/Wireless-Charg...png", title: "Wireless Charger", price: "$30" },
    { image: "./images/Wrap-Dress.png", title: "Wrap Dress", price: "$60" },
    { image: "./images/A1.png", title: "A1", price: "$60" },
    { image: "./images/A1.png", title: "A1", price: "$60" },
    { image: "./images/A2.png", title: "A2", price: "$70" },
    { image: "./images/A3.png", title: "A3", price: "$80" },
    { image: "./images/A4.png", title: "A4", price: "$90" },
    { image: "./images/A5.png", title: "A5", price: "$100" },
    { image: "./images/A6.png", title: "A6", price: "$110" },
    { image: "./images/A7.png", title: "A7", price: "$120" },
    { image: "./images/A8.png", title: "A8", price: "$130" },
    { image: "./images/A9.png", title: "A9", price: "$140" },
    { image: "./images/A10.png", title: "A10", price: "$150" },
    { image: "./images/A11.png", title: "A11", price: "$160" },
    { image: "./images/A12.png", title: "A12", price: "$170" },
    { image: "./images/W1.png", title: "W1", price: "$60" },
    { image: "./images/W2.png", title: "W2", price: "$70" },
    { image: "./images/W3.png", title: "W3", price: "$80" },
    { image: "./images/W4.png", title: "W4", price: "$90" },
    { image: "./images/W5.png", title: "W5", price: "$100" },
    { image: "./images/W6.png", title: "W6", price: "$110" },
    { image: "./images/W7.png", title: "W7", price: "$120" },
    { image: "./images/W8.png", title: "W8", price: "$130" },
    { image: "./images/W9.png", title: "W9", price: "$140" },
    { image: "./images/W10.png", title: "W10", price: "$150" },
    { image: "./images/W11.png", title: "W11", price: "$160" },
    { image: "./images/W12.png", title: "W12", price: "$170" },
    { image: "./images/T1.png", title: "T1", price: "$60" },
    { image: "./images/T2.png", title: "T2", price: "$70" },
    { image: "./images/T3.png", title: "T3", price: "$80" },
    { image: "./images/T4.png", title: "T4", price: "$90" },
    { image: "./images/T5.png", title: "T5", price: "$100" },
    { image: "./images/T6.png", title: "T6", price: "$110" },
    { image: "./images/T7.png", title: "T7", price: "$120" },
    { image: "./images/T8.png", title: "T8", price: "$130" },
    { image: "./images/T9.png", title: "T9", price: "$140" },
    { image: "./images/T10.png", title: "T10", price: "$150" },
    { image: "./images/T11.png", title: "T11", price: "$160" },
    { image: "./images/T12.png", title: "T12", price: "$170" }
  ],

slider2: [
  { image: "./images/01.png", title: "01", price: "$60" },
  { image: "./images/02.png", title: "02", price: "$70" },
  { image: "./images/03.png", title: "03", price: "$80" },
  { image: "./images/04.png", title: "04", price: "$90" },
  { image: "./images/05.png", title: "05", price: "$100" },
  { image: "./images/06.png", title: "06", price: "$110" },
  { image: "./images/07.png", title: "07", price: "$120" },
  { image: "./images/08.png", title: "08", price: "$130" },
  { image: "./images/09.png", title: "09", price: "$140" },
  { image: "./images/10.png", title: "10", price: "$150" },
  { image: "./images/11.png", title: "11", price: "$160" },
  { image: "./images/12.png", title: "12", price: "$170" }
],

  slider3: [
    { image: "./images/Iphone 11.png", title: "iPhone 11", price: "$699" },
    { image: "./images/Iphone 12.png", title: "iPhone 12", price: "$799" },
    { image: "./images/Iphone 13.png", title: "iPhone 13", price: "$899" },
    { image: "./images/g.png", title: "G", price: "$115" },
    { image: "./images/h.png", title: "H", price: "$125" },
    { image: "./images/i.png", title: "I", price: "$135" },
    { image: "./images/A-15 Blue cover.png", title: "A-15 Blue Cover", price: "$20" },
    { image: "./images/A-15 Sky.png", title: "A-15 Sky", price: "$22" },
    { image: "./images/A-15.png", title: "A-15", price: "$24" },
    { image: "./images/Portable.png", title: "Portable", price: "$130" },
    { image: "./images/Sample.png", title: "Sample", price: "$140" },
    { image: "./images/Pixel.png", title: "Pixel", price: "$850" }
  ],

    slider4: [
      { image: "./images/A1.png", title: "A1", price: "$60" },
      { image: "./images/A2.png", title: "A2", price: "$70" },
      { image: "./images/A3.png", title: "A3", price: "$80" },
      { image: "./images/A4.png", title: "A4", price: "$90" },
      { image: "./images/A5.png", title: "A5", price: "$100" },
      { image: "./images/A6.png", title: "A6", price: "$110" },
      { image: "./images/A7.png", title: "A7", price: "$120" },
      { image: "./images/A8.png", title: "A8", price: "$130" },
      { image: "./images/A9.png", title: "A9", price: "$140" },
      { image: "./images/A10.png", title: "A10", price: "$150" },
      { image: "./images/A11.png", title: "A11", price: "$160" },
      { image: "./images/A12.png", title: "A12", price: "$170" }
    ],

      slider5: [
        { image: "./images/W1.png", title: "W1", price: "$60" },
        { image: "./images/W2.png", title: "W2", price: "$70" },
        { image: "./images/W3.png", title: "W3", price: "$80" },
        { image: "./images/W4.png", title: "W4", price: "$90" },
        { image: "./images/W5.png", title: "W5", price: "$100" },
        { image: "./images/W6.png", title: "W6", price: "$110" },
        { image: "./images/W7.png", title: "W7", price: "$120" },
        { image: "./images/W8.png", title: "W8", price: "$130" },
        { image: "./images/W9.png", title: "W9", price: "$140" },
        { image: "./images/W10.png", title: "W10", price: "$150" },
        { image: "./images/W11.png", title: "W11", price: "$160" },
        { image: "./images/W12.png", title: "W12", price: "$170" }
      ],

        slider6: [
          { image: "./images/T1.png", title: "T1", price: "$60" },
          { image: "./images/T2.png", title: "T2", price: "$70" },
          { image: "./images/T3.png", title: "T3", price: "$80" },
          { image: "./images/T4.png", title: "T4", price: "$90" },
          { image: "./images/T5.png", title: "T5", price: "$100" },
          { image: "./images/T6.png", title: "T6", price: "$110" },
          { image: "./images/T7.png", title: "T7", price: "$120" },
          { image: "./images/T8.png", title: "T8", price: "$130" },
          { image: "./images/T9.png", title: "T9", price: "$140" },
          { image: "./images/T10.png", title: "T10", price: "$150" },
          { image: "./images/T11.png", title: "T11", price: "$160" },
          { image: "./images/T12.png", title: "T12", price: "$170" }
        ]
};


function populateSlider(sliderId, category) {
  const productContainer = document.querySelector(`#${sliderId} .product-content`);
  productContainer.innerHTML = productCategories[category]
    .map(product => `
        <div class="product-box">
            <div class="img-box">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <h2 class="product-title">${product.title}</h2>
            <div class="price-and-cart">
                <span class="price">${product.price}</span>
                <i class='bx bxs-cart-add' data-tooltip="Add to Cart"></i>
                <i class='bx bxs-heart' data-tooltip="Add to Wishlist"></i>
            </div>
        </div>
      `)
    .join('');
}

// Populate sliders with assigned categories
populateSlider("slider1", "slider1");
populateSlider("slider2", "slider2");
populateSlider("slider3", "slider3");
populateSlider("slider4", "slider4");
populateSlider("slider5", "slider5");
populateSlider("slider6", "slider6");

// Scroll functionality for each slider
document.querySelectorAll(".slider-container").forEach(slider => {
  const prevBtn = slider.querySelector(".preview-btn i");
  const nextBtn = slider.querySelector(".next-btn i");
  const productContainer = slider.querySelector(".product-content");
  const scrollAmount = 250;

  nextBtn.addEventListener("click", () => {
    productContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    productContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
