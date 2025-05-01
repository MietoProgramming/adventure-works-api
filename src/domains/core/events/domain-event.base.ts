export abstract class DomainEvent {
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string) {
    this.occurredOn = new Date();
    this.eventName = eventName;
  }
}
