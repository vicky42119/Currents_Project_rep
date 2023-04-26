

let container = document.querySelector(".grid-container");

for (let i = 0; i < 16 * 16; i++){
  let newDiv = document.createElement("div");
  newDiv.classList.add("pixel");

  newDiv.addEventListener("click", function(){
    newDiv.style.backgroundColor = "red";
  })
  container.appendChild(newDiv);
}

character = document.getElementById("grid-container");
      // Function to increase image size
      function enlargeImg() {
          // Set image size to 1.5 times original
          character.style.transform = "scale(1.5)";
          // Animation effect
          character.style.transition = "transform 0.25s ease";
      }

// Function to reset image size
function resetImg() {
  // Set image size to original
  character.style.transform = "scale(1)";
  character.style.transition = "transform 0.25s ease";
}

generateContent();

const screen = document.querySelector('.background-screen');
let currentItem;

function imageClick() {
  screen.style.display = 'block';
  currentItem = event.currentTarget;
}

function closeScreen() {
  screen.style.display = 'none';

}