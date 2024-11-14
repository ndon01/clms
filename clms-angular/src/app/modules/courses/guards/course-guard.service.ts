import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {CurrentCourseContextService} from "@modules/courses/services/current-course-context.service";
import {Observable} from "rxjs";
import {ClientService} from "@core/services/client/client.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ClientDataSourceService} from "@core/services/client-data-source.service";

@Injectable({
  providedIn: 'root'
})
export class CourseGuardService {

  constructor(private currentCourseContextService: CurrentCourseContextService,
              private clientDataSourceService: ClientDataSourceService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    //check some condition
    return new Observable<boolean>((observer)=>
      {

        this.clientDataSourceService.get().subscribe(async client => {
          const courseMembership = await this.currentCourseContextService.initializeCourse(parseInt(route.params['id']));
          if (!client) {
            this.router.navigate(['courses']);
            observer.next(false);
            observer.complete();
            return;
          }

          if (client?.permissions?.some(val => {
            return val.name?.toLowerCase() == "admin_page_access"
          })) {
            observer.next(true);
            observer.complete();
            return;
          }

          if (this.currentCourseContextService.hasCourseMembership()) {
            observer.next(true);
          } else {
            this.router.navigate(['courses']);
            observer.next(false);
          }

          observer.complete();
          return;
        })
      }
    )
  }
}
