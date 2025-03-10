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

@NgModule({
  declarations: [
  ],
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
    ConfirmPopupModule,
    OverlayPanelModule,
  ],
  providers : [
    MessageService,ConfirmationService
  ]
  ,
  exports: [
    AvatarModule,
    AnimateOnScrollModule,
    RadioButtonModule,
    BadgeModule,
    CardModule,
    AnimateModule,
    DropdownModule,
    ToastModule,
    ButtonModule,
    ConfirmPopupModule,
    OverlayPanelModule,
  ],
})
export class PrimeNgModule { }
