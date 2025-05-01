import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DomainEvent } from './domain-event.base';

@Injectable()
export class EventBusService {
  private eventBus = new Subject<DomainEvent>();

  publish<T extends DomainEvent>(event: T): void {
    this.eventBus.next(event);
  }

  ofType<T extends DomainEvent>(eventType: string): Observable<T> {
    return this.eventBus.pipe(
      filter((event: DomainEvent): event is T => event.eventName === eventType),
    ) as Observable<T>;
  }
}
