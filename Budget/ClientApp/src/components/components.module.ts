import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { InputComponent } from './input/input.component';
import { AvatarComponent } from './avatar/avatar.component';



@NgModule({
    declarations: [ButtonComponent, ButtonIconComponent, InputComponent, AvatarComponent],
    exports: [
        ButtonComponent,
        AvatarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule { }
