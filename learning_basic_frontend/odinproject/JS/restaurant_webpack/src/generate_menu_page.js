export function generate_menu() {
  content = document.querySelector("#content");
  content.innerHTML = `
    <div id="menu">
        <div class="menu-item">
            <div class="pizza-img"></div>
            <p>Margherita - Tomato, mozzarella, basil. 🍅🧀🌿</p>
            <p>Price: 10$</p>
        </div>
        <div class="menu-item">
            <div class="pizza-img"></div>
            <p>Pepperoni - Tomato, mozzarella, spicy pepperoni. 🔥🍕</p>
            <p>Price: 12$</p>
        </div>
        <div class="menu-item">
            <div class="pizza-img"></div>
            <p>BBQ Chicken - BBQ sauce, chicken, red onion, mozzarella. 🍗🧅</p>
            <p>Price: 15$</p>
        </div>
        <div class="menu-item">
            <div class="pizza-img"></div>
            <p>Veggie Supreme - Tomato, mozzarella, peppers, olives, mushrooms. 🫑🫒🍄</p>
            <p>Price: 20$</p>
        </div>
    </div>`;
}
