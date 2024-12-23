import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserTableComponent } from './app/components/user-table/user-table.component';
import { UserFormComponent } from './app/components/user-form/user-form.component';
import { customHeaderInterseptor } from './app/custom-header.interseptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

const routes = [
  { path: '', component: UserTableComponent },
  { path: 'user/add', component: UserFormComponent },
  { path: 'user/edit/:id', component: UserFormComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([customHeaderInterseptor]))
  ]
});