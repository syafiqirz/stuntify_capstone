// Test function to verify chart functionality
function testChartsAvailable() {
  console.log("Testing charts availability...");
  if (typeof Chart !== 'undefined') {
    console.log("Chart.js is available:", Chart.version);
    return true;
  } else {
    console.error("Chart.js is not available. Charts will not work!");
    return false;
  }
}

// Execute test on load
(function() {
  console.log("Stunting charts script loaded");
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    testChartsAvailable();
  } else {
    document.addEventListener('DOMContentLoaded', testChartsAvailable);
  }
})();

// WHO Growth Chart Data and Visualization Functions
// This file contains functions for generating growth charts based on WHO standards

// Height-for-age standards (based on stunting reference in the main file)
const stuntingReferenceData = {
  // Format: month: [boys-normal, girls-normal, boys-stunted, girls-stunted]
  // Normal represents the median, stunted represents -2SD (standard deviations)
  0: [49.9, 49.1, 46.1, 45.4],
  1: [54.7, 53.7, 50.8, 49.8],
  2: [58.4, 57.1, 54.4, 53.0],
  3: [61.4, 59.8, 57.3, 55.6],
  4: [63.9, 62.1, 59.7, 57.8],
  5: [65.9, 64.0, 61.7, 59.6],
  6: [67.6, 65.7, 63.3, 61.2],
  7: [69.2, 67.3, 64.8, 62.7],
  8: [70.6, 68.7, 66.2, 64.0],
  9: [72.0, 70.1, 67.5, 65.3],
  10: [73.3, 71.5, 68.7, 66.5],
  11: [74.5, 72.8, 69.9, 67.7],
  12: [75.7, 74.0, 71.0, 68.9],
  13: [76.9, 75.2, 72.1, 70.0],
  14: [78.0, 76.4, 73.1, 71.0],
  15: [79.1, 77.5, 74.1, 72.0],
  16: [80.2, 78.6, 75.0, 73.0],
  17: [81.2, 79.7, 76.0, 74.0],
  18: [82.3, 80.7, 76.9, 74.9],
  19: [83.2, 81.7, 77.7, 75.8],
  20: [84.2, 82.7, 78.6, 76.7],
  21: [85.1, 83.7, 79.4, 77.5],
  22: [86.0, 84.6, 80.2, 78.4],
  23: [86.9, 85.5, 81.0, 79.2],
  24: [87.8, 86.4, 81.7, 79.9],
  // Additional data points
  30: [92.1, 90.7, 85.7, 84.3],
  36: [95.9, 94.9, 89.0, 88.0],
  42: [99.6, 98.9, 91.9, 91.1],
  48: [103.0, 102.7, 94.5, 93.9],
  54: [106.1, 106.2, 96.9, 96.4],
  60: [109.1, 109.4, 99.1, 98.7]
};

// Weight-for-age standards (WHO standards)
const weightReferenceData = {
  // Format: month: [boys-median, girls-median, boys-underweight, girls-underweight]
  // Underweight represents -2SD (standard deviations)
  0: [3.3, 3.2, 2.5, 2.4],
  1: [4.5, 4.2, 3.4, 3.2],
  2: [5.6, 5.1, 4.3, 3.9],
  3: [6.4, 5.8, 4.9, 4.5],
  4: [7.0, 6.4, 5.6, 5.0],
  5: [7.5, 6.9, 6.1, 5.4],
  6: [7.9, 7.3, 6.4, 5.7],
  7: [8.3, 7.6, 6.7, 6.0],
  8: [8.6, 7.9, 6.9, 6.3],
  9: [8.9, 8.2, 7.1, 6.5],
  10: [9.2, 8.5, 7.4, 6.7],
  11: [9.4, 8.7, 7.6, 6.9],
  12: [9.6, 8.9, 7.7, 7.0],
  13: [9.9, 9.2, 7.9, 7.2],
  14: [10.1, 9.4, 8.1, 7.4],
  15: [10.3, 9.6, 8.3, 7.6],
  16: [10.5, 9.8, 8.4, 7.7],
  17: [10.7, 10.0, 8.6, 7.9],
  18: [10.9, 10.2, 8.8, 8.1],
  19: [11.1, 10.4, 8.9, 8.2],
  20: [11.3, 10.6, 9.1, 8.4],
  21: [11.5, 10.9, 9.2, 8.6],
  22: [11.8, 11.1, 9.4, 8.7],
  23: [12.0, 11.3, 9.5, 8.9],
  24: [12.2, 11.5, 9.7, 9.0],
  // Additional data points
  30: [13.3, 12.7, 10.5, 9.9],
  36: [14.3, 13.9, 11.3, 10.8],
  42: [15.3, 15.0, 12.0, 11.6],
  48: [16.3, 16.1, 12.7, 12.3],
  54: [17.3, 17.2, 13.4, 13.0],
  60: [18.3, 18.2, 14.1, 13.7]
};

