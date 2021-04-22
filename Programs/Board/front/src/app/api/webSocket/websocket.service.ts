import { Injectable, OnDestroy, Inject } from '@angular/core';
import {
  Observable,
  SubscriptionLike,
  Subject,
  Observer,
  interval,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { share, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import {
  IWebsocketService,
  IWsMessage,
  WebSocketConfig,
} from './websocket.interfaces';
import { config } from './websocket.config';

//add to app module
// { provide: config, useValue: {
//     url: environment.ws
// } }
// and invironment and  invironment.prod
// export const environment = {
//     production: false,
//     ws:'ws://127.0.0.1:4444'
//   };

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  // объект конфигурации WebSocketSubject
  private config: WebSocketSubjectConfig<IWsMessage<any>>;

  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;

  // Observable для реконнекта по interval
  private reconnection$: Observable<number> | undefined | null;
  private websocket$: WebSocketSubject<IWsMessage<any>> | undefined | null;

  // сообщает, когда происходит коннект и реконнект
  private connection$: Observer<boolean> | undefined;

  // вспомогательный Observable для работы с подписками на сообщения
  private wsMessages$: Subject<IWsMessage<any>>;

  // пауза между попытками реконнекта в милисекундах
  private reconnectInterval: number;

  // количество попыток реконнекта
  private reconnectAttempts: number;

  // синхронный вспомогатель для статуса соединения
  private isConnected: boolean | undefined;

  // статус соединения
  public status: Observable<boolean>;

  //в конструкторе класса сервиса мы получаем объект WebSocketConfig, заданный при подключении модуля
  constructor(@Inject(config) private wsConfig: WebSocketConfig) {
    this.wsMessages$ = new Subject<IWsMessage<any>>();

    // смотрим конфиг, если пусто, задаем умолчания для реконнекта
    this.reconnectInterval = wsConfig.reconnectInterval || 5000;
    this.reconnectAttempts = wsConfig.reconnectAttempts || 10;

    // при сворачивании коннекта меняем статус connection$ и глушим websocket$
    this.config = {
      url: wsConfig.url,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.websocket$ = null;
          this.connection$?.next(false);
        },
      },
      // при коннекте меняем статус connection$
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$?.next(true);
        },
      },
    };

    // connection status
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // запускаем реконнект при отсутствии соединения
    this.statusSub = this.status.subscribe((isConnected) => {
      this.isConnected = isConnected;

      if (
        !this.reconnection$ &&
        typeof isConnected === 'boolean' &&
        !isConnected
      ) {
        this.reconnect();
      }
    });

    // говорим, что что-то пошло не так
    this.websocketSub = this.wsMessages$.subscribe(
      () => null,
      (error: ErrorEvent) => console.error('WebSocket error!', error)
    );

    // коннектимся
    this.connect();
  }
  ngOnDestroy() {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  private connect(): void {

    this.websocket$ = new WebSocketSubject(this.config); // создаем WebSocketSubject
    // если есть сообщения, шлем их дальше в wsMessages$,
    // если нет, ожидаем
    // реконнектимся, если получили ошибку
    this.websocket$.subscribe(
      (message) => {

        this.wsMessages$.next(message);
      },
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors

          this.reconnect();
        }
      }
    );
  }

  private reconnect(): void {
    console.log('reconnectd');
    // Создаем interval со значением из reconnectInterval
    this.reconnection$ = interval(this.reconnectInterval).pipe(
      takeWhile(
        (v, index) => index < this.reconnectAttempts && !this.websocket$
      )
    );

    // Пытаемся подключиться пока не подключимся, либо не упремся в ограничение попыток подключения
    this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        // Subject complete if reconnect attemts ending
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$?.complete();
        }
      }
    );
  }

  public on<T>(event: string): Observable<T> | undefined {
      
    if (event) {
      return this.wsMessages$.pipe(
        filter((message: IWsMessage<T>) => message.event === event),
        map((message: IWsMessage<T>) => message.data)
      );
    }
    return;
  }

  public send(event: string, data: any = {}): void {
    if (event && this.isConnected) {
      // костыль с any потому, что на "том" конце ожидается string не ждет там string
      // более изящный костыль не придумался :)
      this.websocket$?.next(<any>{event, data});
    } else {
      console.error('Send error!');
    }
  }
}
