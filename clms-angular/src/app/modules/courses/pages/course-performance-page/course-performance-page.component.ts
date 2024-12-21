import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  CourseCategoryPerformanceDto,
  QuestionBankCategory,
  TimestampedCategoryPerformanceDto
} from '@core/modules/openapi';

@Component({
  selector: 'app-course-performance-page',
  templateUrl: './course-performance-page.component.html',
  styleUrls: ['./course-performance-page.component.css']
})
export class CoursePerformancePageComponent implements OnInit {
  data: any;
  options: any;
  courseCategoryPerformanceDto: CourseCategoryPerformanceDto | null = null;
  courseId: number | null = null;
  courseIdNameHashMap: { [key: number]: string } = {};

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = parseInt(params['courseId']);
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = parseInt(id, 10);
        this.fetchCourseCategoryPerformance();
      }
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  fetchCourseCategoryPerformance() {
    if (!this.courseId) return;
    this.httpClient.get<CourseCategoryPerformanceDto>('/api/courses/performance/get-course-category-performance', {
      params: {
        courseId: this.courseId
      }
    }).subscribe(data => {
      this.courseCategoryPerformanceDto = data;
      this.prepareChartData();
    });
  }

  prepareChartData() {
    if (!this.courseCategoryPerformanceDto?.categoryPerformances) return;

    const groupedData: Record<number, { labels: string[]; data: number[] }> = {};
    const categoryIds = new Set<number>();
    // Group data by categoryId
    this.courseCategoryPerformanceDto.categoryPerformances.forEach((performance: TimestampedCategoryPerformanceDto) => {
      if (performance.categoryId !== undefined && performance.timestamp && performance.performanceScore !== undefined) {
        categoryIds.add(performance.categoryId);
        if (!groupedData[performance.categoryId]) {
          groupedData[performance.categoryId] = { labels: [], data: [] };
        }
        groupedData[performance.categoryId].labels.push(performance.timestamp);
        groupedData[performance.categoryId].data.push(performance.performanceScore);
      }
    });

    this.httpClient.get<QuestionBankCategory[]>('/api/question-bank/categories/get-bulk', {
      params: {
        categoryIds: Array.from(categoryIds).join(',')
      }
    }).subscribe(categories => {
      categories.forEach(category => {
        if (category.id && category.categoryName) {
            this.courseIdNameHashMap[category.id] = category.categoryName;
        }
      });
      // Create datasets
      const datasets = Object.keys(groupedData).map(categoryId => ({
        label: this.courseIdNameHashMap[Number(categoryId)] || `Category ${categoryId}`,
        data: groupedData[Number(categoryId)].data,
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.4
      }));

      // Use the labels from the first category (assuming all categories have the same timestamps)
      const labels = groupedData[Object.keys(groupedData)[0]].labels;

      this.data = {
        labels: labels,
        datasets: datasets
      };
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
