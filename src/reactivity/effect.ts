import { extend } from "../shared";
import { ReactiveEffectRunner } from "./reactivity";

let activeEffect;
let shouldTrack;

export class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;

  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    // 1. 会收集依赖
    // shouldTrack 区分
    if (!this.active) {
      return this._fn();
    }

    shouldTrack = true;
    activeEffect = this;

    const result = this._fn();
    // reset
    shouldTrack = false;

    return result;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: Set<ReactiveEffect>) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

export function effect(fn, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler);

  // options
  // _effect.onStop = options.onStop;
  // Object.assign(_effect, options);
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop();
}

const targetMap: Map<Object, Map<string, Set<ReactiveEffect>>> = new Map();
export function track(target, key) {
  // if (!activeEffect) return;
  // if (!shouldTrack) return;
  if (!isTracking()) return;

  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  trackEffects(dep);
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;

  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (!dep) return;

  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
