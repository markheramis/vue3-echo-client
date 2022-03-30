# Vue3 Echo Client

Plugin for laravel echo compatible for Vue3

```sh
$ npm -v && node -v
14.17.3
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
import { echo } from "vue3-echo-client"
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(createPinia()).use(router);

app.use(echo({
    broadcaster: "pusher",
    key: "app-key",
    cluster: 'us2',
    encrypted: true,
    forceTLS: false,
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    auth: {}
}));

app.mount("#app");

```

Options:

```tsx
interface Options {
  broadcaster: string
  key: string | boolean | undefined
  forceTLS: boolean
  cluster: string | undefined
  encrypted: string | boolean | undefined
  disableStats: boolean
  authEndpoint: string
  auth: object
}
```

Vue:

```vue

<template>
  <hello-world msg="wellcome"></hello-world>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import chatBox from "@/components/chatBox.vue";
import axios from "axios"
import { broadcast } from "vue3-echo-client"

export default defineComponent({
  components: {chatBox},
  data() {
    return {
      token: "<token>",
    };
  },
  mounted() {
    broadcast().join('auth')
    .here((users) => {
        console.log('enter')
    })
    .joining((user) => {
        console.log('joining');
    })
    .leaving((user) => {
        console.log('leaving');
    })
    .error((error) => {
        console.error(error);
    }
  },
});
</script>
```

## Built With

* typescript


## Authors

- [Mark Heramis](https://github.com/markheramis)
- [Carlomar Espinosa](https://github.com/carlomar-espinosa)
