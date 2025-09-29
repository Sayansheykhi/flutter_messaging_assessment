import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl mb-8">
      <!-- Chart Header -->
      <div class="p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10">
        <h3 class="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          System Performance
        </h3>
        <p class="text-white/70 text-sm">Real-time metrics and analytics</p>
      </div>

      <!-- Chart Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- CPU Usage -->
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span class="text-white/80 font-medium">CPU Usage</span>
              </div>
              <span class="text-2xl font-bold text-blue-400">{{ cpuUsage }}%</span>
            </div>
            <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out"
                [style.width.%]="cpuUsage"
              ></div>
            </div>
            <div class="mt-2 text-xs text-white/60">
              {{ cpuStatus }}
            </div>
          </div>

          <!-- Memory Usage -->
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-white/80 font-medium">Memory</span>
              </div>
              <span class="text-2xl font-bold text-green-400">{{ memoryUsage }}%</span>
            </div>
            <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
                [style.width.%]="memoryUsage"
              ></div>
            </div>
            <div class="mt-2 text-xs text-white/60">
              {{ memoryStatus }}
            </div>
          </div>

          <!-- Network I/O -->
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span class="text-white/80 font-medium">Network I/O</span>
              </div>
              <span class="text-2xl font-bold text-purple-400">{{ networkUsage }}%</span>
            </div>
            <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-1000 ease-out"
                [style.width.%]="networkUsage"
              ></div>
            </div>
            <div class="mt-2 text-xs text-white/60">
              {{ networkStatus }}
            </div>
          </div>
        </div>

        <!-- Mini Chart -->
        <div class="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h4 class="text-lg font-semibold text-white/90 mb-4">Performance Trend</h4>
          <div class="h-32 flex items-end justify-between gap-2">
            <div 
              *ngFor="let point of chartData; let i = index"
              class="flex-1 bg-gradient-to-t from-cyan-500/60 to-purple-500/60 rounded-t transition-all duration-500 hover:from-cyan-400/80 hover:to-purple-400/80"
              [style.height.%]="point"
              [title]="'Point ' + (i + 1) + ': ' + point + '%'"
            ></div>
          </div>
          <div class="mt-4 flex justify-between text-xs text-white/60">
            <span>1h ago</span>
            <span>30m ago</span>
            <span>15m ago</span>
            <span>5m ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-bar:hover {
      transform: scaleY(1.1);
      transform-origin: bottom;
    }
  `]
})
export class PerformanceChartComponent {
  cpuUsage = 65;
  memoryUsage = 45;
  networkUsage = 32;
  
  cpuStatus = 'Normal';
  memoryStatus = 'Optimal';
  networkStatus = 'Stable';
  
  chartData = [45, 52, 38, 67, 65, 58, 72, 69, 55, 48, 61, 65];

  constructor() {
    this.simulateMetrics();
  }

  simulateMetrics() {
    setInterval(() => {
      // Simulate CPU usage
      this.cpuUsage = Math.round((Math.max(20, Math.min(90, this.cpuUsage + (Math.random() - 0.5) * 10))) * 100) / 100;
      this.cpuStatus = this.cpuUsage > 80 ? 'High' : this.cpuUsage > 60 ? 'Normal' : 'Low';
      
      // Simulate Memory usage
      this.memoryUsage = Math.round((Math.max(30, Math.min(85, this.memoryUsage + (Math.random() - 0.5) * 8))) * 100) / 100;
      this.memoryStatus = this.memoryUsage > 75 ? 'High' : this.memoryUsage > 50 ? 'Optimal' : 'Low';
      
      // Simulate Network usage
      this.networkUsage = Math.round((Math.max(10, Math.min(70, this.networkUsage + (Math.random() - 0.5) * 15))) * 100) / 100;
      this.networkStatus = this.networkUsage > 60 ? 'Busy' : this.networkUsage > 30 ? 'Stable' : 'Idle';
      
      // Update chart data
      this.chartData.shift();
      this.chartData.push(this.cpuUsage);
    }, 2000);
  }
}
