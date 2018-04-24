import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRessourcesComponent } from './user-ressources.component';

xdescribe('UserRessourcesComponent', () => {
  let component: UserRessourcesComponent;
  let fixture: ComponentFixture<UserRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
