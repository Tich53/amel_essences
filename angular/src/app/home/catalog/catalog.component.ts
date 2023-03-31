import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  products: any[] = [];
  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiService
      .getProducts()
      .then((data: any) => {
        this.products = data[this.hydraMember];
      })
      .catch((error) => console.log(error));

    console.log(this.products);

    for (const product of this.products) {
      console.log(product);
    }
  }
}
