import { ref } from "../../lib/mini-vue.esm.js";

export const App = {
  name: "App",
  template: `<div>hi,{{message}}</div>`,
  setup() {
    const message = ref("mini-vue");
    window.message = message;
    return {
      message,
    };
  },
};
