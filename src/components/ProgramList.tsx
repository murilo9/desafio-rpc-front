import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Program, { ProgramData } from './Program';

interface ProgramListProps {
  list: ProgramData[]
}

const ProgramList: React.FC<ProgramListProps> = ({list}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Programação RPC
      </Typography>
      {list.map(program => {
        return <Program data={program} />
      })}
    </>
  )
}

export default ProgramList