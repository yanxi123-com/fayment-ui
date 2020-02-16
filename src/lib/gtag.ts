const tagId = "UA-100604-14";

export function trackPageview(path: string) {
  (window as any).gtag("config", tagId, {
    page_path: path
  });
}

export function trackEvent(action: string, opts?: Object) {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events

  if (opts) {
    (window as any).gtag("event", action, opts);
  } else {
    (window as any).gtag("event", action);
  }
}
