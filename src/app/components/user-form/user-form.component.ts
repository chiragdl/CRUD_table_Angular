import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id value:::::::", id)
    if (id) {
      this.isEditMode = true;
      this.userId = id;
      this.userService.getUsers().subscribe(users => {
        console.log("user values :::::::::", users)
        const user = users.find(u => u._id === this.userId);
        if (user) {
          this.userForm.patchValue(user);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditMode && this.userId) {
       console.log("updated user value::",this.userForm.value)
       console.log("to be updated userId:", this.userId)
        this.userService.updateUser({
          _id: this.userId,
          ...this.userForm.value
        }).subscribe(() => this.goBack());
      } else {
        this.userService.addUser(this.userForm.value)
          .subscribe(() => this.goBack());
      }
    }
  }

  deleteUser(): void {
    if (this.userId && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.userId)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}