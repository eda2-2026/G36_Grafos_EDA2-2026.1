import React from "react";

export default function PainelAndares({ andares, andarAtivo, onSelect }) {
  return (
    <div className="card">
      <div className="card-title">🅿 Andares do Shopping</div>
      <div className="andares-grid">
        {andares.map(a => {
          const pct = a.vagas.total > 0 ? Math.round((a.vagas.ocupadas / a.vagas.total) * 100) : 0;
          const status = pct >= 90 ? "lotado" : pct >= 60 ? "cheio" : "livre";
          return (
            <div
              key={a.id}
              className={`andar-card andar-${status} ${andarAtivo === a.id ? "andar-ativo" : ""}`}
              onClick={() => onSelect(a.id)}
            >
              <div className="andar-nome">{a.nome}</div>
              <div className="andar-vagas">
                <span className="vagas-livres">{a.vagas.livres} livres</span>
                <span className="vagas-sep">/</span>
                <span className="vagas-total">{a.vagas.total} total</span>
              </div>
              <div className="barra-wrap">
                <div className="barra-fill" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#22c55e" }} />
              </div>
              <div className={`andar-status status-${status}`}>
                {status === "lotado" ? "🔴 Lotado" : status === "cheio" ? "🟡 Cheio" : "🟢 Disponível"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
