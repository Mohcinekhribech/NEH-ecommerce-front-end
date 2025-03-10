import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserReq } from 'src/app/core/models/UserReq.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UploadService } from 'src/app/core/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-client-page',
  templateUrl: './register-client-page.component.html',
  styleUrls: ['./register-client-page.component.css']
})
export class RegisterClientPageComponent {
  constructor(private authService:AuthService,private uploadService:UploadService, private router :Router){}
  user : UserReq = {
    id: "",
    profilePic: "",
    dateOfBirth: null,
    email: "",
    password: "",
    role: "Client",
    ageRange: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  }
  images: any[] = [];
  numOfFiles: number = 0;
  picFiles: any[] = [];
  removePicture(i: number) {
    this.images.splice(i, 1);
    if (this.picFiles && this.picFiles.length > i) {
      this.picFiles.splice(i, 1);
    }
  }

  addImage(fileInput: any) {
    const files = fileInput.files;
    if (files) {
      this.images = []; // Clear previous images
      this.picFiles = []; // Clear previous files
      this.numOfFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result);
        };
        reader.readAsDataURL(files[i]);
        this.picFiles.push(files[i]); // Store files in the files array
      }
    }
  }
  register()
  {
    this.uploadService.postData(this.picFiles).pipe(
      switchMap((res: any[]) => {
        res.forEach((mediaLink: any) => {
          this.user.profilePic = mediaLink;
        });
        return this.authService.clientRegister(this.user)
      })
    ).subscribe(
      (res) => {
        this.authService.setAuthInfo(res.access_token, res.user);
        this.router.navigate(['/client/problems'])
          Swal.fire({
            title: "Your account Created!",
            icon: "success"
          });
        },
      error => {
        Swal.fire({
          title: "Problem in creating your account!",
          icon: "error"
        });
      }
    );
  }
}
