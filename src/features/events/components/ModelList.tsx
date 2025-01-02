"use client";

import { ModelCard } from "@/src/features/events/components/ModelCard";
import { Model } from "@/types";

type Props = {
  date: string;
  models: Model[];
};

export function ModelList({ date, models }: Props) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        backgroundColor: "#FFF7FB",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "0.5rem",
          color: "#FF6F91",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        {date}開催
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {models.map((model) => (
          <li
            key={model.id}
            style={{
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            <ModelCard model={model} />
          </li>
        ))}
      </ul>
    </div>
  );
}
