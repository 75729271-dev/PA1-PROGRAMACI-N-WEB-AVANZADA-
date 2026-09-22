import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DirectorioComponent } from "./features/directorio/directorio.component";
import {
  AyudaComponent,
  NoEncontradoComponent,
} from "./features/ayuda/ayuda.component";

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    DirectorioComponent,
    AyudaComponent,
    NoEncontradoComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: "es" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
