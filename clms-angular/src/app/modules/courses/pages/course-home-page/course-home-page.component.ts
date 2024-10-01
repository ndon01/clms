import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-home-page',
  standalone: true,
  imports: [],
  templateUrl: './course-home-page.component.html',
  styleUrl: './course-home-page.component.css'
})
export class CourseHomePageComponent implements OnInit {
  courseId!: number
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Get the value of 'id' parameter
      if (!id) {
        return;
      }
      this.courseId = parseInt(id, 10); // Convert the value to a number
    });
  }
}
