import React from 'react';
import styled from 'styled-components';
import { Chart } from 'react-google-charts';

interface GraficoProps {
  dados: any[];
}

const Grafico: React.FC<GraficoProps> = ({ dados }) => {
  if (!dados || dados.length === 0) {
    return (
      <GraficoContainer>
        <Mensagem>Selecione um filtro para visualizar o gráfico.</Mensagem>
      </GraficoContainer>
    );
  }

  // Detecta o tipo com base nos campos retornados
  const tipo =
    'area_queimada' in dados[0]
      ? 'area_queimada'
      : 'frp' in dados[0]
      ? 'frp'
      : 'risco_fogo' in dados[0]
      ? 'risco_fogo'
      : 'valor';

  const chartData = [
    ['Data', tipo.toUpperCase()],
    ...dados.map((d) => [d.data || d.data_pas, Number(d[tipo])]),
  ];

  // Título e tipo de gráfico dinâmico
  const options = {
    title:
      tipo === 'area_queimada'
        ? 'Área Queimada (ha)'
        : tipo === 'frp'
        ? 'Potência Radiativa do Fogo (FRP MW)'
        : tipo === 'risco_fogo'
        ? 'Índice de Risco de Fogo'
        : 'Valor',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    hAxis: { title: 'Data' },
    vAxis: { title: 'Valor' },
  };

  const chartType =
    tipo === 'area_queimada'
      ? 'BarChart'
      : tipo === 'frp'
      ? 'ColumnChart'
      : 'LineChart';

  return (
    <GraficoContainer>
      <Chart chartType={chartType} width="100%" height="100%" data={chartData} options={options} />
    </GraficoContainer>
  );
};

export default Grafico;

const GraficoContainer = styled.div`
  width: 153vh;
  height: 90vh;
  padding: 20px;
  border-radius: 8px;
  background-color: gray;
  margin-left: 22%;
  margin-top: 0.5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Mensagem = styled.p`
  font-size: 2rem;
  color: white;
  font-weight: 600;
  text-align: center;
`;
