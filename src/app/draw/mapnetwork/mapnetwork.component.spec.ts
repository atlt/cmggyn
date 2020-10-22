import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapnetworkComponent } from './mapnetwork.component';

describe('MapnetworkComponent', () => {
  let component: MapnetworkComponent;
  let fixture: ComponentFixture<MapnetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapnetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
