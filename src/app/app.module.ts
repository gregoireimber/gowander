import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// Firebase Imports
// CUrrently this uses the old firebase API could upgrade to use the new ones at some point??
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Angular material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

// Component imports
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Service Imports
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTripComponent } from './components/new-trip/new-trip.component';
import { MessagingService } from './services/messaging.service';
import { AuthGuard } from './guards/auth.guard';
import { TripService } from './services/trip.service';
import { ImagesComponent } from './components/images/images.component';
import { ImageService } from './services/image.service';
import { HttpClientModule } from '@angular/common/http';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { SocialComponent } from './components/social/social.component';
import { ExploreComponent } from './components/explore/explore.component';
import { NewBucketListComponent } from './components/new-bucket-list/new-bucket-list.component';
import { NewComponent } from './components/new/new.component';
import { SocialMainComponent } from './components/social/social-main/social-main.component';
import { SocialFriendsComponent } from './components/social/social-friends/social-friends.component';
import { SocialProfileComponent } from './components/social/social-profile/social-profile.component';
import { ProfileViewModalComponent } from './components/social/profile-view-modal/profile-view-modal.component';
import { SocialService } from './services/social.service';
import { MobileSocialTabsComponent } from './components/social/mobile-social-tabs/mobile-social-tabs.component';
import { SettingsModalComponent } from './components/social/settings-modal/settings-modal.component';
import { NewTripTypeSelectComponent } from './components/new-trip/new-trip-type-select/new-trip-type-select.component';
import { NewTripRegionSelectComponent } from './components/new-trip/new-trip-region-select/new-trip-region-select.component';
import { NewTripInformationComponent } from './components/new-trip/new-trip-information/new-trip-information.component';
import { NewTripNameComponent } from './components/new-trip/new-trip-name/new-trip-name.component';
import { NewTripCompleteComponent } from './components/new-trip/new-trip-complete/new-trip-complete.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { DeleteConfirmationComponent } from './components/my-trips/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    NewTripComponent,
    ImagesComponent,
    MyTripsComponent,
    TripDetailComponent,
    SocialComponent,
    ExploreComponent,
    NewBucketListComponent,
    NewComponent,
    SocialMainComponent,
    SocialFriendsComponent,
    SocialProfileComponent,
    ProfileViewModalComponent,
    MobileSocialTabsComponent,
    SettingsModalComponent,
    NewTripTypeSelectComponent,
    NewTripRegionSelectComponent,
    NewTripInformationComponent,
    NewTripNameComponent,
    NewTripCompleteComponent,
    ComingSoonComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  providers: [
    AuthService,
    MessagingService,
    AuthGuard,
    TripService,
    ImageService,
    SocialService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
