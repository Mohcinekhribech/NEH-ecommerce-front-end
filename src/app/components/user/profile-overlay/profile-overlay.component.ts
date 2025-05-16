import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResp } from 'src/app/core/models/UserResp.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.css']
})
export class ProfileOverlayComponent {
  @Output() notifyParent = new EventEmitter<void>();
  @Input() profile :UserResp | null={
    id: "",
    profilePic: "",
    dateOfBirth: null,
    role: "",
    ageRange: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  }
  apiUrl = environment.apiUrl;
  show:boolean = false

  constructor(private authService:AuthService){}

  logout()
  {
    this.authService.logout().subscribe(res=>{
      this.authService.clearAuthToken()
      this.notifyParent.emit()
    });
  }
}
