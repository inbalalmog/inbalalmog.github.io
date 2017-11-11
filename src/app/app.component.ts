import { Component } from '@angular/core';

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
  dependencies: string[];
  ngOnInit() {
    this.dependencies = [];
  }
  onclick() {
    console.log('click');
    if (!this.version) {
      this.version = 'latest';
    }
    if (this.package) {
      this.fetchDependencies(this.package, this.version);
    }
  }
  fetchDependencies(packageName, version) {
    console.log('fetch dependencies of', packageName);
    const url = 'https://registry.npmjs.org/' + packageName + '/' + version;
    const myRequest = new Request(url);
    fetch(myRequest)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const dependencies = response['dependencies'];
      if (dependencies) {
        console.log('dependencies of', packageName, ':', dependencies);
        for (const property in dependencies) {
          if (dependencies.hasOwnProperty(property) && this.dependencies.indexOf(property) === -1) {
            this.dependencies.push(property);
            this.fetchDependencies(property, dependencies[property]);
          }
        }
      }else {
        console.log('no dependencies for', packageName);
      }
    });
  }
}
