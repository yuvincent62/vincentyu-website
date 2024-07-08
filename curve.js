function drawCurve() {
  const ctx = document.getElementById('curveCanvas').getContext('2d');
  let labels = [];
  if (activeChartDate === 'hour') {
    labels = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  } else if (activeChartDate === 'day') {
    labels = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  } else if (activeChartDate === 'week') {
    labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  } else if (activeChartDate === 'month') {
    labels = ['00', '05', '10', '15', '20', '25', '30'];
  } else if (activeChartDate === 'year') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  let data = [];
  let yMin = 0;
  let yMax = 0;
  if (activeChartParameter === 'button41') {
    data = [1020, 2000, 1500, 1800, 1030, 2035, 840, 1145, 1150, 955, 960, 965];
    yMin = 800;
    yMax = 2300;
  } else if (activeChartParameter === 'button42') {
    data = [15, 15, 10, 8, 12, 18, 26, 20, 18, 14, 12, 8];
    yMin = 15;
    yMax = 26;
  } else if (activeChartParameter === 'button43') {
    data = [40, 45, 50, 55, 65, 80, 65, 50, 45, 50, 55, 60];
    yMin = 50;
    yMax = 70;
  } else if (activeChartParameter === 'button44') {
    data = [0.1, 0.5, 2, 4, 6, 8, 9, 11, 13, 10, 9, 8];
    yMin = 0;
    yMax = 12;
  } else if (activeChartParameter === 'button45') {
    data = [40, 55, 60, 70, 85, 90, 95, 80, 75, 50, 55, 60];
    yMin = 50;
    yMax = 95;
  } else if (activeChartParameter === 'button46') {
    data = [30, 35, 40, 50, 35, 60, 55, 65, 40, 50, 55, 60];
    yMin = 15;
    yMax = 85;
  }

  const chartLabel = buttonIdToLabelMap[activeChartParameter] || 'Curve Data';

  console.log('####' + activeChartParameter);
  console.log('####' + activeChartDate);

  // Check screen size and set font size accordingly
  const smallScreen = window.innerHeight < 550;
  const fontSize = smallScreen ? 10 : 12;

  // Destroy the previous chart if it exists
  if (chart) {
    chart.destroy();
  }

  const horizontalLinePlugin = {
    id: 'horizontalLine',
    afterDraw: (chart) => {
      const yScale = chart.scales.y;
      const ctx = chart.ctx;
      if (activeChartParameter === 'button41') {
        const yValues = [1000, 2000]; // Set the y-values for the horizontal lines for button41
        const colors = ['yellow', 'red']; // Colors for the lines for button41
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button42') {
        const yValues = [19, 25]; // Set the y-values for the horizontal lines for button42
        const colors = ['yellow', 'red']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button43') {
        const yValues = [55, 65]; // Set the y-values for the horizontal lines for button42
        const colors = ['yellow', 'red']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button44') {
        const yValues = [1, 10]; // Set the y-values for the horizontal lines for button42
        const colors = ['yellow', 'red']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button45') {
        const yValues = [55, 65, 81, 90]; // Set the y-values for the horizontal lines for button42
        const colors = ['red', 'yellow', 'yellow', 'red']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button46') {
        const yValues = [20, 30, 60, 80]; // Set the y-values for the horizontal lines for button42
        const colors = ['red', 'yellow', 'yellow', 'red']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button45') {
        const yValues = [10, 30, 50]; // Set the y-values for the horizontal lines for button42
        const colors = ['rgba(128, 0, 128, 0.5)', 'rgba(0, 128, 128, 0.5)', 'rgba(128, 128, 0, 0.5)']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      } else if (activeChartParameter === 'button46') {
        const yValues = [10, 30, 50]; // Set the y-values for the horizontal lines for button42
        const colors = ['rgba(128, 0, 128, 0.5)', 'rgba(0, 128, 128, 0.5)', 'rgba(128, 128, 0, 0.5)']; // Colors for the lines for button42
        yValues.forEach((yValue, index) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yScale.getPixelForValue(yValue));
          ctx.lineTo(chart.chartArea.right, yScale.getPixelForValue(yValue));
          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      }
    }
  };

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: chartLabel,
        data: data,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            font: {
              size: fontSize
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: fontSize
            }
          },
          suggestedMin: yMin,
          suggestedMax: yMax
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: fontSize
            }
          }
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            threshold: 5
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy'
          }
        }
      }
    },
    plugins: [horizontalLinePlugin]
  });
}
