import { Component, Input } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-user-ressources',
  templateUrl: './user-ressources.component.html',
  styleUrls: ['./user-ressources.component.scss']
})
export class UserRessourcesComponent {
  @Input() user;
  showResources = true;

  constructor(public settings: SettingsService) { }

  toogleResourcesDisplay() {
    this.showResources = !this.showResources;
  }
}
