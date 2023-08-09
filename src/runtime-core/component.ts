import { proxyRefs } from "../reactivity";
import { initProps } from "../reactivity/componentProps";
import { initSlots } from "../reactivity/componentSlots";
import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode: any, parent) {
  console.log("createComponentInstance", parent);

  const component = {
    vnode,
    type: vnode.type,
    next: null,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    isMouted: false,
    subTree: {},
    emit: () => {},
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;
  if (setup) {
    setCurrentInstance(instance);
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
    setCurrentInstance(null);
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  // 这里的 setupResult 可能是 Function 或 Object
  // TODO Function

  // Object
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult);
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  // if (Component.render) {
  //   instance.render = Component.render;
  // }

  // template -> render
  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template);
    }
  }

  // template
  instance.render = Component.render;
}

let currentInstance = null;

export function getCurrentInstance() {
  return currentInstance;
}

export function setCurrentInstance(instance) {
  currentInstance = instance;
}

let compiler;

export function registerRuntimeCompiler(_compiler) {
  compiler = _compiler;
}
