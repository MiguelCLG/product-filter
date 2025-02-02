import { Metric } from "web-vitals";

const reportWebVitals = (onPerfEntry?: Metric) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => onPerfEntry(metric));
      onINP((metric) => onPerfEntry(metric));
      onFCP((metric) => onPerfEntry(metric));
      onLCP((metric) => onPerfEntry(metric));
      onTTFB((metric) => onPerfEntry(metric));
    });
  }
};

export default reportWebVitals;
