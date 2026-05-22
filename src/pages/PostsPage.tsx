import { FileText, Clock } from "lucide-react";

export function PostsPage() {
  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-5xl w-full space-y-10 md:space-y-12">
        {/* Título */}
        <div className="text-center">
          <h2
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
            }}
          >
            Publicações
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#888888] mx-auto mt-4 md:mt-6"></div>
          <p
            className="text-[#888888]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              marginTop: "16px",
            }}
          >
            Artigos, reflexões e atualizações jurídicas
          </p>
        </div>

        {/* Cards placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-sm border border-[#888888]/20"
              style={{ padding: "28px", opacity: 0.45 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="rounded-full bg-[#F2F2F2] flex items-center justify-center"
                  style={{ width: "36px", height: "36px" }}
                >
                  <FileText style={{ width: "16px", height: "16px", color: "#888888" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock style={{ width: "11px", height: "11px", color: "#888888" }} />
                  <span
                    className="text-[#888888]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                    }}
                  >
                    Em breve
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  className="bg-[#F2F2F2] rounded-sm"
                  style={{ height: "14px", width: "75%" }}
                />
                <div
                  className="bg-[#F2F2F2] rounded-sm"
                  style={{ height: "11px", width: "100%" }}
                />
                <div
                  className="bg-[#F2F2F2] rounded-sm"
                  style={{ height: "11px", width: "85%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem */}
        <div className="text-center">
          <p
            className="text-[#888888] italic"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
            }}
          >
            Publicações em breve.
          </p>
        </div>
      </div>
    </div>
  );
}
