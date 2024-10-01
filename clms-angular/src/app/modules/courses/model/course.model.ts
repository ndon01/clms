export type Course = {
  id: number,
  name: string,
  description: string,
}

export type CourseProjection = Partial<Course>;
