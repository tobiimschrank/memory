/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayerComponent} from './player.component';
import {CardModule} from '../card/card.module';
import {Player} from './player';
import {By} from '@angular/platform-browser';
import {Card} from '../card/card';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CardModule
      ],
      declarations: [
        PlayerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const player = new Player();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = player;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it('should show the name of the player', () => {
    component.player.name = 'Spieler';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.name'));
    expect(element.nativeElement.textContent).toContain(component.player.name);
  });

  it('should show the current score of the player', () => {
    component.player.points = 124;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.points'));
    expect(element.nativeElement.textContent).toContain(component.player.points);
  });

  it('should not show the link to the cardlayer', () => {
    const element = fixture.debugElement.query(By.css('.card-opener'));
    expect(element).toBeNull();
  });

  it('should show a link to the cardlayer, when player has cards', () => {
    component.player.addCard(new Card(0));
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.card-opener'));
    expect(element).not.toBeNull();
  });

  it('should show the cards of the player', () => {
    component.player.addCard(new Card(0));
    component.player.addCard(new Card(0));
    component.player.addCard(new Card(0));
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(By.css('.card-wrap'));
    expect(element.length).toBe(3);
  });

  it('should show the layer with all cards', () => {
    component.player.addCard(new Card(0));
    component.showCardLayer();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.layer-wrap'));
    expect(element).not.toBeNull();
  });

  it('should hide the layer again, when closed', () => {
    component.player.addCard(new Card(0));
    component.showCardLayer();
    fixture.detectChanges();

    component.hideCardLayer();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.layer-wrap'));
    expect(element).toBeNull();
  });
});
