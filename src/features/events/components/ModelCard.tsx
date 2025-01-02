import { Model } from "@/types";

type Props = {
  model: Model;
};

export function ModelCard({ model }: Props) {
  const CardContent = () => (
    <>
      {model.image_url && (
        <img
          src={model.image_url}
          alt={model.name}
          style={{
            width: "128px",
            height: "128px",
            objectFit: "cover",
            borderRadius: "50%",
            marginBottom: "0.5rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      )}
      <span
        style={{
          color: "#FF69B4",
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        {model.name}
      </span>
    </>
  );

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textDecoration: "none",
  };

  return model.x_url ? (
    <a
      href={model.x_url}
      target="_blank"
      rel="noopener noreferrer"
      style={containerStyle}
    >
      <CardContent />
    </a>
  ) : (
    <div style={containerStyle}>
      <CardContent />
    </div>
  );
}
