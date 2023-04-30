const gridSize = 33.5;
const canvasWidth = 500 * 26;
const canvasHeight = 500;
const size = 90;

// Define shapes
const circle = {
    x: 0,
    y: 0,
    size: size,
    draw: (ctx, x, y, scale = 1, alpha = 1) => {
      ctx.beginPath();
      ctx.arc(x + (size / 2) * scale, y + (size / 2) * scale, (size / 2) * scale, 0, 2 * Math.PI);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 20;
      ctx.globalAlpha = 0.5; // set the opacity of the shape
      ctx.stroke();
      ctx.globalAlpha = 1; // reset the opacity of the canvas context
      addMoveListener(ctx.canvas, x, y, scale);
    }
  };
      
  const triangle = {
    x: 0,
    y: 0,
    size: size,
    draw: (ctx, x, y, scale = 1, alpha = 1) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size * scale, y);
      ctx.lineTo(x + (size / 2) * scale, y + size * scale);
      ctx.closePath();
      ctx.fillStyle = "green";
      ctx.globalAlpha = 0.5; // set the opacity of the shape
      ctx.fill();
      ctx.globalAlpha = 1; // reset the opacity of the canvas context
      addMoveListener(ctx.canvas, x, y, scale);
    }
  };
      
  const slantedBar = {
    x: 0,
    y: 0,
    size: size,
    draw: (ctx, x, y, scale = 1.5, alpha = 1) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size * scale, y - size * scale);
      ctx.lineTo(x + size * scale, y - size * scale + 25 * scale);
      ctx.lineTo(x, y + 30 * scale);
      ctx.closePath();
      ctx.fillStyle = "purple";
      ctx.globalAlpha = 0.5; // set the opacity of the shape
      ctx.fill();
      ctx.globalAlpha = 1; // reset the opacity of the canvas context
      addMoveListener(ctx.canvas, x, y, scale);
    }
  };
    
  const semiCircle = {
    x: 0,
    y: 0,
    size: size,
    draw: (ctx, x, y, scale = 1, alpha = 1) => {
      ctx.beginPath();
      ctx.arc(x + size/2 * scale, y + size/2 * scale, size/2 * scale, Math.PI, 0);
      ctx.lineTo(x + size * scale, y + size * scale);
      ctx.closePath();
      ctx.fillStyle = "orange";
      ctx.globalAlpha = 0.5; // set the opacity of the shape
      ctx.fill();
      ctx.globalAlpha = 1; // reset the opacity of the canvas context
      addMoveListener(ctx.canvas, x, y, scale);
    }
  };
    
  const square = {
    x: 0,
    y: 0,
    size: size,
    draw: (ctx, x, y, scale = 1.5, alpha = 1) => {
      ctx.beginPath();
      ctx.rect(x, y, size/3 * scale, size * scale);
      ctx.fillStyle = "red";
      ctx.globalAlpha = 0.5; // set the opacity of the shape
      ctx.fill();
      ctx.globalAlpha = 1; // reset the opacity of the canvas context
      addMoveListener(ctx.canvas, x, y, scale);
    }
  };

// Define buttons
const squareBtn = document.getElementById("square-btn");
const circleBtn = document.getElementById("circle-btn");
const triangleBtn = document.getElementById("triangle-btn");
const slantedBarBtn = document.getElementById("slantedBar-btn");
const semiCircleBtn = document.getElementById("semiCircle-btn");


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
  
  slantedBarBtn.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("shape", "slantedBar");
  });
  
  semiCircleBtn.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("shape", "semiCircle");
  });

const canvasContainer = document.createElement("div");
canvasContainer.style.overflowX = "scroll";
canvasContainer.style.whiteSpace = "nowrap";
canvasContainer.style.display = "flex";
canvasContainer.style.flexWrap = "nowrap";

for (let i = 0; i < 26; i++) {
  const container = document.createElement("div"); // create a new container
  container.style.marginRight = "50px";

  const canvas = document.createElement("canvas");
  canvas.id = `canvas${i}`;
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.border = "1px solid white";
  canvas.style.marginTop = "70px";

  const label = document.createElement("div");
  label.style.marginTop = "10px"; // add top margin to label

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Enter character";
  labelInput.style.border = "1px solid white";
  labelInput.style.backgroundColor = "rgb(34, 34, 34)";
  labelInput.width = "500px"; // add placeholder to input
  labelInput.addEventListener("input", () => {
    label.textContent = labelInput.value;

  });

  labelInput.style.marginTop = "5px"; // add top margin to input

  container.appendChild(label);
  container.appendChild(canvas);
  container.appendChild(labelInput); // add label input to container
  canvasContainer.appendChild(container);

  const ctx = canvas.getContext("2d");
  canvas.addEventListener("dragover", (event) => {
    event.preventDefault(); // prevent default behavior
  });
 
  canvas.addEventListener("dragenter", (event) => {
    event.preventDefault(); // prevent default behavior
    canvas.style.border = "1px dashed blue"; // add a dashed border to the canvas to indicate that the shape can be dropped here
  });

  canvas.addEventListener("dragleave", (event) => {
    event.preventDefault(); // prevent default behavior
    canvas.style.border = "1px solid white"; // remove the dashed border when the shape is dragged away from the canvas
  });
  
  canvas.addEventListener("drop", (event) => {
    event.preventDefault(); // prevent default behavior
    canvas.style.border = "1px solid white"; // remove the dashed border
  
    
    // get the shape from the data transfer object
    const shape = event.dataTransfer.getData("shape");
  
    // get the canvas context
    const ctx = canvas.getContext("2d");
  
    // get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // draw the shape at the mouse position
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
      case "slantedBar":
        slantedBar.draw(ctx, x, y);
        break;
      case "semiCircle":
        semiCircle.draw(ctx, x, y);
        break;
      default:
        break;
    }     
  });

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

ctx.textAlign = "center";
ctx.textBaseline = ""; // center the text horizontally
 
  ctx.font = "bold 400px sans-serif";
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillText(String.fromCharCode(65+i), 180, 350);
}



document.body.appendChild(canvasContainer);







