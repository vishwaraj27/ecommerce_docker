import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    avatarUrl: ''
  };

  preview: string | ArrayBuffer | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(res => {
      this.profile = res;
      this.preview = res.avatarUrl;
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);

    // TODO: Later integrate AWS S3 upload
  }

  save() {
    this.userService.updateProfile(this.profile).subscribe(() => {
      alert('Profile updated successfully!');
    });
  }
}
