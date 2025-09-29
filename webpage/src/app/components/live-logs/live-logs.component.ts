import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogEntry {
  id: number;
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
}

@Component({
  selector: 'app-live-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Live System Logs</h2>
            <p class="text-gray-600 mt-1">Real-time system activity monitoring</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span class="text-sm text-gray-600">Live</span>
            </div>
            <button 
              (click)="toggleAutoScroll()"
              [class]="autoScrollButtonClass"
            >
              <i class="fas fa-arrow-down mr-1"></i>
              Auto-scroll: {{autoScroll ? 'ON' : 'OFF'}}
            </button>
            <button 
              (click)="clearLogs()"
              class="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <i class="fas fa-trash mr-1"></i> Clear
            </button>
          </div>
        </div>
      </div>
      
      <div class="p-6">
        <div 
          #logsContainer
          class="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm"
        >
          <div 
            *ngFor="let log of logs; trackBy: trackByLogId" 
            class="flex items-start space-x-3 mb-2 animate-fade-in"
          >
            <span class="text-gray-400 whitespace-nowrap">
              {{log.timestamp | date:'HH:mm:ss.SSS'}}
            </span>
            <span [class]="getLogLevelClass(log.level)" class="w-12 text-center">
              {{log.level}}
            </span>
            <span class="text-blue-400 min-w-0 flex-shrink-0">
              [{{log.service}}]
            </span>
            <span class="text-gray-300 break-words">
              {{log.message}}
            </span>
          </div>
          
          <div *ngIf="logs.length === 0" class="text-gray-500 text-center py-8">
            No logs to display. Logs will appear here automatically.
          </div>
        </div>
        
        <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>{{logs.length}} log entries</span>
          <span>Updates every 2-3 seconds</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `]
})
export class LiveLogsComponent implements OnInit, OnDestroy {
  @ViewChild('logsContainer', { static: true }) logsContainer!: ElementRef;
  
  logs: LogEntry[] = [];
  private logInterval: any;
  private nextLogId = 1;
  autoScroll = true;
  
  private readonly services = [
    'auth-service', 'payment-gateway', 'user-management', 'notification-service',
    'data-processor', 'api-gateway', 'cache-manager', 'file-service'
  ];
  
  private readonly logMessages = [
    'User authentication successful',
    'Payment processed successfully',
    'Database connection established',
    'Cache invalidated for user session',
    'File upload completed',
    'API rate limit warning for IP',
    'Scheduled backup initiated',
    'Memory usage threshold exceeded',
    'SSL certificate renewal required',
    'New user registration completed',
    'Email notification sent',
    'Database query optimization applied',
    'Security scan completed',
    'Service health check passed'
  ];

  ngOnInit() {
    this.startLogGeneration();
  }

  ngOnDestroy() {
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
  }

  startLogGeneration() {
    this.logInterval = setInterval(() => {
      this.generateRandomLog();
    }, 2000 + Math.random() * 2000); // Random interval between 2-4 seconds
  }

  generateRandomLog() {
    const levels: ('INFO' | 'WARN' | 'ERROR' | 'DEBUG')[] = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    const levelWeights = [0.6, 0.25, 0.1, 0.05]; // INFO is most common
    
    let randomValue = Math.random();
    let selectedLevel = levels[0];
    let cumulativeWeight = 0;
    
    for (let i = 0; i < levels.length; i++) {
      cumulativeWeight += levelWeights[i];
      if (randomValue <= cumulativeWeight) {
        selectedLevel = levels[i];
        break;
      }
    }

    const newLog: LogEntry = {
      id: this.nextLogId++,
      timestamp: new Date(),
      level: selectedLevel,
      service: this.services[Math.floor(Math.random() * this.services.length)],
      message: this.logMessages[Math.floor(Math.random() * this.logMessages.length)]
    };

    this.logs.push(newLog);
    
    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    if (this.autoScroll) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  getLogLevelClass(level: string): string {
    switch (level) {
      case 'ERROR': return 'text-red-400';
      case 'WARN': return 'text-yellow-400';
      case 'INFO': return 'text-green-400';
      case 'DEBUG': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  }

  toggleAutoScroll() {
    this.autoScroll = !this.autoScroll;
    if (this.autoScroll) {
      this.scrollToBottom();
    }
  }

  get autoScrollButtonClass(): string {
    const baseClass = 'px-3 py-1 text-sm rounded-md transition-colors duration-200';
    return this.autoScroll
      ? `${baseClass} bg-green-500 text-white`
      : `${baseClass} border border-gray-300 text-gray-700 hover:bg-gray-50`;
  }

  clearLogs() {
    this.logs = [];
  }

  trackByLogId(index: number, log: LogEntry): number {
    return log.id;
  }

  private scrollToBottom() {
    try {
      const container = this.logsContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }
}