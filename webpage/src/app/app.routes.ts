import { Routes } from '@angular/router';
import { TicketViewerComponent } from './components/ticket-viewer/ticket-viewer.component';
import { KnowledgeBaseEditorComponent } from './components/knowledgebase-editor/knowledgebase-editor.component';
import { LiveLogsComponent } from './components/live-logs/live-logs.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketViewerComponent },
  { path: 'knowledgebase', component: KnowledgeBaseEditorComponent },
  { path: 'logs', component: LiveLogsComponent }
];
