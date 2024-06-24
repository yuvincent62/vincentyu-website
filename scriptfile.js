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
