import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const Connect: React.FC = () => {
    const { connectors, connect} = useConnect()
    const account = useAccount()
    const { disconnect } = useDisconnect()
   
    if(account.isConnected){
        return (
            <Card variant='outlined' sx={{p:1,mt:1, mb:1, display: 'flex', width: '100%', alignItems: 'center'}}>

                <Typography variant='caption'>Connected with <b>{account.connector?.name || 'no name'}</b></Typography>
                <Button variant='outlined' sx={{ml: 'auto', textTransform: 'lowercase'}} color='error' size='small' onClick={() => disconnect()}>Disconnect</Button>
            </Card>
        )
}
    return (
            <Card variant='outlined' sx={{ p: 1 }}>
                <Box sx={{display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'row'}}>
                    <Typography variant='caption'>Connect to a wallet to send assets</Typography>
                </Box>
                <Box>
                        {connectors.map((connector) => (
                            <Button
                                variant='contained'
                                size='small'
                                fullWidth

                                sx={{ mr: 1, mb: 1 }}
                                key={connector.uid}
                                onClick={() => connect({ connector })}
                                type="button"
                            >
                                {connector.name}

                            </Button>
                        ))}
                   {account.isConnected && <Button sx={{ml: 'auto'}} color='error' onClick={() => disconnect()}>Disconnect</Button>}
                </Box>
            </Card>
    )
}