var canvas = new fabric.Canvas('c', {
  backgroundColor: 'rgb(34, 34, 34)', // Set the canvas background color
  width: 500, // Set the canvas width
  height: 500, // Set the canvas height
  selection: false // Disable object selection
});




// Add a grid to the canvas
var gridSize = 33.3;
for (var i = 0; i < canvas.width / gridSize; i++) {
  canvas.add(new fabric.Line([ i * gridSize, 0, i * gridSize, canvas.height], { stroke: 'white', selectable: false }));
}

for (var i = 0; i < canvas.height / gridSize; i++) {
  canvas.add(new fabric.Line([ 0, i * gridSize, canvas.width, i * gridSize], { stroke: 'white', selectable: false }));
}


var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.transparentCorners = true;
fabric.Object.prototype.cornerColor = 'white';
fabric.Object.prototype.cornerStyle = 'circle';

function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function Add() {
  var rect = new fabric.Rect({
    left: 100,
    top: 50,
    fill: getRandomColor(),
    width: 71.5,
    height: 200,
    objectCaching: false,
    opacity: 0.65,
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
}

function AddCircle() {
  var circle = new fabric.Circle({
    left: 100,
    top: 150,
    radius: 50,
    fill: '',
    objectCaching: false,
    stroke: getRandomColor(),
    strokeWidth: 25,
    opacity: 0.65,
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
}

function AddTriangle() {
  var triangle = new fabric.Triangle({
    left: 100,
    top: 250,
    fill: getRandomColor(),
    width: 100,
    height: 100,
    objectCaching: false,
    opacity: 0.65,
  });

  canvas.add(triangle);
  canvas.setActiveObject(triangle);
}

function AddSquare() {
  var square = new fabric.Rect({
    left: 100,
    top: 50,
    fill: getRandomColor(),
    width: 71.5,
    height: 71.5,
    objectCaching: false,
    opacity: 0.65,
  });

  canvas.add(square);
  canvas.setActiveObject(square);
}

function AddBar() {
    var barWidth = 71.5;
    var barHeight = 200;
    var slantAngle = 25; // Set the slant angle here
  
    var points = [
      { x: 0, y: 0 },
      { x: barWidth, y: 0 },
      { x: barWidth - barHeight * Math.tan(fabric.util.degreesToRadians(slantAngle)), y: barHeight },
      { x: -barHeight * Math.tan(fabric.util.degreesToRadians(slantAngle)), y: barHeight }
    ];
  
    var bar = new fabric.Polygon(points, {
      left: 100,
      top: 100,
      fill: getRandomColor(),
      objectCaching: false,
      opacity: 0.65,
    });

  canvas.add(bar);
  canvas.setActiveObject(bar);
}



fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24
});

Add();

function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}

var canvasNameInput = document.getElementById('canvasNameInput');

canvasNameInput.addEventListener('change', function() {
  var canvasName = canvasNameInput.value;
  canvas.set('name', canvasName);
});

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {
  // Convert the canvas to a PNG image data URL
  const imageDataUrl = canvas.toDataURL({ format: 'png' });

  // Create a download link and click it to start the download
  const downloadLink = document.createElement('a');
  downloadLink.href = imageDataUrl;
  downloadLink.download = 'myart.png';
  downloadLink.click();
});