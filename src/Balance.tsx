import React from 'react';
import { balanceOfAbi } from './abi';
import { useReadContract } from 'wagmi';
import { Address, formatUnits } from 'viem';
import { Typography } from '@mui/material';
interface BalanceProps {
    // current wallet address
    address: Address,
    erc20Address: Address;
    decimals: number;
}
export const Balance: React.FC<BalanceProps> = ({address, erc20Address, decimals = 18}) => {

    // erc20 contract
    const balance = useReadContract({
        abi: balanceOfAbi,
        address: erc20Address,
        functionName: 'balanceOf',
        args: [address]
    })
    if(balance.isFetching){
        return null
    }
    const parsed = balance.data && formatUnits(balance.data, decimals)
    return (
        <Typography variant='caption'><>{parsed||0}</></Typography>
    )
}