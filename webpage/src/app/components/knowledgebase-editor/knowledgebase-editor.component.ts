// knowledge-base-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastModified: Date;
  author: string;
  published: boolean;
}

@Component({
  selector: 'app-knowledgebase-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      
      <!-- Header -->
      <div class="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 z-40">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6">
          <div>
            <h1 class="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              📚 Knowledge Base Editor
            </h1>
            <p class="text-gray-400 text-sm sm:text-lg mt-1">Create and manage veterinary documentation</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button (click)="saveArticle()" 
                    [disabled]="!currentArticle.title.trim() || !currentArticle.content.trim()"
                    class="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base">
              💾 Save Article
            </button>
            
            <button (click)="createNewArticle()"
                    class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base">
              ➕ New Article
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        
        <!-- Sidebar - Article List -->
        <div class="w-full lg:w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 overflow-y-auto max-h-96 lg:max-h-none">
          <div class="p-4 sm:p-6">
            
            <!-- Search -->
            <div class="relative mb-4 sm:mb-6">
              <input type="text" 
                     [(ngModel)]="searchTerm"
                     placeholder="Search articles..."
                     class="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 sm:py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-800/70 text-sm sm:text-base">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            <!-- Category Filter -->
            <select [(ngModel)]="selectedCategoryFilter" 
                    class="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 sm:mb-6 text-sm sm:text-base">
              <option value="">All Categories</option>
              <option value="medical">Medical Procedures</option>
              <option value="software">Software Guide</option>
              <option value="policies">Clinic Policies</option>
              <option value="emergency">Emergency Protocols</option>
              <option value="training">Staff Training</option>
            </select>

            <!-- Articles List -->
            <div class="space-y-2 sm:space-y-3">
              <div *ngFor="let article of filteredArticles" 
                   (click)="loadArticle(article)"
                   [class]="currentArticle.id === article.id ? 'bg-blue-600/20 border-blue-500/50' : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50'"
                   class="p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:border-gray-600/50">
                
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-medium text-xs sm:text-sm line-clamp-2 flex-1 text-gray-100">{{ article.title || 'Untitled Article' }}</h3>
                  <span [class]="article.published ? 'text-green-400' : 'text-amber-400'" 
                        class="text-xs ml-2">
                    {{ article.published ? '●' : '○' }}
                  </span>
                </div>
                
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-400">
                  <span class="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md capitalize">
                    {{ article.category || 'uncategorized' }}
                  </span>
                  <span>{{ getRelativeTime(article.lastModified) }}</span>
                </div>
                
                <div class="mt-2 text-xs text-gray-500">
                  By {{ article.author }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Editor Area -->
        <div class="flex-1 flex flex-col min-h-0">
          
          <!-- Article Meta -->
          <div class="bg-gray-800/30 border-b border-gray-700/50 p-4 sm:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              
              <!-- Title -->
              <div class="sm:col-span-2 lg:col-span-6">
                <label class="block text-sm font-medium text-gray-300 mb-2">Article Title</label>
                <input type="text" 
                       [(ngModel)]="currentArticle.title"
                       placeholder="Enter article title..."
                       class="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
              </div>

              <!-- Category -->
              <div class="sm:col-span-1 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select [(ngModel)]="currentArticle.category" 
                        class="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
                  <option value="">Select Category</option>
                  <option value="medical">Medical Procedures</option>
                  <option value="software">Software Guide</option>
                  <option value="policies">Clinic Policies</option>
                  <option value="emergency">Emergency Protocols</option>
                  <option value="training">Staff Training</option>
                </select>
              </div>

              <!-- Published Toggle -->
              <div class="sm:col-span-1 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <label class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-800/30 rounded-lg border border-gray-600/50 cursor-pointer hover:bg-gray-700/30">
                  <div class="relative">
                    <input type="checkbox" 
                           [(ngModel)]="currentArticle.published"
                           class="sr-only">
                    <div [class]="currentArticle.published ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gray-600'"
                         class="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-transparent flex items-center justify-center transition-all duration-200">
                      <svg *ngIf="currentArticle.published" class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <span class="text-xs sm:text-sm text-gray-200">{{ currentArticle.published ? 'Published' : 'Draft' }}</span>
                </label>
              </div>

              <!-- Tags -->
              <div class="sm:col-span-2 lg:col-span-12 mt-2">
                <label class="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                <input type="text" 
                       [value]="currentArticle.tags.join(', ')"
                       (input)="updateTags($event)"
                       placeholder="veterinary, procedure, emergency..."
                       class="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
                <div class="flex flex-wrap gap-1 sm:gap-2 mt-2">
                  <span *ngFor="let tag of currentArticle.tags" 
                        class="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Editor Controls -->
          <div class="bg-gray-800/40 border-b border-gray-700/50 p-3 sm:p-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              
              <!-- View Mode Toggle -->
              <div class="flex bg-gray-800/60 rounded-lg p-1 w-full sm:w-auto">
                <button (click)="editorMode = 'edit'"
                        [class]="editorMode === 'edit' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'"
                        class="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200">
                  ✏️ Edit
                </button>
                <button (click)="editorMode = 'preview'"
                        [class]="editorMode === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'"
                        class="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200">
                  👁️ Preview
                </button>
                <button (click)="editorMode = 'split'"
                        [class]="editorMode === 'split' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'"
                        class="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200">
                  ⚡ Split
                </button>
              </div>

              <!-- Markdown Toolbar -->
              <div *ngIf="editorMode !== 'preview'" class="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
                <button *ngFor="let tool of markdownTools" 
                        (click)="insertMarkdown(tool.syntax)"
                        class="px-2 sm:px-3 py-1 sm:py-2 bg-gray-700/50 hover:bg-gray-600/60 text-gray-200 hover:text-white rounded-md text-xs sm:text-sm transition-all duration-200 border border-gray-600/30"
                        [title]="tool.tooltip">
                  {{ tool.icon }}
                </button>
              </div>

              <!-- Word Count -->
              <div class="text-xs sm:text-sm text-gray-400 bg-gray-800/40 px-2 sm:px-3 py-1 rounded-md">
                {{ getWordCount() }} words
              </div>
            </div>
          </div>

          <!-- Editor Content Area -->
          <div class="flex-1 flex flex-col lg:flex-row min-h-0">
            
            <!-- Edit Mode -->
            <div *ngIf="editorMode === 'edit'" class="flex-1 p-4 sm:p-6">
              <textarea [(ngModel)]="currentArticle.content"
                        #contentTextarea
                        placeholder="Start writing your article... You can use Markdown formatting.

# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
\`code\`

- List item 1
- List item 2

[Link text](url)

> Blockquote"
                        class="w-full h-full bg-gray-900/40 border border-gray-700/50 rounded-lg p-4 sm:p-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-xs sm:text-sm leading-relaxed">
              </textarea>
            </div>

            <!-- Preview Mode -->
            <div *ngIf="editorMode === 'preview'" class="flex-1 p-4 sm:p-6">
              <div class="bg-gray-900/30 border border-gray-700/30 rounded-lg p-4 sm:p-6 h-full overflow-y-auto">
                <div class="prose prose-invert max-w-none" [innerHTML]="getPreviewContent()">
                </div>
              </div>
            </div>

            <!-- Split Mode -->
            <div *ngIf="editorMode === 'split'" class="flex-1 flex flex-col lg:flex-row">
              <!-- Editor Half -->
              <div class="flex-1 p-4 sm:p-6 lg:pr-3 border-r-0 lg:border-r border-gray-700/50">
                <textarea [(ngModel)]="currentArticle.content"
                          placeholder="Write your markdown here..."
                          class="w-full h-full bg-gray-900/40 border border-gray-700/50 rounded-lg p-4 sm:p-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-xs sm:text-sm leading-relaxed">
                </textarea>
              </div>
              
              <!-- Preview Half -->
              <div class="flex-1 p-4 sm:p-6 lg:pl-3">
                <div class="bg-gray-900/30 border border-gray-700/30 rounded-lg p-4 sm:p-6 h-full overflow-y-auto">
                  <div class="prose prose-invert max-w-none" [innerHTML]="getPreviewContent()">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Toast -->
      <div *ngIf="showSaveSuccess" 
           class="fixed top-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-slide-in border border-emerald-500/30">
        ✅ Article saved successfully!
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Prose styles for preview */
    .prose h1 { @apply text-3xl font-bold text-white mb-4; }
    .prose h2 { @apply text-2xl font-semibold text-white mb-3; }
    .prose h3 { @apply text-xl font-medium text-white mb-2; }
    .prose p { @apply text-white/80 mb-4 leading-relaxed; }
    .prose strong { @apply text-white font-semibold; }
    .prose em { @apply text-cyan-300 italic; }
    .prose code { @apply bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-sm; }
    .prose ul { @apply list-disc list-inside text-white/80 space-y-1 mb-4; }
    .prose ol { @apply list-decimal list-inside text-white/80 space-y-1 mb-4; }
    .prose blockquote { @apply border-l-4 border-cyan-500 pl-4 text-white/70 italic mb-4; }
    .prose a { @apply text-cyan-400 hover:text-cyan-300 underline; }
    .prose pre { @apply bg-black/30 p-4 rounded-xl text-sm overflow-x-auto mb-4; }
  `]
})
export class KnowledgeBaseEditorComponent implements OnInit {
  
