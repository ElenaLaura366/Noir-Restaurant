import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    ContactComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    MenuComponent,
    ReserveComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    JsonPipe,
    NgIf,
    ReactiveFormsModule,
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
