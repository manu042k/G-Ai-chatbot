import { TestBed } from '@angular/core/testing';

import { LlmConnectorService } from './llm-connector.service';

describe('LlmConnectorService', () => {
  let service: LlmConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlmConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
