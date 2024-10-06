if (!('Temporal' in window) || !Temporal.Duration || !Temporal.Now || !Temporal.PlainDateTime) {
  await import('https://esm.sh/v135/temporal-polyfill@0.2.5/global')
}

if (!('Intl' in window) || !Intl.DurationFormat) {
  await import('https://esm.sh/v135/@formatjs/intl-durationformat@0.2.4/polyfill-force')
}
