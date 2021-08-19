export interface Feedback {
  courseId: number;
  got: string;
  cold: string;
  sweet: string;
  comments: {
    text: string,
    semester: string
  }[]
}