import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Events } from '../models/events';
import { EventDataService } from './event-data.service';

describe('EventDataService', () => {
  let service: EventDataService;
  let httpMock: HttpTestingController;
  const mockAPI = 'http://localhost:3000/eventos';

  const mockEvent: Events = {
    id: '1',
    title: 'Test Event',
    description: 'Test Event',
    image: 'Test Event',
    status: true,
    publishedDate: '2025-02-02',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventDataService
      ]
    });

    service = TestBed.inject(EventDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return all events', () => {
    service.getAll().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(mockAPI);
    expect(req.request.method).toBe('GET');
    req.flush([mockEvent]);
  });

  

  it('should return event for ID', () => {
    service.getById('1').subscribe(res => {
      expect(res).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${mockAPI}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('should adicionar add an event', () => {
    service.addEvent(mockEvent).subscribe(res => {
      expect(res).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(mockAPI);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockEvent);
    req.flush(mockEvent);
  });

  it('should update an event', () => {
    service.updateEvent(mockEvent).subscribe(res => {
      expect(res).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${mockAPI}/${mockEvent.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEvent);
  });

  it('should delete a event', () => {
    service.deleteEvent('1').subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${mockAPI}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  
});