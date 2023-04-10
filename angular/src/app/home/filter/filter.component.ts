import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_interfaces/category';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  readonly hydraMember = 'hydra:member';
  categories?: Category[];

  number?: string;
  preference?: string;
  filteredCategories: Category[] = [];
  gender?: string;
  packaging?: string;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiService.getCategory().then((hydraCategory: HydraCategory) => {
      this.categories = hydraCategory[this.hydraMember];
    });
  }

  onCategoryCheckbox(event: any, category: Category) {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.filteredCategories.includes(category)) {
        this.filteredCategories?.push(category);
      }
    }
    if (!isSelected) {
      const index = this.filteredCategories?.indexOf(category);
      console.log(index);
      if (index !== undefined) {
        this.filteredCategories?.splice(index, 1);
      }
    }
    console.log(this.filteredCategories);
  }

  onSubmit() {
    console.log(this.number, this.preference, this.gender, this.packaging);
  }
}
