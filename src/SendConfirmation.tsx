import { Box, Button, Card, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { Address, erc20Abi, parseUnits } from 'viem';
import { avalancheFuji } from 'viem/chains';

import { useAccount, useSendTransaction, useSimulateContract, useWriteContract } from 'wagmi';
interface SendConfirmationProps {
    value: string;
    to: Address;
    erc20Address: Address;
    decimals: number;
    isNativeToken?: boolean;
    onPrev: () => void;
}
export const SendConfirmation: React.FC<SendConfirmationProps> = ({
    isNativeToken,
    decimals,
    erc20Address,
    value,
    to,
    onPrev }) => {
    const account = useAccount()
    const { sendTransaction } = useSendTransaction()
    const { writeContract, isPending, error: writeError, status: writeStatus, data: hash } = useWriteContract();
    const parsed = parseUnits(value, decimals)
    const simulated = useSimulateContract({
        abi: erc20Abi,
        address: erc20Address,
        functionName: 'transfer',
        chainId: avalancheFuji.id,
        args: [
            to,
            parsed,
        ],
    })

    const sendNativeToken = () => {
        sendTransaction({ to, value: parsed })
    }

    const onSendErc20 = () => {
        if (simulated?.data?.request) {
            return writeContract(simulated?.data?.request)
        }
    }
    const onSendClick = () => {
        isNativeToken ? sendNativeToken() : onSendErc20()
    }

    return (
        <Card variant='outlined' sx={{ p: 1, mt: 1, mb: 1 }}>
            <Typography variant='body1'>Confirm Transaction</Typography>
            <Box sx={{ display: 'flex' }}>

                <Typography variant='caption'>
                    Sending:
                </Typography>
                <Box sx={{ ml: 'auto' }}>

                    <Typography variant='caption'>
                        {value}
                    </Typography>
                </Box>
            </Box>
            <Typography variant='caption'>
                From {account.address}
            </Typography>
            <Typography variant='caption'>
                To
            </Typography>
            <Typography variant='caption'>{to}</Typography>
            <Typography>Balance after transaction</Typography>
            <Button size='small' onClick={onPrev} variant='outlined' sx={{ mr: 1 }}>Cancel</Button>
            <Button size='small' variant='contained' sx={{ m: 1 }} onClick={onSendClick}>Send now</Button>
            {isPending && <LinearProgress />}
            {writeStatus === 'pending' && <LinearProgress />}
            {writeStatus === 'error'}
            {writeError && <Typography>{writeError.message}</Typography>}
            {hash && <div>Transaction Hash: {hash}</div>}

        </Card>
    )
}