import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchService } from '../../modules/core/services/search.service';
import { ApiService } from '../../modules/core/services/api.service';
import { CoreModule } from '../../modules/core/core.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SearchBoxComponent } from '../search-box/search-box.component'
import { ITermResult } from '../../modules/core/models';
import { of } from 'rxjs';

/*Component Test Cases*/
describe('SearchBoxComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SearchBoxComponent
      ],
      imports:[
        ReactiveFormsModule,
        CoreModule
      ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(SearchBoxComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
 
    fixture.detectChanges();
    return { app, compiled, fixture };
  }

  it('should create', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('input box exist', () => {  
    const { compiled } = setup();
    expect(compiled.querySelector('input')).toBeDefined();
  });

  it('assigned "catalogue" and check input box should contain "catalogue" value', () => {  
    const { compiled } = setup();
    compiled.querySelector('input').value = 'catalogue';
    expect(compiled.querySelector('input').value).toContain('catalogue');
  });

  it('input box should contain placeholder', () => {  
    const { compiled } = setup();
    expect(compiled.querySelector('input').placeholder).toContain('Type here...');
  });

  it('Result loading container exist', () => {  
    const { compiled } = setup();
    expect(compiled.querySelector('.r-load')).toBeDefined();   
  });

  it('should hide contents if isLoadingResults is false', () => {  
    const { compiled, fixture } = setup();
    var isExist = compiled.querySelector('.r-load');
    expect(isExist).toEqual(null);
  });
 
});

/*Service Test Cases*/
describe('SearchService', () => {
  let searchService: SearchService; // Add this
  let searchTerm: {
      [key: string]: ITermResult;
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        ApiService,
        HttpClient,
        HttpHandler
      ]
    });

    searchService = TestBed.get(SearchService);
  });

  
 //checking the dictionary servive
  it('should be created', () => { 
    expect(searchService).toBeTruthy();
  });

  // //Api testing
  describe('fetchResults', () => {
    it('should return a collection of dictionary words', () => {
      const mockResponse: ITermResult = {error: false, result: {"list":[{"definition":"When one has a select, handpicked list of people who they find attractive, beautiful, sexy, intriguing, et cetera. A lot of the time, it includes people way out of one's league. For instance, mine includes Louis Tomlinson, Alexander [Ludwig], [Logan Lerman], Liam Payne, Zayn Malik, sensing a pattern here... you get the idea. Basically a list of people that make you go asdjalsdhfalksgfasl. Some people in relationships also see this as their 'Cheat List'- e.g. the list of people that they're allowed to cheat on their significant other with, or the people they're allowed to shift and the aforementioned significant other will [let it slide]. Good for references and daydreaming. Constantly subject to editing.","permalink":"http://catalogue.urbanup.com/6396285","thumbs_up":7,"sound_urls":[],"author":"make my day betch","word":"catalogue","defid":6396285,"current_vote":"","written_on":"2012-01-26T00:00:00.000Z","example":"Girl 1: Who's on the first page of your catalogue?\r\nGirl 2: Hmm, [tough one]. Alexander [Ludwig], Louis Tomlinson, [Liam Payne], end of until further notice.","thumbs_down":10},{"definition":"a [publication] containing images of ladies with [unclothed] [mammary glands].","permalink":"http://tit-catalogue.urbanup.com/4123835","thumbs_up":4,"sound_urls":[],"author":"donaldsemblance","word":"tit catalogue","defid":4123835,"current_vote":"","written_on":"2009-07-21T00:00:00.000Z","example":"My local [corner shop] has a wide [array] of tit catalogues [for sale].","thumbs_down":0},{"definition":"A child from the ages of 6/12 [decked] to the [nines] in [catalogue] gear and looking like they just won a competiton to be in the new newlook catalogue.","permalink":"http://catalogue-ken.urbanup.com/1395139","thumbs_up":6,"sound_urls":[],"author":"Chris Mizon","word":"catalogue ken","defid":1395139,"current_vote":"","written_on":"2005-08-02T00:00:00.000Z","example":"\"[Look at that] catalogue ken [over there].\"","thumbs_down":4},{"definition":"Any [online dating] website with a search or [browse feature] that will [aid] in finding your next sexual partner","permalink":"http://online-hoe-catalogue.urbanup.com/12104051","thumbs_up":1,"sound_urls":[],"author":"JLthaKing","word":"Online Hoe Catalogue","defid":12104051,"current_vote":"","written_on":"2017-10-28T00:00:00.000Z","example":"Freeman did you check the [online hoe catalogue] and set up [something for the weekend] yet? Women love to advertise their [inner hoe] for free on all those sites like they are looking for love.","thumbs_down":0},{"definition":"The act of having [discourse] with a [domestic cat]. [Compound] of cat and dialogue.","permalink":"http://catalogue.urbanup.com/12142290","thumbs_up":0,"sound_urls":[],"author":"The Deadcow","word":"Catalogue","defid":12142290,"current_vote":"","written_on":"2017-11-08T00:00:00.000Z","example":"\"[How you doing]?\"\n\n\"[Meow]\"\n\n\"Want some food?\"\n\n\"Meow\"\n\n\"Are you talking to the cat?\"\n\n\"Yes, we're, having a [catalogue].\"","thumbs_down":0}]}};
      let response;
      spyOn(searchService, 'fetchResults').and.returnValue(of(mockResponse));

      searchService.fetchResults('catalogue').subscribe(res => {
        response = res;       
      });
      expect(response).toEqual(mockResponse);
    });

    it('should return "no record found!"', () => {
      const mockResponse: ITermResult =  {error: false, result: {"list":[]}};
      let response;
      spyOn(searchService, 'fetchResults').and.returnValue(of(mockResponse));

      searchService.fetchResults('wrongtext').subscribe(res => {
        response = res;     
        console.log(response)  
      });
      expect(response).toEqual(mockResponse);
    });

  });

});
