// chart.js
let chart;

export function createChart(context, data) {
  if (chart) chart.destroy(); // Destroy previous chart to avoid duplicates

  chart = new Chart(context, {
    type: 'candlestick',
    data: {
      datasets: [{
        label: 'Candlestick Data',
        data: data,
        borderColor: '#4caf50',
        backgroundColor: '#4caf5066',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { type: 'time', time: { unit: 'minute' } },
        y: { beginAtZero: true }
      }
    }
  });
}

export function updateChart(newData) {
  chart.data.datasets[0].data = newData;
  chart.update();
}
