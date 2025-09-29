import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logs-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 sm:space-y-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            System Logs
          </h2>
          <p class="text-white/70 text-sm sm:text-lg mt-2">Real-time log streaming and analysis</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button class="px-3 sm:px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg text-xs sm:text-sm transition-colors border border-green-500/30">
            Export Logs
          </button>
          <button class="px-3 sm:px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs sm:text-sm transition-colors border border-blue-500/30">
            Analyze
          </button>
        </div>
      </div>

      <!-- Advanced Controls -->
      <div class="bg-white/8 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10">
          <h3 class="text-lg sm:text-xl font-bold text-white mb-2">Advanced Filtering</h3>
          <p class="text-white/70 text-xs sm:text-sm">Filter and search through system logs</p>
        </div>
        
        <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <!-- Filter Row 1 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <!-- Log Level Filter -->
            <div>
              <label class="block text-white/80 text-xs sm:text-sm font-medium mb-2">Log Level</label>
              <select 
                [(ngModel)]="selectedLevel"
                (change)="updateActiveLogsCount()"
                class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
              >
                <option>All Levels</option>
                <option>Error</option>
                <option>Warning</option>
                <option>Debug</option>
                <option>Info</option>
              </select>
            </div>

            <!-- Time Range Filter -->
            <div>
              <label class="block text-white/80 text-xs sm:text-sm font-medium mb-2">Time Range</label>
              <select class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none">
                <option>Last 1 hour</option>
                <option>Last 6 hours</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
              </select>
            </div>

            <!-- Source Filter -->
            <div>
              <label class="block text-white/80 text-xs sm:text-sm font-medium mb-2">Source</label>
              <select class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none">
                <option>All Sources</option>
                <option>Database</option>
                <option>API</option>
                <option>Cache</option>
                <option>File System</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-white/80 text-xs sm:text-sm font-medium mb-2">Status</label>
              <select class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none">
                <option>All Status</option>
                <option>Success</option>
                <option>Failed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <!-- Filter Row 2 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <!-- Search -->
            <div class="sm:col-span-2 lg:col-span-2">
              <label class="block text-white/80 text-xs sm:text-sm font-medium mb-2">Search</label>
              <input 
                type="text" 
                [(ngModel)]="searchTerm"
                (input)="updateActiveLogsCount()"
                placeholder="Search logs by message, level, or source..." 
                class="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/50 text-xs sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
              />
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
              <button 
                (click)="clearFilters()"
                class="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm transition-colors text-white/80"
              >
                Clear Filters
              </button>
              <button 
                (click)="clearLogs()"
                class="px-3 sm:px-4 py-2 sm:py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs sm:text-sm transition-colors"
              >
                Clear Logs
              </button>
            </div>
          </div>

          <!-- Options Row -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <label class="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium">
                <input 
                  type="checkbox" 
                  [(ngModel)]="autoScroll"
                  class="sr-only"
                >
                <div class="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded border-2 border-transparent flex items-center justify-center">
                  <svg *ngIf="autoScroll" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Auto-scroll</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium">
                <input 
                  type="checkbox" 
                  [(ngModel)]="showTimestamps"
                  class="sr-only"
                >
                <div class="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded border-2 border-transparent flex items-center justify-center">
                  <svg *ngIf="showTimestamps" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Show Timestamps</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium">
                <input 
                  type="checkbox" 
                  [(ngModel)]="highlightErrors"
                  class="sr-only"
                >
                <div class="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded border-2 border-transparent flex items-center justify-center">
                  <svg *ngIf="highlightErrors" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Highlight Errors</span>
              </label>
            </div>
            
            <div class="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-white/10">
              <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span class="text-xs sm:text-sm font-medium text-white/80">{{ activeLogsCount }} logs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Log Stream -->
      <div class="bg-white/8 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/10">
          <h3 class="text-lg sm:text-xl font-bold text-white mb-2">Live Log Stream</h3>
          <p class="text-white/70 text-xs sm:text-sm">Real-time system logs with advanced filtering</p>
        </div>
        
        <div class="p-4 sm:p-6 max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
          <div class="space-y-2 sm:space-y-3">
            <div 
              *ngFor="let log of getFilteredLogs(); trackBy: trackByLogId" 
              [ngClass]="getLogEntryClass(log)"
              class="log-entry flex flex-col sm:flex-row items-start sm:items-start gap-2 sm:gap-4 p-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 rounded-lg transition-all duration-200 animate-in slide-in-from-top-1"
            >
              <!-- Mobile Layout -->
              <div class="sm:hidden w-full space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div *ngIf="showTimestamps" class="text-blue-300 font-mono text-xs">
                      {{ log.time }}
                    </div>
                    <div [ngClass]="getLogLevelClass(log.level)" class="px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {{ log.level }}
                    </div>
                  </div>
                  <div class="text-purple-300 font-mono text-xs">
                    {{ log.source || 'SYSTEM' }}
                  </div>
                </div>
                
                <div class="font-mono text-xs leading-relaxed text-white/90 break-words">
                  {{ log.message }}
                </div>
                
                <div class="flex gap-2">
                  <button class="p-1 hover:bg-white/10 rounded transition-colors" title="Copy log">
                    <svg class="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-white/10 rounded transition-colors" title="View details">
                    <svg class="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Desktop Layout -->
              <div class="hidden sm:contents w-full">
                <!-- Time -->
                <div *ngIf="showTimestamps" class="text-blue-300 font-mono text-sm min-w-[80px] mt-1">
                  {{ log.time }}
                </div>
                
                <!-- Log Level Badge -->
                <div [ngClass]="getLogLevelClass(log.level)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider min-w-[70px] text-center">
                  {{ log.level }}
                </div>
                
                <!-- Source -->
                <div class="text-purple-300 font-mono text-xs min-w-[60px] mt-1">
                  {{ log.source || 'SYSTEM' }}
                </div>
                
                <!-- Message -->
                <div class="flex-1 font-mono text-sm leading-relaxed text-white/90">
                  {{ log.message }}
                </div>
                
                <!-- Actions -->
                <div class="flex gap-2">
                  <button class="p-1 hover:bg-white/10 rounded transition-colors" title="Copy log">
                    <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-white/10 rounded transition-colors" title="View details">
                    <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      @apply bg-white/10 rounded;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      @apply bg-gradient-to-b from-cyan-500 to-purple-500 rounded;
    }

    .animate-in {
      animation: slideIn 0.3s ease-out forwards;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .slide-in-from-top-1 {
      animation: slideInFromTop 0.3s ease-out forwards;
    }

    @keyframes slideInFromTop {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LogsTabComponent {
  activeLogsCount = 23;
  
  logs = [
    { id: 1, time: '16:08:21', level: 'debug', message: 'Background job completed', source: 'WORKER' },
    { id: 2, time: '16:08:21', level: 'debug', message: 'Warning: High memory usage detected', source: 'MONITOR' },
    { id: 3, time: '16:08:21', level: 'debug', message: 'Invalid authentication token', source: 'AUTH' },
    { id: 4, time: '16:08:21', level: 'error', message: 'Memory usage: 45%', source: 'SYSTEM' },
    { id: 5, time: '16:08:21', level: 'error', message: 'Email notification sent', source: 'EMAIL' },
    { id: 6, time: '16:08:21', level: 'debug', message: 'Session created for user', source: 'AUTH' },
    { id: 7, time: '16:08:21', level: 'debug', message: 'Cache updated successfully', source: 'CACHE' },
    { id: 8, time: '16:08:21', level: 'warn', message: 'Data synchronization started', source: 'SYNC' }
  ];

  // Filter properties
  selectedLevel = 'All Levels';
  searchTerm = '';
  autoScroll = true;
  showTimestamps = true;
  highlightErrors = true;

  constructor() {
    this.simulateLogUpdates();
  }

  simulateLogUpdates() {
    const logMessages = [
      { level: 'debug', message: 'Database connection established', source: 'DB' },
      { level: 'debug', message: 'User authentication successful', source: 'AUTH' },
      { level: 'warn', message: 'Slow query detected: 2.3s', source: 'DB' },
      { level: 'error', message: 'Failed to send notification', source: 'EMAIL' },
      { level: 'debug', message: 'Cache hit ratio: 89%', source: 'CACHE' },
      { level: 'debug', message: 'Background sync completed', source: 'SYNC' },
      { level: 'info', message: 'API request processed', source: 'API' },
      { level: 'error', message: 'File upload failed', source: 'STORAGE' }
    ];

    setInterval(() => {
      const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
      const now = new Date();
      const timeString = now.toTimeString().substr(0, 8);
      
      const newLog = {
        id: Date.now(),
        time: timeString,
        level: randomMessage.level,
        message: randomMessage.message,
        source: randomMessage.source
      };
      
      this.logs.push(newLog);
      
      // Keep only last 50 entries
      if (this.logs.length > 50) {
        this.logs.shift();
      }
      
      // Update active logs count
      this.updateActiveLogsCount();
    }, 2000);
  }

  getFilteredLogs() {
    return this.logs.filter(log => {
      // Filter by level
      const levelMatch = this.selectedLevel === 'All Levels' || 
                        log.level.toLowerCase() === this.selectedLevel.toLowerCase();
      
      // Filter by search term
      const searchMatch = this.searchTerm === '' || 
                         log.message.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         log.level.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         (log.source && log.source.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return levelMatch && searchMatch;
    });
  }

  updateActiveLogsCount() {
    this.activeLogsCount = this.getFilteredLogs().length;
  }

  clearFilters() {
    this.selectedLevel = 'All Levels';
    this.searchTerm = '';
    this.updateActiveLogsCount();
  }

  clearLogs() {
    this.logs = [];
    this.activeLogsCount = 0;
  }

  getLogLevelClass(level: string): string {
    switch (level) {
      case 'debug':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse';
      case 'warn':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  getLogEntryClass(log: any): string {
    if (this.highlightErrors && log.level === 'error') {
      return 'bg-red-500/10 border-red-500/20';
    }
    return '';
  }

  trackByLogId(index: number, log: any): number {
    return log.id;
  }
}
