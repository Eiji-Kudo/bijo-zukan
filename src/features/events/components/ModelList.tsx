"use client";

import { Model } from "@/types";

type Props = {
  date: string;
  models: Model[];
};

export default function ModelList({ date, models }: Props) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
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
  );
}
