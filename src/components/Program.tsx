import React from 'react';

interface ProgramProps {
  data: ProgramData
}

export interface DiasData {
  Dom: boolean
  Seg: boolean
  Ter: boolean
  Qua: boolean
  Qui: boolean
  Sex: boolean
  Sab: boolean
}

export interface ProgramData {
  title: string
  description: string
  start_time: number
  end_time: number
  human_start_time: string
  human_end_time: string
  duration_in_minutes: number
  custom_info: {
    Classificacao: {Idade: string},
    Dias: DiasData,
    Genero: {
      Descricao: string
    }
  }
}

const Program: React.FC<ProgramProps> = ({data}) => {
  return <p>Programa</p>
}

export default Program