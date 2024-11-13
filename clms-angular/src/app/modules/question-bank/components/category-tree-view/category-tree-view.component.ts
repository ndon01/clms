import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {QuestionBankCategory} from "@core/modules/openapi";
import {TreeDragDropService, TreeNode} from "primeng/api";
import {TreeModule, TreeNodeDropEvent} from "primeng/tree";
import {Button} from "primeng/button";
import {NgIf} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {MenuItem} from "primeng/api";
import {
  SelectCategoriesDialogComponent
} from "@modules/question-bank/modals/select-categories-dialog/select-categories-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {ContextMenuModule} from "primeng/contextmenu";
import {EditTitleModalComponent} from "@modules/question-bank/modals/edit-title-modal/edit-title-modal.component";

export interface CategoryReparentedEvent {
  categoryId: number;
  newParentId: number | undefined;
}

export interface CategoryCreatedEvent {
  categoryName: string;
  parentId: number | undefined;
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
    CardModule,
    ContextMenuModule
  ],
  providers: [TreeDragDropService, DialogService],
  templateUrl: './category-tree-view.component.html',
  styleUrl: './category-tree-view.component.css'
})
export class CategoryTreeViewComponent implements OnInit, OnChanges {
  private expandedNodeIds = new Set<number>();

  @Input() categories: QuestionBankCategory[] = [];
  categoryTree!: TreeNode[];

  @Input() allowDragAndDrop = false;
  dragAndDropEnabled = false;
  @Output() categoryReparented = new EventEmitter<CategoryReparentedEvent>();

  @Output() categoryCreated = new EventEmitter<CategoryCreatedEvent>();
  @Output() categoryDeleted = new EventEmitter<number>();
  @Output() categoryTitleChanged = new EventEmitter<{ categoryId: number, newTitle: string }>();

  // Context menu items
  contextMenuItems: MenuItem[] = [];
  selectedNode: TreeNode | null = null;

  constructor(
    private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.loadCategories();
    this.applyExpandedState(this.categoryTree);
    this.setupContextMenuItems();
  }

  ngOnChanges() {
    this.loadCategories();
    this.applyExpandedState(this.categoryTree);
  }

  onNodeDrop(event: TreeNodeDropEvent) {
    const node = event.dragNode;
    const categoryData = node?.data as QuestionBankCategory;
    const parent = node?.parent;

    if (parent) {
      const parentCategoryData = parent.data as QuestionBankCategory;
      this.categoryReparented.emit({
        categoryId: categoryData.id!,
        newParentId: parentCategoryData.id
      });
      return;
    }

    this.categoryReparented.emit({
      categoryId: categoryData.id!,
      newParentId: undefined
    });
  }

  onNodeExpand(event: any) {
    const expandedNode = event.node;
    this.expandedNodeIds.add(expandedNode.data.id);
  }

  onNodeCollapse(event: any) {
    const collapsedNode = event.node;
    this.expandedNodeIds.delete(collapsedNode.data.id);
  }

  onNodeContextMenuSelect(event: any) {
    this.selectedNode = event.node;
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
        }
      } else {
        tree.push(treeNode);
      }
    });

    return tree;
  }

  loadCategories() {
    this.categoryTree = this.mapCategoriesToTree(this.categories);
  }

  setupContextMenuItems() {
    this.contextMenuItems = [
      {label: 'Add Child', icon: 'pi pi-plus', command: () => this.addChild()},
      {label: 'Reparent', icon: 'pi pi-exchange', command: () => this.changeParent()},
      {label: 'Move to Root', icon: 'pi pi-arrow-up', command: () => this.selectedNode && this.categoryReparented.emit({
          categoryId: this.selectedNode!.data.id!,
          newParentId: undefined
        })},
      {label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteSelectedNode()},
      {label: 'Edit Title', icon: 'pi pi-pencil', command: () => this.editTitleSelectedNode()}
    ];
  }

  addChild() {
    if (this.selectedNode) {
      // Logic to add a child node to selectedNode
      this.dialogService.open(EditTitleModalComponent, {
        header: 'Add Child Category',
        width: '500px',
        data: {
          title: ''
        }
      }).onClose.subscribe((newCategoryName: string | undefined) => {
        if (newCategoryName) {
          this.categoryCreated.emit({
            categoryName: newCategoryName,
            parentId: this.selectedNode ? this.selectedNode.data.id : undefined
          });
        }
      })
    }
  }

  changeParent() {
    if (this.selectedNode) {
      const ref =  this.dialogService.open(SelectCategoriesDialogComponent, {
        header: 'Select New Parent Category',
        width: '500px',
        data: {
          categories: this.categories.filter(c => c.id !== this.selectedNode!.data.id),
          multiple: false
        }
      });

      ref.onClose.subscribe((selectedCategoryId: number | undefined) => {
        if (selectedCategoryId !== undefined) {
          this.categoryReparented.emit({
            categoryId: this.selectedNode!.data.id!,
            newParentId: selectedCategoryId
          });
        }
      });
    }
  }

  createNewRootCategory() {
    this.dialogService.open(EditTitleModalComponent, {
      header: 'Add New Root Category',
      width: '500px',
      data: {
        title: ''
      }
    }).onClose.subscribe((newCategoryName: string | undefined) => {
      if (newCategoryName) {
        this.categoryCreated.emit({
          categoryName: newCategoryName,
          parentId: undefined
        });
      }
    });
  }

  private editTitleSelectedNode() {
    if (this.selectedNode) {
      this.dialogService.open(EditTitleModalComponent, {
        header: 'Edit Category Title',
        width: '500px',
        data: {
          title: this.selectedNode.label
        }
      }).onClose.subscribe((newTitle: string | undefined) => {
        if (newTitle) {
          this.categoryTitleChanged.emit({
            categoryId: this.selectedNode!.data.id!,
            newTitle: newTitle
          });
        }
      });
    }
  }

  private deleteSelectedNode() {
    if (this.selectedNode) {
      this.categoryDeleted.emit(this.selectedNode.data.id!);
    }
  }
}
