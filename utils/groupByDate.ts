import { EventRecord, Model } from "@/types";

export function groupByDate(events: EventRecord[]) {
  return events.reduce<Record<string, Model[]>>((acc, event) => {
    const dateKey = event.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    // models が配列の場合（複数出演モデル）
    if (Array.isArray(event.models)) {
      acc[dateKey].push(...event.models);
    } else {
      // models がオブジェクト（1モデルしかない）なら配列に変換して push
      acc[dateKey].push(event.models);
    }
    return acc;
  }, {});
}
