import { createVNode } from "./vnode";

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先转换为虚拟节点 vnode, component -> vnode
        // 后续的所有逻辑操作都是基于 vnode 做处理
        const vnode = createVNode(rootComponent);
        render(vnode, rootContainer);
      },
    };
  };
}
