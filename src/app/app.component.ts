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
  onclick() {
    console.log('click');
    this.fetchDependencies(this.package, this.version);
  }
  fetchDependencies(packageName, version) {
    console.log('fetchDependencies');
    const url = 'https://registry.npmjs.org/' + packageName + '/' + version;
    const myRequest = new Request(url);
    fetch(myRequest)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const dependencies = response['dependencies'];
      if (dependencies) {
        console.log(dependencies);
        for (const property in dependencies) {
          if (dependencies.hasOwnProperty(property)) {
              this.fetchDependencies(property, dependencies[property]);
          }
        }
      }else {
        console.log('no dependencies');
      }
    });
  }
}
