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
  dependenciesArray: string[] = [];
  tree: TreeNode[] = [];

  constructor(private treeService: TreeService) {
  }

  onclick() {
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
    }
  }
}
