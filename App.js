import { effectWatch, reactive } from "./reactivity/reactive.js";
import { h } from "./reactivity/h.js";

export default {
  render(context) {
    return h(
      "div",
      {
        id: "app - " + context.state.count,
        class: "showporo",
      },
      // String(context.state.count)
      [h("p", null, String(context.state.count)), h("p", null, "haha")]
    );
  },
  setup() {
    const state = reactive({
      count: 0,
    });
    window.state = state;
    return { state };
  },
};
