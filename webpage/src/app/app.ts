import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardTabComponent } from './components/dashboard-tab/dashboard-tab.component';
import { PerformanceTabComponent } from './components/performance-tab/performance-tab.component';
import { LogsTabComponent } from './components/logs-tab/logs-tab.component';
import { TicketViewerComponent } from './components/ticket-viewer/ticket-viewer.component';
import { KnowledgeBaseEditorComponent } from './components/knowledgebase-editor/knowledgebase-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, DashboardTabComponent, PerformanceTabComponent, LogsTabComponent, TicketViewerComponent, KnowledgeBaseEditorComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col lg:flex-row overflow-hidden">
      <!-- Mobile Header -->
      <div class="lg:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
        <h1 class="text-lg font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          TurboVets Dashboard
        </h1>
        <button 
          (click)="toggleMobileMenu()"
          (touchstart)="toggleMobileMenu()"
          class="p-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:bg-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center mt-2"
          style="touch-action: manipulation;"
        >
          <div class="text-2xl">☰</div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div 
        *ngIf="isMobileMenuOpen" 
        class="lg:hidden fixed inset-0 z-50 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/20"
          (mousedown)="closeMobileMenu()"
        ></div>
        
        <!-- Menu Content -->
        <div class="relative bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg min-h-full" (click)="$event.stopPropagation()" (mousedown)="$event.stopPropagation()">
          <div class="p-4 flex items-center justify-between border-b border-white/10">
            <h2 class="text-lg font-bold text-white">Navigation</h2>
            <button 
              (click)="closeMobileMenu()"
              class="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <nav class="p-4 space-y-2">
            <div 
              class="nav-item group cursor-pointer p-3 rounded-xl border-l-4 transition-all duration-300"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'tickets',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'tickets'
              }"
              (click)="setActiveTab('tickets')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">🎫</span>
                <span class="font-medium text-white/80">Tickets</span>
              </div>
            </div>
            
            <div 
              class="nav-item group cursor-pointer p-3 rounded-xl border-l-4 transition-all duration-300"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'knowledgebase',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'knowledgebase'
              }"
              (click)="setActiveTab('knowledgebase')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">📚</span>
                <span class="font-medium text-white/80">Knowledge Base</span>
              </div>
            </div>
            
            <div 
              class="nav-item group cursor-pointer p-3 rounded-xl border-l-4 transition-all duration-300"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'logs',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'logs'
              }"
              (click)="setActiveTab('logs')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">📋</span>
                <span class="font-medium text-white/80">Logs</span>
              </div>
            </div>
            
            <div 
              class="nav-item group cursor-pointer p-3 rounded-xl border-l-4 transition-all duration-300"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'performance',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'performance'
              }"
              (click)="setActiveTab('performance')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">📊</span>
                <span class="font-medium text-white/80">Performance</span>
              </div>
            </div>
            
            <div 
              class="nav-item group cursor-pointer p-3 rounded-xl border-l-4 transition-all duration-300"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'dashboard',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'dashboard'
              }"
              (click)="setActiveTab('dashboard')"
            >
              <div class="flex items-center gap-3">
                <span class="text-lg">🏠</span>
                <span class="font-medium text-white/80">System Overview</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Desktop Sidebar -->
      <div class="hidden lg:block w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 relative overflow-hidden">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
        
        <div class="relative z-10 p-8">
          <!-- Logo -->
          <div class="mb-12">
            <h1 class="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              TurboVets Dashboard
            </h1>
          </div>
          
          <!-- Navigation -->
          <nav class="space-y-2">
            <div 
              class="nav-item group cursor-pointer p-4 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2"
              [ngClass]="{
                'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'tickets',
                'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'tickets'
              }"
              (click)="setActiveTab('tickets')"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl" [ngClass]="{'opacity-80 group-hover:opacity-100 transition-opacity': activeTab !== 'tickets'}">🎫</span>
                <span class="font-medium" [ngClass]="{'text-white/80 group-hover:text-white transition-colors': activeTab !== 'tickets', 'text-white': activeTab === 'tickets'}">Tickets</span>
              </div>
            </div>
          
          <div 
            class="nav-item group cursor-pointer p-4 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2"
            [ngClass]="{
              'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'knowledgebase',
              'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'knowledgebase'
            }"
            (click)="setActiveTab('knowledgebase')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl" [ngClass]="{'opacity-80 group-hover:opacity-100 transition-opacity': activeTab !== 'knowledgebase'}">📚</span>
              <span class="font-medium" [ngClass]="{'text-white/80 group-hover:text-white transition-colors': activeTab !== 'knowledgebase', 'text-white': activeTab === 'knowledgebase'}">Knowledge Base</span>
            </div>
          </div>
          
          <div 
            class="nav-item group cursor-pointer p-4 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2"
            [ngClass]="{
              'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'logs',
              'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'logs'
            }"
            (click)="setActiveTab('logs')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl" [ngClass]="{'opacity-80 group-hover:opacity-100 transition-opacity': activeTab !== 'logs'}">📋</span>
              <span class="font-medium" [ngClass]="{'text-white/80 group-hover:text-white transition-colors': activeTab !== 'logs', 'text-white': activeTab === 'logs'}">Logs</span>
            </div>
          </div>
          
          <div 
            class="nav-item group cursor-pointer p-4 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2"
            [ngClass]="{
              'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'performance',
              'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'performance'
            }"
            (click)="setActiveTab('performance')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl" [ngClass]="{'opacity-80 group-hover:opacity-100 transition-opacity': activeTab !== 'performance'}">📊</span>
              <span class="font-medium" [ngClass]="{'text-white/80 group-hover:text-white transition-colors': activeTab !== 'performance', 'text-white': activeTab === 'performance'}">Performance</span>
            </div>
          </div>
          
          <div 
            class="nav-item group cursor-pointer p-4 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2"
            [ngClass]="{
              'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20': activeTab === 'dashboard',
              'border-transparent hover:border-cyan-400 hover:bg-white/10': activeTab !== 'dashboard'
            }"
            (click)="setActiveTab('dashboard')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl" [ngClass]="{'opacity-80 group-hover:opacity-100 transition-opacity': activeTab !== 'dashboard'}">🏠</span>
              <span class="font-medium" [ngClass]="{'text-white/80 group-hover:text-white transition-colors': activeTab !== 'dashboard', 'text-white': activeTab === 'dashboard'}">System Overview</span>
            </div>
          </div>
        </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-4 lg:p-6 overflow-auto mobile-scroll">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <div></div>
          <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white/90">
            Admin Panel
          </div>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <app-dashboard-tab *ngIf="activeTab === 'dashboard'" class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></app-dashboard-tab>
          <app-knowledgebase-editor *ngIf="activeTab === 'knowledgebase'"></app-knowledgebase-editor>
          <app-performance-tab *ngIf="activeTab === 'performance'"></app-performance-tab>
          <app-logs-tab *ngIf="activeTab === 'logs'"></app-logs-tab>
          <app-ticket-viewer *ngIf="activeTab === 'tickets'"></app-ticket-viewer>
        </div>
      </div>

      <!-- Background Particles -->
      <div class="fixed inset-0 pointer-events-none z-0">
        <div 
          *ngFor="let particle of particles" 
          class="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-float"
          [style.left.%]="particle.x"
          [style.animation-delay.s]="particle.delay"
          [style.animation-duration.s]="particle.duration"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }

    .animate-float {
      animation: float linear infinite;
    }

    /* Ensure proper scrolling on mobile */
    html, body {
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .mobile-scroll {
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {
  activeTab = 'tickets';
  isMobileMenuOpen = false;
  particles: Array<{x: number, delay: number, duration: number}> = [];

  constructor() {
    this.generateParticles();
  }

  generateParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10
      });
    }
  }

  setActiveTab(tab: string) {
    console.log('Setting active tab:', tab);
    this.activeTab = tab;
    this.closeMobileMenu(); // Close mobile menu when tab is selected
  }

  toggleMobileMenu() {
    console.log('Mobile menu clicked, current state:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Mobile menu new state:', this.isMobileMenuOpen);
    console.log('Menu should be visible:', this.isMobileMenuOpen);
  }

  closeMobileMenu() {
    console.log('Closing mobile menu');
    this.isMobileMenuOpen = false;
  }
}