import { supabase } from "@/lib/supabase";
import ModelList from "@/src/features/events/components/ModelList";
import { EventRecord } from "@/types";
import { groupByDate } from "@/utils/groupByDate";

export default async function Page() {
  // 1. イベントデータを取得
  const { data: events, error } = await supabase
    .from("events")
    .select(
      `
        date,
        models (
          id,
          name,
          image_url
        )
      `
    )
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error);
    return <p>データ取得に失敗しました。</p>;
  }

  if (!events || events.length === 0) {
    console.log("No data found.");
    return <p>データがありません。</p>;
  }

  // 2. 日付ごとにグルーピング
  const groupedByDate = groupByDate(events as EventRecord[]);

  // 3. 日付ごとにモデルを表示する
  return (
    <div style={{ padding: "2rem" }}>
      <h1>開催日ごとのモデル一覧</h1>
      {Object.entries(groupedByDate).map(([date, models]) =>
        <ModelList key={date} date={date} models={models} />
      )}
    </div>
  );
}