// Function to initialize charts
function initializeCharts() {
  console.log("Initializing charts...");
  
  // Check if chart container already exists
  let chartContainer = document.getElementById('growth-charts');
  if (chartContainer) {
    console.log("Chart container already exists, skipping creation");
  } else {
    console.log("Creating new chart container");
    // Create container for charts
    chartContainer = document.createElement('div');
    chartContainer.className = 'chart-area';
    chartContainer.id = 'growth-charts';
    chartContainer.style.display = 'none'; // Hide initially
    
    // Add title to the chart container
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = 'Grafik Pertumbuhan WHO';
    chartTitle.style.textAlign = 'center';
    chartContainer.appendChild(chartTitle);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Tutup Grafik';
    closeButton.className = 'close-charts-button';
    
    // Create a scrollable container for charts
    const scrollableContainer = document.createElement('div');
    scrollableContainer.className = 'charts-scrollable-container';
    
    // Create height-for-age chart
    const heightChartContainer = document.createElement('div');
    heightChartContainer.className = 'chart-container';
    
    const heightChartTitle = document.createElement('h4');
    heightChartTitle.textContent = 'Tinggi Badan menurut Umur';
    heightChartTitle.style.textAlign = 'center';
    heightChartTitle.style.marginBottom = '15px';
    
    heightChartContainer.appendChild(heightChartTitle);
    
    const heightChartCanvas = document.createElement('canvas');
    heightChartCanvas.id = 'height-chart';
    heightChartCanvas.style.height = '380px';
    heightChartCanvas.style.width = '100%';
    heightChartContainer.appendChild(heightChartCanvas);
    
    // Create weight-for-age chart
    const weightChartContainer = document.createElement('div');
    weightChartContainer.className = 'chart-container';
    
    const weightChartTitle = document.createElement('h4');
    weightChartTitle.textContent = 'Berat Badan menurut Umur';
    weightChartTitle.style.textAlign = 'center';
    weightChartTitle.style.marginBottom = '15px';
    
    weightChartContainer.appendChild(weightChartTitle);
    
    const weightChartCanvas = document.createElement('canvas');
    weightChartCanvas.id = 'weight-chart';
    weightChartCanvas.style.height = '380px';
    weightChartCanvas.style.width = '100%';
    weightChartContainer.appendChild(weightChartCanvas);
    
    // Add child elements to scrollable container
    scrollableContainer.appendChild(heightChartContainer);
    scrollableContainer.appendChild(weightChartContainer);
    
    // Add to chart container in proper order
    chartContainer.appendChild(closeButton);
    chartContainer.appendChild(scrollableContainer);
    
    // Find where to insert the chart container
    const placeholder = document.getElementById('chart-container-placeholder');
    if (placeholder) {
      placeholder.appendChild(chartContainer);
      console.log("Chart container added to placeholder");
    } else {
      // If no placeholder, add after the calculation-results container
      const resultsContainer = document.getElementById('calculation-results');
      if (resultsContainer) {
        resultsContainer.parentNode.insertBefore(chartContainer, resultsContainer.nextSibling);
        console.log("Chart container added after calculation results");
      } else {
        // Last resort: add to container
        const container = document.querySelector('.container');
        if (container) {
          container.appendChild(chartContainer);
          console.log("Chart container added to main container");
        } else {
          console.error("No suitable container found for charts");
        }
      }
    }
  }
  
  // Set up close button event
  const closeButton = document.querySelector('.close-charts-button');
  if (closeButton) {
    // Remove old event listeners by cloning and replacing
    const newCloseBtn = closeButton.cloneNode(true);
    closeButton.parentNode.replaceChild(newCloseBtn, closeButton);
    
    newCloseBtn.addEventListener('click', function() {
      const chartsElement = document.getElementById('growth-charts');
      if (chartsElement) {
        chartsElement.style.display = 'none';
        console.log("Growth charts container hidden");
      }
    });
  }
  
  // Set up view charts button
  createViewChartsButton();
  
  console.log("Charts initialization complete");
}

