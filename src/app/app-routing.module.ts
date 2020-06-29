import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

// Page components
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/editor/editor.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminComponent,
        data: {
          allowedRoles: ['admin']
        }
      },
    ]
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: EditorComponent,
        data: {
          allowedRoles: ['admin', 'editor']
        }
      }
    ]
  },

  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],

  providers: []
})
export class AppRoutingModule { }
