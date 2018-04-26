import { Component, OnInit, Input } from '@angular/core';
import { CharacterModel } from '../../models/character.model';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit {

  @Input() target: CharacterModel;

  constructor() { }

  ngOnInit() {
  }

}