// Function to create the view charts button if it doesn't exist
function createViewChartsButton() {
  // Check if button container exists, otherwise create it
  let btnContainer = document.querySelector('.chart-button-container');
  if (!btnContainer) {
    console.log("Creating button container");
    btnContainer = document.createElement('div');
    btnContainer.className = 'chart-button-container';
    
    // Find where to insert the button container
    const resultsContainer = document.getElementById('calculation-results');
    if (resultsContainer) {
      if (resultsContainer.firstChild) {
        resultsContainer.insertBefore(btnContainer, resultsContainer.firstChild);
      } else {
        resultsContainer.appendChild(btnContainer);
      }
    }
  }
  
  // Check if button exists, otherwise create it
  let viewChartsBtn = document.getElementById('view-charts-btn');
  if (!viewChartsBtn) {
    console.log("Creating view charts button");
    viewChartsBtn = document.createElement('button');
    viewChartsBtn.id = 'view-charts-btn';
    viewChartsBtn.className = 'view-charts-button';
    viewChartsBtn.style.display = 'none';
    
    // Add icon if font awesome is available
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = '<i class="fas fa-chart-line"></i> ';
    viewChartsBtn.appendChild(iconSpan);
    
    const btnText = document.createTextNode('Lihat Grafik Pertumbuhan WHO');
    viewChartsBtn.appendChild(btnText);
    
    btnContainer.appendChild(viewChartsBtn);
  }
  
  // Set up click event
  const btn = document.getElementById('view-charts-btn');
  if (btn) {
    // Remove old event listeners by cloning and replacing
    const newViewBtn = btn.cloneNode(true);
    if (btn.parentNode) {
      btn.parentNode.replaceChild(newViewBtn, btn);
    }
    
    newViewBtn.addEventListener('click', function() {
      console.log("View charts button clicked");
      const chartsElement = document.getElementById('growth-charts');
      if (chartsElement) {
        // Show with fade in for smoother transition
        chartsElement.style.opacity = '0';
        chartsElement.style.display = 'block';
        
        // Force layout reflow
        void chartsElement.offsetWidth;
        
        // Fade in
        chartsElement.style.transition = 'opacity 0.3s ease-in-out';
        chartsElement.style.opacity = '1';
        console.log("Growth charts container displayed");
      } else {
        console.error("Growth charts container not found when button clicked");
        // Try to create it
        initializeCharts();
        setTimeout(function() {
          const newChartsElement = document.getElementById('growth-charts');
          if (newChartsElement) {
            newChartsElement.style.display = 'block';
          }
        }, 100);
      }
    });
  }
}

