import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './_shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './_services/authentication/headers.interceptor';
import { RegisterComponent } from './register/register.component';

import { RegisterDialogComponent } from './register/register-dialog/register-dialog.component';
import { HomeComponent } from './home/home.component';
import { NavbarDialogComponent } from './_shared/navbar/navbar-dialog/navbar-dialog.component';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import { CatalogComponent } from './home/catalog/catalog.component';
import { FilterComponent } from './home/filter/filter.component';
import { CartComponent } from './home/cart/cart.component';
import { OrderComponent } from './home/order/order.component';
import { WaitingListComponent } from './home/waiting-list/waiting-list.component';
import { MainOrderComponent } from './_shared/main-order/main-order.component';
import { MainOrderDialogComponent } from './_shared/main-order/main-order-dialog/main-order-dialog.component';
import { RecapComponent } from './home/recap/recap.component';
import { SpinnerComponent } from './_shared/spinner-dialog/spinner/spinner.component';
import { SpinnerDialogComponent } from './_shared/spinner-dialog/spinner-dialog.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ProfileDialogComponent } from './home/profile/profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterDialogComponent,
    HomeComponent,
    NavbarDialogComponent,
    LoginDialogComponent,
    CatalogComponent,
    FilterComponent,
    CartComponent,
    OrderComponent,
    WaitingListComponent,
    MainOrderComponent,
    MainOrderDialogComponent,
    RecapComponent,
    SpinnerComponent,
    SpinnerDialogComponent,
    FooterComponent,
    ProfileComponent,
    ProfileDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
