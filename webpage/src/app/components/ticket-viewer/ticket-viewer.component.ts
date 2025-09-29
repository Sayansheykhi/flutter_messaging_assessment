// ticket-viewer.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  reporter: string;
  created: Date;
  updated: Date;
  tags: string[];
  comments: number;
  attachments: number;
  category: string;
  estimatedTime?: string;
}

@Component({
  selector: 'app-ticket-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-3 sm:p-6">
      
      <!-- Header Section -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
          <div>
            <h1 class="text-2xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              🎫 Support Tickets
            </h1>
            <p class="text-white/70 text-sm sm:text-lg">Manage and track veterinary support requests</p>
          </div>
          
          <button class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base">
            + New Ticket
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8">
          <div *ngFor="let stat of ticketStats" 
               class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 p-3 sm:p-6 hover:bg-white/10 transition-all duration-300">
            <div class="flex items-center justify-between mb-2 sm:mb-4">
              <div [class]="stat.iconBg" class="p-2 sm:p-3 rounded-xl">
                <span class="text-lg sm:text-2xl">{{ stat.icon }}</span>
              </div>
              <div [class]="stat.trend === 'up' ? 'text-green-400' : 'text-red-400'" 
                   class="text-xs sm:text-sm font-medium">
                {{ stat.change }}
              </div>
            </div>
            <div class="text-xl sm:text-3xl font-bold mb-1">{{ stat.value }}</div>
            <div class="text-white/60 text-xs sm:text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
          
          <!-- Search -->
          <div class="sm:col-span-2 lg:col-span-2 relative">
            <input type="text" 
                   [(ngModel)]="searchTerm"
                   placeholder="Search tickets..."
                   class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/15">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">🔍</span>
          </div>

          <!-- Status Filter -->
          <select [(ngModel)]="selectedStatus" 
                  class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <!-- Priority Filter -->
          <select [(ngModel)]="selectedPriority" 
                  class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <!-- Category Filter -->
          <select [(ngModel)]="selectedCategory" 
                  class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="">All Categories</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
          </select>

          <!-- View Toggle -->
          <div class="flex bg-white/10 rounded-xl p-1">
            <button (click)="viewMode = 'grid'"
                    [class]="viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-white/70'"
                    class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
              Grid
            </button>
            <button (click)="viewMode = 'list'"
                    [class]="viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-white/70'"
                    class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
              List
            </button>
          </div>
        </div>
      </div>

      <!-- Tickets Grid View -->
      <div *ngIf="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div *ngFor="let ticket of filteredTickets" 
             (click)="selectTicket(ticket)"
             class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 hover:bg-white/12 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
          
          <!-- Ticket Header -->
          <div class="flex justify-between items-start mb-3 sm:mb-4">
            <div class="flex items-center gap-1 sm:gap-2">
              <span class="text-cyan-400 font-mono text-xs sm:text-sm">#{{ ticket.id }}</span>
              <span [class]="getPriorityClass(ticket.priority)" 
                    class="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {{ ticket.priority }}
              </span>
            </div>
            <span [class]="getStatusClass(ticket.status)" 
                  class="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {{ ticket.status.replace('-', ' ') }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 leading-tight">
            {{ ticket.title }}
          </h3>

          <!-- Description -->
          <p class="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
            {{ ticket.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            <span *ngFor="let tag of ticket.tags.slice(0, 2)" 
                  class="bg-purple-500/20 text-purple-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs">
              {{ tag }}
            </span>
            <span *ngIf="ticket.tags.length > 2" 
                  class="text-white/50 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
              +{{ ticket.tags.length - 2 }} more
            </span>
          </div>

          <!-- Footer -->
          <div class="flex justify-between items-center pt-3 sm:pt-4 border-t border-white/10">
            <div class="flex items-center gap-2 sm:gap-4 text-xs text-white/60">
              <span class="flex items-center gap-1">
                💬 {{ ticket.comments }}
              </span>
              <span class="flex items-center gap-1">
                📎 {{ ticket.attachments }}
              </span>
            </div>
            <div class="text-xs text-white/60">
              {{ getRelativeTime(ticket.updated) }}
            </div>
          </div>

          <!-- Assignee -->
          <div class="flex items-center gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
            <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
              {{ getInitials(ticket.assignee) }}
            </div>
            <span class="text-xs sm:text-sm text-white/70">{{ ticket.assignee }}</span>
          </div>
        </div>
      </div>

      <!-- Tickets List View -->
      <div *ngIf="viewMode === 'list'" class="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        
        <!-- Table Header -->
        <div class="hidden sm:grid grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10 text-sm font-semibold text-white/70">
          <div class="col-span-1">ID</div>
          <div class="col-span-4">Title</div>
          <div class="col-span-1">Status</div>
          <div class="col-span-1">Priority</div>
          <div class="col-span-2">Assignee</div>
          <div class="col-span-1">Comments</div>
          <div class="col-span-2">Updated</div>
        </div>

        <!-- Table Rows -->
        <div *ngFor="let ticket of filteredTickets" 
             (click)="selectTicket(ticket)"
             class="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer border-b border-white/5 last:border-b-0">
          
          <!-- Mobile Layout -->
          <div class="sm:hidden space-y-3">
            <div class="flex justify-between items-start">
              <div class="font-mono text-cyan-400 text-sm">#{{ ticket.id }}</div>
              <div class="flex gap-2">
                <span [class]="getStatusClass(ticket.status)" 
                      class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ ticket.status.replace('-', ' ') }}
                </span>
                <span [class]="getPriorityClass(ticket.priority)" 
                      class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ ticket.priority }}
                </span>
              </div>
            </div>
            
            <div>
              <div class="font-medium mb-1 line-clamp-2">{{ ticket.title }}</div>
              <div class="text-white/60 text-xs line-clamp-2">{{ ticket.description }}</div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {{ getInitials(ticket.assignee) }}
                </div>
                <span class="text-xs">{{ ticket.assignee }}</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-white/60">
                <span>💬 {{ ticket.comments }}</span>
                <span>{{ getRelativeTime(ticket.updated) }}</span>
              </div>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden sm:contents">
            <div class="col-span-1 font-mono text-cyan-400 text-sm">
              #{{ ticket.id }}
            </div>
            
            <div class="col-span-4">
              <div class="font-medium mb-1 line-clamp-1">{{ ticket.title }}</div>
              <div class="text-white/60 text-xs line-clamp-1">{{ ticket.description }}</div>
            </div>
            
            <div class="col-span-1">
              <span [class]="getStatusClass(ticket.status)" 
                    class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ ticket.status.replace('-', ' ') }}
              </span>
            </div>
            
            <div class="col-span-1">
              <span [class]="getPriorityClass(ticket.priority)" 
                    class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ ticket.priority }}
              </span>
            </div>
            
            <div class="col-span-2 flex items-center gap-2">
              <div class="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                {{ getInitials(ticket.assignee) }}
              </div>
              <span class="text-sm">{{ ticket.assignee }}</span>
            </div>
            
            <div class="col-span-1 text-center">
              <span class="bg-white/10 px-2 py-1 rounded-lg text-xs">{{ ticket.comments }}</span>
            </div>
            
            <div class="col-span-2 text-sm text-white/70">
              {{ getRelativeTime(ticket.updated) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Ticket Modal -->
      <div *ngIf="selectedTicket" 
           class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
           (click)="closeTicketModal($event)">
        
        <div class="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-auto"
             (click)="$event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="flex justify-between items-start p-8 border-b border-white/10">
            <div class="flex items-center gap-4">
              <span class="text-cyan-400 font-mono text-lg">#{{ selectedTicket?.id }}</span>
              <span [class]="getStatusClass(selectedTicket?.status || '')" 
                    class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {{ selectedTicket?.status?.replace('-', ' ') }}
              </span>
              <span [class]="getPriorityClass(selectedTicket?.priority || '')" 
                    class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {{ selectedTicket?.priority }}
              </span>
            </div>
            
            <button (click)="closeTicketModal($event)" 
                    class="text-white/60 hover:text-white text-2xl font-bold">×</button>
          </div>

          <!-- Modal Content -->
          <div class="p-8 space-y-6">
            
            <!-- Title -->
            <h2 class="text-3xl font-bold">{{ selectedTicket?.title }}</h2>
            
            <!-- Meta Info -->
            <div class="grid grid-cols-4 gap-6 text-sm">
              <div>
                <div class="text-white/60 mb-1">Reporter</div>
                <div class="font-medium">{{ selectedTicket?.reporter }}</div>
              </div>
              <div>
                <div class="text-white/60 mb-1">Assignee</div>
                <div class="font-medium">{{ selectedTicket?.assignee }}</div>
              </div>
              <div>
                <div class="text-white/60 mb-1">Category</div>
                <div class="font-medium capitalize">{{ selectedTicket?.category }}</div>
              </div>
              <div>
                <div class="text-white/60 mb-1">Created</div>
                <div class="font-medium">{{ selectedTicket?.created ? formatDate(selectedTicket.created) : '' }}</div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Description</h3>
              <p class="text-white/80 leading-relaxed">{{ selectedTicket?.description }}</p>
            </div>

            <!-- Tags -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tag of selectedTicket?.tags" 
                      class="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-sm">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6 border-t border-white/10">
              <button class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Update Status
              </button>
              <button class="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Add Comment
              </button>
              <button class="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class TicketViewerComponent implements OnInit {

  searchTerm = '';
  selectedStatus = '';
  selectedPriority = '';
  selectedCategory = '';
  viewMode: 'grid' | 'list' = 'grid';
  selectedTicket: Ticket | null = null;

  ticketStats = [
    { icon: '🟢', label: 'Open Tickets', value: '24', change: '+3 today', trend: 'up', iconBg: 'bg-green-500/20' },
    { icon: '🔄', label: 'In Progress', value: '12', change: '+1 today', trend: 'up', iconBg: 'bg-blue-500/20' },
    { icon: '✅', label: 'Resolved Today', value: '8', change: '+2 from yesterday', trend: 'up', iconBg: 'bg-emerald-500/20' },
    { icon: '⏱️', label: 'Avg Response Time', value: '2.4h', change: '-0.3h', trend: 'down', iconBg: 'bg-purple-500/20' }
  ];

  tickets: Ticket[] = [
    {
      id: '001',
      title: 'Unable to access patient records after system update',
      description: 'After the recent system update, veterinarians are unable to access historical patient records. This is affecting our ability to provide proper care during appointments.',
      status: 'open',
      priority: 'urgent',
      assignee: 'Sarah Johnson',
      reporter: 'Dr. Michael Chen',
      created: new Date('2024-01-15T09:30:00'),
      updated: new Date('2024-01-15T14:20:00'),
      tags: ['system-update', 'database', 'patient-records'],
      comments: 5,
      attachments: 2,
      category: 'technical'
    },
    {
      id: '002',
      title: 'Billing discrepancy for monthly subscription',
      description: 'Our clinic has been charged twice for the monthly subscription fee. We need this resolved and a refund for the duplicate charge.',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Tom Wilson',
      reporter: 'Jessica Martinez',
      created: new Date('2024-01-14T11:15:00'),
      updated: new Date('2024-01-15T10:45:00'),
      tags: ['billing', 'subscription', 'refund'],
      comments: 3,
      attachments: 1,
      category: 'billing'
    },
    {
      id: '003',
      title: 'Feature request: Automated appointment reminders',
      description: 'It would be great to have automated SMS/email reminders sent to pet owners 24 hours before their scheduled appointments.',
      status: 'open',
      priority: 'medium',
      assignee: 'Alex Kim',
      reporter: 'Dr. Emily Rodriguez',
      created: new Date('2024-01-13T16:20:00'),
      updated: new Date('2024-01-14T09:30:00'),
      tags: ['feature-request', 'appointments', 'notifications'],
      comments: 7,
      attachments: 0,
      category: 'feature'
    },
    {
      id: '004',
      title: 'Mobile app crashes when uploading photos',
      description: 'The mobile application consistently crashes when trying to upload photos of pets or medical documents.',
      status: 'resolved',
      priority: 'high',
      assignee: 'David Park',
      reporter: 'Lisa Thompson',
      created: new Date('2024-01-12T13:45:00'),
      updated: new Date('2024-01-15T11:20:00'),
      tags: ['mobile-app', 'crash', 'photo-upload'],
      comments: 12,
      attachments: 3,
      category: 'bug'
    },
    {
      id: '005',
      title: 'Integration with veterinary lab systems',
      description: 'Request for integration with major veterinary laboratory systems to automatically import test results.',
      status: 'open',
      priority: 'low',
      assignee: 'Maria Garcia',
      reporter: 'Dr. Robert Kim',
      created: new Date('2024-01-11T10:00:00'),
      updated: new Date('2024-01-13T15:30:00'),
      tags: ['integration', 'lab-results', 'automation'],
      comments: 2,
      attachments: 1,
      category: 'feature'
    },
    {
      id: '006',
      title: 'Slow performance during peak hours',
      description: 'The system becomes noticeably slow during peak clinic hours (2-5 PM), affecting staff productivity.',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Chris Lee',
      reporter: 'Amanda Foster',
      created: new Date('2024-01-10T14:30:00'),
      updated: new Date('2024-01-15T08:15:00'),
      tags: ['performance', 'peak-hours', 'optimization'],
      comments: 8,
      attachments: 0,
      category: 'technical'
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  get filteredTickets(): Ticket[] {
    return this.tickets.filter(ticket => {
      const matchesSearch = !this.searchTerm || 
        ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.id.includes(this.searchTerm);
      
      const matchesStatus = !this.selectedStatus || ticket.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || ticket.priority === this.selectedPriority;
      const matchesCategory = !this.selectedCategory || ticket.category === this.selectedCategory;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  closeTicketModal(event: Event) {
    this.selectedTicket = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'resolved':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
      default:
        return 'bg-white/10 text-white/70';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      default:
        return 'bg-white/10 text-white/70';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}