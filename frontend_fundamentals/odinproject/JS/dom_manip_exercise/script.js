const container = document.querySelector("#container");

// Red paragraph
const paragraph = document.createElement("p");
paragraph.innerText = "I'm a red paragraph.";
paragraph.style.color = "red";
container.appendChild(paragraph);

// Blue h3
const h_three = document.createElement("h3");
h_three.innerText = "I'm a blue h3.";
h_three.style.color = "blue";
container.appendChild(h_three);

// Div with black border and pink background color
const new_div = document.createElement("div");
new_div.style.backgroundColor = "pink";
new_div.style.border = "1px solid black";

const h_one = document.createElement("h1");
h_one.innerText = "H1 inside a div";
new_div.appendChild(h_one);

const inner_para = document.createElement("p");
inner_para.innerText = "Para inside a div";
new_div.appendChild(inner_para);

container.appendChild(new_div);