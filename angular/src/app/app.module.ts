import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';

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
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  // entryComponents: [DialogComponent],
})
export class AppModule {}
