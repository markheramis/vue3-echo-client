[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Vue3 echo Client

> Plugin for laravel echo

```sh
$ npm -v && node -v
6.14.13
v14.17.3
```

## Installation



```sh
npm i vue3-echo-client
```

## Usage
Example:

```tsx
import { createApp } from "vue";
import { createPinia } from "pinia";
import Echo from "vue3-echo-client";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(createPinia()).use(router);

app.use(Echo, {
    broadcaster: "pusher",
    key: "app-key",
    wsHost: "127.0.0.1",
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
});

app.mount("#app");

```

Options:

```tsx
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
```

Vue:

```vue

<template>
  <hello-world msg="wellcome"></hello-world>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios"

export default defineComponent({
  components: {HelloWorld},
  data() {
    return {
      token: "<token>",
    };
  },
  mounted() {
    const vm = this as any;
  axios.get("you_laravel_url/sanctum/csrf-cookie").then(() => {
    //Public channel
    vm.$echo.channel(`notifications.1`).listen("information", (e: any) => {
      console.log("I love it ! ", e);
    });
    //Private channel
      vm.$echo.connector.pusher.config.auth.headers["Authorization"] = "Bearer " + this.token;
      vm.$echo.private(`orders.1`).listen("PaymentStatus", (e: any) => {
        console.log("yessss work !! ", e);
      });
    });
  },
});
</script>
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:



## Built With

* typescript


## Authors

- [Mark Heramis](https://github.com/markheramis)
