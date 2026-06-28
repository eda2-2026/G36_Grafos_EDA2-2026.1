import React from "react";

// 0=corredor, 1=parede, 2=livre, 3=ocupada, 4=entrada
const TIPOS = {
  0: { bg: "#f5f4f1", label: "" },
  1: { bg: "#374151", label: "■" },
  2: { bg: "#dcfce7", label: "L", cor: "#166534" },
  3: { bg: "#fee2e2", label: "O", cor: "#991b1b" },
  4: { bg: "#dbeafe", label: "↵", cor: "#1e40af" },
};

export default function GridAndar({ grid, entrada, caminho, visitados, vagaMaisProxima, onCelula }) {
  const caminhoSet  = new Set(caminho.map(([r,c]) => `${r},${c}`));
  const visitadoSet = new Set(visitados.map(([r,c]) => `${r},${c}`));
  const vagaKey     = vagaMaisProxima ? `${vagaMaisProxima.pos[0]},${vagaMaisProxima.pos[1]}` : null;
  const entradaKey  = `${entrada[0]},${entrada[1]}`;

  return (
    <div className="grid-wrap">
      {grid.map((row, r) => (
        <div key={r} className="grid-row">
          {row.map((tipo, c) => {
            const key = `${r},${c}`;
            const isEntrada  = key === entradaKey;
            const isVaga     = key === vagaKey;
            const isCaminho  = caminhoSet.has(key) && !isVaga && !isEntrada;
            const isVisitado = visitadoSet.has(key) && !isCaminho && !isVaga && !isEntrada;

            let bg  = TIPOS[tipo]?.bg  || "#fff";
            let cor = TIPOS[tipo]?.cor || "#999";
            let label = TIPOS[tipo]?.label || "";
            let extraClass = "";

            if (isVaga)     { bg = "#16a34a"; cor = "#fff"; label = "★"; extraClass = "cel-vaga"; }
            else if (isCaminho)  { bg = "#fbbf24"; cor = "#92400e"; label = "·"; }
            else if (isVisitado && tipo !== 1) { bg = "#bfdbfe"; }

            const clicavel = tipo === 2 || tipo === 3;

            return (
              <div
                key={c}
                className={`cel ${extraClass} ${clicavel ? "cel-click" : ""}`}
                style={{ background: bg, color: cor }}
                onClick={() => clicavel && onCelula(r, c, tipo)}
                title={
                  tipo === 2 ? "Vaga livre — clique para ocupar" :
                  tipo === 3 ? "Vaga ocupada — clique para liberar" :
                  tipo === 4 ? "Entrada" : ""
                }
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
