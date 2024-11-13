import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {CurrentCourseContextService} from "@modules/courses/services/current-course-context.service";

@Directive({
  selector: '[appIsTutorView]',
  standalone: true
})
export class IsTutorViewDirective implements OnInit{

  constructor(
    private currentCourseContextService: CurrentCourseContextService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  ngOnInit() {
      if (this.currentCourseContextService.isCourseTutor()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
  }
}
