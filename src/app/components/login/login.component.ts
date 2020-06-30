import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm = this.fb.group({
    email: this.email,
    password: ['', Validators.minLength(8)]
  });

  hide = true;

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a valid email address' :
      this.email.hasError('email') ? 'Not a valid email address' : '';
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.router.navigateByUrl('admin');
    });
    console.log(`${JSON.stringify(this.loginForm.value)}
    You are now logged in!`);
  }

}
