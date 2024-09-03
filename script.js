// Replace with your Google Sheets API key and ID
const apiKey = 'AIzaSyCJUpx3d2aRxgOnbbB73WBpcZ1oI2YAauc';
const sheetId = '14g5GswUj6mj411o2dYOPghzJthp97hfz5DZvOU3O5Ww';
// Specify the range of data you want to fetch for voltage and current
const rangeVoltageCurrent = 'Sheet1!A1:B1'; // Assuming voltage is in A2 and current is in B2

document.addEventListener('DOMContentLoaded', function() {
    fetchVoltageCurrentData();
});

// Function to fetch voltage and current data from Google Sheet
    
        function fetchVoltageCurrentData() {
            const voltageCurrentUrl = 'https://docs.google.com/spreadsheets/d/14g5GswUj6mj411o2dYOPghzJthp97hfz5DZvOU3O5Ww/pub?output=csv';
            fetch(voltageCurrentUrl)
                .then(response => response.text())
                .then(data => {
                    const jsonData = JSON.parse(data.substring(47).slice(0, -2));
                    const rows = jsonData.table.rows;

                    const voltage = rows[0].c[0].v;
                    const current = rows[0].c[1].v;

                    document.getElementById('voltage').innerText = voltage + ' V';
                    document.getElementById('current').innerText = current + ' A';
                });
        }


// Function to fetch power consumption data
        function fetchPowerData() {
            const powerDataUrl = 'YOUR_POWER_GRAPH_SHEET_URL';
            fetch(powerDataUrl)
                .then(response => response.text())
                .then(data => {
                    const jsonData = JSON.parse(data.substring(47).slice(0, -2));
                    const rows = jsonData.table.rows;

                    const labels = rows.map(row => row.c[0].v); // Assuming time in column 0
                    const mainPower = rows.map(row => row.c[1].v); // Main power in column 1
                    const device1 = rows.map(row => row.c[2].v); // Device 1 in column 2
                    const device2 = rows.map(row => row.c[3].v); // Device 2 in column 3
                    const device3 = rows.map(row => row.c[4].v); // Device 3 in column 4
                    const device4 = rows.map(row => row.c[5].v); // Device 4 in column 5

                    powerChart.data.labels = labels;
                    powerChart.data.datasets[0].data = mainPower;
                    powerChart.data.datasets[1].data = device1;
                    powerChart.data.datasets[2].data = device2;
                    powerChart.data.datasets[3].data = device3;
                    powerChart.data.datasets[4].data = device4;
                    powerChart.update();
                });
        }

        // Initialize Chart.js
        const ctx = document.getElementById('powerChart').getContext('2d');
        const powerChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Time labels will be updated dynamically
                datasets: [
                    { label: 'Main Power', borderColor: 'rgba(0, 128, 128, 1)', data: [] },
                    { label: 'Device 1', borderColor: 'rgba(255, 99, 132, 1)', data: [] },
                    { label: 'Device 2', borderColor: 'rgba(54, 162, 235, 1)', data: [] },
                    { label: 'Device 3', borderColor: 'rgba(255, 206, 86, 1)', data: [] },
                    { label: 'Device 4', borderColor: 'rgba(153, 102, 255, 1)', data: [] }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: { display: true, text: 'Time (24 Hours)' }
                    },
                    y: {
                        min: 0,
                        max: 230,
                        title: { display: true, text: 'Power (W)' }
                    }
                }
            }
        });

        // Update both voltage/current and power data regularly
        fetchVoltageCurrentData();
        fetchPowerData();
        setInterval(fetchVoltageCurrentData, 60000); // Fetch every minute
        setInterval(fetchPowerData, 60000); // Fetch every minute



//  defining the logout function
function logout() {window.location.href = 'index.html';}

    document.getElementById('loginForm')?.addEventListener('submit', function(event) 
    {event.preventDefault(); const username = document.getElementById('username').value;
                             const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin')    
         {window.location.href = 'dashboard.html';} 
    else 
         {alert('Invalid User Credentials');}});



