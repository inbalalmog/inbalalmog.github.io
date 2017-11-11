import { Component } from '@angular/core';
import { Node } from './node.interface';


var request = require('request');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: string;
  package: string;
  title = 'Snyk';
  dependencies: string[] = [];
  node: Node = {};
  onclick() {
    console.log('click');
    if (!this.version) {
      this.version = 'latest';
    }
    if (this.package) {
      this.node.name = this.package;
      this.node.version = this.version;
      this.node.dependencies = [];
      this.fetchDependencies(this.node);
      console.log('node:', this.node);
    }
  }
  fetchDependencies(node) {
    console.log('fetch dependencies of', node.name);
    const url = 'https://registry.npmjs.org/' + node.name + '/' + node.version;
    const myRequest = new Request(url);
    fetch(myRequest)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const dependencies = response['dependencies'];
      if (dependencies) {
        console.log('dependencies of', node.name, ':', dependencies);
        for (const property in dependencies) {
          if (dependencies.hasOwnProperty(property) && this.dependencies.indexOf(property) === -1) {
            const newNode: Node = {};
            newNode.name = property;
            newNode.version = dependencies[property];
            newNode.dependencies = [];
            node.dependencies.push(newNode);
            this.dependencies.push(property);
            this.fetchDependencies(newNode);
          }
        }
      }else {
        console.log('no dependencies for', node.name);
      }
    });
  }
}
