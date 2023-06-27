import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

import { AngularFireModule } from '@angular/fire/compat';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { InputNumberModule } from 'primeng/inputnumber';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputDataComponent } from './views/main/input-data/input-data.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { HistorialComponent } from './views/historial/historial.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ShowDataComponent } from './views/show-data/show-data.component';



@NgModule({
  declarations: [
    AppComponent,
    InputDataComponent,
    HistorialComponent,
    ShowDataComponent,
  ],
  imports: [
		BrowserModule,
		InputNumberModule,
		AppRoutingModule,
		HttpClientModule,
		TableModule,
		FieldsetModule,
		ComponentsModule,
		DropdownModule,
		InputSwitchModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
