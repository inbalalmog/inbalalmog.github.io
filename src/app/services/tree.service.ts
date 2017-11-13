import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

@Injectable()
export class TreeService {
  fetchDependencies(node): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'https://registry.npmjs.org/' + node.label + '/' + node.data;
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      fetch(proxyurl + url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        resolve(response['dependencies']);
      });
    });
  }
  getCachedNode(node, cachedNodes): TreeNode {
    let cachedNode: TreeNode[] = [];
    cachedNode = cachedNodes.filter((item) => (item.label === node.label && item.data === node.data));
    return cachedNode.length > 0 ? cachedNode[0] : null;
  }
}
