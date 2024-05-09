import React from 'react';
import { SendForm } from './SendForm';
import { SendConfirmation } from './SendConfirmation';
import { Address } from 'viem';

export interface IAssetToTransfer {
    isNative: boolean;
    value: string;
    to: Address;
    decimals: number;
    address: Address;
}
export const SendSteps: React.FC = () => {
    const [step, setStep] = React.useState(0);
    const [assetToTransfer, setAssetToTransfer] = React.useState({} as IAssetToTransfer);
    
    const onSetAssetToTransfer = (assetToTransfer:IAssetToTransfer) => {
        setAssetToTransfer(assetToTransfer)
    }

    const onNext = () => {
        setStep((prev) => prev + 1)
    }
    const onPrev = () => {
        setStep((prev) => prev - 1)
    }

    const steps = [
        <SendForm
            key={0}
            onSetAssetToTransfer={onSetAssetToTransfer}
            onNext={onNext}
        />,
         <SendConfirmation
            key={1}
            value={assetToTransfer.value}
            to={assetToTransfer.to}
            isNativeToken={assetToTransfer.isNative}
            decimals={assetToTransfer.decimals}
            erc20Address={assetToTransfer.address as Address}
            onPrev={onPrev} />,
    ]
    return (
        <>
            {steps[step]}
        </>
    )
}