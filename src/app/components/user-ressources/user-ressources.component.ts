import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-ressources',
  templateUrl: './user-ressources.component.html',
  styleUrls: ['./user-ressources.component.scss']
})
export class UserRessourcesComponent {
  @Input() user;

  constructor() { }

}
