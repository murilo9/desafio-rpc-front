import React, { useState } from 'react';
import Program, { ProgramData } from './Program';

interface ProgramListProps {
  list: ProgramData[]
}

const ProgramList: React.FC<ProgramListProps> = ({list}) => {
  return (
    <>
      {list.map(program => {
        return <Program data={program} />
      })}
    </>
  )
}

export default ProgramList