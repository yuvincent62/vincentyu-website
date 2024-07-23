document.addEventListener('DOMContentLoaded', function () {
  function returnToInitialMapView() {
    console.log("Return button clicked");
    map.setView(initialMapCenter, initialMapZoom);
  }

  document.getElementById('returnButton').addEventListener('click', returnToInitialMapView);

  // Add event listeners to parameter buttons
  document.querySelectorAll('.chart-parameter').forEach(button => {
    button.addEventListener('click', function () {
      setActiveParameter(this);
    });
  });

  // Add event listeners to date buttons
  document.querySelectorAll('.chart-date').forEach(button => {
    button.addEventListener('click', function () {
      setActiveDate(this);
    });
  });

  // Set initial active buttons
  document.getElementById('button41').classList.add('active');
  document.getElementById('hour').classList.add('active');

  // Initial draw
  drawCurve();
});




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

