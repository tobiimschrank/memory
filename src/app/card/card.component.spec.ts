/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {Card} from './card';
import {By} from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    let card = new Card(0);

    component = fixture.componentInstance;
    component.card = card;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it('should contain a "0" when flipped', () => {
    component.card.flipped = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.front'));
    expect(element.nativeElement.textContent).toContain('0');
  });

  it('should have a "opened"-class when flipped', () => {
    component.card.flipped = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.card'));
    expect(element.nativeElement.className).toContain('opened');
  });

  it('should be invisible when removed', () => {
    component.card.removed = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.card'));
    expect(element.nativeElement.className).toContain('removed');
  });
});
