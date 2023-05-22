import { NgModule } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ComponentsComponent } from "./components.component";

import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AccordionModule } from 'primeng/accordion';

import { LoginCardComponent } from "./auth/login-card/login-card.component";
import { RegisterCardComponent } from "./auth/register-card/register-card.component";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';

const primengModules = [
    ButtonModule,
    CardModule,
    InputTextModule,
    TieredMenuModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    AccordionModule,
    SidebarModule,
    ToggleButtonModule,
    StyleClassModule,
    DividerModule,
    ProgressBarModule,
    SplitButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ChipModule,
    ToastModule,
    FieldsetModule,
    OverlayPanelModule,
    RadioButtonModule,
    InputSwitchModule,
    CheckboxModule,
    SelectButtonModule
];

const angularModules = [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgTemplateOutlet,
    CommonModule,
];

@NgModule({
	imports: [
		...angularModules,
		...primengModules,
	],
	exports: [
		...angularModules,
		...primengModules,
		LoginCardComponent,
		RegisterCardComponent,
	],
	declarations: [
		ComponentsComponent,
		LoginCardComponent,
		RegisterCardComponent,
  ]

})
export class ComponentsModule { }