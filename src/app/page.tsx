// app/page.tsx or app/someServerComponent.tsx

import { createClient } from "@supabase/supabase-js";

// モデルの型定義（任意）
type Model = {
  id: string;
  name: string;
  image_url?: string;
};

// Supabase が返す events テーブルの型（必要に応じて拡張可）
type EventRecord = {
  date: string;
  models: Model[] | Model; // リレーション設定によっては配列かオブジェクト
};

export default async function Page() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 1. イベントデータを取得
  //   ※ リレーション設定済みなら、.select("date, models (*)") などでOK
  //   ※ されていないなら JOIN 相当のクエリで別テーブルを結合する必要あり
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

  // 2. 取得したデータを日付ごとにグルーピング
  //    events はこんなイメージ:
  //    [
  //      { date: '2025-01-04', models: [{id:'...', name:'...', ...}, ...] },
  //      { date: '2025-01-05', models: {...} }, ...
  //    ]
  const groupedByDate = events.reduce<
    Record<string, Model[]>
  >((acc, event: EventRecord) => {
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

  console.log("Grouped by date:", groupedByDate);

  // 3. 日付ごとにモデルを表示するビューパート
  return (
    <div style={{ padding: "2rem" }}>
      <h1>開催日ごとのモデル一覧</h1>
      {Object.entries(groupedByDate).map(([date, models]) =>
        <div key={date} style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>
            {date}
          </h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {models.map(model =>
              <li key={model.id} style={{ marginBottom: "1rem" }}>
                {/* 画像がある場合のみ表示 */}
                {model.image_url &&
                  <img
                    src={model.image_url}
                    alt={model.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: "1rem"
                    }}
                  />}
                <span style={{ verticalAlign: "middle" }}>
                  {model.name}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
