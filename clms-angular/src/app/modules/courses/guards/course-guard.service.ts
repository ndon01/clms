import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {CurrentCourseContextService} from "@modules/courses/services/current-course-context.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseGuardService {

  constructor(private currentCourseContextService: CurrentCourseContextService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    //check some condition
    return new Observable<boolean>((observer)=>
      {
        this.currentCourseContextService.initializeCourse(parseInt(route.params['id'])).then(data => {
          if(this.currentCourseContextService.hasCourseMembership()){
            observer.next(true);
          }else{
            this.router.navigate(['courses']);
            observer.next(false);
          }
          observer.complete();
        });
      }
    )
  }
}