// Function to generate datasets for the height-for-age chart
function generateHeightChartData(gender) {
  const months = Object.keys(stuntingReferenceData).map(Number).sort((a, b) => a - b);
  
  const genderIndex = gender === "Laki-Laki" ? 0 : 1;
  const stuntedIndex = gender === "Laki-Laki" ? 2 : 3;
  
  // Median (normal) data
  const normalData = months.map(month => ({
    x: month,
    y: stuntingReferenceData[month][genderIndex]
  }));
  
  // Stunted threshold (-2SD)
  const stuntedData = months.map(month => ({
    x: month,
    y: stuntingReferenceData[month][stuntedIndex]
  }));
  
  return {
    labels: months,
    datasets: [
      {
        label: 'Median (Normal)',
        data: normalData,
        borderColor: 'rgba(53, 162, 235, 0.8)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Stunting Threshold (-2SD)',
        data: stuntedData,
        borderColor: 'rgba(255, 128, 0, 0.8)',
        backgroundColor: 'rgba(255, 128, 0, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  };
}

// Function to generate datasets for the weight-for-age chart
function generateWeightChartData(gender) {
  const months = Object.keys(weightReferenceData).map(Number).sort((a, b) => a - b);
  
  const genderIndex = gender === "Laki-Laki" ? 0 : 1;
  const underweightIndex = gender === "Laki-Laki" ? 2 : 3;
  
  // Median (normal) data
  const normalData = months.map(month => ({
    x: month,
    y: weightReferenceData[month][genderIndex]
  }));
  
  // Underweight threshold (-2SD)
  const underweightData = months.map(month => ({
    x: month,
    y: weightReferenceData[month][underweightIndex]
  }));
  
  return {
    labels: months,
    datasets: [
      {
        label: 'Median (Normal)',
        data: normalData,
        borderColor: 'rgba(53, 162, 235, 0.8)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Underweight Threshold (-2SD)',
        data: underweightData,
        borderColor: 'rgba(255, 128, 0, 0.8)',
        backgroundColor: 'rgba(255, 128, 0, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  };
}

// Function to draw the height-for-age chart
function drawHeightChart(childHeight, childAge, gender) {
  console.log(`Drawing height chart: height=${childHeight}, age=${childAge}, gender=${gender}`);
  
  // Make sure the canvas element exists
  const canvas = document.getElementById('height-chart');
  if (!canvas) {
    console.error('Height chart canvas element not found');
    return;
  }
  
  try {
    // Destroy existing chart if it exists to prevent memory leaks
    if (window.heightChart) {
      window.heightChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const chartData = generateHeightChartData(gender);
    
    // Add the child's data point
    chartData.datasets.push({
      label: 'Anak',
      data: [{x: childAge, y: childHeight}],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 0,
      pointRadius: 6,
      pointStyle: 'circle',
      showLine: false
    });
    
    // Create new chart
    window.heightChart = new Chart(ctx, {
      type: 'scatter',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        plugins: {
          title: {
            display: true,
            text: 'Grafik Tinggi Badan menurut Umur (WHO)',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const dataPoint = context.raw;
                return `Umur: ${dataPoint.x} bulan, Tinggi: ${dataPoint.y} cm`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleFont: {
              weight: 'bold'
            },
            displayColors: true,
            padding: 10
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
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
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Umur (bulan)',
              font: {
                weight: 'bold'
              }
            },
            min: 0,
            max: 60,
            ticks: {
              stepSize: 6
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tinggi (cm)',
              font: {
                weight: 'bold'
              }
            },
            min: 40,
            suggestedMax: 110,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          }
        }
      }
    });
    console.log('Height chart created successfully');
  } catch (error) {
    console.error('Error creating height chart:', error);
  }
}

// Function to draw the weight-for-age chart
function drawWeightChart(childWeight, childAge, gender) {
  console.log(`Drawing weight chart: weight=${childWeight}, age=${childAge}, gender=${gender}`);
  
  // Make sure the canvas element exists
  const canvas = document.getElementById('weight-chart');
  if (!canvas) {
    console.error('Weight chart canvas element not found');
    return;
  }
  
  try {
    // Destroy existing chart if it exists to prevent memory leaks
    if (window.weightChart) {
      console.log('Destroying existing weight chart');
      window.weightChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const chartData = generateWeightChartData(gender);
    
    // Add the child's data point if weight is provided
    if (childWeight && !isNaN(childWeight) && childWeight > 0) {
      chartData.datasets.push({
        label: 'Anak',
        data: [{x: childAge, y: childWeight}],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 0,
        pointRadius: 6,
        pointStyle: 'circle',
        showLine: false
      });
    }
    
    // Create new chart
    window.weightChart = new Chart(ctx, {
      type: 'scatter',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        plugins: {
          title: {
            display: true,
            text: 'Grafik Berat Badan menurut Umur (WHO)',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const dataPoint = context.raw;
                return `Umur: ${dataPoint.x} bulan, Berat: ${dataPoint.y} kg`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleFont: {
              weight: 'bold'
            },
            displayColors: true,
            padding: 10
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
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
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Umur (bulan)',
              font: {
                weight: 'bold'
              }
            },
            min: 0,
            max: 60,
            ticks: {
              stepSize: 6
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Berat (kg)',
              font: {
                weight: 'bold'
              }
            },
            min: 0,
            suggestedMax: 20,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          }
        }
      }
    });
    console.log('Weight chart created successfully');
  } catch (error) {
    console.error('Error creating weight chart:', error);
  }
}

// Add responsive configuration for charts
const chartConfig = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
          overScaleMode: 'y'
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Usia (Bulan)'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 12
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Tinggi Badan (cm)'
        }
      }
    }
  }
};

