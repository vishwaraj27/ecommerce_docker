import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css'],
})
export class AddressManagementComponent implements OnInit {

  addresses: any[] = [];
  showForm = false;
  editMode = false;

  editing: any = {
    label: '',
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false
  };

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.addressService.list().subscribe(res => this.addresses = res);
  }

  addNew() {
    this.editMode = false;
    this.showForm = true;

    this.editing = {
      label: '',
      fullName: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false
    };
  }

  edit(addr: any) {
    this.editMode = true;
    this.showForm = true;
    this.editing = { ...addr };
  }

  save() {
    if (this.editMode) {
      this.addressService.update(this.editing.id, this.editing).subscribe(() => {
        this.load();
        this.showForm = false;
      });
    } else {
      this.addressService.create(this.editing).subscribe(() => {
        this.load();
        this.showForm = false;
      });
    }
  }

  remove(id: number) {
    if (!confirm("Are you sure you want to delete this address?")) return;
    this.addressService.delete(id).subscribe(() => this.load());
  }

  makeDefault(id: number) {
    this.addressService.setDefault(id).subscribe(() => this.load());
  }
}
