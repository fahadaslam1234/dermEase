import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/userModel'; // Import the User model
import { UserService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/services/toastService';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user_name', 'email', 'attachment', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private commonService : CommonService
  ) { }

  ngOnInit() {
    this.loadApprovals(); // Load approvals when the component initializes
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterTable(){
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  /**
   * Fetch all pending approvals and set them to the data source
   */
  loadApprovals(): void {
    this.userService.getAllApprovals().subscribe({
      next: (response: any) => {
        console.log(' approval' , response);
        const users = response.data || [];
        this.dataSource.data = users; // Update the table data source
        this.toastService.showToast('Approvals loaded successfully!', 'success');
      },
      error: () => {
        this.toastService.showToast('Failed to load approvals.', 'error');
      }
    });
  }

  /**
   * Approve a user by their ID
   * @param user The user object to approve
   */
  handleAction(user: User, action: 'approve' | 'reject'): void {
    const actionMessage = action === 'approve' ? 'approve' : 'reject';
    const confirmMessage = `Are you sure you want to ${actionMessage} user: ${user.user_name}?`;

    if (confirm(confirmMessage)) {
      // Call the backend API for approve/reject
      this.userService.approveOrRejectUser(user._id, action).subscribe({
        next: () => {
          this.toastService.showToast(`User ${actionMessage} successfully!`, 'success');

          setTimeout(() => {
            this.loadApprovals(); // Refresh the list after action
          }, 2000);

        },
        error: () => {
          this.toastService.showToast(`Failed to ${actionMessage} user.`, 'error');
        }
      });
    }
  }


  downloadAttachment(documentPath: string): void {
    if (!documentPath) {
      this.toastService.showToast('No attachment available.', 'info');
      return;
    }

    // Construct the full URL for the document
    const baseURL = this.commonService.imageUrl; // Ensure this points to your backend base URL
    const attachmentUrl = `${baseURL}${documentPath.replace(/\\/g, '/')}`; // Convert backslashes to forward slashes

    // Check if the file is viewable (e.g., PDF, images)
    const isViewable = this.isViewableFile(attachmentUrl);

    if (isViewable) {
      // Open viewable files in a new tab
      window.open(attachmentUrl, '_blank');
    } else {
      // Force download for other file types
      const anchor = document.createElement('a');
      anchor.href = attachmentUrl;
      anchor.download = documentPath.split('/').pop() || 'attachment'; // Extract file name from the path
      anchor.click();
      this.toastService.showToast('Attachment is downloading...', 'info');
    }
  }

  private isViewableFile(url: string): boolean {
    // Define viewable file types (e.g., PDF, images)
    const viewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
    const extension = url.split('.').pop()?.toLowerCase();
    return viewableExtensions.includes(extension || '');
  }

}
