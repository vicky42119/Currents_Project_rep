let container = document.querySelector(".grid-container");

for (let i = 0; i < 16 * 16; i++){
  let newDiv = document.createElement("div");
  newDiv.classList.add("pixel");

  newDiv.addEventListener("click", function(){
    newDiv.style.backgroundColor = "red";
  })
  container.appendChild(newDiv);
}




          

