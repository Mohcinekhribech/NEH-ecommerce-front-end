import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserResp } from 'src/app/core/models/UserResp.model';
import { AuthService } from 'src/app/core/services/auth.service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() isAuthenticate : boolean = false
  
  constructor(private authService:AuthService,private router: Router, private route: ActivatedRoute){

  }
  user:UserResp | null = null
  isCollapsed: boolean = false;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  ngOnInit()
  {
    this.isAuthenticate = this.authService.isAuthenticated()
    this.user = this.authService.getAuthUser()
  }
}
