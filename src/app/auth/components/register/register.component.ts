import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
  }, { validators: this.passwordMatchValidator});
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
           this._Router.navigate(['/account/login']);
           this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Register Successful', '',{
            toastClass: 'toast-success', enableHtml: true});
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
  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const formGroup = group as FormGroup;
    const password = formGroup.get('password')?.value;
    const rePassword = formGroup.get('rePassword')?.value;
    if (password && rePassword && password !== rePassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
}
