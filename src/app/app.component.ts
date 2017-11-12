import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import {TreeService} from './tree.service';

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

  constructor(private treeService: TreeService) {
  }

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
      this.treeService.fetchDependencies(node, this.dependenciesArray);
      console.log('node:', node);
    }
  }
}
