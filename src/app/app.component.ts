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
    let myRequest = new Request(url);
    fetch(myRequest)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response['dependencies']);
    });
  }
}
