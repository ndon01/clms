import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ApiModule,
  AssignmentDetailsProjection,
  AssignmentsService,
  CourseModuleProjection, CourseService
} from "@core/modules/openapi";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialogService: DialogService
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

  showAddAssignmentModal(module: CourseModuleProjection) {
    this.fetchAssignments();
    const ref = this.dialogService.open(AssignmentSelectionDialogComponent, {
      header: 'Select Assignments',
      width: '70%',
      closable: false,
      data: {
        assignments: this.assignments,
      }
    })

    ref.onClose.subscribe((selectedAssignments: AssignmentDetailsProjection[]) => {
      if (selectedAssignments) {
        // todo: add assignments to module
        console.log(selectedAssignments);
        this.fetchModules();
      }
    });
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
    });

  }

  sortModulesByOrder() {
    this.courseModules.sort((a, b) => {
      if (!a.moduleOrder) return 1;
      return (a.moduleOrder || 0) - (b.moduleOrder || 0)
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

  onActiveIndeciesChanged($event: number | number[]) {
    // generate hashmaps for quick lookup
    const activeModules = Array.isArray($event) ? $event : [$event];
    const activeModuleMap = {}
    activeModules.forEach(index => activeModuleMap[index] = true);
    this.activeModuleIndecies = activeModuleMap;
  }
}
