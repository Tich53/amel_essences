import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_interfaces/category';
import { Gender } from 'src/app/_interfaces/gender';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';
import { HydraGender } from 'src/app/_interfaces/_hydras/hydra-gender';
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

  filteredCategories: Category[] = [];
  filteredGenders: Gender[] = [];

  number?: string;
  preference?: string;

  gender?: string;
  packaging?: string;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiService.getCategory().then((hydraCategory: HydraCategory) => {
      this.categories = hydraCategory[this.hydraMember];
    });
    await this.apiService.getGender().then((hydraGender: HydraGender) => {
      this.genders = hydraGender[this.hydraMember];
    });
  }

  onCategoryCheckbox(event: any, category: Category): void {
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

  onSubmit() {
    console.log(this.number, this.preference, this.gender, this.packaging);
  }
}
