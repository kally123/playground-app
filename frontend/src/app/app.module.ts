import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { CustomerMenuItemsComponent } from './components/customer-menu-items/customer-menu-items.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    MenuListComponent,
    CustomerMenuItemsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
