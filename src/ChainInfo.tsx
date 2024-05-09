import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { useAccount } from 'wagmi';

export const ChainInfo: React.FC = () => {
    const account = useAccount()
    if (account.isConnected) {
        return (
            <Card variant='outlined' sx={{ p: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='caption'>Chain:</Typography>
                    <Typography variant='caption' sx={{ ml: 1 }}>{account.chain?.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='caption'>Address:</Typography>
                    <Typography variant='caption' sx={{ ml: 1 }}>{account.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='caption'>Status: </Typography>
                    <Typography variant='caption' sx={{ ml: 1 }}>{account.status}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='caption'>Chain Id:</Typography>
                    <Typography variant='caption' sx={{ ml: 1 }}>{account.chainId}</Typography>
                </Box>

            </Card>
        )
    }

    return (
        null
    )
}