import { TestBed } from '@angular/core/testing';

import { CourseModalService } from './course-modal.service';

describe('ModalService', () => {
  let service: CourseModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
