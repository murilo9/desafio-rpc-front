import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Program, { ProgramData } from './Program';
import styled from 'styled-components'

const Typography = styled(MuiTypography)`
  @media only screen and (max-width: 425px) {
    font-size: 16pt !important;
  }
`

const Box = styled(MuiBox)`
  margin-top: 16px;
  margin-bottom: 24px;
`

interface ProgramListProps {
  list: ProgramData[]
}

const ProgramList: React.FC<ProgramListProps> = ({list}) => {
  const getTime = (): string => {
    const date = new Date()
    const hours = date.getHours()
    const mins = date.getMinutes()
    return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`
  }

  const [time, setTime] = useState(getTime())

  const updateTime = () => {
    setTime(getTime())
  }

  useEffect(() => {
    setInterval(updateTime, 1000)
  }, [])

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Programação RPC
        </Typography>
        <Typography variant="h4">
          {time}
        </Typography>
      </Box>
      {list.map((program, p) => {
        return <Program data={program} index={p} key={program.media_id} />
      })}
    </>
  )
}

export default ProgramList