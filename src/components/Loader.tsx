import { CircularProgress, Typography as MuiTypography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Typography = styled(MuiTypography)`
  margin-left: 16px;
`

const Loader: React.FC = () => {
  return (
    <Container>
      <CircularProgress />
      <Typography>Carregando...</Typography>
    </Container>
  )
}

export default Loader