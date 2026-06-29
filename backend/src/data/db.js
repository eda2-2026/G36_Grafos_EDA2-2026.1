// Tipos de célula
// 0 = corredor livre
// 1 = pilar / parede
// 2 = vaga livre
// 3 = vaga ocupada
// 4 = entrada/rampa

// Grid 12 colunas x 10 linhas por andar
// Corredores centrais horizontais, vagas nas laterais

function criarAndar(vagasOcupadas) {
  // Template base de um andar de shopping
  // Pilares nas extremidades, corredores no meio, vagas nas laterais
  const G = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  // Marca vagas como ocupadas
  vagasOcupadas.forEach(([r, c]) => { if (G[r][c] === 2) G[r][c] = 3; });
  return G;
}

// Andares com diferentes taxas de ocupação
const andares = [
  {
    id: 1,
    nome: "Térreo",
    entrada: [3, 1],   // posição da rampa de entrada
    grid: criarAndar([
      [1,1],[1,2],[1,3],[1,4],[2,1],[2,2],
      [4,1],[4,2],[4,3],[5,1],[5,4],
      [7,1],[7,2],[7,7],[7,8],[8,1],[8,8]
    ]),
  },
  {
    id: 2,
    nome: "1º Andar",
    entrada: [3, 1],
    grid: criarAndar([
      [1,1],[1,2],[1,3],[1,4],[1,5],[2,1],[2,2],[2,3],[2,4],[2,5],
      [4,1],[4,2],[4,3],[4,4],[4,5],[5,1],[5,2],[5,3],[5,4],[5,5],
      [7,7],[7,8],[7,9],[7,10],[8,7],[8,8],[8,9],[8,10],
    ]),
  },
  {
    id: 3,
    nome: "2º Andar",
    entrada: [3, 1],
    grid: criarAndar([
      [1,1],[1,2],[1,3],[2,1],[2,2],
      [4,1],[4,2],[5,1],
      [7,8],[8,8],
    ]),
  },
  {
    id: 4,
    nome: "3º Andar",
    entrada: [3, 1],
    grid: criarAndar([]), // quase vazio
  },
];

// Marca a entrada no grid de cada andar
andares.forEach(a => {
  const [r, c] = a.entrada;
  a.grid[r][c] = 4;
});

module.exports = { andares };
