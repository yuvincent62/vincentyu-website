      function defineAndDisplayRoomMarkers(school, floor, parameter) {
        clearRoomMarkers();
      
        const bottomOption = activeBottomButtonText;
        const valueArrayIn = SetValueArray(school, floor, bottomOption);
        let valueArray = valueArrayIn.map(num => parseFloat(num.toFixed(1)));
      
        console.log('11111' + parameter);
      
        let suffix = '';
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
          prefix = 'RH: '
          suffix = '%';
        }  else if(parameter==='Temperature'){
          prefix = 'Temp: ';
          suffix = '\u00B0F';
        }
        function addModifiedRoomMarker(room, color, width, height, lat, lng, code, value) {
          addRoomMarker(room, color, width, height, lat, lng, code, prefix + value + suffix);
        }
      
        if (school === 1) {
          if (floor === 'Ground') {
            addModifiedRoomMarker('Room 111', 'red', 40, 40, 41.877425, -87.75188, 'G14', valueArray[0]);
            addModifiedRoomMarker('Room 112', 'green', 180, 32, 41.8772905, -87.7517385, 'Admin Hall', valueArray[1]);
            addModifiedRoomMarker('Room 113', 'yellow', 165, 200, 41.87721, -87.75148, 'G26', valueArray[2]);
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
            addModifiedRoomMarker('Room 212', 'green', 110, 100, 43.07308, -89.40112, '002', valueArray[1]);
          } else if (floor === 'Floor2') {
            addModifiedRoomMarker('Room 221', 'yellow', 110, 100, 43.07305, -89.40128, '003', valueArray[0]);
            addModifiedRoomMarker('Room 222', 'grey', 110, 100, 43.07314, -89.40124, '004', valueArray[1]);
          }
        }
      }

