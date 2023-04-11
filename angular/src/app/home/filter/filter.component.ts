import { Component, EventEmitter, OnInit } from '@angular/core';
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

  categories?: Category[];
  genders?: Gender[];
  packagings?: Packaging[];

  filteredName?: string;
  filteredPreference?: string;
  filteredCategories: Category[] = [];
  filteredGenders: Gender[] = [];
  filteredPackagings: Packaging[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.apiService.getCategory().then((hydraCategory: HydraCategory) => {
      this.categories = hydraCategory[this.hydraMember];
    });
    await this.apiService.getGender().then((hydraGender: HydraGender) => {
      this.genders = hydraGender[this.hydraMember];
    });
    await this.apiService
      .getPackaging()
      .then((HydraPackaging: HydraPackaging) => {
        this.packagings = HydraPackaging[this.hydraMember].sort(
          (a: Packaging, b: Packaging) => a.capacity - b.capacity
        );
      });
    console.log(this.packagings);
  }

  onCategoryCheckbox(event: any, category: Category): void {
    console.log(event);
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredCategories.includes(category)) {
        this.filteredCategories?.push(category);
      }
    }
    if (!isSelected) {
      const index = this.filteredCategories?.indexOf(category);
      if (index !== undefined) {
        this.filteredCategories?.splice(index, 1);
      }
    }
    console.log(this.filteredCategories);
  }

  onGenderCheckbox(event: any, gender: Gender) {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredGenders.includes(gender)) {
        this.filteredGenders?.push(gender);
      }
    }
    if (!isSelected) {
      const index = this.filteredGenders?.indexOf(gender);
      if (index !== undefined) {
        this.filteredGenders?.splice(index, 1);
      }
    }
    console.log(this.filteredGenders);
  }

  onPackagingCheckbox(event: any, packaging: Packaging) {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredPackagings.includes(packaging)) {
        this.filteredPackagings?.push(packaging);
      }
    }
    if (!isSelected) {
      const index = this.filteredPackagings?.indexOf(packaging);
      if (index !== undefined) {
        this.filteredPackagings?.splice(index, 1);
      }
    }
    console.log(this.filteredPackagings);
  }

  onSubmit() {
    console.log(this.filteredName, this.filteredPreference);
    this.router.navigate(['/home'], {
      queryParams: {
        filteredName: this.filteredName ? this.filteredName : undefined,
        filteredPreference: this.filteredPreference
          ? this.filteredName
          : undefined,
        filteredCategories:
          this.filteredCategories.length > 0
            ? JSON.stringify(this.filteredCategories)
            : undefined,
        filteredGenders:
          this.filteredGenders.length > 0
            ? JSON.stringify(this.filteredGenders)
            : undefined,
        filteredPackagings:
          this.filteredPackagings.length > 0
            ? JSON.stringify(this.filteredPackagings)
            : undefined,
      },
    });
  }

  onReset() {
    this.filteredName = undefined;
    this.filteredPreference = undefined;
    this.filteredCategories = [];
    this.filteredGenders = [];
    this.filteredPackagings = [];

    const checkboxes = document.getElementsByName('checkbox') as any;
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }

    this.router.navigate(['/home']);
  }
}
