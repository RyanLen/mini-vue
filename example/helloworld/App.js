import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log("click!!!");
        },
        onMousedown() {
          console.log("mousedown!!!");
        },
      },
      [
        h("p", { class: "red" }, "hi"),
        h("p", { class: "blue" }, this.msg),
        h(Foo, { count: 1 }),
      ]
    );
  },

  setup() {
    return {
      msg: "mini-vue!!!",
    };
  },
};
