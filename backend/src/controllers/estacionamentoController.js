const { andares } = require("../data/db");
const { bfs, contarVagas } = require("./bfsController");

// Lista todos os andares com resumo de vagas
function listarAndares(req, res) {
  const resumo = andares.map(a => ({
    id:     a.id,
    nome:   a.nome,
    entrada: a.entrada,
    grid:   a.grid,
    vagas:  contarVagas(a.grid),
  }));
  res.json(resumo);
}

// Roda BFS em um andar específico
function buscarVaga(req, res) {
  const id    = Number(req.params.id);
  const andar = andares.find(a => a.id === id);
  if (!andar) return res.status(404).json({ erro: "Andar não encontrado." });

  const resultado = bfs(andar.grid, andar.entrada);
  res.json({
    andarId:  andar.id,
    andarNome: andar.nome,
    entrada:  andar.entrada,
    ...resultado,
    vagas: contarVagas(andar.grid),
  });
}

// Ocupa uma vaga (cliente estacionou)
function ocuparVaga(req, res) {
  const id    = Number(req.params.id);
  const { row, col } = req.body;
  const andar = andares.find(a => a.id === id);
  if (!andar) return res.status(404).json({ erro: "Andar não encontrado." });
  if (andar.grid[row][col] !== 2)
    return res.status(400).json({ erro: "Esta célula não é uma vaga livre." });

  andar.grid[row][col] = 3;
  res.json({ mensagem: "Vaga ocupada.", vagas: contarVagas(andar.grid) });
}

// Libera uma vaga (cliente saiu)
function liberarVaga(req, res) {
  const id    = Number(req.params.id);
  const { row, col } = req.body;
  const andar = andares.find(a => a.id === id);
  if (!andar) return res.status(404).json({ erro: "Andar não encontrado." });
  if (andar.grid[row][col] !== 3)
    return res.status(400).json({ erro: "Esta célula não é uma vaga ocupada." });

  andar.grid[row][col] = 2;
  res.json({ mensagem: "Vaga liberada.", vagas: contarVagas(andar.grid) });
}

module.exports = { listarAndares, buscarVaga, ocuparVaga, liberarVaga };
