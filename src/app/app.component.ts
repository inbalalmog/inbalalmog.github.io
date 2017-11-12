import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { TreeService } from './services/tree.service';

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
  cachedNodes: TreeNode[] = [];

  constructor(private treeService: TreeService) {
  }

  getDependencies(node, dependenciesArray, cachedNodes) {
    let cachedNode: TreeNode = this.treeService.getCachedNode(node, cachedNodes.slice());
    if (cachedNode) {
      this.goOverDependencies(node, cachedNode.children, dependenciesArray, cachedNodes);
    } else {
      this.treeService.fetchDependencies(node).then((dependencies) => {
        cachedNode = {
            label: node.label,
            data: node.data,
            children: dependencies
        };
        cachedNodes.push(cachedNode);
        this.goOverDependencies(node, dependencies, dependenciesArray, cachedNodes);
      });
    }
  }
  goOverDependencies(node, dependencies, dependenciesArray, cachedNodes) {
    if (dependencies) {
      for (const property in dependencies) {
        if (dependencies.hasOwnProperty(property) && dependenciesArray.indexOf(property) === -1) {
          const newNode: TreeNode = {
            label: property,
            data: dependencies[property],
            children: []
          };
          node.children.push(newNode);
          dependenciesArray.push(property);
          this.getDependencies(newNode, dependenciesArray, cachedNodes);
        }
      }
    }
  }
  onclick() {
    if (!this.version) {
      this.version = 'latest';
    }
    if (this.package) {
      this.tree = [];
      this.dependenciesArray = [];
      const node: TreeNode = {
        label: this.package,
        data: this.version,
        children: []
      };
      this.tree.push(node);
      this.getDependencies(node, this.dependenciesArray, this.cachedNodes);
    }
  }
}