  editorMode: 'edit' | 'preview' | 'split' = 'edit';
  searchTerm = '';
  selectedCategoryFilter = '';
  showSaveSuccess = false;

  markdownTools = [
    { icon: 'H1', syntax: '# ', tooltip: 'Heading 1' },
    { icon: 'H2', syntax: '## ', tooltip: 'Heading 2' },
    { icon: 'H3', syntax: '### ', tooltip: 'Heading 3' },
    { icon: 'B', syntax: '****', tooltip: 'Bold' },
    { icon: 'I', syntax: '**', tooltip: 'Italic' },
    { icon: '<>', syntax: '``', tooltip: 'Code' },
    { icon: '•', syntax: '- ', tooltip: 'List' },
    { icon: '"', syntax: '> ', tooltip: 'Quote' },
    { icon: '🔗', syntax: '[]()', tooltip: 'Link' }
  ];

  currentArticle: KnowledgeArticle = this.createEmptyArticle();
  
  articles: KnowledgeArticle[] = [
    {
      id: '1',
      title: 'Canine Vaccination Schedule',
      content: `# Canine Vaccination Schedule

## Core Vaccines
Core vaccines are recommended for all dogs regardless of lifestyle:

### DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)
- **First dose**: 6-8 weeks
- **Second dose**: 10-12 weeks  
- **Third dose**: 14-16 weeks
- **Booster**: Annually

### Rabies
- **First dose**: 12-16 weeks
- **Booster**: 1 year later, then every 3 years

## Non-Core Vaccines
Consider based on risk factors:

- **Bordetella**: For dogs in boarding/grooming
- **Lyme Disease**: For dogs in endemic areas
- **Leptospirosis**: For dogs with outdoor exposure

> **Important**: Always consult with veterinarian for individual pet needs.`,
      category: 'medical',
      tags: ['vaccination', 'dogs', 'preventive-care'],
      lastModified: new Date('2024-01-15T10:30:00'),
      author: 'Dr. Sarah Johnson',
      published: true
    },
    {
      id: '2',
      title: 'Emergency Protocol: Bloat in Dogs',
      content: `# Emergency Protocol: Gastric Dilatation-Volvulus (Bloat)

## Immediate Recognition Signs
**Call veterinarian immediately if dog shows:**

- Distended, hard abdomen
- Unsuccessful attempts to vomit
- Excessive drooling
- Restlessness and pacing
- Rapid breathing
- Weak pulse

## Emergency Actions
1. **Do NOT** induce vomiting
2. **Do NOT** give food or water
3. Contact emergency veterinarian immediately
4. Transport dog carefully to clinic
5. Keep dog calm during transport

## High-Risk Breeds
- Great Dane
- German Shepherd  
- Standard Poodle
- Saint Bernard
- Weimaraner

*Time is critical - bloat can be fatal within hours.*`,
      category: 'emergency',
      tags: ['emergency', 'bloat', 'dogs', 'protocol'],
      lastModified: new Date('2024-01-14T15:45:00'),
      author: 'Dr. Michael Chen',
      published: true
    },
    {
      id: '3',
      title: 'Software Guide: Appointment Scheduling',
      content: `# TurboVets Appointment Scheduling

## Creating New Appointments

### Step 1: Navigate to Calendar
- Click **Calendar** in main navigation
- Select desired date and time slot

### Step 2: Add Appointment Details
- **Pet Name**: Search existing pets or add new
- **Owner Information**: Auto-populated from pet record
- **Appointment Type**: 
  - Wellness Exam
  - Vaccination
  - Surgery
  - Emergency
  - Follow-up

### Step 3: Set Duration and Notes
- **Duration**: Default based on appointment type
- **Notes**: Special instructions or concerns
- **Reminder**: Set automatic reminders

## Managing Appointments
- **Edit**: Click appointment to modify
- **Cancel**: Use cancel button with reason
- **Reschedule**: Drag and drop to new time slot

\`\`\`
Tip: Use color coding to quickly identify appointment types
\`\`\``,
      category: 'software',
      tags: ['software', 'appointments', 'scheduling', 'tutorial'],
      lastModified: new Date('2024-01-13T09:20:00'),
      author: 'Alex Kim',
      published: false
    }
  ];

