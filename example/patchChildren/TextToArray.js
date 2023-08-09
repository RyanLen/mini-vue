import { ref, h } from "../../lib/mini-vue.esm.js";

const prevChildren = "oldChildren";
const nextChildren = [
  h("div", {}, "A"),
  h("div", {}, "B"),
  h("div", {}, "C"),
  h("div", {}, "D"),
];

export default {
  name: "TextToArray",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange,
    };
  },

  render() {
    const self = this;
    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
