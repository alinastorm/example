import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './api/webSocket';
import { WSEvents } from './api/webSocket';

export interface IMessage {
  type: any;
  data: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'board';
  @ViewChild('canvas') public canvasRef: ElementRef;
  canvas: HTMLCanvasElement | any;

  public messages$: Observable<IMessage> | undefined;
  public clear$: Observable<IMessage> | undefined;
  public counter$: Observable<number> | undefined;
  public texts$: Observable<string[]> | undefined;

  constructor(private wsService: WebsocketService) {}
  ngOnInit() {
    // get messages
    this.messages$ = this.wsService.on(WSEvents.ON.MESSAGES);
    this.messages$.subscribe((data) => {
        this.fileToCanvas(data);
      });
    this.clear$ = this.wsService.on(WSEvents.SEND.CLEAR_CANVAS);
    this.clear$.subscribe(() => {
      this.clearCanvas();
    });
    // // get counter
    // this.counter$ = this.wsService.on<number>(WSEvents.ON.COUNTER);

    // // get texts
    // this.texts$ = this.wsService.on<string[]>(WSEvents.ON.UPDATE_TEXTS);
  }
  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.context = this.canvas.getContext('2d');
    this.canvas.mouse = { x: 0, y: 0 };
    this.canvas.context.lineWidth = 3;
    this.canvas.context.lineCap = 'round';
    this.canvas.context.strokeStyle = '#000';
    this.canvas.draw = false;

    const startPosition = function (e) {
      if (this.draw == false) {
        this.draw = true;
        if (e.type == 'mousedown') {
          this.mouse.x = e.pageX - this.offsetLeft;
          this.mouse.y = e.pageY - this.offsetTop;
        } else {
          this.mouse.x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
          this.mouse.y = e.touches[0].pageY - e.touches[0].target.offsetTop;
        }
        this.context.beginPath();
        this.context.moveTo(this.mouse.x, this.mouse.y);
      }
    };
    const finishedPosition = function (e) {
      if (this.draw == true) {
        if (e.type == 'mouseup') {
          this.mouse.x = e.pageX - this.offsetLeft;
          this.mouse.y = e.pageY - this.offsetTop;
        } else {
          // this.mouse.x = e.touches[0].pageX-e.touches[0].target.offsetLeft;
          // this.mouse.y = e.touches[0].pageY-e.touches[0].target.offsetTop;
        }
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.stroke();
        this.context.closePath();
        this.draw = false;
      }
    };
    const draw = function (e) {
      if (this.draw == true) {
        if (e.type == 'mousemove') {
          this.mouse.x = e.pageX - this.offsetLeft;
          this.mouse.y = e.pageY - this.offsetTop;
        } else {
          // Prevent a scrolling action as a result of this touchmove triggering.
          e.preventDefault();
          console.log('touchmove');
          
          this.mouse.x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
          this.mouse.y = e.touches[0].pageY - e.touches[0].target.offsetTop;
        }
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.stroke();
      }
    };
    const mouseLeave = function (e) {
      if (this.draw == true) {
        this.draw = false;
      }
    };
    this.canvas.addEventListener('mousedown', startPosition);
    this.canvas.addEventListener('mouseup', finishedPosition);

    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseleave', mouseLeave);

    this.canvas.addEventListener('touchstart', startPosition);
    this.canvas.addEventListener('touchend', finishedPosition);
    this.canvas.addEventListener('touchmove', draw);
  }
  changeColor(color) {
    this.canvas.context.strokeStyle = color;
  }
  clearCanvas() {

    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  canvasToFile() {
    return this.canvas.toDataURL();
  }
  sendFile(): void {
    this.wsService.send(WSEvents.ON.MESSAGES, this.canvasToFile());
  }
  fileToCanvas(data) {

    var image = new Image();
    image.onload = () => {
      this.canvas.context.drawImage(image, 0, 0);
    };
    image.src = data;
    //  "data:image/png;base64,iVBO
  }
  sendClear(): void {
    this.clearCanvas();
    // this.wsService.send(WSEvents.SEND.CLEAR_CANVAS, 'CLEAR_CANVAS');
  }
}