  ngOnInit() {
    // Load first article by default
    if (this.articles.length > 0) {
      this.loadArticle(this.articles[0]);
    }
  }

  get filteredArticles(): KnowledgeArticle[] {
    return this.articles.filter(article => {
      const matchesSearch = !this.searchTerm || 
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategoryFilter || 
        article.category === this.selectedCategoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }

  createEmptyArticle(): KnowledgeArticle {
    return {
      id: '',
      title: '',
      content: '',
      category: '',
      tags: [],
      lastModified: new Date(),
      author: 'Current User',
      published: false
    };
  }

  createNewArticle() {
    this.currentArticle = this.createEmptyArticle();
  }

  loadArticle(article: KnowledgeArticle) {
    // Deep copy to avoid direct reference
    this.currentArticle = {
      ...article,
      tags: [...article.tags]
    };
  }

  saveArticle() {
    if (!this.currentArticle.title.trim() || !this.currentArticle.content.trim()) {
      return;
    }

    this.currentArticle.lastModified = new Date();
    
    if (this.currentArticle.id) {
      // Update existing article
      const index = this.articles.findIndex(a => a.id === this.currentArticle.id);
      if (index !== -1) {
        this.articles[index] = { ...this.currentArticle };
      }
    } else {
      // Create new article
      this.currentArticle.id = Date.now().toString();
      this.articles.push({ ...this.currentArticle });
    }

    // Show success message
    this.showSaveSuccess = true;
    setTimeout(() => {
      this.showSaveSuccess = false;
    }, 3000);
  }

  updateTags(event: Event) {
    const target = event.target as HTMLInputElement;
    const tags = target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    this.currentArticle.tags = tags;
  }

  insertMarkdown(syntax: string) {
    // This is a simplified implementation
    // In a real app, you'd want to handle cursor position and text selection
    const currentContent = this.currentArticle.content || '';
    
    if (syntax === '****') {
      this.currentArticle.content = currentContent + '**bold text**';
    } else if (syntax === '**') {
      this.currentArticle.content = currentContent + '*italic text*';
    } else if (syntax === '``') {
      this.currentArticle.content = currentContent + '`code`';
    } else if (syntax === '[]()') {
      this.currentArticle.content = currentContent + '[link text](url)';
    } else {
      this.currentArticle.content = currentContent + syntax;
    }
  }

  getWordCount(): number {
    if (!this.currentArticle.content) return 0;
    return this.currentArticle.content.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  getPreviewContent(): string {
    if (!this.currentArticle.content) {
      return '<p class="text-white/50 italic">Start writing to see preview...</p>';
    }

    // Simple markdown parsing (in real app, use a proper markdown parser like marked.js)
    let html = this.currentArticle.content;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Paragraphs
    html = html.replace(/\n\n/gim, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/gim, '');
    html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/gims, '$1');
    html = html.replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/gim, '$1');
    
    return html;
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
}