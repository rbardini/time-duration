# @rbardini/time-duration

[![npm package version](https://img.shields.io/npm/v/@rbardini/time-duration)](https://www.npmjs.com/package/@rbardini/time-duration)
[![Build status](https://img.shields.io/github/actions/workflow/status/rbardini/time-duration/main.yml)](https://github.com/rbardini/time-duration/actions)

⏱️ A web component to format `<time>` elements with the elapsed time.

> [!IMPORTANT]
> This component depends on APIs with limited availability across major browsers as of Oct 2024. See [polyfilling](#polyfilling) for more information.

```html
<time-duration>
  <time datetime="2020-01-01">
    <!-- 👇 will be replaced with current duration, e.g. "4 yrs, 6 mths" -->
    Jan 1, 2020 – Present
  </time>
</time-duration>
```

[View demos →](https://time-duration.rbrd.in)

## Installation

### Via package manager

```console
npm install @rbardini/time-duration
```

```js
import '@rbardini/time-duration/register'
```

### Via `<script>` tag

[Download the latest release](https://github.com/rbardini/time-duration/releases) into your project and:

```html
<!-- host yourself -->
<script type="module" src="register.js"></script>
```

or embed from a third-party CDN (update version as needed; not recommended for production use):

```html
<!-- esm.sh CDN -->
<script type="module" src="https://esm.sh/@rbardini/time-duration@0.0.0/register"></script>
```

```html
<!-- UNPKG CDN -->
<script type="module" src="https://www.unpkg.com/@rbardini/time-duration@0.0.0/register.js"></script>
```

## Usage

`<time-duration>` must wrap a `<time>` element with either a [`datetime` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#datetime) or a [valid `datetime`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values) text content:

```html
<time-duration>
  <time datetime="2020-01-01">Jan 1, 2020 – Present</time>
</time-duration>

<!-- text content is used if no `datetime` attribute is defined -->
<time-duration>
  <time>2020-01-01</time>
</time-duration>
```

> [!NOTE]
> Durations are formatted once and not updated in real time.

The `datetime` attribute will also be set to a [duration string](https://en.wikipedia.org/wiki/ISO_8601#Durations) representing the elapsed time, if not one already.

### Options

| Attribute           | Description                                           | Example        | Default               |
| ------------------- | ----------------------------------------------------- | -------------- | --------------------- |
| `data-ref-datetime` | The reference date and time of the resulting duration | `"2030-01-01"` | Current date and time |

> [!NOTE]
> Durations are never assumed to be negative—if the reference date and time is earlier than the target date and time, the duration is calculated from the reference to the target, otherwise from the target to the reference.

Data attributes are also forwarded as options to datetime/duration method calls. For example, to set the duration's `largestUnit` and `smallestUnit`, as well as the formatting `style`, simply declare them as data attributes:

```html
<time-duration data-largest-unit="year" data-smallest-unit="month" data-style="long">
  <time datetime="2020-01-01">Years since Jan 1, 2020</time>
</time-duration>
```

See [`datetime.until()`](https://tc39.es/proposal-temporal/docs/plaindatetime.html#until) and [`duration.toLocaleString()`](https://tc39.es/proposal-temporal/docs/duration.html#toLocaleString) for more options.

## Polyfilling

`<time-duration>` relies on the [`Temporal`](https://tc39.es/proposal-temporal/docs/) and [`Intl.DurationFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat) APIs to work, which are not widely available yet. You may want to wait until browser support improves before using this component.

If you want to use it today, however, you must _polyfill_ these APIs. You can include the [`temporal-polyfill`](https://github.com/fullcalendar/temporal-polyfill) and [`@formatjs/intl-durationformat`](https://formatjs.io/docs/polyfills/intl-durationformat/) polyfills in your project, for example.

Optionally, `<time-duration>` can load these polyfills from esm.sh for you via the `polyfill+register` entry point (not recommended for production use):

```js
import '@rbardini/time-duration/polyfill+register'
```

or

```html
<script type="module" src="polyfill+register.js"></script>
```
