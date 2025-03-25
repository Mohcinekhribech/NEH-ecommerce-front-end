import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserResp } from 'src/app/core/models/UserResp.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  constructor(private authService:AuthService,private router:Router){}
  user : UserResp | null = null
  ngOnInit()
  {
    this.user = this.authService.getAuthUser()
  }

  logout()
  {
    this.authService.logout().subscribe(res=>{
      this.authService.clearAuthToken()
      this.router.navigate(['/'])
    });
  }

  sideBar() {
    var side = document.querySelectorAll('.side');
    var sideBar = document.querySelectorAll('.sideBar');
    if (sideBar[0].classList.contains('w-[70px]')) {
      sideBar[0].classList.replace('max-sm:ml-[-58px]', 'max-sm:ml-0');
      sideBar[0].classList.replace('w-[70px]', 'w-70');
    } else {
      sideBar[0].classList.replace('w-70', 'w-[70px]');
      sideBar[0].classList.replace('max-sm:ml-0', 'max-sm:ml-[-58px]');
    }
    for (var i in side) {
      if (side[i].classList) {
        side[i].classList.toggle('hidden');
      }
    }
  }
}
