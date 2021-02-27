import React, { ReactNode } from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Chip as MuiChip, Grid } from '@material-ui/core';
import styled from 'styled-components'
import WeekDays from './WeekDays';

const Accordion = styled(MuiAccordion)`
  &.bg-dark {
    background-color: #f5f5f5;
  }
`

const AccordionSummary = styled(MuiAccordionSummary)`
  padding-left: 8px !important;
`

const Chip = styled(MuiChip)`
  .MuiChip-label {
    margin: 8px 0;
  }
`

interface ProgramProps {
  data: ProgramData
  index: number
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
  media_id: number
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

const Program: React.FC<ProgramProps> = ({data, index}) => {

  const getReadableTime = (): string => {
    return data.human_start_time.substr(0, 5)
  }

  const id = (): number => {
    return data.media_id
  }

  const title = (): ReactNode => {
    return (
      <div>
        <Typography>{data.title}</Typography>
        <Typography color="textSecondary">{getReadableTime()}</Typography>
      </div>
    )
  }

  const nowString = (): string => {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    return hours.toString() + (minutes > 9 ? minutes : '0' + minutes).toString()
  }

  const isOnAir = (): boolean => {
    const now = parseInt(nowString())
    const start = parseInt(data.human_start_time.split('+')[0].substr(0, 5).split(':').join('')) +
    parseInt(data.human_start_time.split('+')[1].split(':').join(''))
    const end = parseInt(data.human_end_time.split('+')[0].substr(0, 5).split(':').join('')) +
    parseInt(data.human_end_time.split('+')[1].split(':').join(''))
    return start < now && end > now
  }

  const onAirBadge = (): ReactNode => {
    return  (
      <Grid item xs={3} sm={2} lg={1}>
        {isOnAir() ? <Chip color="secondary" label="No Ar"/> : null}
      </Grid>
    )
  }

  return (
    <Accordion className={index % 2 ? '' : 'bg-dark'}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container>
          { onAirBadge() }
          <Grid item xs={9} sm={10} lg={11}>
            {title()}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={3} sm={2} lg={1}></Grid>
          <Grid item xs={9} sm={10} lg={11}>
            <Typography>
              { data.description || null}
            </Typography>
            <p> </p>
            { 
              data.custom_info.Genero?.Descricao? 
              <Typography color="textSecondary">
                Gênero: { data.custom_info.Genero.Descricao }
              </Typography>
              : null
            }
            {
              data.custom_info.Classificacao?.Idade?
              <Typography color="textSecondary">
                Classificação: { 
                  isNaN(parseInt(data.custom_info.Classificacao.Idade)) ?
                  data.custom_info.Classificacao.Idade
                  : data.custom_info.Classificacao.Idade + ' anos'
                }
              </Typography>
              : null
            }
            <p> </p>
            <WeekDays days={data.custom_info.Dias} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default Program