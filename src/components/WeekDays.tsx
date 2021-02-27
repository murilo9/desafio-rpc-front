import { Chip as MuiChip } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { DiasData } from './Program';
import styled from 'styled-components'

const Chip = styled(MuiChip)`
  margin-right: 4px;
  margin-bottom: 8px;
  @media only screen and (max-width: 425px) {
    margin-right: 6px;
    border-radius: 8px !important;
    .MuiChip-label {
      padding-left: 6px !important;
      padding-right: 6px !important;
    }
  }
`

interface WeekDaysProps {
  days: DiasData
}

const WeekDays: React.FC<WeekDaysProps> = ({days}) => {
  return (
    <>
      <Chip color={days.Dom ? 'primary' : 'default'} label="Dom" />
      <Chip color={days.Seg ? 'primary' : 'default'} label="Seg" />
      <Chip color={days.Ter ? 'primary' : 'default'} label="Ter" />
      <Chip color={days.Qua ? 'primary' : 'default'} label="Qua" />
      <Chip color={days.Qui ? 'primary' : 'default'} label="Qui" />
      <Chip color={days.Sex ? 'primary' : 'default'} label="Sex" />
      <Chip color={days.Sab ? 'primary' : 'default'} label="Sab" />
    </>
  )
}

export default WeekDays