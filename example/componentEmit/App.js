import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        onAdd(a, b) {
          console.log("App onAdd", a, b);
        },
        onAddFoo() {
          console.log("App onAddFoo");
        },
      }),
    ]);
  },

  setup() {
    return {};
  },
};
