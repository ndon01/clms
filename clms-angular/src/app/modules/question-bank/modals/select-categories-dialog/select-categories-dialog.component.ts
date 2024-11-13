import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CourseModuleProjection, QuestionBankCategory } from "@core/modules/openapi";
import { TreeNode } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import {Tree, TreeModule} from "primeng/tree";
import {NgIf} from "@angular/common";

export interface SelectCategoriesDialogData {
  categories: QuestionBankCategory[];
  multiple: boolean;
}

@Component({
  selector: 'app-select-modules-dialog',
  templateUrl: './select-categories-dialog.component.html',
  imports: [
    TableModule,
    ButtonDirective,
    TreeModule,
    NgIf
  ],
  standalone: true
})
export class SelectCategoriesDialogComponent implements OnInit {
  categories: QuestionBankCategory[] = []; // Input list of categories
  categoryTree: TreeNode[] = []; // Tree representation of categories
  multiple = false; // Whether multiple categories can be selected
  selectedCategories: TreeNode[] | TreeNode = []; // Selected categories

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectCategoriesDialogData>) {
    // Load the categories and settings from config if provided
    if (config.data) {
      this.multiple = config.data.multiple || false;
      this.categories = config.data.categories || [];
    }
  }

  ngOnInit() {
    // Build the category tree structure for display
    this.categoryTree = this.mapCategoriesToTree(this.categories);
  }

  // Convert the list of categories to a tree structure
  mapCategoriesToTree(categories: QuestionBankCategory[]): TreeNode[] {
    const idToNodeMap = new Map<number, TreeNode>();
    const tree: TreeNode[] = [];

    categories.forEach(category => {
      const treeNode: TreeNode = {
        label: category.categoryName,
        data: category,
        children: [],
        selectable: true
      };
      idToNodeMap.set(category.id!, treeNode);

      if (category.parentId) {
        const parent = idToNodeMap.get(category.parentId);
        if (parent) {
          parent.children!.push(treeNode);
        }
      } else {
        tree.push(treeNode);
      }
    });

    return tree;
  }

  // Confirm and emit selected categories, then close the dialog
  confirmSelection() {
    if (!this.selectedCategories) {
      this.ref.close();
    }
    if (Array.isArray(this.selectedCategories)) {
      this.ref.close(this.selectedCategories.map(node => (node.data as QuestionBankCategory).id));
    } else {
      this.ref.close(this.selectedCategories.data.id)
    }
  }

  // Close the dialog without any selection
  cancel() {
    this.ref.close();
  }

  protected readonly Array = Array;
}
