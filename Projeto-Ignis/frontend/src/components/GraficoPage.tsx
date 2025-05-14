import React, { useState } from 'react';
import FiltroGrafico from './FiltroGrafico';
import Grafico from './Grafico';

interface FiltrosGrafico {
  tipo: string;
  escopo: string;
  dataInicio: string;
  dataFim: string;
}

const GraficoPage: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscarDadosFiltrados = async (filtros: FiltrosGrafico) => {
    try {
      setCarregando(true);
      setErro(null);
      const queryParams = new URLSearchParams(filtros as any).toString();
      const response = await fetch(`http://localhost:3001/api/grafico?${queryParams}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do gráfico');
      const data = await response.json();
      console.log('Dados do banco recebidos:', data);
      setDados(data);
    } catch (error: any) {
      console.error('Erro ao buscar dados filtrados:', error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <FiltroGrafico onFiltrar={buscarDadosFiltrados} />
      {carregando && <p>Carregando dados...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <Grafico dados={dados} />
    </>
  );
};

export default GraficoPage;
