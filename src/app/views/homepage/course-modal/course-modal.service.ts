import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback } from '../../../types/feedback.type';
import { FeedbackService } from '../../../services/feedback.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseModalService {
  private courseId$ = new BehaviorSubject<number>(0);
  private status$ = new BehaviorSubject<'open' | 'close'>('close');

  constructor(private feedbackService: FeedbackService) {}

  getStatus(): Observable<string> {
    return this.status$.asObservable();
  }
  getFeedback(): Observable<Feedback> {
    return this.courseId$.pipe(
      switchMap(id => {
        return this.feedbackService.getFeedback(id)
      })
    )
  }
  open(courseId: number) {
    this.status$.next('open');
    this.courseId$.next(courseId)
  }
  close() {
    this.status$.next('close');
  }
}
