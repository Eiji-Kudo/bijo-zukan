"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. Supabaseクライアントの作成
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Type definitions
type Model = {
  id: string;
  name: string;
  image_url: string | null;
};

type Event = {
  id: string;
  date: string;
  models: Model[]; // <-- multiple models per event
};

export default function Home() {
  const [eventsByDate, setEventsByDate] = useState<Record<string, Model[]>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // 3. Fetch data from Supabase
    const fetchEvents = async () => {
      const { data: events, error } = await supabase
        .from("events")
        .select(
          `
          id,
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
        setErrorMessage("データ取得でエラーが発生しました。");
        console.error(error);
        return;
      }

      if (!events || events.length === 0) {
        setErrorMessage("データが見つかりませんでした。");
        return;
      }

      // Optional: See exactly what shape Supabase is returning
      console.log("Events from Supabase:", events);

      // 4. Group by date
      const grouped = events.reduce<
        Record<string, Model[]>
      >((acc, event: Event) => {
        if (!acc[event.date]) {
          acc[event.date] = [];
        }
        // event.models is an array, so spread it
        acc[event.date].push(...event.models);
        return acc;
      }, {});

      setEventsByDate(grouped);
    };

    fetchEvents();
  }, []);

  // 5. Cute styling
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#FFF0F6",
    padding: "2rem",
    fontFamily: "cursive, sans-serif",
    minHeight: "100vh"
  };

  const headingStyle: React.CSSProperties = {
    color: "#FF66B3",
    textAlign: "center",
    marginBottom: "1rem"
  };

  const subHeadingStyle: React.CSSProperties = {
    color: "#FF66B3",
    margin: "1rem 0 0.5rem 0",
    borderBottom: "2px dashed #FFAFD2",
    display: "inline-block",
    paddingBottom: "0.25rem"
  };

  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0
  };

  const listItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(255, 102, 179, 0.1)",
    marginBottom: "1rem",
    padding: "1rem"
  };

  const nameStyle: React.CSSProperties = {
    margin: 0,
    fontWeight: "bold",
    color: "#FF66B3",
    fontSize: "1.1rem"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>開催日ごとのモデル一覧</h1>

      {errorMessage &&
        <p
          style={{
            color: "#D8000C",
            backgroundColor: "#FFBABA",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          {errorMessage}
        </p>}

      {!errorMessage &&
        Object.keys(eventsByDate).length === 0 &&
        <p style={{ textAlign: "center", color: "#999" }}>データがありません。</p>}

      {/* 開催日ごとに表示 */}
      {Object.entries(eventsByDate).map(([date, models]) =>
        <div key={date}>
          <h2 style={subHeadingStyle}>
            {date}
          </h2>
          <ul style={listStyle}>
            {models.map(model =>
              <li key={model.id} style={listItemStyle}>
                {model.image_url &&
                  <Image
                    src={model.image_url}
                    alt={model.name}
                    width={80}
                    height={80}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: "1rem"
                    }}
                  />}
                <p style={nameStyle}>
                  {model.name}
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
