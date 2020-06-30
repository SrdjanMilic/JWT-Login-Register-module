import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: this.email,
    password: ['', Validators.minLength(8)],
    repeat_password: ['', Validators.minLength(8)]
  });

  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a valid email address' :
      this.email.hasError('email') ? 'Not a valid email address' : '';
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      console.log(`${this.registerForm.value}
      You are now registered!`
      );
      alert('You are now registered!');
      this.router.navigateByUrl('login');
    });
  }

}
