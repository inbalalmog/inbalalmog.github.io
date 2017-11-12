import { Component } from '@angular/core';
import { Node } from './node.interface';
import { TreeNode } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: string;
  package: string;
  title = 'Snyk';
  dependenciesArray: string[] = [];
  tree: TreeNode[] = [];
  onclick() {
    console.log('click');
    if (!this.version) {
      this.version = 'latest';
    }
    if (this.package) {
      this.tree = [];
      this.dependenciesArray = [];
      const node: TreeNode = {};
      node.label = this.package;
      node.data = this.version;
      node.children = [];
      this.tree.push(node);
      this.fetchDependencies(node);
      console.log('node:', node);
    }
  }
  fetchDependencies(node) {
    const self = this;
    console.log('fetch dependencies of', node.label);
    const url = 'https://registry.npmjs.org/' + node.label + '/' + node.data;
    const myRequest = new Request(url);
    fetch(myRequest)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const dependencies = response['dependencies'];
      if (dependencies) {
        console.log('dependencies of', node.label, ':', dependencies);
        console.log('tree:', self.tree);
        for (const property in dependencies) {
          if (dependencies.hasOwnProperty(property) && self.dependenciesArray.indexOf(property) === -1) {
            const newNode: TreeNode = {};
            newNode.label = property;
            newNode.data = dependencies[property];
            newNode.children = [];
            node.children.push(newNode);
            self.dependenciesArray.push(property);
            self.fetchDependencies(newNode);
          }
        }
      }else {
        console.log('no dependencies for', node.label);
      }
    });
  }
}
