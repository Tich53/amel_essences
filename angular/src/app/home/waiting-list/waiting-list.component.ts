import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_interfaces/user';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements OnInit {
  @Input() waitingList?: User[];
  @Output() hasUpdatedStatusEvent = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  async patchUser(user: User, validate: boolean) {
    const statusURL = 'https://localhost:8000/api/statuses';
    let iri!: number;
    if (validate) {
      iri = 1;
    } else if (!validate) {
      iri = 3;
    }
    const patchUser = {
      status: `${statusURL}/${iri}`,
    };
    await this.apiService.patchUserStatus(user, patchUser);
    this.hasUpdatedStatusEvent.emit();
  }
}
