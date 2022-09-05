import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';

const routes: Routes = [
  { path:'**', component: ChatDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
