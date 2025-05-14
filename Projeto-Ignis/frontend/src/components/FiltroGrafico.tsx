import React, { useState } from 'react';
import styled from 'styled-components';


interface FiltroGraficoProps {
  onFiltrar: (filtros: { tipo: string; escopo: string; dataInicio: string; dataFim: string }) => void;
}

const FiltroGrafico: React.FC<FiltroGraficoProps> = ({ onFiltrar }) => {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const tipos = ['foco_calor', 'area_queimada', 'risco_fogo'];
  const escopos = ['estados', 'biomas'];

  const aplicarFiltro = () => {
    onFiltrar({
      tipo: tipos[index1],
      escopo: escopos[index2],
      dataInicio,
      dataFim,
    });
  };

  return (
    <FiltroContainer>
      <Filtros>
        <ToggleLabels1>
          <span>Focos</span>
          <span>Área Queimada</span>
          <span>Risco Fogo</span>
        </ToggleLabels1>

        <SliderContainer onClick={() => setIndex1((index1 + 1) % tipos.length)}>
          <Slider1 style={{ backgroundColor: ['#FF5722', '#795548', '#FF9800'][index1] }}>
            <SliderThumb1 style={{ transform: `translateX(${index1 * 122}px)` }} />
          </Slider1>
        </SliderContainer>

        <ToggleLabels2>
          <span>Estados</span>
          <span>Biomas</span>
        </ToggleLabels2>

        <SliderContainer onClick={() => setIndex2((index2 + 1) % escopos.length)}>
          <Slider2 style={{ backgroundColor: ['#1976D2', '#388E3C'][index2] }}>
            <SliderThumb2 style={{ transform: `translateX(${index2 * 75}px)` }} />
          </Slider2>
        </SliderContainer>

        <Datas>
          <Label>Datas:</Label>
          <InputGroup>
            <InputContainer>
              <Label>Início</Label>
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label>Fim</Label>
              <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </InputContainer>
          </InputGroup>
        </Datas>

        <AplicarButton onClick={aplicarFiltro}>Aplicar</AplicarButton>
      </Filtros>
    </FiltroContainer>
  );
};

export default FiltroGrafico;

const FiltroContainer = styled.div`
  font-weight: bold;
  padding: 20px;
  background-color: #d32f2f;
  height: 83vh;
  width: 350px;
  border-radius: 0px 8px 8px 8px;
  z-index: 1;
  margin-top: 2%;
  position: fixed;
`;

const Filtros = styled.div`
  padding: 10px 0;
`;

const ToggleLabels1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  span {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
`;

const ToggleLabels2 = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  span {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
`;

const SliderContainer = styled.div`
  margin: 10px 0;
`;

const Slider1 = styled.div`
  position: relative;
  width: 345px;
  height: 24px;
  background-color: #ddd;
  border-radius: 12px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
`;

const Slider2 = styled.div`
  position: relative;
  width: 150px;
  height: 24px;
  background-color: #ddd;
  border-radius: 12px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
`;

const SliderThumb1 = styled.div`
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: #333;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
`;

const SliderThumb2 = styled.div`
  position: absolute;
  width: 75px;
  height: 20px;
  background-color: #333;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
`;

const Datas = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  display: block;
  margin-bottom: 5px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

const Input = styled.input`
  padding: 8px;
  width: 150px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;

const AplicarButton = styled.button`
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 150px;
  padding: 8px;
  background-color: #616161;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #388E3C;
  }
`;
