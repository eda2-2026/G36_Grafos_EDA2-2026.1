import React from "react";

export default function PainelBFS({ resultado, animando }) {
  if (animando) return (
    <div className="card">
      <div className="card-title">🔍 BFS em execução...</div>
      <div className="bfs-loading">
        <div className="bfs-spinner" />
        <p>Expandindo células em ondas a partir da entrada...</p>
      </div>
    </div>
  );

  if (!resultado) return (
    <div className="card">
      <div className="card-title">🔍 BFS — Busca de vaga</div>
      <p className="muted-msg">Clique em "Buscar vaga mais próxima" para rodar o algoritmo.</p>
    </div>
  );

  const { vagaMaisProxima, todasVagas, caminho, totalVisitadas } = resultado;

  return (
    <div className="card">
      <div className="card-title">🔍 Resultado do BFS</div>

      {vagaMaisProxima ? (
        <>
          <div className="resultado-box">
            <div className="resultado-ico">★</div>
            <div>
              <div className="resultado-titulo">Vaga mais próxima encontrada!</div>
              <div className="resultado-sub">
                Posição: linha {vagaMaisProxima.pos[0] + 1}, coluna {vagaMaisProxima.pos[1] + 1}
              </div>
              <div className="resultado-sub">
                Distância: <strong>{vagaMaisProxima.distancia} passos</strong> da entrada
              </div>
            </div>
          </div>

          <div className="algo-stats">
            {[
              ["Células visitadas", totalVisitadas],
              ["Passos no caminho", caminho.length],
              ["Vagas encontradas", todasVagas.length],
              ["Complexidade", "O(V + E)"],
            ].map(([l, v]) => (
              <div key={l} className="algo-stat-item">
                <div className="algo-stat-label">{l}</div>
                <div className="algo-stat-val">{v}</div>
              </div>
            ))}
          </div>

          {todasVagas.length > 1 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", marginBottom: 8 }}>
                Todas as vagas por distância
              </div>
              <div className="vagas-lista">
                {todasVagas.slice(0, 8).map((v, i) => (
                  <div key={i} className={`vaga-item ${i === 0 ? "vaga-item-best" : ""}`}>
                    <span className="vaga-rank">{i + 1}º</span>
                    <span>L{v.pos[0]+1} C{v.pos[1]+1}</span>
                    <span className="vaga-dist">{v.distancia} passos</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="alert a-err">Nenhuma vaga livre neste andar. Tente outro andar.</div>
      )}
    </div>
  );
}
