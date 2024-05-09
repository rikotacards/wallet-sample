import { Card, LinearProgress, Typography } from '@mui/material';
import React from 'react'
import { Address, erc20Abi, parseUnits } from 'viem'
import { avalancheFuji } from 'viem/chains';
import { useSimulateContract } from 'wagmi'
interface TransferErrorHandlingProps {
    value: string;
    to: Address;
    erc20Address: Address;
    decimals: number;
    onDisable: () => void;
    enable: () => void;
}
export const TransferErrorHandling: React.FC<TransferErrorHandlingProps> = React.memo(({
    erc20Address,
    to,
    decimals,
    value,
    onDisable,
    enable
}) => {
    const parsed = parseUnits(value, decimals)

    React.useEffect(() => {
        return enable()
    }, [])

    const simulatedErc20Transfer = useSimulateContract({
        abi: erc20Abi,
        address: erc20Address,
        functionName: 'transfer',
        chainId: avalancheFuji.id,
        args: [
            to,
            parsed,
        ],
    })
    if(simulatedErc20Transfer.isLoading){
        onDisable()
    }
    if(simulatedErc20Transfer.data){
        enable()
    }
   

    return <Card variant='outlined' sx={{display: 'flex', flexDirection: 'column', whiteSpace: 'wrap', p: 1}}>
                {simulatedErc20Transfer.isLoading ? <LinearProgress/>: simulatedErc20Transfer.failureReason && <Typography variant='caption' color='error'>{simulatedErc20Transfer.failureReason.message}</Typography>}


    </Card>


})