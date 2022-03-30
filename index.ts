import Echo from "laravel-echo";
import "pusher-js";
import { createApp } from 'vue';
const app = createApp({})

interface Options {
  broadcaster: string
  key: string | boolean | undefined
  forceTLS: boolean
  cluster: string | boolean | undefined
  encrypted: string | boolean | undefined
  disableStats: boolean
  authEndpoint: string
  auth: object
}

class BroadCastClient {
  public options: Options;

  constructor(options: Options) {
    this.options = Object.assign(this.defaultOptions(), options);
  }

  defaultOptions(): Options {
    return {
      broadcaster: "pusher",
      key: "app-key",
      forceTLS: false,
      cluster: "us2",
      encrypted: true,
      disableStats: true,
      authEndpoint: "/api/broadcasting/auth",
      auth: {}
    };
  }

  connect() {
    try {
        console.log('[echo] connecting...')
        const process = new Echo(this.options)
        process.join('auth')
        console.log('[echo] connected')
        return process;
    } catch(error) {
        console.log(`[echo] ${error}`)
    }
  }
}

export const echo = (options: Options) => {
    app.config.globalProperties.$echo = new BroadCastClient(options).connect()
    app.config.globalProperties.$echoOptions = options
    return app.config.globalProperties.$echo
}

export const broadcast = () => {
    if (app.config.globalProperties.$echo != 'undefined') {
      return echo(app.config.globalProperties.$echoOptions)
    }
    return app.config.globalProperties.$echo;
}