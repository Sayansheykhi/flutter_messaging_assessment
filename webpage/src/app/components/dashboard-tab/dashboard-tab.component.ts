import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            System Overview
          </h2>
          <p class="text-white/70 text-base lg:text-lg mt-2">Real-time system status and critical alerts</p>
        </div>
        <div class="flex gap-4">
          <div class="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 text-xs lg:text-sm font-medium text-white/90">
            Last updated: {{ lastUpdated }}
          </div>
        </div>
      </div>

      <!-- Mini Performance Widgets -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <!-- CPU Widget -->
        <div class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-4 lg:p-6">
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
        </div>

        <!-- Memory Widget -->
        <div class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-4 lg:p-6">
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
        </div>

        <!-- Network Widget -->
        <div class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-4 lg:p-6">
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
      </div>

      <!-- System Status Overview -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <!-- System Health -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-4 lg:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-white/10">
            <h3 class="text-lg lg:text-xl font-bold text-white mb-2">System Health</h3>
            <p class="text-white/70 text-xs lg:text-sm">Overall system status and services</p>
          </div>
          <div class="p-4 lg:p-6 space-y-3 lg:space-y-4">
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
                <div class="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span class="text-white/80 font-medium">File Storage</span>
              </div>
              <span class="text-red-400 font-bold">Critical</span>
            </div>
          </div>
        </div>

        <!-- Recent Critical Logs -->
        <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="p-4 lg:p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-white/10">
            <h3 class="text-lg lg:text-xl font-bold text-white mb-2">Recent Critical Logs</h3>
            <p class="text-white/70 text-xs lg:text-sm">Last 5 critical system events</p>
          </div>
          <div class="p-4 lg:p-6 space-y-3">
            <div 
              *ngFor="let log of getCriticalLogs(); trackBy: trackByLogId" 
              class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <!-- Time and Level Row -->
              <div class="flex items-center gap-2 sm:flex-col sm:items-start sm:min-w-[80px]">
                <div class="text-blue-300 font-mono text-xs">
                  {{ log.time }}
                </div>
                <div [ngClass]="getLogLevelClass(log.level)" class="px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-center">
                  {{ log.level }}
                </div>
              </div>
              
              <!-- Message -->
              <div class="flex-1 font-mono text-xs sm:text-sm leading-relaxed text-white/90">
                {{ log.message }}
              </div>
            </div>
            
            <div *ngIf="getCriticalLogs().length === 0" class="text-center py-8 text-white/60">
              <div class="text-4xl mb-2">✅</div>
              <div class="text-sm">No critical logs in the last hour</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div class="p-4 lg:p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10">
          <h3 class="text-lg lg:text-xl font-bold text-white mb-2">Quick Actions</h3>
          <p class="text-white/70 text-xs lg:text-sm">Common system operations</p>
        </div>
        <div class="p-4 lg:p-6">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            <button class="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 hover:scale-105">
              <div class="text-xl lg:text-2xl mb-2">🔄</div>
              <div class="text-xs lg:text-sm font-medium text-white/80">Restart Services</div>
            </button>
            
            <button class="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 hover:scale-105">
              <div class="text-xl lg:text-2xl mb-2">🧹</div>
              <div class="text-xs lg:text-sm font-medium text-white/80">Clear Cache</div>
            </button>
            
            <button class="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 hover:scale-105">
              <div class="text-xl lg:text-2xl mb-2">📊</div>
              <div class="text-xs lg:text-sm font-medium text-white/80">Generate Report</div>
            </button>
            
            <button class="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 hover:scale-105">
              <div class="text-xl lg:text-2xl mb-2">⚙️</div>
              <div class="text-xs lg:text-sm font-medium text-white/80">System Settings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hover\\:scale-105:hover {
      transform: scale(1.05);
    }
  `]
})
export class DashboardTabComponent {
  cpuUsage = 65;
  memoryUsage = 45;
  networkUsage = 32;
  
  cpuStatus = 'Normal';
  memoryStatus = 'Optimal';
  networkStatus = 'Stable';
  
  lastUpdated = '';

  logs = [
    { id: 1, time: '16:08:21', level: 'debug', message: 'Background job completed' },
    { id: 2, time: '16:08:21', level: 'debug', message: 'Warning: High memory usage detected' },
    { id: 3, time: '16:08:21', level: 'debug', message: 'Invalid authentication token' },
    { id: 4, time: '16:08:21', level: 'error', message: 'Memory usage: 45%' },
    { id: 5, time: '16:08:21', level: 'error', message: 'Email notification sent' },
    { id: 6, time: '16:08:21', level: 'debug', message: 'Session created for user' },
    { id: 7, time: '16:08:21', level: 'debug', message: 'Cache updated successfully' },
    { id: 8, time: '16:08:21', level: 'warn', message: 'Data synchronization started' }
  ];

  constructor() {
    this.updateLastUpdated();
    this.simulateMetrics();
  }

  updateLastUpdated() {
    const now = new Date();
    this.lastUpdated = now.toLocaleTimeString();
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
      
      this.updateLastUpdated();
    }, 3000);
  }

  getCriticalLogs() {
    return this.logs
      .filter(log => log.level === 'error' || log.level === 'warn')
      .slice(-5)
      .reverse();
  }

  getLogLevelClass(level: string): string {
    switch (level) {
      case 'debug':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse';
      case 'warn':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  trackByLogId(index: number, log: any): number {
    return log.id;
  }
}
