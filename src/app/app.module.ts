/*tslint:disable:max-line-length*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserRessourcesComponent } from './components/user-ressources/user-ressources.component';
import { SpellListComponent } from './components/spell-list/spell-list.component';
import { CoreModule } from './core/core.module';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAditionalCharacteristicsComponent } from './components/user-aditional-characteristics/user-aditional-characteristics.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRessourcesComponent,
    SpellListComponent,
    UserEditComponent,
    UserAditionalCharacteristicsComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
