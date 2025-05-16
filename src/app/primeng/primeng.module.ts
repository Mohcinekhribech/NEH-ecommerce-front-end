import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AnimateModule } from 'primeng/animate';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [],
    imports: [
        AvatarModule,
        AnimateOnScrollModule,
        BadgeModule,
        CardModule,
        ToastModule,
        ButtonModule,
        DropdownModule,
        RadioButtonModule,
        AnimateModule,
        ProgressSpinnerModule,
        ConfirmPopupModule,
        OverlayPanelModule,
        TableModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        CheckboxModule,
        TagModule
    ],
    providers: [
        MessageService,
        ConfirmationService
    ],
    exports: [
        AvatarModule,
        AnimateOnScrollModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        BadgeModule,
        CardModule,
        AnimateModule,
        DropdownModule,
        ToastModule,
        ButtonModule,
        ConfirmPopupModule,
        OverlayPanelModule,
        TableModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        CheckboxModule,
        TagModule
    ]
})
export class PrimeNgModule { }
