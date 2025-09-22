// static/js/subject_analysis.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch chart data from the hidden element
    const chartData = JSON.parse(document.getElementById('chart-data').textContent);

    // DataTable Initialization
    $('#basic-datatables').DataTable({});

    // Bar Chart
    const barChart = document.getElementById('barChart').getContext('2d');
    const myBarChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Below Average'],
            datasets: [{
                label: "Students",
                backgroundColor: ["#4caf50", "#1d7af3", "#fdaf4b", "#FF5733", "#C70039"],
                borderColor: 'rgb(23, 125, 255)',
                data: chartData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Pie Chart
    const pieChart = document.getElementById('pieChart').getContext('2d');
    const myPieChart = new Chart(pieChart, {
        type: 'pie',
        data: {
            datasets: [{
                data: chartData,
                backgroundColor: ["#4caf50", "#1d7af3", "#fdaf4b", "#FF5733", "#C70039"],
                borderWidth: 0
            }],
            labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Below Average']
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: 'rgb(154, 154, 154)',
                    fontSize: 12,
                    usePointStyle: true,
                    padding: 20,
                    generateLabels: function(chart) {
                        const data = chart.data;
                        return data.labels.map(function(label, index) {
                            const value = data.datasets[0].data[index];
                            const total = data.datasets[0].data.reduce(function(a, b) { return a + b; }, 0);
                            const percentage = Math.round((value / total) * 100);
                            return {
                                text: label + ': ' + percentage + '%',
                                fillStyle: data.datasets[0].backgroundColor[index],
                                hidden: isNaN(data.datasets[0].data[index]) || data.datasets[0].data[index] === null,
                                index: index
                            };
                        });
                    }
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const total = dataset.data.reduce(function(previousValue, currentValue) {
                            return previousValue + currentValue;
                        });
                        const currentValue = dataset.data[tooltipItem.index];
                        const percentage = Math.round((currentValue / total) * 100);
                        return data.labels[tooltipItem.index] + ': ' + percentage + '%';
                    }
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            }
        }
    });
});