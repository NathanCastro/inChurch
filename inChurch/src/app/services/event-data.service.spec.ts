import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Events } from '../models/events'; // Ajuste o caminho conforme necessário
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});