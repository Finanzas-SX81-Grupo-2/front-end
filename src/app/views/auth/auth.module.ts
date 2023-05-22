import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
    imports: [
        RouterModule,
        AuthRoutingModule,
        ComponentsModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule {}
