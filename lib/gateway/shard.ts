import { GatewayOpcodes, GatewayCloseCodes, GatewaySendPayload, GatewayReceivePayload } from 'discord-api-types/v10';
import { EventEmitter } from 'eventemitter3';
import { RateLimiter } from '@rainfish/ratelimiter';
import { WebSocket } from 'ws';
import { assert } from 'assert';

export class Shard extends EventEmitter {
   private readonly _gatewayUrl: string;
   private _payloadQueue: RateLimiter;
   private _socket: WebSocket;
   private _token: string;
   
  constructor() {
      this._socketOnMessage = this._socketOnMessage.bind(this);
      this._socketOnceClose = this._socketOnceClose.bind(this);
      this._socketOnceError = this._socketOnceError.bind(this);
      this._socketOnceOpen = this._socketOnceOpen.bind(this);
  }
  
   public connect(websocketUrl?: string): void {
      assert(this._socket.readyState !== WebSocket.OPEN, 'Tried opening a websocket while a connection exists.');
      assert(typeof (websocketUrl || this._gatewayUrl) != undefined, 'No Url available to connect to discord');
      
      this._payloadQueue = new RateLimiter(2000, 4);
      const ws = this._socket = new WebSocket(websocketUrl ?? this._gatewayUrl);
      
      ws.once('close', () => this._socketOnceClose);
      ws.once('error', () => this._socketOnceError);
      ws.once('open', () => this._socketOnceOpen);
      ws.on('message', this._socketOnMessage);
   }
  
   public sendPayload(payload: GatewaySendPayload, skipQueue?: boolean): Promise<void> {
      return this._payloadQueue.enqueue((): void => {
         
      }, skipQueue);
   }
   
   private async _socketOnMessage(data: Buffer): Promise<void> {
      const { t:event, s:sequence, op, d:data }: GatewayReceivePayload = await this._decodeMessage(data);
      
      switch(op) {
         case(GatewayOpcodes.Dispatch): 
            this.emit('dispatch', this, event, data);
         break;
      }
   }
   
   private async _decodeMessage(data: Buffer | string): Promise<GatewayReceivePayload> {
      if(typeof data === 'string') {
         return <GatewayReceivePayload>JSON.parse(data);
      }
      
      
   }
  
   private _socketOnceError(): void {
     
   }
  
   private _socketOnceClose(): void {
     
   }
  
   private _socketOnceOpen(): void {
     
   }
}