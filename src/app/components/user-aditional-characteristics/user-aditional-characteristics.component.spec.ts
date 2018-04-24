import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAditionalCharacteriticsComponent } from './user-aditional-characteritics.component';

describe('UserAditionalCharacteriticsComponent', () => {
  let component: UserAditionalCharacteriticsComponent;
  let fixture: ComponentFixture<UserAditionalCharacteriticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAditionalCharacteriticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAditionalCharacteriticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
