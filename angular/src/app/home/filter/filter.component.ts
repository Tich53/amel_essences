import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/_interfaces/category';
import { Gender } from 'src/app/_interfaces/gender';
import { Packaging } from 'src/app/_interfaces/packaging';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';
import { HydraGender } from 'src/app/_interfaces/_hydras/hydra-gender';
import { HydraPackaging } from 'src/app/_interfaces/_hydras/hydra-packaging';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  @Input() productNumber = 0;

  categories?: Category[];
  genders?: Gender[];
  packagings?: Packaging[];

  filteredName?: string;
  filteredPreference?: string;
  filteredCategories: number[] = [];
  filteredGenders: number[] = [];
  filteredPackagingCapacities: number[] = [];

  showFilters = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCategory().then((hydraCategory: HydraCategory) => {
      this.categories = hydraCategory[this.hydraMember].sort(
        (a: Category, b: Category) => {
          return a.name.localeCompare(b.name);
        }
      );
    });
    this.apiService.getGender().then((hydraGender: HydraGender) => {
      this.genders = hydraGender[this.hydraMember];
    });
    this.apiService.getPackaging().then((HydraPackaging: HydraPackaging) => {
      this.packagings = HydraPackaging[this.hydraMember].sort(
        (a: Packaging, b: Packaging) => a.capacity - b.capacity
      );
    });
  }

  onCategoryCheckbox(event: any, category: Category): void {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredCategories.includes(category.id)) {
        this.filteredCategories?.push(category.id);
      }
    }
    if (!isSelected) {
      const index = this.filteredCategories?.indexOf(category.id);
      if (index !== undefined) {
        this.filteredCategories?.splice(index, 1);
      }
    }
  }

  onGenderCheckbox(event: any, genderId: number): void {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredGenders.includes(genderId)) {
        this.filteredGenders?.push(genderId);
      }
    }
    if (!isSelected) {
      const index = this.filteredGenders?.indexOf(genderId);
      if (index !== undefined) {
        this.filteredGenders?.splice(index, 1);
      }
    }
  }

  onPackagingCheckbox(event: any, packagingCapacity: number): void {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredPackagingCapacities.includes(packagingCapacity)) {
        this.filteredPackagingCapacities?.push(packagingCapacity);
      }
    }
    if (!isSelected) {
      const index =
        this.filteredPackagingCapacities?.indexOf(packagingCapacity);
      if (index !== undefined) {
        this.filteredPackagingCapacities?.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        name: this.filteredName ? this.filteredName : undefined,
        preference: this.filteredPreference
          ? this.filteredPreference
          : undefined,
        category: this.filteredCategories ? this.filteredCategories : undefined,
        gender: this.filteredGenders ? this.filteredGenders : undefined,
        'productPackagings.packaging.capacity': this.filteredPackagingCapacities
          ? this.filteredPackagingCapacities
          : undefined,
      },
    });
    this.showFilters = false;
  }

  onReset(): void {
    this.filteredName = undefined;
    this.filteredPreference = undefined;
    this.filteredCategories = [];
    this.filteredGenders = [];
    this.filteredPackagingCapacities = [];
    const checkboxes = document.getElementsByName('checkbox') as any;
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
    this.router.navigate(['/home']);
    this.showFilters = false;
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }
}
