// 这些代码是从 openlayers 简化过来的
/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties
 */
class Event {
  /**
   * @param {string} type Type.
   */
  constructor(type) {
    /**
     * The event type.
     * @type {string}
     * @api
     */
    this.type = type;

    /**
     * The event target.
     * @type {Object}
     * @api
     */
    this.target = null;
  }

}

/**
 * @classdesc
 * A extremely simplified implementation of the W3C DOM Level 2 EventTarget interface.
 */
class Target {
  constructor() {
    this.listeners_ = {};
  }

  /**
   * @param {string} type Type.
   * @param {Function} listener Listener.
   */
  addEventListener(type, listener) {
    let listeners = this.listeners_[type];
    if (!listeners) {
      listeners = this.listeners_[type] = [];
    }
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  }

  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   * @param {{type: string, target: (Target|undefined)}|Event|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(event) {
    const evt = typeof event === 'string' ? new Event(event) : event;
    const type = evt.type;
    evt.target = this;
    const listeners = this.listeners_[type];
    if (listeners) {
      for (let i = 0, ii = listeners.length; i < ii; ++i) {
        listeners[i].call(this, evt)
      }
    }
  }

  /**
   * @param {string} type Type.
   * @param {Function} listener Listener.
   */
  removeEventListener(type, listener) {
    const listeners = this.listeners_[type];
    if (listeners) {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
      if (listeners.length === 0) {
        delete this.listeners_[type];
      }
    }
  }
}
