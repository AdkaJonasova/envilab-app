import { transform } from "ol/proj";

export function transformProjections(data, source, target) {
  return transform(data, source, target);
}
