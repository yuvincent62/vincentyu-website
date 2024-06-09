const popup = document.getElementById('popup');
const chartCanvas = document.getElementById('chartCanvas');
const ctx = chartCanvas.getContext('2d');
var room = "";

// Function to open the popup
function openPopup(room) {
    var roomInfo = getRoomInfo(room);
    popup.style.display = 'block';


//set value for the 6 button
var button = document.getElementById('CO2');
button.textContent = 'CO2: ' + roomInfo.co2 + ' PPM';

var button = document.getElementById('DewPoint');
button.textContent = 'Dew Point: ' +roomInfo.dewPoint + '°F';

var button = document.getElementById('RH');
button.textContent = 'RH: ' + roomInfo.humidity + '%';

var button = document.getElementById('PM');
button.textContent = 'PM2.5: ' + roomInfo.pm25 + ' UM/M3';

var button = document.getElementById('TMP');
button.textContent = 'Temperature: ' + roomInfo.tmp + '°F';

var button = document.getElementById('TVOC');
button.textContent = 'TVOC: ' + roomInfo.tvoc + ' PPM';
} 

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}

// Function to generate random data and draw the chart
function generateRandomData() {
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push(Math.floor(Math.random() * 100));
    }

    // Clear previous chart
    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

    // Draw chart
    drawLineChart(data);
}

// Mock function to get room information
function getRoomInfo(room) {

    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

    // Mock data, you can replace this with actual data retrieval logic
    if (room === 'room1') {
        return { co2: '690.50', humidity: '50.2', dewPoint: '63.5', pm25: '15.5', tmp: '65.2', tvoc: '500' };
    } else if (room === 'room2') {
        return { co2: '730.10', humidity: '45.5', dewPoint: '64.2', pm25: '20.4', tmp: '70.1', tvoc: '600' };
    } else if (room === 'room3') {
        return { co2: '528.31', humidity: '55.1', dewPoint: '50.7', pm25: '10.9', tmp: '72.9', tvoc: '400' };
    } else if (room === 'room4') {
        return { co2: '942.85', humidity: '48.7', dewPoint: '70.2', pm25: '18.1', tmp: '85.7', tvoc: '550' };
    } else if (room === 'room5') {
        return { co2: '1005.84', humidity: '53.4', dewPoint: '56.7', pm25: '12.7', tmp: '63.4', tvoc: '450' };
    } else if (room === 'room6') {
        return { co2: '786.25', humidity: '51.8', dewPoint: '53.2', pm25: '14.6', tmp: '67.9', tvoc: '700' };
    } else {
        return { temperature: 'N/A', humidity: 'N/A', dewPoint: 'N/A', pm25: 'N/A', tmp: 'N/A', tvoc: 'N/A' };
    }
  }

// Function to draw a line chart
function drawLineChart(data) {
const numPoints = data.length;
const chartWidth = chartCanvas.width - 40;
const chartHeight = chartCanvas.height - 40;
const pointSpacing = chartWidth / (numPoints - 1);

ctx.beginPath();
ctx.moveTo(20, chartHeight - data[0]);

// Draw lines connecting data points
data.forEach((value, index) => {
const x = 20 + index * pointSpacing;
const y = chartHeight - value;
ctx.lineTo(x, y);
});

// Style the lines
ctx.lineWidth = 2;
ctx.strokeStyle = 'blue';
ctx.stroke();

// Draw data points
data.forEach((value, index) => {
const x = 20 + index * pointSpacing;
const y = chartHeight - value;

ctx.beginPath();
ctx.arc(x, y, 3, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();
});
}

function goToMap() {
    // Go back to the index page in the parent folder
    window.location.href = "../index.html";
}
