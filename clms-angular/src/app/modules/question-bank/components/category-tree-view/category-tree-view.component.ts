import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {QuestionBankCategory} from "@core/modules/openapi";
import {TreeDragDropService, TreeNode} from "primeng/api";
import {TreeModule, TreeNodeDropEvent} from "primeng/tree";
import {Button} from "primeng/button";
import {NgIf} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";

export interface CategoryReparentedEvent {
  categoryId: number;
  newParentId: number | undefined;
}

@Component({
  selector: 'app-category-tree-view',
  standalone: true,
  imports: [
    TreeModule,
    Button,
    NgIf,
    InputSwitchModule,
    FormsModule,
    CardModule
  ],
  providers: [TreeDragDropService],
  templateUrl: './category-tree-view.component.html',
  styleUrl: './category-tree-view.component.css'
})
export class CategoryTreeViewComponent implements OnInit, OnChanges {
  @Input() categories: QuestionBankCategory[] = [];
  categoryTree!: TreeNode[];

  @Input() allowDragAndDrop = false;
  dragAndDropEnabled = false;
  @Output() categoryReparented = new EventEmitter<CategoryReparentedEvent>();

  private expandedNodeIds = new Set<number>();

  ngOnInit() {
    this.loadCategories();
    this.applyExpandedState(this.categoryTree);
  }

  ngOnChanges() {
    this.loadCategories();
    this.applyExpandedState(this.categoryTree);
  }

  onNodeDrop(event: TreeNodeDropEvent) {
    console.log(event);
    const node = event.dragNode;
    const categoryData = node?.data as QuestionBankCategory;

    const parent = node?.parent
    if (parent) {
      const parentCategoryData = parent.data as QuestionBankCategory;
      this.categoryReparented.emit({
        categoryId: categoryData.id!,
        newParentId: parentCategoryData.id
      })
      return;
    }

    this.categoryReparented.emit({
      categoryId: categoryData.id!,
      newParentId: undefined
    })
  }

  onNodeExpand(event: any) {
    const expandedNode = event.node;
    this.expandedNodeIds.add(expandedNode.data.id);
  }

  onNodeCollapse(event: any) {
    const collapsedNode = event.node;
    this.expandedNodeIds.delete(collapsedNode.data.id);
  }

  applyExpandedState(nodes: TreeNode[]) {
    nodes.forEach(node => {
      if (this.expandedNodeIds.has(node.data.id)) {
        node.expanded = true;
      }
      if (node.children) {
        this.applyExpandedState(node.children);
      }
    });
  }

  mapCategoriesToTree(categories: QuestionBankCategory[]): TreeNode[] {
    const idToNodeMap = new Map<number, TreeNode>();
    const unmappedChildren: TreeNode[] = [];
    const tree: TreeNode[] = [];

    categories.forEach(category => {
      const treeNode: TreeNode = {
        label: category.categoryName,
        data: category,
        children: [],
        expanded: this.expandedNodeIds.has(category.id!) // Set expanded state based on stored IDs
      };
      idToNodeMap.set(category.id!, treeNode);

      if (category.parentId) {
        const parent = idToNodeMap.get(category.parentId);
        if (parent) {
          parent.children!.push(treeNode);
        } else {
          unmappedChildren.push(treeNode);
        }
      } else {
        tree.push(treeNode);
      }
    });

    unmappedChildren.forEach(child => {
      const parent = idToNodeMap.get(child.data.parentId!);
      if (parent) {
        parent.children!.push(child);
      }
    });

    return tree;
  }

  loadCategories() {
    this.categoryTree = this.mapCategoriesToTree(this.categories);
    this.addAddCategoryNodes(this.categoryTree);
  }

  addAddCategoryNodes(nodes: TreeNode[]) {
    // add a node to add a new category
  }

}
