import { GatewayOpcodes, GatewayCloseCodes, GatewaySendPayload, GatewayReceivePayload } from 'discord-api-types/v10';
import { EventEmitter } from 'eventemitter3';
import { WebSocket } from 'ws';

export class Shard extends EventEmitter {
   private readonly _gatewayUrl: string;
   private _socket: WebSocket;
   private _token: string;
   
  constructor() {
      this._socketOnMessage = this._socketOnMessage.bind(this);
      this._socketOnceClose = this._socketOnceClose.bind(this);
      this._socketOnceError = this._socketOnceError.bind(this);
      this._socketOnceOpen = this._socketOnceOpen.bind(this);
  }
  
  public connect(websocketUrl?: string): void {
      if(this._socket.readyState === WebSocket.OPEN) {
      
      
      
   }
   
   this._socket = new WebSocket(websocketUrl ?? this._gatewayUrl)
      .once('close', () => this._socketOnceClose)
      .once('error', () => this._socketOnceError)
      .once('open', () => this._socketOnceOpen)
      .on('message', this._socketOnMessage);
  }
  
  public async sendPayload(payload: GatewaySendPayload): Promise<void> {
     
  }
  
  private _socketOnMessage(data: Buffer): void {
      
  }
  
  private _socketOnceError(): void {
     
  }
  
  private _socketOnceClose(): void {
     
  }
  
  private _socketOnceOpen(): void {
     
  }
}