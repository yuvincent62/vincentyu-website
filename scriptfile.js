var zoomLevel = false;
var schoolSelection = null;
var map;
var markerArray = [];
var roomMarkers = [];
var activeTopButtonId = 'top1';
var activeBottomButtonText = 'Dew Point';
var initialMapCenter = [43.0731, -89.4012];
var initialMapZoom = 8;

var options = {
  topOption: 'Ground',
  bottomOption: 'Dew Point'
};

function activateButton(button, canvasId) {
  var canvasType = canvasId === 'topCanvas' ? 'topOption' : 'bottomOption';

  var buttons = document.querySelectorAll('#' + canvasId + ' .button, #' + canvasId + ' .buttonTop, #' + canvasId + ' .buttonBottom');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  });

  button.classList.add('active');
  button.style.backgroundColor = "green";
  button.style.color = "white";

  options[canvasType] = button.nextElementSibling.textContent.trim();

  if (canvasId === 'topCanvas') {
    activeTopButtonId = button.id;
  } else if (canvasId === 'bottomCanvas') {
    activeBottomButtonText = button.nextElementSibling.textContent.trim();
  }

  onOptionChange(canvasType, options[canvasType]);

  const currentSchool = schoolSelection;
  const currentFloor = options.topOption;
  const currentParameter = activeBottomButtonText;
  let colorArray = [];
  zoomLevel = (map.getZoom() === 20.5);
  if (zoomLevel) {
    colorArray = SetColorArray(currentSchool, currentFloor, currentParameter);
  }
  updateMarkerColors(colorArray);
}

    function createTopCanvasButtons(school) {
      var topCanvas = document.getElementById('topCanvas');
      topCanvas.innerHTML = '';

      var buttonNames = school === 1 ? ['Ground', 'First', 'Second'] : ['Floor1', 'Floor2'];
      buttonNames.forEach(function(name, index) {
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';
        var button = document.createElement('button');
        button.id = 'top' + (index + 1);
        button.className = 'buttonTop';
        button.onclick = function() { activateButton(this, 'topCanvas'); };
        var span = document.createElement('span');
        span.className = 'buttonText';
        span.textContent = name;
        buttonContainer.appendChild(button);
        buttonContainer.appendChild(span);
        topCanvas.appendChild(buttonContainer);
      });

      // Ensure the first button is active
      var firstButton = topCanvas.querySelector('.buttonTop');
      if (firstButton) {
        activateButton(firstButton, 'topCanvas');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      var initialMapCenter = [43.0731, -89.4012];
      var initialMapZoom = 8;
  
      function returnToInitialMapView() {
        console.log("Return button clicked");
        map.setView(initialMapCenter, initialMapZoom);
      }
  
      document.getElementById('returnButton').addEventListener('click', returnToInitialMapView);
    });
  
      function createPiechartIcon(data, size, text) {
        function percentageToAngle(percentage) {
          return (percentage / 100) * 360;
        }
  
        function describeArc(x, y, radius, startAngle, endAngle) {
          var start = polarToCartesian(x, y, radius, endAngle);
          var end = polarToCartesian(x, y, radius, startAngle);
          var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
          var d = [
            "M", x, y,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
          ].join(" ");
          return d;
        }
  
        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
          return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
          };
        }
  
        var startAngle = 0;
        var paths = data.map(function(segment) {
          var endAngle = startAngle + percentageToAngle(segment.percentage);
          var path = describeArc(16, 16, 16, startAngle, endAngle);
          startAngle = endAngle;
          return `<path d="${path}" fill="${segment.color}"/>`;
        }).join("");
  
        var svg = `
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            ${paths}
            <circle cx="16" cy="16" r="10" fill="white"/>
            <text x="16" y="21" font-size="10" text-anchor="middle" fill="#000">${text}</text>
          </svg>`;
        var url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
        return new L.Icon({
          iconUrl: url,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2]
        });
      }

      function createColoredIcon(color, width, height, text) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, width, height);

      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(text, width / 2, height / 2);

      return L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [width, height],
        iconAnchor: [width / 2, height / 2]
      });
    }











//generate data
// Function to generate a random number within a specified range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate sensor arrays for specified number of rooms
function generateSensorArrays(numSensor) {
  let sensorArrays = [];
  
  for (let sensor = 1; sensor <= numSensor; sensor++) {
    let array = [];
    for (let i = 0; i < 6; i++) {
      switch (i) {
        case 0: // CO2
          array.push(getRandomNumber(400, 2500));
          break;
        case 1: // PM2.5
          array.push(getRandomNumber(10, 30));
          break;
        case 2: // Dew point
          array.push(getRandomNumber(30, 70));
          break;
        case 3: // TVOC
          array.push(getRandomNumber(0, 12));
          break;
        case 4: // Temperature
          array.push(getRandomNumber(40, 100));
          break;
        case 5: // Relative humidity
          array.push(getRandomNumber(10, 100));
          break;
      }   
    }
    sensorArrays.push(array);
  }
  return sensorArrays;
}
  //generate data for each floor
