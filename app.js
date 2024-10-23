// app.js
const ctx = document.getElementById('candlestickChart').getContext('2d');

let candlestickChart;

// Function to create the candlestick chart
function createChart(data) {
    if (candlestickChart) {
        candlestickChart.destroy(); // Destroy the existing chart instance
    }

    candlestickChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'Candlestick Data',
                data: data, // Use your actual data here
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Function to fetch and process WebSocket data
function initWebSocket(symbol, interval) {
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/<symbol>@kline_<interval>.`);

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        const kline = message.k;

        const candlestickData = {
            x: new Date(kline.t), // Time
            o: kline.o,           // Open
            h: kline.h,           // High
            l: kline.l,           // Low
            c: kline.c            // Close
        };

        createChart([candlestickData]); // Pass data to the chart
    };
}

// Initialize WebSocket with default values
initWebSocket('ethusdt', '1m'); // Default to ETH/USDT and 1-minute interval
