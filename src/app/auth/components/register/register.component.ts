import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] 
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router, private toast:ToastrService) {}

  registerForm:FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(90)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })
  error:string = '';
  isLoading:boolean = false; 

  ngOnInit(): void {}

  submitRegister(registerForm:FormGroup)
  {
    this.isLoading = true;
    this._AuthService.signUp(registerForm.value).subscribe({
      next:(data)=>{
        this.isLoading = false;
         if(data.message === 'success')
         {
           this._Router.navigate(['/account/login'])
         }
         else
         {
          this.error = data.message
          this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Can not register', '',{
            toastClass: 'toast-error', enableHtml: true});
         }
      }
    })
  } 
}
