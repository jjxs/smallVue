let currentEffect;

class Dep {
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }
  get value() {
    return this._val;
  }

  set value(value) {
    this._val = value;
    this.notice();
  }

  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 触发之前收集到的依赖
  notice() {
    this.effects.forEach((item) => {
      item();
    });
  }
}
const dep = new Dep();

export function effectWatch(effect) {
  currentEffect = effect;
  effect();
  dep.depend();
  currentEffect = null;
}

const targetMap = new Map();

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice(result);
    },
  });
}