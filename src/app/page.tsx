// 例: app/page.tsx (サーバーコンポーネント)
// or  クライアントコンポーネントなどから fetch してもOK
import { createClient } from "@supabase/supabase-js";

export default async function Page() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // ここでは「date」「models」の情報を取得
  // ※ Supabaseリレーション設定をしている場合:
  //    .select('date, models (id, name, image_url)') のように書ける
  //    していない場合: .select('*') などで実際のカラムに合わせて調整
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

  // まずは取得結果を確認
  console.log("Fetched Events:", events);

  // 日付ごとにグルーピングする (もし models が配列ならそのまま push できます)
  // ここでは .reduce() を使った例
  const eventsByDate = events.reduce<Record<string, any[]>>((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    // event.models がオブジェクトなら配列に変換する必要がある
    // もし最初から配列なら [...acc[date], ...event.models]
    if (Array.isArray(event.models)) {
      // 複数モデル
      acc[date].push(...event.models);
    } else {
      // 単一モデル
      acc[date].push(event.models);
    }

    return acc;
  }, {});

  console.log("Grouped by date:", eventsByDate);

  // この後は、必要に応じて JSX にして画面表示するなど
  return <p>データ取得＆グルーピングしました。コンソールを確認してください。</p>;
}
