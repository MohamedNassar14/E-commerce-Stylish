import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router, private toast:ToastrService) {}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })
  error:string = '';
  isLoading:boolean = false;

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:(data)=> {
        if(data != null)
        {
          this._Router.navigate(['/home'])
        }
      }

    })
  }

  submitLogin(loginForm:FormGroup)
  {
    this.isLoading = true;
    this._AuthService.signIn(loginForm.value).subscribe({
      next:(data)=>{
        this.isLoading = false;
        if(data.message === 'success')
        {
          localStorage.setItem('userToken', data.token);
          this._AuthService.saveUserData();
          this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> You are login', '',{
            toastClass: 'toast-success', enableHtml: true});
          this._Router.navigate(['/home']);
        }
        else
        {
          this.error = data.message
          this.toast.error(`<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> ${this.error}`, '',{
            toastClass: 'toast-error', enableHtml: true});
        }
      }
      
    })
  }
}