const array11 = generateSensorArrays(4)
const array12 = generateSensorArrays(9);
const array13 = generateSensorArrays(7);
const array21 = generateSensorArrays(2);
const array22 = generateSensorArrays(2);

function SetColorArray(school, floor, airQuality){
  let colorAy=[];
  let currentFloorData;
  if(school===1){
    if(floor==='Ground'){
      currentFloorData=array11;
    }else if (floor==='First'){
      currentFloorData=array12
    }else if(floor==='Second'){
      currentFloorData=array13;
    }
  }else if(school===2){
    if(floor==='Floor1'){
      currentFloorData=array21;
    }else if(floor==='Floor2'){
      currentFloorData=array22;
    }
  } 
  if (airQuality=='CO2'){
    currentParameterData = getColumn(currentFloorData, 0);
  } 
  else if (airQuality=='PM2.5'){
    currentParameterData = getColumn(currentFloorData, 1);
  }
  else if (airQuality=='Dew Point'){
    currentParameterData = getColumn(currentFloorData, 2);
  }
  else if(airQuality=='TVOC'){
    currentParameterData = getColumn(currentFloorData, 3);
  }
  else if (airQuality=='Temperature'){
    currentParameterData = getColumn(currentFloorData, 4);
  }
  else if (airQuality=='Relative Humidity'){
    currentParameterData = getColumn(currentFloorData, 5);
  }
  const sensorAmount = currentFloorData.length;
  const dim = checkDim(airQuality);

  roomColor=[];
  for(let i=0;i<sensorAmount;i++){
    workingData = evaluateNumber(currentParameterData[i], dim);
    roomColor.push(workingData);
  }
  return roomColor;
}

function SetValueArray(school, floor, airQuality){
  let currentFloorData;
  if(school===1){
    if(floor==='Ground'){
      currentFloorData=array11;
    }else if (floor==='First'){
      currentFloorData=array12
    }else if(floor==='Second'){
      currentFloorData=array13;
    }
  }else if(school===2){
    if(floor==='Floor1'){
      currentFloorData=array21;
    }else if(floor==='Floor2'){
      currentFloorData=array22;
    }
  } 
  if (airQuality=='CO2'){
    currentParameterData = getColumn(currentFloorData, 0);
  } 
  else if (airQuality=='PM2.5'){
    currentParameterData = getColumn(currentFloorData, 1);
  }
  else if (airQuality=='Dew Point'){
    currentParameterData = getColumn(currentFloorData, 2);
  }
  else if(airQuality=='TVOC'){
    currentParameterData = getColumn(currentFloorData, 3);
  }
  else if (airQuality=='Temperature'){
    currentParameterData = getColumn(currentFloorData, 4);
  }
  else if (airQuality=='Relative Humidity'){
    currentParameterData = getColumn(currentFloorData, 5);
  }
  return currentParameterData;
}

console.log('*****************' + SetValueArray(1, 'Ground', 'CO2'));


const thresholds = {
  dim1: { red: [2000, -10], yellow: [1000, -5] },
  dim2: { red: [25, -10], yellow: [18, -5] },
  dim3: { red: [60, -10], yellow: [55, -5] },
  dim4: { red: [10, -10], yellow: [1, -5] },
  dim5: { red: [90, 55], yellow: [81, 65] },
  dim6: { red: [80, 20], yellow: [60, 30] }
};

function evaluateNumber(number, dim) {
  const threshold = thresholds['dim' + dim];
  const redMax = threshold.red[0];
  const redMin = threshold.red[1];
  const yellowMax = threshold.yellow[0];
  const yellowMin = threshold.yellow[1];

  if (number > redMax || number < redMin) {
      return 'red';
  } else if ((number < redMax && number > yellowMax) || (number < yellowMin && number > redMin)) {
      return 'yellow';
  } else {
      return 'green';
  }
}

function checkDim(input){
  if (input=='CO2'){
    return 1;
  }
  else if (input=='PM2.5'){
    return 2;
  }
  else if (input=='Dew Point'){
    return 3;
  }
  else if (input=='TVOC'){
    return 4;
  }
  else if (input=='Temperature'){
    return 5;
  }
  else {
    return 6;
  }
}

function getColumn(array, i) {
    // Create an empty array to store the elements of the column
    var column = [];

    // Loop through each row of the array
    for (var j = 0; j < array.length; j++) {
        // Push the element at index i of each row to the column array
        column.push(array[j][i]);
    }

    // Return the column array
    return column;
}





