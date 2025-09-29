import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Desktop Navigation -->
    <nav class="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div class="p-6">
        <h1 class="text-xl font-bold text-gray-800">Internal Tools</h1>
      </div>
      
      <div class="mt-8">
        <a 
          *ngFor="let item of navItems" 
          [routerLink]="item.route"
          routerLinkActive="bg-blue-50 text-blue-600 border-r-2 border-blue-600"
          class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <i class="{{item.icon}} mr-3 text-lg"></i>
          <span class="font-medium">{{item.label}}</span>
        </a>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">AD</span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">Admin User</p>
            <p class="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <div class="lg:hidden bg-white shadow-lg">
      <div class="px-4 py-3 flex items-center justify-between">
        <h1 class="text-lg font-bold text-gray-800">Internal Tools</h1>
        <button 
          (click)="toggleMobileMenu()"
          class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      <!-- Mobile Dropdown Menu -->
      <div 
        *ngIf="isMobileMenuOpen" 
        class="border-t bg-white shadow-lg"
      >
        <a 
          *ngFor="let item of navItems" 
          [routerLink]="item.route"
          routerLinkActive="bg-blue-50 text-blue-600"
          (click)="closeMobileMenu()"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
        >
          <i class="{{item.icon}} mr-3 text-lg"></i>
          <span class="font-medium">{{item.label}}</span>
        </a>
        
        <!-- Mobile User Info -->
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">AD</span>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700">Admin User</p>
              <p class="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NavigationComponent {
  isMobileMenuOpen = false;
  
  navItems = [
    { route: '/tickets', icon: 'fas fa-ticket-alt', label: 'Tickets' },
    { route: '/knowledgebase', icon: 'fas fa-book', label: 'Knowledge Base' },
    { route: '/logs', icon: 'fas fa-list', label: 'Live Logs' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}