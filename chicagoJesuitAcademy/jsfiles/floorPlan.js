//global variables
let roomColor =[];
let roomColor1 =[];
let roomColor2 =[];
let roomColor3 =[];
let globalFloor;


//for the radio buttons
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
let currentButton = 'button1'; // Keep track of the currently active button

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground(buttons) {
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Adjusted to canvas width and height
        drawButtons(buttons);
    };
    backgroundImage.src = 'floorPlan.bmp'; 
}


//for buttons in top bar and maps
function drawButtons(buttons) {
    buttons.forEach(button => {
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = 'black';
        context.font = '14px Arial';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
        context.strokeStyle = 'black'; // Border color
        context.lineWidth = 2; // Border width
        context.strokeRect(button.x, button.y, button.width, button.height); // Draw border
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
            array.push(getRandomNumber(10, 300));
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
  const array1 = generateSensorArrays(4)
  const array2 = generateSensorArrays(9);
  const array3 = generateSensorArrays(7);

// Define variables to store floor number and air quality parameter
let selectedRoom = null;
let selectedAirQuality = null;

// Function to handle button clicks: find which floor or quality button is clicked. pass them to updateFunction()
function handleClick(event) {
    // Check if the clicked button is a room button or air quality button
    if (event.target.classList.contains("buttonTop")) {
        // Update the selected room number
        selectedRoom = event.target.id;
    } else if (event.target.classList.contains("radioButton")) {
        // Update the selected air quality based on button ID
        selectedAirQuality = event.target.id;
    } 

    // Call the function with updated inputs
    updateFunction(selectedRoom, selectedAirQuality);
}
// Function to perform actions based on selected room number and air quality

//  Function to update the page
function updateFunction(floor, airQuality) { 
    if (!airQuality){                            //add imitial air quality
        airQuality="dewButton";
    }

  // Your logic here to perform actions based on the selected floor number and air quality

    let selectedFloor;
    let selectedParamenter;
    let currentFloorData;
    let currentParameterData;
    let workingData;
    const pass = airQuality;
    globalFloor = floor;
    console.log("Floor:", floor);            
    console.log("Air Quality:", airQuality);


    // Example: You can call another function here with the updated inputs
    const floorCount = document.querySelectorAll('.buttonTop').length;      //get to floor number of the building
    for(i=1; i<=floorCount; i++) {
      if(floor=='button'+i){      //the name of floorbutton are button1, button2....
        currentFloorData = eval('array' + i);                                    //get the data for current floor
      }  
    } 
    console.log('current floor data: '+ currentFloorData); 
   
    if (airQuality=='CO2'){
      currentParameterData = getColumn(currentFloorData, 0);
    } 
    else if (airQuality=='PM'){
      currentParameterData = getColumn(currentFloorData, 1);
    }
    else if (airQuality=='dewButton'){
      currentParameterData = getColumn(currentFloorData, 2);
    }
    else if(airQuality=='TVOC'){
      currentParameterData = getColumn(currentFloorData, 3);
    }
    else if (airQuality=='TEMP'){
      currentParameterData = getColumn(currentFloorData, 4);
    }
    else if (airQuality=='RH'){
      currentParameterData = getColumn(currentFloorData, 5);
    }
    const sensorAmount = currentFloorData.length;
    console.log('working data:' + currentParameterData);
    console.log('WWWW'+ sensorAmount);
    const dim = checkDim(pass);
    console.log('QQQ'  + dim);
    console.log("Air Quality again:", pass);

    roomColor=[];
    console.log('++++' + currentParameterData);
    for(let i=0;i<sensorAmount;i++){
      workingData = evaluateNumber(currentParameterData[i], dim);
      roomColor.push(workingData);
    }
    if (selectedRoom=='button1'){
      roomColor1=roomColor;
    }
    else if (selectedRoom=='button2'){
      roomColor2=roomColor;
    }
    else if (selectedRoom=='button3'){
      roomColor3=roomColor;
    } 
    console.log('1111111111' + roomColor1);
    console.log('2222222222' + roomColor2);
    console.log('3333222222' + roomColor3);
    console.log('%%%%%' + floor);
  }
 
//end of updateFunction function 


// Add event listeners to all buttons
document.querySelectorAll(".buttonTop, .radioButton").forEach(button => {
    button.addEventListener("click", handleClick);
});

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
  else if (input=='PM'){
    return 2;
  }
  else if (input=='dewButton'){
    return 3;
  }
  else if (input=='TVOC'){
    return 4;
  }
  else if (input=='TEMP'){
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

// Function to reset all buttons to white color for top bar and map
function resetButtonColors() {
    document.querySelectorAll('.buttonTop').forEach(button => {
        button.classList.remove('green');
    });
}

document.getElementById('button1').addEventListener('click', function() {
  resetButtonColors(); // Reset all button colors
  this.classList.add('green'); // Set the clicked button to green
  currentButton = 'button1'; // Update the current button
  const buttons = [
      //ground
      { text: 'G', x: 508, y: 140, width: 30, height: 30, color: roomColor1[0] },
      { text: 'Admin Hall', x: 538, y: 235, width: 100, height: 22, color: roomColor1[1] },
      { text: 'G33', x: 578, y: 261, width: 48, height: 120, color: roomColor1[2] },
      { text: 'G26', x: 726, y: 253, width: 60, height: 65, color: roomColor1[3] }
  ];
  drawBackground(buttons);
});


document.getElementById('button2').addEventListener('click', function() {
    resetButtonColors(); // Reset all button colors
    this.classList.add('green'); // Set the clicked button to green
    currentButton = 'button2'; // Update the current button
    const buttons = [
        //First floor
        { text: '134', x: 570, y: 115, width: 60, height: 58, color: roomColor2[0] },
        { text: '135', x: 630, y: 115, width: 65, height: 58, color: roomColor2[1] },
        { text: '136', x: 695, y: 115, width: 65, height: 58, color: roomColor2[2] },
        {text: '137', x: 510, y: 198, width: 60, height: 58, color: roomColor2[3] },
        {text: '138', x: 570, y: 198, width: 62, height: 58, color: roomColor2[4] },
        {text: '142', x: 640, y: 260, width: 60, height: 50, color: roomColor2[5] },
        {text: '141', x: 714, y: 252, width: 70, height: 58, color: roomColor2[6] },
        {text: '143', x: 640, y: 310, width: 144, height: 200, color: roomColor2[7] },
        {text: '115', x: 100, y: 250, width: 80, height: 60, color: roomColor2[8] }, 
    ];
    drawBackground(buttons);
});

document.getElementById('button3').addEventListener('click', function() {
    resetButtonColors(); // Reset all button colors
    this.classList.add('green'); // Set the clicked button to green
    currentButton = 'button3'; // Update the current button
    const buttons = [
        //Second floor
        { text: '231', x: 574, y: 115, width: 62, height: 58, color: roomColor3[0] },
        { text: '232', x: 636, y: 115, width: 62, height: 58, color: roomColor3[1] },
        { text: '233', x: 698, y: 115, width: 62, height: 58, color: roomColor3[2] },
        { text: '234', x: 510, y: 198, width: 60, height: 60, color: roomColor3[3] },
        { text: '235', x: 570, y: 198, width: 70, height: 60, color: roomColor3[4] },
        { text: '236', x: 698, y: 198, width: 70, height: 58, color: roomColor3[5] },
        { text: '210', x: 275, y: 280, width: 70, height: 60, color: roomColor3[6] },
    ];
    drawBackground(buttons);
}); 
    // Trigger the click event for the first button initially
    document.getElementById('button1').click(); 


//for radio buttons
function radioChangeColor(button, id) {                     //call it by click
    var buttons = document.querySelectorAll('.radioButton');
    buttons.forEach(function(btn) {
      if (btn === button) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

// 
function handleButtonClick3() {
  resetButtonColors(); // Reset all button colors
  if(globalFloor==='button3'){
  const buttons = [
      //Second floor
      { text: '231', x: 574, y: 115, width: 62, height: 58, color: roomColor3[0] },
      { text: '232', x: 636, y: 115, width: 62, height: 58, color: roomColor3[1] },
      { text: '233', x: 698, y: 115, width: 62, height: 58, color: roomColor3[2] },
      { text: '234', x: 510, y: 198, width: 60, height: 60, color: roomColor3[3] },
      { text: '235', x: 570, y: 198, width: 70, height: 60, color: roomColor3[4] },
      { text: '236', x: 698, y: 198, width: 70, height: 58, color: roomColor3[5] },
      { text: '210', x: 275, y: 280, width: 70, height: 60, color: roomColor3[6] },
  ];
//  drawBackground(buttons);
  document.getElementById('button3').click();
}
else if (globalFloor==='button2'){
  const buttons = [
        //First floor
        { text: '134', x: 570, y: 115, width: 60, height: 58, color: roomColor2[0] },
        { text: '135', x: 630, y: 115, width: 65, height: 58, color: roomColor2[1] },
        { text: '136', x: 695, y: 115, width: 65, height: 58, color: roomColor2[2] },
        {text: '137', x: 510, y: 198, width: 60, height: 58, color: roomColor2[3] },
        {text: '138', x: 570, y: 198, width: 62, height: 58, color: roomColor2[4] },
        {text: '142', x: 640, y: 260, width: 60, height: 50, color: roomColor2[5] },
        {text: '141', x: 714, y: 252, width: 70, height: 58, color: roomColor2[6] },
        {text: '143', x: 640, y: 310, width: 144, height: 200, color: roomColor2[7] },
        {text: '115', x: 100, y: 250, width: 80, height: 60, color: roomColor2[8] },
  ];
  document.getElementById('button2').click();
}
else{
  const buttons = [
      //ground
      { text: 'G', x: 508, y: 140, width: 30, height: 30, color: roomColor1[0] },
      { text: 'Admin Hall', x: 538, y: 235, width: 100, height: 22, color: roomColor1[1] },
      { text: 'G33', x: 578, y: 261, width: 48, height: 120, color: roomColor1[2] },
      { text: 'G26', x: 726, y: 253, width: 60, height: 65, color: roomColor1[3] }
  ];
//  drawBackground(buttons);
  document.getElementById('button1').click();
}
}   
document.getElementById('CO2').addEventListener('click', handleButtonClick3);
document.getElementById('PM').addEventListener('click', handleButtonClick3);
document.getElementById('dewButton').addEventListener('click', handleButtonClick3);
document.getElementById('TVOC').addEventListener('click', handleButtonClick3);
document.getElementById('TEMP').addEventListener('click', handleButtonClick3);
document.getElementById('RH').addEventListener('click', handleButtonClick3); 

let currentZoomLevel = window.devicePixelRatio;

function checkZoomLevel() {
    if (window.devicePixelRatio !== currentZoomLevel) {
        // Zoom level has changed
        currentZoomLevel = window.devicePixelRatio;
        console.log('Zoom level changed:', currentZoomLevel);
        
        // You can perform actions based on the zoom level change here
    }
}

// Check for zoom level changes periodically
setInterval(checkZoomLevel, 1000); // Check every second