import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnInit {
  isLoading: boolean = false;
  loadingService = inject(LoadingService)

   ngOnInit(): void {
       this.loadingService.$loadingSpinner.subscribe({
        next: (res) => {
          this.isLoading = res;
        }
      })
  }
}
