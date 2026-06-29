# ParkFinder — Buscador de Vagas em Estacionamento

## Grupo

| Matrícula  | Aluno                              |
| ---------- | ---------------------------------- |
| 231026616  | Davi Emanuel Ribeiro de Oliveira   |

## Sobre

Aplicação web de busca inteligente de vagas em estacionamento de shopping que utiliza o algoritmo **BFS (Busca em Largura)** para encontrar a vaga livre mais próxima da entrada. O sistema modela cada andar do estacionamento como um grafo não direcionado em grid, onde corredores são arestas e células são nós. O BFS garante a vaga ótima em O(V + E) expandindo por camadas a partir da rampa de entrada.

## ⚡ Quick Start

```bash
# Terminal 1: Backend
cd parkfinder/backend
npm install
npm run dev

# Terminal 2: Frontend
cd parkfinder/frontend
npm install
npm start
```

Acesse: **`http://localhost:3000`** 🎉

## Tecnologias Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** React 18
- **APIs:** RESTful
- **Algoritmo:** BFS (Busca em Largura)

## Funcionalidades

- 🅿 **4 andares simulados:** Térreo, 1º, 2º e 3º andar com diferentes taxas de ocupação
- 🔍 **BFS animado:** Expansão célula a célula visível no grid em tempo real
- ★ **Vaga mais próxima:** BFS garante a menor distância em passos da entrada
- 📊 **Ranking de vagas:** Lista todas as vagas livres ordenadas por distância
- 🟩 **Ocupar vaga:** Clique numa vaga livre para marcar como ocupada
- 🟥 **Liberar vaga:** Clique numa vaga ocupada para liberar
- 📈 **Painel de andares:** Barra de ocupação por andar com status verde/amarelo/vermelho

## Estrutura do Projeto

```
parkfinder/
├── backend/
│   ├── src/
│   │   ├── server.js                        # API Express
│   │   ├── data/
│   │   │   └── db.js                        # Grids dos 4 andares (dados mockados)
│   │   ├── controllers/
│   │   │   ├── bfsController.js             # Algoritmo BFS + reconstrução de caminho
│   │   │   └── estacionamentoController.js  # CRUD de vagas
│   │   └── routes/
│   │       └── api.js                       # Rotas REST
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js / App.css
    │   ├── index.js
    │   ├── services/
    │   │   └── api.js                       # Chamadas axios ao backend
    │   ├── hooks/
    │   │   └── usePark.js                   # Hook com animação BFS
    │   ├── components/
    │   │   ├── GridAndar.jsx                # Grid visual do andar
    │   │   ├── PainelAndares.jsx            # Cards dos 4 andares
    │   │   └── PainelBFS.jsx               # Resultado do algoritmo
    │   └── pages/
    │       └── Dashboard.jsx               # Página principal
    └── package.json
```

## Pré-requisitos

- Node.js 14.0+
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/parkfinder.git
   cd parkfinder
   ```

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

3. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Como Usar

### Passo 1: Iniciar o Backend (Terminal 1)
```bash
cd backend
npm run dev
```
✅ Backend rodará em: **`http://localhost:3001`**

### Passo 2: Iniciar o Frontend (Terminal 2)
```bash
cd frontend
npm start
```
✅ Frontend rodará em: **`http://localhost:3000`**

## API Endpoints

| Método | Endpoint                      | Descrição                                      |
| ------ | ----------------------------- | ---------------------------------------------- |
| GET    | `/api/andares`                | Lista todos os andares com resumo de vagas     |
| GET    | `/api/andares/:id/buscar`     | Roda BFS no andar e retorna vaga mais próxima  |
| POST   | `/api/andares/:id/ocupar`     | Ocupa uma vaga `{ row, col }`                  |
| POST   | `/api/andares/:id/liberar`    | Libera uma vaga `{ row, col }`                 |

### Exemplo de Requisição

```bash
# Buscar vaga mais próxima no Térreo (andar 1)
curl http://localhost:3001/api/andares/1/buscar

# Ocupar vaga na linha 2, coluna 3 do andar 1
curl -X POST http://localhost:3001/api/andares/1/ocupar \
  -H "Content-Type: application/json" \
  -d '{ "row": 2, "col": 3 }'

# Liberar vaga
curl -X POST http://localhost:3001/api/andares/1/liberar \
  -H "Content-Type: application/json" \
  -d '{ "row": 2, "col": 3 }'
```

## Modelagem do Problema

### Grid como Grafo Não Direcionado

Cada andar é modelado como um grid 12×10. Cada célula é um **nó** do grafo. Células vizinhas (cima, baixo, esquerda, direita) têm **arestas** entre si. O grafo é **não direcionado** pois os corredores permitem movimento nos dois sentidos — vagas ficam tanto à esquerda quanto à direita dos corredores.

Tipos de célula:

| Valor | Tipo        | Descrição                        |
| ----- | ----------- | -------------------------------- |
| 0     | Corredor    | Pode ser percorrido              |
| 1     | Pilar/parede| Bloqueado — sem aresta           |
| 2     | Vaga livre  | Destino do BFS                   |
| 3     | Vaga ocupada| Bloqueado — tratado como parede  |
| 4     | Entrada     | Origem do BFS                    |

## Algoritmo BFS

- **Complexidade:** O(V + E) — linear no tamanho do grid
- **Origem:** Rampa de entrada do andar
- **Destino:** Primeira vaga livre encontrada
- **Garantia:** Como todas as arestas têm peso uniforme (1 passo), o BFS garante o caminho de menor distância

```
1. Coloca a entrada na fila
2. Marca como visitado
3. Para cada célula retirada da fila:
   - Se for vaga livre → encontrou a mais próxima, para
   - Para cada vizinho (4 direções):
     - Se não visitado e não bloqueado → adiciona na fila
4. Reconstrói o caminho seguindo os nós "pai" de volta à entrada
```

### Por que BFS e não DFS?

O DFS exploraria fundo em um corredor antes de verificar os outros, podendo encontrar uma vaga distante antes de ver uma próxima da entrada. O BFS expande **por camadas** — garante que a primeira vaga encontrada é necessariamente a de menor distância.

---

<p align="center">
  <b>231026616 — Davi Emanuel Ribeiro de Oliveira</b>
</p>
