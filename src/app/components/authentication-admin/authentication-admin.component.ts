import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { adminsUrl } from 'src/app/config/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentication-admin',
  templateUrl: './authentication-admin.component.html',
  styleUrls: ['./authentication-admin.component.css'],
})
export class AuthenticationAdminComponent implements OnInit {
  public isLoading = false;
  public allowPermissions = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    const user = {
      email: form.value.email,
      password: form.value.password,
    };
    this.http
      .post<{ email: string; password: string }>(adminsUrl, user)
      .subscribe((obj: any) => {
        if (obj === null) {
          alert("This user isn't exist!!");
          form.resetForm();
        } else {
          this.allowPermissions = true;
        }
      });
  }
}
