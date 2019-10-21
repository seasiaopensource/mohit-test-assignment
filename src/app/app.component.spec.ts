import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from './modules/core/core.module';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        AppModule,
        ReactiveFormsModule
      ],
      declarations: [     
        
      ],
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return { app, compiled };
  }

  it('should create the app', async(() => {
    const { app } = setup();
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'search-app'`, () => {
    const { app } = setup();    
    expect(app.title).toEqual('search-app');
  });

  it('should render title in a h1 tag', () => {
    const { compiled } = setup();     
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to search-app!');
  });

});
