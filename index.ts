import Echo from "laravel-echo";
import "pusher-js";

interface Options {
  broadcaster: string;
  key: string;
  wsHost: string;
  wsPort: number;
  wssPort: number;
  forceTLS: boolean;
  encrypted: boolean;
  disableStats: boolean;
  enabledTransports: string[];
  authEndpoint: string;
}

class WebSocketClient {
  public options: Options;

  constructor(options: Options) {
    this.options = Object.assign(this.defaultOptions(), options);
  }

  defaultOptions(): Options {
    return {
      broadcaster: "pusher",
      key: "app-key",
      wsHost: "127.0.0.1",
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      encrypted: true,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "/api/broadcasting/auth",
    };
  }

  connect() {
    return new Echo(this.options);
  }
}

export default {
  install: (app: any, options: Options) => {
    app.config.globalProperties.$echo = new WebSocketClient(options).connect();
  },
};
