import React, { useState } from 'react';
import FiltroGrafico from './FiltroGrafico';
import Grafico from './Grafico';

interface FiltrosGrafico {
  tipo: 'foco_calor' | 'area_queimada' | 'risco_fogo';
  escopo: 'estados' | 'biomas';
  dataInicio: string;
  dataFim: string;
}

const GraficoPage: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscarDadosFiltrados = async (filtros: FiltrosGrafico) => {
    if (!filtros.dataInicio || !filtros.dataFim) {
      setErro('Por favor, selecione datas válidas.');
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      const queryParams = new URLSearchParams(filtros as any).toString();
      const response = await fetch(`http://localhost:3001/api/grafico?${queryParams}`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data = await response.json();
      setDados(data);
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <FiltroGrafico onFiltrar={buscarDadosFiltrados} />
      {carregando && <p style={{ color: 'blue' }}>🔄 Carregando...</p>}
      {erro && <p style={{ color: 'red' }}>⚠ {erro}</p>}
      <Grafico dados={dados} />
    </>
  );
};

export default GraficoPage;
