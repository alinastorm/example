import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { WebsocketService } from '../services/api-webSocket';
import { WS } from '../services/api-webSocket';

export interface IMessage {
    id: number;
    text: string;
}


@Component({
    selector: 'app-socket',
    templateUrl: './socket.component.html',
    styleUrls: ['./socket.component.scss']
  })
export class SocketComponent implements OnInit {

    public messages$: Observable<IMessage[]> | undefined;
    public counter$: Observable<number> | undefined;
    public texts$: Observable<string[]> | undefined;

    public form!: FormGroup ;

    constructor(private fb: FormBuilder, private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            text: [null, [
                Validators.required
            ]]
        });

        // get messages
        this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);

        // get counter
        this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);

        // get texts
        this.texts$ = this.wsService.on<string[]>(WS.ON.UPDATE_TEXTS);
    }

    public sendText(): void {
        if (this.form?.valid) {
            this.wsService.send(WS.SEND.SEND_TEXT, this.form.value.text);
            this.form.reset();
        }
    }

    public removeText(index: number): void {
        this.wsService.send(WS.SEND.REMOVE_TEXT, index);
    }

}