import { effectWatch } from "./reactive.js";
import { mountElement, diff } from "../render/index.js";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      let isMounted = false;
      let preSubTree;

      effectWatch(() => {
        if (!isMounted) {
          isMounted = true;
          rootContainer.innerHTML = ``;
          const subTree = rootComponent.render(context);
          // rootContainer.append(element)
          mountElement(subTree, rootContainer);
          preSubTree = subTree;
        } else {
          const subTree = rootComponent.render(context);
          diff(preSubTree, subTree);
          preSubTree = subTree;
        }
      });
    },
  };
}
