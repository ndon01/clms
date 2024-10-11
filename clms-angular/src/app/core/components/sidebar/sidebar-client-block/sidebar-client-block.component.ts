import {Component, Input, OnInit} from '@angular/core';
import { UserProjection } from "@core/model/User.model";
import { ClientService } from "@core/services/client/client.service";
import { HttpClient } from '@angular/common/http';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sidebar-client-block',
  templateUrl: './sidebar-client-block.component.html',
  styleUrl: './sidebar-client-block.component.css'
})
export class SidebarClientBlockComponent implements OnInit {
  @Input() client!: UserProjection;
  displayAvatarDialog: boolean = false;
  currentAvatarUrl: string | null = this.client?.avatarUrl || null; // Initialize with client's avatar URL
  uploadedFile: File | null = null; // Store the uploaded avatar
  uploadedFileUrl: string | null = null; // Store the uploaded avatar URL

  constructor(private clientService: ClientService, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    // Fetch the avatar image from the backend as a blob
    this.http.get('/api/v1/users/client/avatar', { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a URL for the avatar image blob
        const objectURL = URL.createObjectURL(response);
        this.currentAvatarUrl = objectURL;  // Set the avatar URL for display
      },
      (error) => {
        console.error('Failed to load avatar:', error);
      }
    );
  }

  usernameToInitials(username: string): string {
    if (username.length === 0 || username === null) {
      return "";
    }
    const initials = username.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  logout() {
    this.clientService.logout();
  }

  onCancel() {
    this.displayAvatarDialog = false;
    this.uploadedFile = null;
  }

  onSave() {
    if (this.uploadedFile) {
      const formData = new FormData();
      formData.append('file', this.uploadedFile);

      // Upload the avatar using HttpClient
      this.http.post<any>('/api/v1/users/client/avatar', formData, {
        observe: 'response',
      }).subscribe(response => {
        console.log('Response:', response);
        if (response.status !== 200) {
          console.error('Failed to upload avatar');
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to upload avatar'});
          return;
        }

        console.log('Avatar uploaded successfully');

        // Update the avatar preview with the uploaded file
        if (this.uploadedFile) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.currentAvatarUrl = e.target.result;
          };
          reader.readAsDataURL(this.uploadedFile);
        }

        this.uploadedFile = null; // Clear the uploaded file
        this.uploadedFileUrl = null; // Clear the uploaded file URL
        this.displayAvatarDialog = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Avatar uploaded successfully'});
      });
    } else {
      console.log('No avatar uploaded');
      this.displayAvatarDialog = false;
    }
  }

  removeCurrentAvatar() {
    // Call an API to remove the current avatar
    this.http.delete('/api/v1/users/client/avatar').subscribe(() => {
      this.currentAvatarUrl = null; // Clear the avatar preview
      this.displayAvatarDialog = false;
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Avatar removed successfully'});
    }, error => {
      this.displayAvatarDialog = false;
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to remove avatar'});
      console.error('Failed to remove avatar', error);
    });
  }

  onUpload(event: any) {
    // Handle the uploaded file
    const uploadedFile = event.files[0];
    this.uploadedFile = uploadedFile; // Store the uploaded file for later use
    this.uploadedFileUrl = URL.createObjectURL(uploadedFile); // Create a URL for the uploaded file
    console.log('File upload successful', event);
  }

  onUploadError(event: any) {
    console.error('Error during file upload', event);
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to upload avatar'});
    this.uploadedFile = null;
    this.uploadedFileUrl = null;
  }

  onCancelUpload() {
    this.uploadedFile = null;
    this.uploadedFileUrl = null;
  }
}
