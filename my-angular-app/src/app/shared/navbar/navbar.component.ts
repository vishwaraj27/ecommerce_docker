import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Product } from '../../services/product.service';

// ⭐ ADD THIS
import { AccountDropdownComponent } from '../account-dropdown/account-dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AccountDropdownComponent   // ⭐ MUST BE HERE
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() username = '';
  @Input() cartCount = 0;
 

  searchQuery = '';
  suggestions: Product[] = [];
  showDropdown = false;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {}

  onSearchInput() {
    const q = this.searchQuery.trim();

    if (!q) {
      this.showDropdown = false;
      return;
    }

    this.searchService.search(q).subscribe(res => {
      this.suggestions = res;
      this.showDropdown = res.length > 0;
    });
  }

  selectSuggestion(product: Product) {
  this.showDropdown = false;
  this.searchQuery = product.name; // optional, just to fill the input

  const slug = product.category?.slug || 'spices'; // fallback if needed

  this.router.navigate([
    '/products',
    slug,
    product.id
  ]);
}

  
}
