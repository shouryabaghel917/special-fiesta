import event from "./event.json";

export type EventConfig = typeof event;

export function getEventConfig(): EventConfig {
  return event;
}
