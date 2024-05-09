import { useAccount } from 'wagmi'

import { Connect } from './Connect'
import { ChainInfo } from './ChainInfo'
import { SendSteps } from './SendSteps'
import { Box, LinearProgress, Typography } from '@mui/material'

function App() {
  const account = useAccount()
  return (
    <Box sx={{width: '400px'}}>
      <Connect />
      <ChainInfo />
      {account.isConnected && <SendSteps />}
      {account.isReconnecting && <Typography>Reconnecting</Typography>}
      {account.isConnecting && <LinearProgress/>}
    </Box>
  )
}

export default App
