import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

@Injectable()
export class TreeService {
    fetchDependencies(node, dependenciesArray, cachedNodes) {
        let cachedNode: TreeNode = this.getCachedNode(node, cachedNodes);
        let dependencies;
        if (cachedNode) {
            dependencies = cachedNode.children;
            this.goOverDependencies(node, dependencies, dependenciesArray, cachedNodes);
        }else {
            this.doRequest(node).then((result) => {
                dependencies = result;
                cachedNode = {};
                cachedNode.label = node.label;
                cachedNode.data = node.data;
                cachedNode.children = dependencies;
                cachedNodes.push(cachedNode);
                this.goOverDependencies(node, dependencies, dependenciesArray, cachedNodes);
            });
        }
    }
    doRequest(node): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = 'https://registry.npmjs.org/' + node.label + '/' + node.data;
            const myRequest = new Request(url);
            fetch(myRequest)
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
    goOverDependencies(node, dependencies, dependenciesArray, cachedNodes) {
        if (dependencies) {
            for (const property in dependencies) {
              if (dependencies.hasOwnProperty(property) && dependenciesArray.indexOf(property) === -1) {
                const newNode: TreeNode = {};
                newNode.label = property;
                newNode.data = dependencies[property];
                newNode.children = [];
                node.children.push(newNode);
                dependenciesArray.push(property);
                this.fetchDependencies(newNode, dependenciesArray, cachedNodes);
              }
            }
          }
    }
}
