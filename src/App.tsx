import { Container as MuiContainer } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader';
import { ProgramData } from './components/Program';
import ProgramList from './components/ProgramList';
import { ProgramService } from './services/program-service';
import styled from 'styled-components'

const Container = styled(MuiContainer)`
  @media only screen and (max-width: 425px) {
    padding: 0;
  }
`

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState<ProgramData[]>([])

  const loadPrograms = useCallback(async () => {
    try{
      const programs = await ProgramService.load()
      setPrograms(programs)
      setLoading(false)
    }
    catch(e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    loadPrograms()
  }, [])

  return (
    <div className="App">
      <Container maxWidth="md">
        {
          loading ?
          <Loader />
          :
          <ProgramList list={programs} />
        }
      </Container>
    </div>
  );
}

export default App;
