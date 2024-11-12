import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {ClientCourseMemberDetailsProjection, CourseProjection, UserProjection} from "@core/modules/openapi";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrentCourseContextService {

  currentCourseId : number | null = null;
  private currentCourseSource: BehaviorSubject<CourseProjection | null> = new BehaviorSubject<CourseProjection| null>(null);
  private currentCourseMembershipDetails:ClientCourseMemberDetailsProjection | null = null;
  constructor(private ar: ActivatedRoute,private httpClient: HttpClient) {

  }
  initializeCourse(courseId: number): Promise<ClientCourseMemberDetailsProjection> {
    return firstValueFrom(
      this.httpClient.get<ClientCourseMemberDetailsProjection>('/api/courses/members/getClientMembership', {
        params: { courseId: courseId }
      })
    ).then(data => {
      this.currentCourseId = courseId;
      this.currentCourseMembershipDetails = data;
      return data; // Return the data to the calling method
    });
  }
  hasCourseMembership(){
    return this.currentCourseMembershipDetails != null;
  }
  isCourseTutor(){
    if(this.currentCourseMembershipDetails == null){
      return false;
    }
    return this.currentCourseMembershipDetails.isTutor;
  }

}
