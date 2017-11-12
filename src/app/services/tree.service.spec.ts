import { TestBed, inject } from '@angular/core/testing';
import { TreeService } from './tree.service';
import { TreeNode } from 'primeng/primeng';
import {} from 'jasmine';

describe('TreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeService]
    });
  });

  it('should be created', inject([TreeService], (service: TreeService) => {
    expect(service).toBeTruthy();
  }));


  it('express dependencies', inject([TreeService], (service: TreeService) => {
    const node: TreeNode = {
      label: 'express',
      data: 'latest',
      children: []
    };
    const promise = service.fetchDependencies(node);
    promise.then((testedResult) =>
      expect(Object.keys(testedResult).length).toBe(30)
    );
 }));
});
