export function generate_about() {
  content = document.querySelector("#content");
  content.innerHTML = `
    <div class="contact">
        <p>Phone: (555) 123-4567</p>
        <p>Email: info@undefinedpizza.com</p>
        <p>Address: 123 Pizza Lane, Foodie Town, 45678</p>
    </div>`;
}
