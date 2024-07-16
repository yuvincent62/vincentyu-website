  class classSensor {
    constructor(name, color, width, height, lat, lng, text, number, borderRadius = "0") {
      this.name = name;
      this.color = color;
      this.width = width;
      this.height = height;
      this.lat = lat;
      this.lng = lng;
      this.text = text;
      this.number = this.createMarkerNumber(number);
      this.borderRadius = borderRadius; // New property for borderRadius
      this.icon = this.createColoredIcon(); // Initialize icon using createColoredIcon method
      this.marker = L.marker([lat, lng], { icon: this.icon, zIndexOffset: 100 }).addTo(map);
      this.marker.bindPopup(`<b>${this.name}</b>`);
      this.showCanvas4 = this.showCanvas4.bind(this);
      this.marker.on('click', () => this.showCanvas4(name)); // Pass the room name
      this.marker.on('mouseover', () => this.showNumberPopup());
      this.marker.on('mouseout', () => this.hideNumberPopup());
    }
  
    createColoredIcon() {
      const { color, width, height, text, borderRadius } = this;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
  
      // Draw rounded rectangle with border
      ctx.fillStyle = color;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
  
      // Draw rounded rectangle
      const cornerRadius = parseFloat(borderRadius); // Convert borderRadius to a float number
      ctx.beginPath();
      ctx.moveTo(cornerRadius, 0);
      ctx.lineTo(width - cornerRadius, 0);
      ctx.quadraticCurveTo(width, 0, width, cornerRadius);
      ctx.lineTo(width, height - cornerRadius);
      ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
      ctx.lineTo(cornerRadius, height);
      ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
      ctx.lineTo(0, cornerRadius);
      ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
      ctx.closePath();
      
      ctx.fill();
      ctx.stroke();
  
      // Draw text in the center
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
  
      // Return L.icon object with canvas image data
      return L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [width, height],
        iconAnchor: [width / 2, height / 2]
      });
    }
  
    createMarkerNumber(number) {
      const markerNumber = document.createElement('div');
      markerNumber.className = 'marker-number';
      markerNumber.innerText = number;
      return markerNumber;
    }
  
    // Other methods remain unchanged
    updateColor(newColor) {
      this.color = newColor;
      this.icon = this.createColoredIcon();
      this.marker.setIcon(this.icon);
    }
  
    showCanvas4(roomName) {
      activeRoomName = roomName; // Set the active room name
      document.getElementById('canvasContainer4').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
  
      // Trigger clicks on button43 and Day
      document.getElementById('button43').click();
      document.getElementById('day').click();
    }
  
    showNumberPopup() {
      if (this.marker.options.opacity === 1) {
        this.marker.bindPopup(`<b>${this.number.innerText}</b>`).openPopup();
      }
    }
  
    hideNumberPopup() {
      this.marker.closePopup();
    }
  
    hideMarker() {
      this.marker.setOpacity(0);
      this.marker.unbindPopup();
    }
  
    showMarker() {
      this.marker.setOpacity(1);
      this.marker.bindPopup(`<b>${this.name}</b>`);
    }
  }
  
