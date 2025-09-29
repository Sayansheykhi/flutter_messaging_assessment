import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Performance Analytics
          </h2>
          <p class="text-white/70 text-lg mt-2">Detailed system metrics and historical data</p>
        </div>
        <div class="flex gap-4">
          <select class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button class="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm transition-colors border border-cyan-500/30">
            Export Data
          </button>
        </div>
      </div>

      <!-- Main Performance Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- CPU Performance Chart -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">CPU Performance</h3>
            <p class="text-white/70 text-sm">Real-time CPU usage and trends</p>
          </div>
          <div class="p-6">
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/80 text-sm">Current Usage</span>
                <span class="text-2xl font-bold text-blue-400">{{ cpuUsage }}%</span>
              </div>
              <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000 ease-out"
                  [style.width.%]="cpuUsage"
                ></div>
              </div>
            </div>
            
            <!-- CPU Chart -->
            <div class="h-48 flex items-end justify-between gap-2">
              <div 
                *ngFor="let point of cpuHistory; let i = index"
                class="flex-1 bg-gradient-to-t from-blue-500/60 to-cyan-500/60 rounded-t transition-all duration-500 hover:from-blue-400/80 hover:to-cyan-400/80"
                [style.height.%]="point"
                [title]="'CPU: ' + point + '%'"
              ></div>
            </div>
            <div class="mt-4 flex justify-between text-xs text-white/60">
              <span>12h ago</span>
              <span>8h ago</span>
              <span>4h ago</span>
              <span>2h ago</span>
              <span>1h ago</span>
              <span>30m ago</span>
              <span>15m ago</span>
              <span>5m ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        <!-- Memory Performance Chart -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">Memory Performance</h3>
            <p class="text-white/70 text-sm">Memory usage and allocation trends</p>
          </div>
          <div class="p-6">
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/80 text-sm">Current Usage</span>
                <span class="text-2xl font-bold text-green-400">{{ memoryUsage }}%</span>
              </div>
              <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-1000 ease-out"
                  [style.width.%]="memoryUsage"
                ></div>
              </div>
            </div>
            
            <!-- Memory Chart -->
            <div class="h-48 flex items-end justify-between gap-2">
              <div 
                *ngFor="let point of memoryHistory; let i = index"
                class="flex-1 bg-gradient-to-t from-green-500/60 to-emerald-500/60 rounded-t transition-all duration-500 hover:from-green-400/80 hover:to-emerald-400/80"
                [style.height.%]="point"
                [title]="'Memory: ' + point + '%'"
              ></div>
            </div>
            <div class="mt-4 flex justify-between text-xs text-white/60">
              <span>12h ago</span>
              <span>8h ago</span>
              <span>4h ago</span>
              <span>2h ago</span>
              <span>1h ago</span>
              <span>30m ago</span>
              <span>15m ago</span>
              <span>5m ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        <!-- Network Performance Chart -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">Network I/O</h3>
            <p class="text-white/70 text-sm">Network traffic and bandwidth usage</p>
          </div>
          <div class="p-6">
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/80 text-sm">Current Usage</span>
                <span class="text-2xl font-bold text-purple-400">{{ networkUsage }}%</span>
              </div>
              <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000 ease-out"
                  [style.width.%]="networkUsage"
                ></div>
              </div>
            </div>
            
            <!-- Network Chart -->
            <div class="h-48 flex items-end justify-between gap-2">
              <div 
                *ngFor="let point of networkHistory; let i = index"
                class="flex-1 bg-gradient-to-t from-purple-500/60 to-pink-500/60 rounded-t transition-all duration-500 hover:from-purple-400/80 hover:to-pink-400/80"
                [style.height.%]="point"
                [title]="'Network: ' + point + '%'"
              ></div>
            </div>
            <div class="mt-4 flex justify-between text-xs text-white/60">
              <span>12h ago</span>
              <span>8h ago</span>
              <span>4h ago</span>
              <span>2h ago</span>
              <span>1h ago</span>
              <span>30m ago</span>
              <span>15m ago</span>
              <span>5m ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        <!-- System Health Overview -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">System Health</h3>
            <p class="text-white/70 text-sm">Overall system status and alerts</p>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-white/80 font-medium">Database</span>
              </div>
              <span class="text-green-400 font-bold">Healthy</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span class="text-white/80 font-medium">Cache</span>
              </div>
              <span class="text-yellow-400 font-bold">Warning</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-white/80 font-medium">API Services</span>
              </div>
              <span class="text-green-400 font-bold">Healthy</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full animate-pulse" [ngClass]="{'bg-green-400': memoryUsage < 60, 'bg-yellow-400': memoryUsage >= 60 && memoryUsage < 80, 'bg-red-400': memoryUsage >= 80}"></div>
                <span class="text-white/80 font-medium">Memory Usage</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-white font-bold">{{ memoryUsage }}%</span>
                <div class="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
                    [style.width.%]="memoryUsage"
                  ></div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span class="text-white/80 font-medium">File Storage</span>
              </div>
              <span class="text-red-400 font-bold">Critical</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Summary -->
      <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div class="p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10">
          <h3 class="text-xl font-bold text-white mb-2">Performance Summary</h3>
          <p class="text-white/70 text-sm">Key metrics and recommendations</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="text-3xl font-bold text-cyan-400 mb-2">{{ averageCpu }}%</div>
              <div class="text-white/80 text-sm">Average CPU</div>
              <div class="text-green-400 text-xs mt-1">↓ 5% from yesterday</div>
            </div>
            <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="text-3xl font-bold text-green-400 mb-2">{{ averageMemory }}%</div>
              <div class="text-white/80 text-sm">Average Memory</div>
              <div class="text-red-400 text-xs mt-1">↑ 3% from yesterday</div>
            </div>
            <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div class="text-3xl font-bold text-purple-400 mb-2">{{ averageNetwork }}%</div>
              <div class="text-white/80 text-sm">Average Network</div>
              <div class="text-green-400 text-xs mt-1">↓ 2% from yesterday</div>
            </div>
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
export class PerformanceTabComponent {
  cpuUsage = 65;
  memoryUsage = 45;
  networkUsage = 32;
  
