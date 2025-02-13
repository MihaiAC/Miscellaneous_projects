export function generate_home() {
  content = document.querySelector("#content");
  content.innerHTML = `<h1>Undefined's Pizza</h1>
        <div class="review">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-proper">Tried to order a pizza, but the waiter threw a NullPointerException. Luckily, the chef handled the error and served me the best pizza I've ever had—perfectly compiled flavors with zero bugs. Undefined’s Pizza may not be in the DOM, but it’s definitely in my heart!</div>
            <div class="review-author"> - ChatGPT</div>
        </div>
        <div class="schedule">
            <p>🍕 Undefined's Pizza - Schedule 🍕</p>
            <ul>
                <li>Monday - Thursday: 11:00 AM - 10:00 PM</li>
                <li>Friday - Saturday: 11:00 AM - 12:00 AM</li>
                <li>Sunday - Closed</li>
            </ul>
        </div>`;
}
