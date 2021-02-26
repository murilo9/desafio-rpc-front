import React, { ReactNode } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Chip, Container, Grid } from '@material-ui/core';

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

const Program: React.FC<ProgramProps> = ({data}) => {

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
    <Accordion key={id()}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default Program