  cpuHistory = [45, 52, 38, 67, 65, 58, 72, 69, 65];
  memoryHistory = [42, 48, 35, 55, 52, 45, 60, 58, 45];
  networkHistory = [28, 35, 22, 40, 38, 32, 45, 42, 32];
  
  averageCpu = 58;
  averageMemory = 48;
  averageNetwork = 35;

  constructor() {
    this.simulateMetrics();
  }

  simulateMetrics() {
    setInterval(() => {
      // Simulate CPU usage
      this.cpuUsage = Math.round((Math.max(20, Math.min(90, this.cpuUsage + (Math.random() - 0.5) * 10))) * 100) / 100;
      this.cpuHistory.shift();
      this.cpuHistory.push(this.cpuUsage);
      
      // Simulate Memory usage
      this.memoryUsage = Math.round((Math.max(30, Math.min(85, this.memoryUsage + (Math.random() - 0.5) * 8))) * 100) / 100;
      this.memoryHistory.shift();
      this.memoryHistory.push(this.memoryUsage);
      
      // Simulate Network usage
      this.networkUsage = Math.round((Math.max(10, Math.min(70, this.networkUsage + (Math.random() - 0.5) * 15))) * 100) / 100;
      this.networkHistory.shift();
      this.networkHistory.push(this.networkUsage);
      
      // Update averages
      this.averageCpu = Math.round((this.cpuHistory.reduce((a, b) => a + b, 0) / this.cpuHistory.length) * 100) / 100;
      this.averageMemory = Math.round((this.memoryHistory.reduce((a, b) => a + b, 0) / this.memoryHistory.length) * 100) / 100;
      this.averageNetwork = Math.round((this.networkHistory.reduce((a, b) => a + b, 0) / this.networkHistory.length) * 100) / 100;
    }, 2000);
  }
}
