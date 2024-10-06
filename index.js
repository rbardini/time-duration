const durationRegex = /^P[A-Z0-9\.]+$/

export class TimeDuration extends HTMLElement {
  static register(tagName = 'time-duration') {
    customElements.define(tagName, TimeDuration)
  }

  async connectedCallback() {
    const el = this.firstElementChild
    const options = this.dataset
    const value = (el.dateTime || el.textContent)?.trim()
    const lang = el.closest('[lang]')?.lang

    const duration = durationRegex.test(value)
      ? this.#getDurationFromDurationString(value)
      : this.#getDurationFromDateTimeString(value, options)

    el.textContent = duration.toLocaleString(lang, options)
    el.dateTime = duration.toString()
  }

  #getDurationFromDurationString(duration) {
    return Temporal.Duration.from(duration)
  }

  #getDurationFromDateTimeString(dateTime, options) {
    const [from, to] = [
      Temporal.PlainDateTime.from(dateTime),
      Temporal.PlainDateTime.from(options.refDatetime || Temporal.Now.plainDateTimeISO()),
    ].sort(Temporal.PlainDateTime.compare)
    return from.until(to, options)
  }
}
