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
          image_url,
          x_url
        )
      `
    )
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#FF6F91" }}>
        <p>データ取得に失敗しました。</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    console.log("No data found.");
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#FF6F91" }}>
        <p>データがありません。</p>
      </div>
    );
  }

  // 2. 日付ごとにグルーピング
  const groupedByDate = groupByDate(events as EventRecord[]);

  // 3. 日付ごとにモデルを表示
  return (
    <div
      style={{
        backgroundColor: "#FFE9EE", // ほんのりピンク
        padding: "2rem",
        borderRadius: "12px",
        fontFamily: "'Comic Sans MS', cursive, sans-serif", // ゆるっとカワイイ雰囲気
        maxWidth: "800px",
        margin: "2rem auto",
        color: "#555"
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#FF69B4",
          marginBottom: "1.5rem"
        }}
      >
        ＊開催日ごとのモデル一覧＊
      </h1>
      {Object.entries(groupedByDate).map(([date, models]) =>
        <ModelList key={date} date={date} models={models} />
      )}
    </div>
  );
}
