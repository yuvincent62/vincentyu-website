document.addEventListener('DOMContentLoaded', function () {
  function returnToInitialMapView() {
    console.log("Return button clicked");
    map.setView(initialMapCenter, initialMapZoom);
  }

  document.getElementById('returnButton').addEventListener('click', returnToInitialMapView);

  document.querySelectorAll('.chart-parameter').forEach(button => {
    button.addEventListener('click', function () {
      setActiveParameter(this);
    });
  });

  document.querySelectorAll('.chart-date').forEach(button => {
    button.addEventListener('click', function () {
      setActiveDate(this);
    });
  });

  document.getElementById('button41').classList.add('active');
  document.getElementById('hour').classList.add('active');

  drawCurve();
});

const buttonIdToLabelMap = {
  'button41': 'CO2 (ppm)',
  'button42': 'PM2.5 (µg/m\u00B3)',
  'button43': 'Dew Point (\u00B0F)',
  'button44': 'TVOC (µg/m\u00B3)',
  'button45': 'TEMP (\u00B0F)',
  'button46': 'RH (%)'
};

function setActiveParameter(button) {
  document.querySelectorAll('.chart-parameter').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  activeChartParameter = button.id;
  console.log('Active parameter set to:', activeChartParameter);
  drawCurve();
}

function setActiveDate(button) {
  document.querySelectorAll('.chart-date').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  activeChartDate = button.id;
  console.log('Active date set to:', activeChartDate);
  drawCurve();
}

function updateExplanation(option) {
  var explanationText;
  switch (option) {
    case 'option1':
      explanationText = `
        <div class="legend">
          <h4>Carbon Dioxide (ppm)</h4>
          <div><span style="background-color: #00ff00;"></span> < 1000 Typical</div>
          <div><span style="background-color: #ffff00;"></span> 1000 - 2000 Moderate</div>
          <div><span style="background-color: #ff0000;"></span> > 2000 High</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    case 'option2':
    explanationText = `
        <div class="legend">
          <h4>Particulate Matter 2.5 (ug/m<sup>3</sup>)</h4>
          <div><span style="background-color: #00ff00;"></span> < 19 Typical</div>
          <div><span style="background-color: #ffff00;"></span> 19 - 250 Moderate</div>
          <div><span style="background-color: #ff0000;"></span> > 250 High</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    case 'option3':
    explanationText = `
        <div class="legend">
          <h4>Dew Point (\u00B0F)</h4>
          <div><span style="background-color: #00ff00;"></span> < 55 Typical</div>
          <div><span style="background-color: #ffff00;"></span> 55-60 Elevated</div>
          <div><span style="background-color: #ff0000;"></span> > 60 High</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    case 'option4':
    explanationText = `
        <div class="legend">
          <h4>TVOC (ug/m<sup>3</sup>)</h4>
          <div><span style="background-color: #00ff00;"></span> < 1 Good</div>
          <div><span style="background-color: #ffff00;"></span> 1 - 10 Elevated</div>
          <div><span style="background-color: #ff0000;"></span> > 10 High</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    case 'option5':
    explanationText = `
        <div class="legend">
          <h4>Temperature (\u00B0F>)</h4>
          <div><span style="background-color: #00ff00;"></span> < 65-81 Typical</div>
          <div><span style="background-color: #ffff00;"></span> 55-65 Slightly Low</div>
          <div><span style="background-color: #ffff00;"></span> 81-90 Slightly High</div>
          <div><span style="background-color: #ff0000;"></span> > 90 High</div>
          <div><span style="background-color: #ff0000;"></span> < 55 Low</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    case 'option6':
    explanationText = `
        <div class="legend">
          <h4>Relative Humidity (%)</h4>
          <div><span style="background-color: #00ff00;"></span> < 30-60 Typical</div>
          <div><span style="background-color: #ffff00;"></span> 20-30 Slightly Low</div>
          <div><span style="background-color: #ffff00;"></span> 60-80 Slightly High</div>
          <div><span style="background-color: #ff0000;"></span> > 80 High</div>
          <div><span style="background-color: #ff0000;"></span> < 20 Low</div>
          <div><span style="background-color: #000000;"></span> Connection Lost</div>
          <div><span style="background-color: #808080;"></span> Room with No Sensor</div>
        </div>`;
      break;
    default:
      explanationText = 'Default explanation.';
  }
  var explanationDiv = document.getElementById('explanation');
  if (explanationDiv) {
    explanationDiv.innerHTML = explanationText;
    console.log("Explanation updated: ", explanationText);
  } else {
    console.error("Explanation div not found");
  }
}

document.getElementById('btn1').addEventListener('click', function() {
  updateExplanation('option1');
});
document.getElementById('btn2').addEventListener('click', function() {
  updateExplanation('option2');
});
document.getElementById('btn3').addEventListener('click', function() {
  updateExplanation('option3');
});
document.getElementById('btn4').addEventListener('click', function() {
  updateExplanation('option4');
});
document.getElementById('btn5').addEventListener('click', function() {
  updateExplanation('option5');
});
document.getElementById('btn6').addEventListener('click', function() {
  updateExplanation('option6');
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn3').click();
});
