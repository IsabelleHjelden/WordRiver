import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { MockLearnerService } from 'src/testing/learner.service.mock';
import { Learner } from '../learner';
import { LearnerCardComponent } from '../learner-card/learner-card.component';
import { LearnerService } from '../learner.service';

import { LearnerInfoComponent } from './learner-info.component';

describe('LearnerInfoComponent', () => {
  let component: LearnerInfoComponent;
  let fixture: ComponentFixture<LearnerInfoComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ LearnerInfoComponent ],
      providers: [
        { provide: LearnerService, useValue: new MockLearnerService() },
        { provide: ContextPackService, useValue: new MockContextPackService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LearnerInfoComponent);
    component = fixture.componentInstance;
    component.learner = {
      _id: 'learner',
      creator: 'string',
      name: 'string',
      assignedContextPacks: ['chris_id','chris_id'],
      disabledWordlists: []
    };
    activatedRoute.setParamMap({ id: 'testLearner1' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to a specific Learner\'s info page', () => {
    activatedRoute.setParamMap({ id: 'testLearner1' });
    expect(component.id).toEqual('testLearner1');



  });
  it('should get assigned context packs', () => {
    component.getAssignedContextPacks();
    expect(component.assignedPacks.length).toBeGreaterThan(0);
    expect(component.assignedPacks[0]._id).toEqual('chris_id');
    expect(component.assignedPacks[0]._id).toEqual('chris_id');
  });
  it('should get all assigned words', () => {
    component.getAllWords(component.assignedPacks[0]);
    expect(component.assignedWords.length).toBeGreaterThan(0);
    expect(component.assignedWords[0]).toEqual({ word: 'green', forms: [ 'green', 'greener' ], pos:'adjectives', wordlist:'happy'});
    expect(component.assignedWords.length).toEqual(8);
  });
  it('should correctly assign the parts of speech', () => {
    component.getAllWords(component.assignedPacks[0]);
    expect(component.assignedWords[0]).toEqual({ word: 'green', forms: [ 'green', 'greener' ], pos:'adjectives', wordlist:'happy'});
    expect(component.assignedWords[2]).toEqual({ word: 'langerhans', forms: [ 'langerhans' ], pos:'misc', wordlist:'happy'});
    expect(component.assignedWords.length).toEqual(8);
  });



});
