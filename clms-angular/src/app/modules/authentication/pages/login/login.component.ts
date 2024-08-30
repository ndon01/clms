import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../../../../core/components/navbar/navbar.component';
import {
  InputQuestionComponentComponent
} from '../../../../shared/ui/input-question-component/input-question-component/input-question-component.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, InputQuestionComponentComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, public location: Location) {}

  onSubmit() {
    // Implement authentication logic here
    if (this.email === 'admin@headspace.com' && this.password === 'password') {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
