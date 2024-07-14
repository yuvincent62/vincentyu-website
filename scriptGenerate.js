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

