import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ApiModule,
  AssignmentDetailsProjection,
  AssignmentsService, CourseModuleItemProjection,
  CourseModuleProjection, CourseService
} from "@core/modules/openapi";
import { HttpClient } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {DialogService} from "primeng/dynamicdialog";
import {AddModuleDialogComponent} from "@modules/courses/modals/add-module-dialog/add-module-dialog.component";
import {
  ReorderModulesDialogComponent
} from "@modules/courses/modals/reorder-modules-dialog/reorder-modules-dialog.component";
import {
  AssignmentSelectionDialogComponent
} from "@modules/courses/modals/assignment-selection-dialog/assignment-selection-dialog.component";
import {MenuItem} from "primeng/api";
import {
  SelectModulesDialogComponent
} from "@modules/courses/modals/select-modules-dialog/select-modules-dialog.component";
import {
  SelectModuleItemsDialogComponent
} from "@modules/courses/modals/select-module-items-dialog/select-module-items-dialog.component";

@Component({
  selector: 'app-course-modules-page',
  templateUrl: './course-modules-page.component.html',
  styleUrls: ['./course-modules-page.component.css']
})
export class CourseModulesPageComponent implements OnInit {
  courseId?: number;
  courseModules: CourseModuleProjection[] = [];
  assignments: AssignmentDetailsProjection[] = [];
  menuItems: MenuItem[] = [];
  activeModuleIndecies: { [key: number]: boolean } = {};
  moduleItems: { [key: number]: CourseModuleItemProjection[] } = {};

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {

    this.menuItems = [
      {
        label: 'Create Module',
        icon: 'pi pi-plus',
        command: () => this.showAddModuleModal()
      },
      {
        label: 'Reorder Modules',
        icon: 'pi pi-sort',
        command: () => this.showReorderModal()
      },
      {
        label: 'Delete Module(s)',
        icon: 'pi pi-plus',
        command: () => this.showDeleteModulesModal()
      }
    ];


    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = parseInt(id, 10);
        this.fetchAssignments();
        this.fetchModules();
      }
    });
  }

  showAddModuleModal() {
    this.dialogService.open(AddModuleDialogComponent, {
      header: 'Create a Module',
      width: '70%',
      closable: false,
      data: {
        courseId: this.courseId
      }
    }).onClose.subscribe((newModuleTitle: string) => {
      if (newModuleTitle) {
        this.httpClient.post('/api/courses/modules/create', {
          courseId: this.courseId,
          courseModule: {
            title: newModuleTitle,
          }
        }).subscribe(() => {
          this.fetchModules();
        })
      }
    })
  }

  showReorderModal() {
    const ref = this.dialogService.open(ReorderModulesDialogComponent, {
      header: 'Reorder Modules',
      width: '50vw',
      closable: false,
      data: {
        modules: this.courseModules // Pass current modules to the reorder modal
      }
    });

    ref.onClose.subscribe((reorderedModules: CourseModuleProjection[]) => {
      if (reorderedModules) {
        // todo: move logic to reorder specific endpoint
        this.httpClient.post('/api/courses/modules/update-bulk', reorderedModules).subscribe(() => {
          this.fetchModules();
        });
      }
    });
  }

  showDeleteModulesModal() {
    this.dialogService.open(SelectModulesDialogComponent, {
      header: 'Delete Modules',
      width: '50vw',
      closable: false,
      data: {
        modules: this.courseModules,
      }
    }).onClose.subscribe((deletedModules: CourseModuleProjection[]) => {
      if (deletedModules) {
        this.httpClient.post('/api/courses/modules/delete-bulk', deletedModules.map(item => item.id)).subscribe(() => {
          this.fetchModules();
        });
      }
    })
  }

  showAddAssignmentModal(module: CourseModuleProjection) {
    if (!module.id) return;
    const moduleId = module.id;
    this.fetchAssignments();

    this.fetchModuleItems(moduleId).subscribe((items: CourseModuleItemProjection[]) => {
      this.moduleItems[moduleId] = items;
      const ref = this.dialogService.open(AssignmentSelectionDialogComponent, {
        header: 'Select Assignments',
        width: '70%',
        closable: false,
        data: {
          assignments: structuredClone(this.assignments).filter(assignment => {
            if (!this.moduleItems[moduleId]) return true;
            const moduleItems = this.moduleItems[moduleId];
            return !moduleItems?.some(item => item.assignment?.id == assignment.id);
          })
        }
      })

      ref.onClose.subscribe((selectedAssignments: AssignmentDetailsProjection[]) => {
        if (selectedAssignments) {
          this.httpClient.post('/api/courses/modules/insert-assignments', {
            moduleId: module.id,
            assignmentIds: selectedAssignments.map(item => item.id)
          }).subscribe(() => {
            this.fetchModules();
            this.loadModuleItems(module);
          });
        }
      });

    });
  }

  showRemoveModuleItemsModal(module: CourseModuleProjection) {
    if (module.id == undefined) return;
    const moduleId = module.id;
    this.fetchModuleItems(moduleId).subscribe((items: CourseModuleItemProjection[]) => {
      this.moduleItems[moduleId] = items;
      this.dialogService.open(SelectModuleItemsDialogComponent, {
        header: 'Remove Module Items',
        width: '70%',
        closable: false,
        data: {
          items: this.moduleItems[moduleId] || []
        }
      }).onClose.subscribe((selectedItems: CourseModuleItemProjection[]) => {
        if (selectedItems) {
          this.httpClient.post('/api/courses/modules/remove-items', selectedItems.map(item => item.id)).subscribe(() => {
            this.fetchModules();
            this.loadModuleItems(module);
          });
        }
      });
    });
  }





  fetchAssignments() {
    if (!this.courseId) return;
    this.httpClient.get<AssignmentDetailsProjection[]>("/api/courses/getAllAssignmentsDetails", {
      params: { courseId: this.courseId }
    }).subscribe((assignments: AssignmentDetailsProjection[]) => {
      this.assignments = assignments;
    });
  }

  fetchModules() {
    if (!this.courseId) return;
    this.httpClient.get<CourseModuleProjection[]>("/api/courses/modules/getModulesByCourseId", {
      params: { courseId: this.courseId }
    }).subscribe((modules: CourseModuleProjection[]) => {
      this.courseModules = modules;
      this.sortModulesByOrder();
      this.courseModules.forEach(module => {
        this.loadModuleItems(module);
      });
    });

  }

  sortModulesByOrder() {
    this.courseModules.sort((a, b) => {
      if (!a.moduleOrder) return 1;
      return (a.moduleOrder || 0) - (b.moduleOrder || 0)
    });
  }

  onActiveIndeciesChanged($event: number | number[]) {
    console.log($event);
    // generate hashmaps for quick lookup
    const activeModules = Array.isArray($event) ? $event : [$event];
    const activeModuleMap = structuredClone(this.activeModuleIndecies)
    Object.keys(activeModuleMap).forEach(key => {
      // if module not in activeModules, set to false
      if (!activeModules.includes(parseInt(key))) {
        activeModuleMap[key] = false;
      }
    });
    activeModules.forEach(index => {
      if (index == undefined || index == null) return;
      if (activeModuleMap[index] == true) return;
      this.loadModuleItems(this.courseModules[index]);
      activeModuleMap[index] = true
    });
    this.activeModuleIndecies = activeModuleMap;
  }

  loadModuleItems(module: CourseModuleProjection) {
    const moduleId = module.id;
    if (moduleId == undefined) return;

    this.fetchModuleItems(moduleId).subscribe((items: CourseModuleItemProjection[]) => {
      this.moduleItems[moduleId] = items;
    });
  }

  fetchModuleItems(moduleId: number) {
    return this.httpClient.get<CourseModuleItemProjection[]>("/api/courses/modules/get-module-items", {
      params: { moduleId: moduleId }
    });
  }

  openModuleItem(item: CourseModuleItemProjection) {
    if (!item.assignment) return;
    const assignmentId = item.assignment.id;
    if (!assignmentId) return;
    this.router.navigate(['assignments', assignmentId, 'overview']);
  }

  protected readonly JSON = JSON;

  doesModuleHaveItems(module: CourseModuleProjection) {
    if (!module.id) return false;
    const moduleId = module.id;
    return this.moduleItems[moduleId]?.length > 0;
  }
}
