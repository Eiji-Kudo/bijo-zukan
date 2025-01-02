"use client";

import { Model } from "@/types";

type Props = {
  date: string;
  models: Model[];
};

export default function ModelList({ date, models }: Props) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        backgroundColor: "#FFF7FB", // ふわっとした薄いピンク
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h2
        style={{
          marginBottom: "0.5rem",
          color: "#FF6F91",
          fontSize: "1.5rem",
          textAlign: "center"
        }}
      >
        {date}開催
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {models.map(model =>
          <li
            key={model.id}
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center"
            }}
          >
            {model.image_url &&
              <img
                src={model.image_url}
                alt={model.name}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "1rem",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                }}
              />}
            <span
              style={{
                verticalAlign: "middle",
                color: "#FF69B4",
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}
            >
              {model.name}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
