// BFS no grid do estacionamento
// Tipos: 0=corredor, 1=parede/pilar, 2=vaga livre, 3=vaga ocupada, 4=entrada
// Pode andar em: 0 (corredor) e 2 (vaga livre — destino)
// Não pode andar em: 1 (parede), 3 (vaga ocupada)

const DIRS = [[-1,0],[1,0],[0,-1],[0,1]]; // cima, baixo, esquerda, direita

function bfs(grid, entrada) {
  const linhas = grid.length;
  const cols   = grid[0].length;
  const [sr, sc] = entrada;

  const visitado  = Array.from({ length: linhas }, () => new Array(cols).fill(false));
  const anterior  = Array.from({ length: linhas }, () => new Array(cols).fill(null));
  const distancia = Array.from({ length: linhas }, () => new Array(cols).fill(-1));
  const ordemVisita = []; // para animação no frontend

  const fila = [[sr, sc]];
  visitado[sr][sc] = true;
  distancia[sr][sc] = 0;

  let vagaMaisProxima = null;
  const todasVagas = [];

  while (fila.length > 0) {
    const [r, c] = fila.shift();
    ordemVisita.push([r, c]);

    // Encontrou vaga livre
    if (grid[r][c] === 2) {
      todasVagas.push({ pos: [r, c], distancia: distancia[r][c] });

      // Primeira vaga encontrada = mais próxima (BFS garante isso)
      if (!vagaMaisProxima) {
        vagaMaisProxima = { pos: [r, c], distancia: distancia[r][c] };
      }
    }

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= linhas || nc < 0 || nc >= cols) continue;
      if (visitado[nr][nc]) continue;
      if (grid[nr][nc] === 1 || grid[nr][nc] === 3) continue; // parede ou ocupada

      visitado[nr][nc] = true;
      distancia[nr][nc] = distancia[r][c] + 1;
      anterior[nr][nc] = [r, c];
      fila.push([nr, nc]);
    }
  }

  // Reconstrói o caminho da entrada até a vaga mais próxima
  let caminho = [];
  if (vagaMaisProxima) {
    let cur = vagaMaisProxima.pos;
    while (cur) {
      caminho.unshift(cur);
      cur = anterior[cur[0]][cur[1]];
    }
  }

  return {
    vagaMaisProxima,
    todasVagas: todasVagas.sort((a, b) => a.distancia - b.distancia),
    caminho,
    ordemVisita,
    totalVisitadas: ordemVisita.length,
  };
}

// Conta vagas livres no grid
function contarVagas(grid) {
  let livres = 0, ocupadas = 0;
  grid.forEach(row => row.forEach(c => {
    if (c === 2) livres++;
    if (c === 3) ocupadas++;
  }));
  return { livres, ocupadas, total: livres + ocupadas };
}

module.exports = { bfs, contarVagas };
