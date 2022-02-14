import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server;
  numOfConnectedUsers: number = 0;

  handleConnection(client: any, ...args: any[]): any {
    this.numOfConnectedUsers++;
    this.server.emit('users', this.numOfConnectedUsers);
  }

  handleDisconnect(client: any): any {
    this.numOfConnectedUsers--;
    this.server.emit('users', this.numOfConnectedUsers);
  }

}