// Update any existing chart creation to use this config
function createChart(ctx, data) {
  const isMobile = window.innerWidth <= 768;
  const config = {
    ...chartConfig,
    options: {
      ...chartConfig.options,
      scales: {
        ...chartConfig.options.scales,
        x: {
          ...chartConfig.options.scales.x,
          ticks: {
            ...chartConfig.options.scales.x.ticks,
            maxTicksLimit: isMobile ? 6 : 12
          }
        }
      }
    }
  };
  
  return new Chart(ctx, {
    ...data,
    options: config.options
  });
}

// Add window resize handler
window.addEventListener('resize', function() {
  if (!window.Chart || !window.Chart.instances) return;
  
  const charts = Object.values(window.Chart.instances);
  charts.forEach(chart => {
    // Update chart to handle resize
    if (chart) {
      chart.resize();
    }
  });
});

// Function to update charts based on input
function updateCharts(height, weight, age, gender) {
  console.log(`Updating charts with data: height=${height}, weight=${weight}, age=${age}, gender=${gender}`);
  
  // Prepare charts
  try {
    // Ensure container exists
    let chartContainer = document.getElementById('growth-charts');
    if (!chartContainer) {
      console.log("Chart container not found, initializing charts first");
      initializeCharts();
    }
    
    // Pre-render charts in hidden state to avoid layout shift
    const growthCharts = document.getElementById('growth-charts');
    if (growthCharts) {
      // Save original display state
      const originalDisplay = growthCharts.style.display;
      
      // Temporarily set visible but with opacity 0 for rendering
      growthCharts.style.display = 'block';
      growthCharts.style.opacity = '0';
      
      // Pre-render charts
      drawHeightChart(height, age, gender);
      if (weight && !isNaN(weight) && weight > 0) {
        drawWeightChart(weight, age, gender);
      }
      
      // Restore to original state
      setTimeout(() => {
        growthCharts.style.display = originalDisplay;
        growthCharts.style.opacity = '1';
      }, 100);
    }
  } catch (error) {
    console.error("Error preparing charts:", error);
  }
  
  // Show view charts button
  if (!document.getElementById('view-charts-btn')) {
    createViewChartsButton();
  }
  
  const viewChartsBtn = document.getElementById('view-charts-btn');
  if (viewChartsBtn) {
    console.log("View charts button found, making it visible");
    viewChartsBtn.style.display = 'block';
  } else {
    console.error('View charts button not found');
    
    // Create button container and button if they don't exist
    createViewChartsButton();
    
    // Try to show the button again
    const newBtn = document.getElementById('view-charts-btn');
    if (newBtn) {
      newBtn.style.display = 'block';
    }
  }
}

