import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

@Injectable()
export class TreeService {
    fetchDependencies(node, dependenciesArray) {
        const self = this;
        const url = 'https://registry.npmjs.org/' + node.label + '/' + node.data;
        const myRequest = new Request(url);
        fetch(myRequest)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          const dependencies = response['dependencies'];
          if (dependencies) {
            for (const property in dependencies) {
              if (dependencies.hasOwnProperty(property) && dependenciesArray.indexOf(property) === -1) {
                const newNode: TreeNode = {};
                newNode.label = property;
                newNode.data = dependencies[property];
                newNode.children = [];
                node.children.push(newNode);
                dependenciesArray.push(property);
                self.fetchDependencies(newNode, dependenciesArray);
              }
            }
          }
        });
    }
}
