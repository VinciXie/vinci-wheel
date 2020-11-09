/**
 * Promise 状态机的简单实现
 */

enum PromiseStatus {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

interface Listener {
  type: "then" | "catch" | "finally";
  cb(a?: any): any;
}


class Promise {
  #value: any;
  #error: any;

  #status: PromiseStatus;

  #listener: Listener[];

  /**
   * resolve
   */
  public resolve(a: any) {
    return new Promise((resolve) => {
      resolve(a);
    })
  }

  constructor(executor) {
    this.#value;
    this.#status = PromiseStatus.pending;
    this.#listener = [];
    const __this = this;
    function resolve(value) {
      console.log("__this.status 1", __this.#status);
      __this.#status = PromiseStatus.fulfilled;
      __this.#value = value;
      __this.#listener.forEach((ele) => {
        if (ele.type === "then") {
          __this.#value = ele.cb(value);
        } else if (ele.type === "finally") {
          ele.cb();
        }
      });
      console.log("__this.status 2", __this.#status);
    }
    function reject(params) {
      __this.#status = PromiseStatus.rejected;
    }
    executor(resolve, reject);
  }

  then(cb) {
    if (this.#status === PromiseStatus.pending) {
      this.#listener.push({
        type: "then",
        cb,
      });
    } else if (this.#status === PromiseStatus.rejected) {
      cb(this.#value);
    }
    return this;
  }

  catch(cb) {
    if (this.#status === PromiseStatus.pending) {
      this.#listener.push({
        type: "catch",
        cb,
      });
    } else if (this.#status === PromiseStatus.fulfilled) {
      cb(this.#error);
    }
    return this;
  }
}

const p = new Promise(function (resolve, reject) {
  window.setTimeout(function () {
    resolve(1);
  }, 3000);
});

p.then(console.log);
