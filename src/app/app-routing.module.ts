import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SocialComponent } from './components/social/social.component';
import { ExploreComponent } from './components/explore/explore.component';
import { NewTripComponent } from './components/new-trip/new-trip.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'social', component: SocialComponent, canActivate: [AuthGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'new-trip', component: NewTripComponent, canActivate: [AuthGuard] },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
