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
    this.products = await this.apiService.getProducts();
  }
}
