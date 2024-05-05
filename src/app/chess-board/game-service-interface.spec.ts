import { TestBed } from '@angular/core/testing';
import { WinnerListService } from './game-service-interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WinnerListService', () => {
  let service: WinnerListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WinnerListService],
    });
    service = TestBed.inject(WinnerListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post winner', () => {
    const name = 'Circle';
    service.postWinner(name);
    const req = httpTestingController.expectOne('http://localhost:3000/winner');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(name);
    req.flush(null); // Simulate server response
    httpTestingController.verify();
  });

  it('should get winners', () => {
    const expectedWinners = ['Circle', 'Circle', 'Fork'];
    service.getWinner().subscribe(winners => {
      expect(winners).toEqual(expectedWinners);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/winner');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedWinners); // Simulate server response
    httpTestingController.verify();
  });

  // Add more tests to cover other methods of WinnerListService
});
