import { Box, Container as MuiContainer, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader';
import { ProgramData } from './components/Program';
import ProgramList from './components/ProgramList';
import { ProgramService } from './services/program-service';
import styled from 'styled-components'

const Container = styled(MuiContainer)`
  @media only screen and (max-width: 425px) {
    padding: 0 !important;
  }
`

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState<ProgramData[]>([])
  const [error, setError] = useState(false)

  const loadPrograms = useCallback(async () => {
    try{
      const programs = await ProgramService.load()
      setPrograms(programs)
      setLoading(false)
    }
    catch(e) {
      setLoading(false)
      setError(true)
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
          error ?
          <Box textAlign="center">
            <Typography>Houve um erro ao carregar a grade. Tente novamente.</Typography>
          </Box>
          :
          <ProgramList list={programs} />
        }
      </Container>
    </div>
  );
}

export default App;
