import React from "react";
import { usePark } from "../hooks/usePark";
import PainelAndares from "../components/PainelAndares";
import GridAndar from "../components/GridAndar";
import PainelBFS from "../components/PainelBFS";

export default function Dashboard() {
  const {
    andares, andarAtivo, setAndarAtivo, andarData,
    resultado, animando, visitados,
    loading, msg, rodarBFS, ocupar, liberar,
  } = usePark();

  const handleCelula = (r, c, tipo) => {
    if (animando) return;
    if (tipo === 2) ocupar(andarAtivo, r, c);
    if (tipo === 3) liberar(andarAtivo, r, c);
  };

  const caminho       = resultado?.caminho       || [];
  const vagaMaisProx  = resultado?.vagaMaisProxima || null;

  return (
    <div className="dashboard">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">🅿</span>
          <div>
            <h1>ParkFinder</h1>
            <p>Buscador inteligente de vagas · BFS O(V + E)</p>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "right" }}>
          <div>Algoritmo: Busca em Largura</div>
          <div>Garante a vaga mais próxima</div>
        </div>
      </header>

      {msg && <div className={`alert a-${msg.tipo}`}>{msg.texto}</div>}

      {/* Stats gerais */}
      <div className="stats-row">
        {andares.map(a => (
          <div key={a.id} className="stat-card" style={{ cursor: "pointer" }} onClick={() => setAndarAtivo(a.id)}>
            <div className="stat-label">{a.nome}</div>
            <div className={`stat-val ${a.vagas.livres === 0 ? "err" : a.vagas.livres <= 5 ? "warn" : "ok"}`}>
              {a.vagas.livres} vagas
            </div>
          </div>
        ))}
      </div>

      <PainelAndares andares={andares} andarAtivo={andarAtivo} onSelect={id => { setAndarAtivo(id); }} />

      <div className="main-grid">
        {/* Mapa do andar */}
        <div className="card">
          <div className="card-title" style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <span>🗺 {andarData?.nome} — clique na vaga para ocupar/liberar</span>
            <button
              className="btn-primary"
              onClick={() => rodarBFS(andarAtivo)}
              disabled={animando}
              style={{ fontSize: 12, padding: "7px 14px" }}
            >
              {animando ? "Buscando..." : "🔍 Buscar vaga mais próxima"}
            </button>
          </div>

          {/* Legenda */}
          <div className="legenda">
            {[
              { cor: "#dcfce7", borda: "#86efac", label: "L = Livre (clique para ocupar)" },
              { cor: "#fee2e2", borda: "#fca5a5", label: "O = Ocupada (clique para liberar)" },
              { cor: "#374151", borda: "#374151", label: "■ = Pilar / parede" },
              { cor: "#dbeafe", borda: "#93c5fd", label: "↵ = Entrada" },
              { cor: "#fbbf24", borda: "#f59e0b", label: "· = Caminho BFS" },
              { cor: "#16a34a", borda: "#16a34a", label: "★ = Vaga sugerida" },
            ].map(({ cor, borda, label }) => (
              <span key={label} className="legenda-item">
                <span style={{ width: 14, height: 14, background: cor, border: `1px solid ${borda}`, borderRadius: 3, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>

          {loading ? <p className="muted-msg">Carregando...</p> : andarData && (
            <GridAndar
              grid={andarData.grid}
              entrada={andarData.entrada}
              caminho={caminho}
              visitados={visitados}
              vagaMaisProxima={vagaMaisProx}
              onCelula={handleCelula}
            />
          )}
        </div>

        <PainelBFS resultado={resultado} animando={animando} />
      </div>
    </div>
  );
}
