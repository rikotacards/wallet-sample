import { Box, Button, Card, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React from 'react';
import { Address, formatUnits, isAddress } from 'viem'
import { useAccount, useBalance} from 'wagmi';

import { Balance } from './Balance';
import { TransferErrorHandling } from './TransferErrorHandling';
import { erc20TokenList } from './config/erc20TokenList';
import { IAssetToTransfer } from './SendSteps';

interface SendFormProps {
    onNext: () => void;
    onSetAssetToTransfer: (assetToTransfer: IAssetToTransfer) => void;
}
const DEFAULT_ASSET_SELECTION_SYMBOL = 'USDC'

export const SendForm: React.FC<SendFormProps> = ({
    onNext,
    onSetAssetToTransfer
}) => {
    const account = useAccount();
    
    const [symbol, setSymbol] = React.useState(DEFAULT_ASSET_SELECTION_SYMBOL)
    const [to, setTo] = React.useState<Address | ''>('')
    const [value, setValue] = React.useState<string>('0.0')
    const [disable, setDisable] = React.useState(false);
    const onSetDisable = React.useCallback(() => {
        setDisable(true)
    }, [])
    const enable = React.useCallback(() => {
        setDisable(false)
    },[])
    const nativeToken = useBalance({ address: account.address })
    const isNativeToken = symbol === nativeToken.data?.symbol
    const selectedAsset = isNativeToken ? { address: account.address, decimals: nativeToken?.data?.decimals || 18 } : erc20TokenList.find((token) => token.symbol === symbol)
    const nativeBalanceReadable = nativeToken.data?.value && formatUnits(nativeToken.data?.value, nativeToken.data?.decimals)
    const isValidAddress = !!to ? isAddress(to) : false
        
    const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value as Address)
    }
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const onSymbolChange = (event: SelectChangeEvent) => {
        setSymbol(event.target.value as string);
    };

    const onClick = () => {
        if (!selectedAsset?.address ||
            !selectedAsset.decimals ||
            to === '') {
            return;
        }
        onSetAssetToTransfer({
            isNative: isNativeToken,
            value,
            to,
            decimals: selectedAsset?.decimals,
            address: selectedAsset?.address
        })
        onNext();
    }


    const helperText = !to?.length ? 'Address required' : !isValidAddress ? 'Invalid address' : null
    return (
        <Card variant='outlined' elevation={0} sx={{ p: 1, mt: 1, mb: 1, maxWidth: '100%', display: 'flex', flexDirection: 'column' , textOverflow: 'wrap', overflow: 'hidden'}}>
            <div>
                <Typography>Sending to:</Typography>
                <TextField error={!!to?.length && !isValidAddress}
                    helperText={helperText}
                    value={to}
                    fullWidth
                    size='small'
                    placeholder='Enter 0x Address'
                    type='string'
                    onChange={onToChange} />
            </div>

            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ ml: 'auto' }}>
                        <Typography variant='caption'>Balance:</Typography>
                        {isNativeToken ? <Typography variant='caption'>{nativeBalanceReadable?.toString()}</Typography> :
                            selectedAsset?.address && account.address && <Balance decimals={selectedAsset.decimals} erc20Address={selectedAsset.address} address={account.address} />
                        }

                    </Box>
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>

                    <Select sx={{ mr: 1 }} onChange={onSymbolChange} size='small' value={symbol}>
                        <MenuItem value={nativeToken.data?.symbol}>{nativeToken.data?.symbol}</MenuItem>
                        {erc20TokenList.map((asset) => <MenuItem value={asset?.symbol}>{asset?.symbol}</MenuItem>)}
                    </Select>
                    <TextField
                        InputProps={
                            { endAdornment: <InputAdornment position='end'><Button size='small'>max</Button></InputAdornment> }
                        }
                        fullWidth sx={{ mb: 0 }}
                        key={symbol}
                        size='small'
                        placeholder='0.0' value={value || ''}
                        onChange={onValueChange} />
                </Box>
      
                {!isNativeToken && to && selectedAsset?.address && <TransferErrorHandling
                    value={value}
                    to={to}
                    onDisable={onSetDisable}
                    enable={enable}
                    erc20Address={selectedAsset.address}
                    decimals={selectedAsset.decimals} />
                    }
            </div>
            <Button disabled={disable} variant='contained' onClick={onClick}>Next</Button>
        </Card>
    )
}