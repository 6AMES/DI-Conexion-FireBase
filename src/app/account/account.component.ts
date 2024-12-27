import { Component, OnInit, inject} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})

export class AccountComponent implements OnInit {
  private router = inject(Router);
  
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
