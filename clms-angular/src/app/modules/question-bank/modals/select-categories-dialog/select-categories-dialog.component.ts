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
  selectedCategories: QuestionBankCategory[];
  noneSelectedAllowed: boolean;
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
  selectedQBCategories: QuestionBankCategory[] | QuestionBankCategory = []; // Selected category
  noneSelectedAllowed = false; // Whether no category can be selected
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectCategoriesDialogData>) {
    // Load the categories and settings from config if provided
    if (config.data) {
      this.multiple = config.data.multiple || false;
      this.categories = config.data.categories || [];
      this.selectedQBCategories = config.data.selectedCategories || [];
      this.noneSelectedAllowed = config.data.noneSelectedAllowed || false;
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

      if (this.selectedQBCategories) {
        if (Array.isArray(this.selectedQBCategories)) {
          if (this.selectedQBCategories.find(selectedCategory => selectedCategory.id === category.id)) {
            if (Array.isArray(this.selectedCategories)) {
              this.selectedCategories.push(treeNode);
            }
          }
        }
      }

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

  getContinueButtonText(): string {
    const selectedCount = Array.isArray(this.selectedCategories) ? this.selectedCategories.length : 1;

    if (selectedCount === 0 && this.noneSelectedAllowed) {
      return 'Select None';
    } else if (selectedCount <= 1) {
      return 'Select Category';
    } else {
      return `Select Categories (${selectedCount})`;
    }
  }

  getContinueButtonDisabled(): boolean {
    if (this.noneSelectedAllowed) {
      return false; // Button is never disabled if noneSelectedAllowed is true
    }

    if (Array.isArray(this.selectedCategories)) {
      return this.selectedCategories.length === 0; // Disabled if no category is selected
    }

    return !this.selectedCategories; // Disabled if no single category is selected
  }

}
