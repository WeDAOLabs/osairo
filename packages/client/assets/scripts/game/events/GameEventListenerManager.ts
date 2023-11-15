import { eventBus } from "../../core/event/EventBus";
import { IGameEventListener } from "../../core/event/IGameEventListener";
import { mainLoopUpdater } from "../../core/game/MainLoopUpdater";
import { Singleton } from "../../core/game/Singleton";

interface IQueueItem {
  event: string;
  data: any[];
}

export class GameEventListenerManager extends Singleton {
  public _eventsQueue: IQueueItem[] = [];

  public initialize() {
    this.addListeners([]);

    mainLoopUpdater.registerUpdater(this);
  }

  public addListeners(listeners: IGameEventListener[]) {
    listeners.forEach((listener) => this.addListener(listener));
  }

  public addListener(listener: IGameEventListener) {
    eventBus.on(listener.subject, listener.execAsync, listener);
  }

  public update(dt: number) {
    if (this._eventsQueue.length === 0) {
      return;
    }
    const item: IQueueItem = this._eventsQueue.shift()!;
    eventBus.emit(item.event, ...item.data);
  }

  public addEventToQueue(event: string, data: any[]) {
    this._eventsQueue.push({ event, data });
  }
}

export const gameEventListenerManager: Readonly<GameEventListenerManager> =
  GameEventListenerManager.getInstance();