function defineAndDisplayRoomMarkers(school, floor, parameter) {
  clearRoomMarkers();

  const bottomOption = activeBottomButtonText;
  const valueArrayIn = SetValueArray(school, floor, bottomOption);
  let valueArray = valueArrayIn.map(num => parseFloat(num.toFixed(1)));

  console.log('11111 parameter' + parameter);
  console.log('11111 school' + school);
  console.log('11111 floor' + floor);
  console.log('11111 bottomOption' + bottomOption);
  console.log('1111 valuearray' +valueArray);

  let suffix = '';
  let prefix = '';
  if (parameter === 'CO2') {
      prefix = 'CO2: ';
      suffix = 'ppm';
  } else if (parameter === 'PM2.5') {
      prefix = 'PM2.5: ';
      suffix = 'µg/m\u00B3';
  } else if (parameter === 'Dew Point') {
      prefix = 'Dew Point: ';
      suffix = '\u00B0F';
  } else if (parameter === 'TVOC') {
      prefix = 'TVOC: ';
      suffix = 'µg/m\u00B3';
  } else if (parameter === 'Relative Humidity') {
      prefix = 'RH: ';
      suffix = '%';
  } else if (parameter === 'Temperature') {
      prefix = 'Temp: ';
      suffix = '\u00B0F';
  }

  function setScallor(){
    const zoom= map.getZoom();
    return Math.pow(2, zoom - 20.5); 
  }

  function addClassToAllButtons(className) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.add(className);
    });
  }
  
  function addRoomMarker(name, color, width, height, lat, lng, text, number, borderRadius) {
    var roomMarker = new classSensor(name, color, width, height, lat, lng, text, number, borderRadius);
    roomMarkers.push(roomMarker);
    // Call the function to add the class after adding the room marker
    addClassToAllButtons('classRoom');
  }
  
  const scaleFactor = setScallor();
  
  function addModifiedRoomMarker(room, color, width, height, lat, lng, code, value, borderRadius) {
    // Adjust width and height based on the scale factor if necessary
    const adjustedWidth = width * scaleFactor;
    const adjustedHeight = height * scaleFactor;
    let adjustedborderRadius;
    if (borderRadius) {
      adjustedborderRadius = borderRadius * scaleFactor;
    } else {
      adjustedborderRadius = 0;
    }
    addRoomMarker(room, color, adjustedWidth, adjustedHeight, lat, lng, code, prefix + value + suffix, adjustedborderRadius);
  }

  if (school === 1) {
      if (floor === 'Ground') {
          addModifiedRoomMarker('Room 111', 'green', 60, 60, 41.877425, -87.75188, 'G14', valueArray[0]);
          addModifiedRoomMarker('Room 112', 'green', 180, 32, 41.8772905, -87.7517385, 'Admin Hall', valueArray[1]);
          addModifiedRoomMarker('Room 113', 'green', 165, 200, 41.87721, -87.75148, 'G26', valueArray[2]);
          addModifiedRoomMarker('Room 114', 'green', 140, 240, 41.8771875, -87.751719, 'G33', valueArray[3]);
      } else if (floor === 'First') {
          addModifiedRoomMarker('Room 121', 'green', 120, 95, 41.87721, -87.75238, '115', valueArray[0]);
          addModifiedRoomMarker('Room 122', 'green', 110, 100, 41.877435, -87.751698, '134', valueArray[1]);
          addModifiedRoomMarker('Room 123', 'green', 110, 100, 41.877435, -87.751588, '135', valueArray[2]);
          addModifiedRoomMarker('Room 124', 'yellow', 110, 100, 41.877435, -87.75148, '136', valueArray[3]);
          addModifiedRoomMarker('Room 125', 'red', 110, 100, 41.877311, -87.751842, '137', valueArray[4]);
          addModifiedRoomMarker('Room 126', 'grey', 110, 100, 41.877311, -87.751735, '138', valueArray[5]);
          addModifiedRoomMarker('Room 127', 'green', 125, 110, 41.87725, -87.75146, '141', valueArray[6]);
          addModifiedRoomMarker('Room 128', 'green', 100, 75, 41.877241, -87.751612, '142', valueArray[7]);
          addModifiedRoomMarker('Room 129', 'red', 275, 380, 41.877081, -87.75153, '143', valueArray[8]);
      } else if (floor === 'Second') {
          addModifiedRoomMarker('Room 131', 'grey', 110, 100, 41.87721, -87.75225, '210', valueArray[0]);
          addModifiedRoomMarker('Room 132', 'green', 110, 100, 41.877435, -87.751698, '231', valueArray[1]);
          addModifiedRoomMarker('Room 133', 'green', 110, 100, 41.877435, -87.751588, '232', valueArray[2]);
          addModifiedRoomMarker('Room 134', 'yellow', 110, 100, 41.877435, -87.75148, '233', valueArray[3]);
          addModifiedRoomMarker('Room 135', 'yellow', 110, 100, 41.877311, -87.751815, '234', valueArray[4]);
          addModifiedRoomMarker('Room 136', 'red', 110, 100, 41.877311, -87.751708, '235', valueArray[5]);
          addModifiedRoomMarker('Room 137', 'red', 110, 100, 41.877311, -87.75149, '236', valueArray[6]);
      }
  } else if (school === 2) {
      if (floor === 'Floor1') {
          addModifiedRoomMarker('Room 211', 'red', 110, 100, 43.07315, -89.40125, '001', valueArray[0]);
          addModifiedRoomMarker('Room 212', 'red', 110, 100, 43.07308, -89.40112, '002', valueArray[1]);
      } else if (floor === 'Floor2') {
          addModifiedRoomMarker('Room 221', 'red', 110, 100, 43.07305, -89.40128, '003', valueArray[0]);
          addModifiedRoomMarker('Room 222', 'red', 110, 100, 43.07314, -89.40124, '004', valueArray[1]);
      }
  } else if (school === 3){
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20875, -89.19757, 'A', valueArray[0], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20867, -89.197553, 'B', valueArray[1], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20859, -89.197537, 'C', valueArray[2], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20851, -89.197523, 'D', valueArray[3], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20843, -89.197507, 'E', valueArray[4], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20825, -89.197485, 'F', valueArray[5], 76);
    addModifiedRoomMarker('Room 311', 'green', 120, 120, 43.20809, -89.19746, 'G', valueArray[6], 76);
    addModifiedRoomMarker('Room 311', 'green', 100, 100, 43.20798, -89.197430, 'H', valueArray[7], 65);
  }
}




