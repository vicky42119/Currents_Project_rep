const gridSize = 10;
const canvasWidth = 500 * 26; // Set canvas width to 500 x 26 for 26 canvases
const canvasHeight = 500;
const size = 50; // Size of shapes

// Define shapes
const square = {
  draw: (ctx, x, y) => {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, size, size);
  }
};

const circle = {
  draw: (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
  }
};

const triangle = {
  draw: (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
  }
};

// Define buttons
const squareBtn = document.getElementById("square-btn");
const circleBtn = document.getElementById("circle-btn");
const triangleBtn = document.getElementById("triangle-btn");

// Add event listeners to buttons
squareBtn.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("shape", "square");
});

circleBtn.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("shape", "circle");
});

triangleBtn.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("shape", "triangle");
});


// Create canvases and add event listeners
const canvasContainer = document.createElement("div");
canvasContainer.style.overflowX = "scroll";
canvasContainer.style.whiteSpace = "nowrap";
canvasContainer.style.display = "flex";

for (let i = 0; i < 26; i++) {
  const canvas = document.createElement("canvas");
  canvas.id = `canvas${i}`;
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.border = "1px solid black";
  canvas.style.marginRight = "10px";

  const ctx = canvas.getContext("2d");

  // Create grid
  for (let x = 0; x <= canvasWidth; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
  }

  for (let y = 0; y <= canvasHeight; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
  }

  ctx.strokeStyle = "lightgray";
  ctx.stroke();

  // Add event listener to canvas
  canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    const shape = event.dataTransfer.getData("shape");
    const x = Math.floor((event.clientX - canvas.offsetLeft) / gridSize) * gridSize;
    const y = Math.floor((event.clientY - canvas.offsetTop) / gridSize) * gridSize;

    switch (shape) {
      case "square":
        square.draw(ctx, x, y);
        break;
      case "circle":
        circle.draw(ctx, x, y);
        break;
      case "triangle":
        triangle.draw(ctx, x, y);
        break;
    }
  });

  canvasContainer.appendChild(canvas);
}

document.body.appendChild(canvasContainer);







