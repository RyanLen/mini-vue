export type EffectScheduler = (...args: any[]) => any;

export interface ReactiveEffectOptions {
  scheduler?: EffectScheduler;
  onStop?: () => void;
}

export declare function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner;

export declare function stop(runner: ReactiveEffectRunner): void;

export declare class ReactiveEffect<T = any> {
  fn: () => T;
  scheduler: EffectScheduler | null;
  active: boolean;
  deps: Dep[];
  parent: ReactiveEffect | undefined;
  /* removed internal: computed */
  /* removed internal: allowRecurse */
  /* removed internal: deferStop */
  onStop?: () => void;
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
  constructor(
    fn: () => T,
    scheduler?: EffectScheduler | null,
    scope?: EffectScope
  );
  run(): T | undefined;
  stop(): void;
}

export interface ReactiveEffectRunner<T = any> {
  (): T;
  effect: ReactiveEffect;
}