// Function to assess weight status based on WHO standards
function assessWeightStatus(weight, age, gender) {
  // Find the closest months in our reference data
  const months = Object.keys(weightReferenceData).map(Number);
  const closestMonth = months.reduce((prev, curr) => {
    return (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
  });
  
  // Get weight thresholds
  const genderIndex = gender === "Laki-Laki" ? 0 : 1;
  const underweightIndex = gender === "Laki-Laki" ? 2 : 3;
  
  const medianWeight = weightReferenceData[closestMonth][genderIndex];
  const underweightThreshold = weightReferenceData[closestMonth][underweightIndex];
  
  // Assess status
  let weightStatus = "";
  if (weight < underweightThreshold) {
    weightStatus = "Berat Badan Kurang";
  } else if (weight < medianWeight * 0.85) {
    weightStatus = "Berat Badan Borderline";
  } else if (weight > medianWeight * 1.15) {
    weightStatus = "Berat Badan Lebih";
  } else {
    weightStatus = "Berat Badan Normal";
  }
  
  return {
    status: weightStatus,
    median: medianWeight,
    threshold: underweightThreshold
  };
}

// Function to get comprehensive growth assessment
function getComprehensiveAssessment(stuntingStatus, weightStatus) {
  let overallStatus = "";
  let recommendation = "";
  
  // Combined assessment
  if (stuntingStatus === "Normal" && weightStatus.includes("Normal")) {
    overallStatus = "<span class='text-success fw-bold'>Pertumbuhan Normal</span>";
    recommendation = "Anak memiliki pertumbuhan normal untuk usia ini. Lanjutkan dengan pola makan seimbang dan pemantauan pertumbuhan rutin.";
  } else if (stuntingStatus.includes("Stunting") && weightStatus.includes("Kurang")) {
    overallStatus = "<span class='text-danger fw-bold'>Kekurangan Gizi Kronis</span>";
    recommendation = "Anak menunjukkan tanda kekurangan gizi kronis. Konsultasikan dengan dokter anak atau ahli gizi untuk rencana penanganan yang tepat.";
  } else if (stuntingStatus.includes("Stunting") && weightStatus.includes("Normal")) {
    overallStatus = "<span class='text-warning fw-bold'>Stunting dengan Berat Badan Normal</span>";
    recommendation = "Anak memiliki tinggi di bawah standar namun berat badan normal. Perhatikan asupan nutrisi pembangun tulang dan pertumbuhan.";
  } else if (stuntingStatus === "Normal" && weightStatus.includes("Kurang")) {
    overallStatus = "<span class='text-warning fw-bold'>Kurang Berat Badan</span>";
    recommendation = "Anak memiliki tinggi normal tapi berat badan kurang. Tingkatkan asupan kalori dan protein dengan makanan bergizi.";
  } else if (stuntingStatus === "Normal" && weightStatus.includes("Lebih")) {
    overallStatus = "<span class='text-warning fw-bold'>Kelebihan Berat Badan</span>";
    recommendation = "Anak memiliki tinggi normal tapi berat badan lebih. Pastikan pola makan seimbang dan aktivitas fisik yang cukup.";
  } else {
    overallStatus = "<span class='text-warning fw-bold'>Perlu Perhatian</span>";
    recommendation = "Ada beberapa indikator yang memerlukan perhatian pada pertumbuhan anak. Konsultasikan dengan tenaga kesehatan untuk penilaian lebih lanjut.";
  }
  
  return {
    status: overallStatus,
    recommendation: recommendation
  };
}

// Ensure charts are initialized when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts but keep them hidden
  initializeCharts();
  
  // Create view charts button but keep it hidden
  createViewChartsButton();
});
