// Get all of the .canvas-group elements from the page, and put it in an array
var canvases = [] 

var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  
  var img = document.createElement('img');
  img.src = deleteIcon;
  
  fabric.Object.prototype.transparentCorners = true;
  fabric.Object.prototype.cornerColor = 'white';
  fabric.Object.prototype.cornerStyle = 'circle';

var drawGrid = function(canvasToWorkOn) {
    var gridSize = 33.3;
    for (var j = 0; j < canvasToWorkOn.width / gridSize; j++) {
        canvasToWorkOn.add(new fabric.Line([ j * gridSize, 0, j * gridSize, canvasToWorkOn.height], { stroke: 'white', selectable: false }));
    }
    for (var k = 0; k < canvasToWorkOn.height / gridSize; k++) {
        canvasToWorkOn.add(new fabric.Line([ 0, k * gridSize, canvasToWorkOn.width, k * gridSize], { stroke: 'white', selectable: false }));
    }
};

var saveLetter = function(canvas) {
    // Create a new canvas with a transparent background
    var transparentCanvas = new fabric.Canvas('transparentCanvas', {
      backgroundColor: 'transparent',
      width: canvas.width,
      height: canvas.height
    });
  
    // Clone each fabric object on the original canvas and add it to the new canvas
    canvas.forEachObject(function(obj) {
      var clone = fabric.util.object.clone(obj);
      transparentCanvas.add(clone);
    });
  
    // Remove the grid from the new canvas
    transparentCanvas.getObjects('line').forEach(function(line) {
      transparentCanvas.remove(line);
    });
  
    // Convert the new canvas to a data URL with a transparent background
    var dataURL = transparentCanvas.toDataURL('image/png');
  
    // Set the download link href to the data URL
    // downloadBtn.href = dataURL;
    console.log(dataURL);
  };

  var getRandomColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

var AddCircle = function(canvas) {
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
  };

  var AddRect = function(canvas) {
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
  };

  var AddTriangle = function(canvas) {
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

  var AddSquare = function(canvas) {
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

  
  var AddBar = function(canvas) {
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

var fabricOptions = {
  backgroundColor: 'rgb(34, 34, 34)', // Set the canvas background color
  width: 500, // Set the canvas width
  height: 500, // Set the canvas height
  selection: false // Disable object selection
};

var setupCanvases = function() {
  // Get all elements from the page with .canvas-group class
  var canvasgroups = document.getElementsByClassName("canvas-group");
  // Loop through all of the canvas groups
  for (var i = 0; i < canvasgroups.length; i++) {
    // Generate our ID, c0, c1, c2 ...
    var canvasID = "c" + i;
    // Create the fabric object using that ID
    canvases.push(new fabric.Canvas(canvasID, fabricOptions));
    // Add a grid to the canvas
    drawGrid(canvases[i]);
    // AddCircle(canvases[i]);
    // saveLetter(canvases[i]);
  }
};

setupCanvases();

var allRectButtons = document.getElementsByClassName("add-rectangle");

for (var l = 0; l < allRectButtons.length; l++) {
    allRectButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        AddRect(canvas);
    });
}

var allCircleButtons = document.getElementsByClassName("add-circle");

for (var l = 0; l < allCircleButtons.length; l++) {
    allCircleButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        AddCircle(canvas);
    });
}

var allTriangleButtons = document.getElementsByClassName("add-triangle");

for (var l = 0; l < allTriangleButtons.length; l++) {
    allTriangleButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        AddTriangle(canvas);
    });
}

var allSquareButtons = document.getElementsByClassName("add-square");

for (var l = 0; l < allSquareButtons.length; l++) {
    allSquareButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        AddSquare(canvas);
    });
}

var allBarButtons = document.getElementsByClassName("add-bar");

for (var l = 0; l < allBarButtons.length; l++) {
    allBarButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        AddBar(canvas);
    });
}

var allDownloadButtons = document.getElementsByClassName("downloadBtn");

for (var l = 0; l < allDownloadButtons.length; l++) {
    allDownloadButtons[l].addEventListener("click", function() {
        var canvasId = this.getAttribute("data-canvas");
        var canvas = canvases[canvasId];
        saveLetter(canvas);
    });
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




/*

  downloadBtn.download = 'canvas.png';
  
  downloadBtn.addEventListener('click', );
  
  var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  
  var img = document.createElement('img');
  img.src = deleteIcon;
  
  fabric.Object.prototype.transparentCorners = true;
  fabric.Object.prototype.cornerColor = 'white';
  fabric.Object.prototype.cornerStyle = 'circle';
  

  
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
  */