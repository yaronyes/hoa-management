import io from 'socket.io-client';
import config from '../config/config.json';

class WebSocketClient {
    static instance;
    
    constructor() {
        this.connected = false;
    }
    
    static getInstance = () => {
        if (WebSocketClient.instance) {        
          return WebSocketClient.instance;
        }
              
        WebSocketClient.instance = new WebSocketClient();
        return WebSocketClient.instance;        
    } 
    
    connect = () => {
        if(!this.connected) {
            this.socket = io(config.server_url);

            this.socket.on('connect', () => {
                console.log('websocket connected');
                this.connected = true;
                if(this.onConnectCallback) {
                    this.onConnectCallback();
                }
            });
            
            this.socket.on('refresh', (data) => {
                if (this.onRefreshCallback) {
                    this.onRefreshCallback(data);
                }
            });

            this.socket.on('ping', () => this.socket.emit('pong'));
        }
    }

    setOnRefreshCallback = callback =>  this.onRefreshCallback = callback;

    setOnConnectCallback = callback => this.onConnectCallback = callback;


    close = () => {
        this.socket.disconnect();
    }
}

export default WebSocketClient.getInstance();

