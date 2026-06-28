import { useState, useEffect, useCallback } from "react";
import { getAndares, buscarVaga, ocuparVaga, liberarVaga } from "../services/api";

export function usePark() {
  const [andares,    setAndares]    = useState([]);
  const [andarAtivo, setAndarAtivo] = useState(1);
  const [resultado,  setResultado]  = useState(null);
  const [animando,   setAnimando]   = useState(false);
  const [visitados,  setVisitados]  = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [msg,        setMsg]        = useState(null);

  const flash = (texto, tipo = "ok") => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg(null), 3000);
  };

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getAndares();
      setAndares(data);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  // Roda BFS e anima a expansão
  const rodarBFS = async (id) => {
    setResultado(null); setVisitados([]); setAnimando(true);
    try {
      const { data } = await buscarVaga(id);
      setResultado(data);

      // Anima visita célula a célula
      for (let i = 0; i < data.ordemVisita.length; i++) {
        await new Promise(r => setTimeout(r, 18));
        setVisitados(data.ordemVisita.slice(0, i + 1));
      }
    } finally { setAnimando(false); }
  };

  const ocupar = async (andarId, row, col) => {
    await ocuparVaga(andarId, row, col);
    await carregar();
    flash("Vaga ocupada!");
    setResultado(null); setVisitados([]);
  };

  const liberar = async (andarId, row, col) => {
    await liberarVaga(andarId, row, col);
    await carregar();
    flash("Vaga liberada!", "warn");
    setResultado(null); setVisitados([]);
  };

  const andarData = andares.find(a => a.id === andarAtivo);

  return { andares, andarAtivo, setAndarAtivo, andarData, resultado, animando, visitados, loading, msg, rodarBFS, ocupar, liberar };
}
