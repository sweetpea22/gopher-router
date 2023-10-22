"use client"
import { axelarSend, truncatedAddress } from '@/formulas/bridges/axelar/axelarSend';
import cn from 'classnames';
import React, { useState } from 'react';
import { Chains } from '../constants';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

//@ts-ignore
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export default function SendToken() {
  const [customRecipientAddress, setCustomRecipientAddress] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [depositAddress, setDepositAddress] = useState<string>('');
  const [txhash, setTxhash] = useState<string>();
  const [transferFee, setTransferFee] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const { address } = useAccount();

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get('amount') as string;
    setAmount(+amount);
    setTransferFee(0);

    setLoading(true);

    await axelarSend(Chains[0], Chains[2], recipientAddress, amount).finally(() => {
        setLoading(false);
        setDepositAddress('');
    });
  }
  

  const handleOnAddRecepientAddress = () => {
    setRecipientAddress(customRecipientAddress);
    setCustomRecipientAddress('');
  };
  


  return (
    <div>
      <form className="flex flex-col w-full" autoComplete="off" onSubmit={handleOnSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipient Address</span>
          </label>
          <label className="w-full input-group">
            <input
              type="text"
              placeholder="Enter address"
              className="w-full input input-bordered"
              value={customRecipientAddress}
              onChange={(e) => setCustomRecipientAddress(e.target.value)}
            />
            <button type="button" className="btn btn-primary" onClick={handleOnAddRecepientAddress}>
              Set
            </button>
          </label>
        </div>
        {recipientAddress && (
          <label className="label">
            <span className="label-text">Recipient: {truncatedAddress(recipientAddress)}</span>
          </label>
        )}
        {depositAddress && (
          <label className="label">
            <span className="label-text">Deposit Address: {truncatedAddress(depositAddress)}</span>
          </label>
        )}
        <div>
          <label className="label">
            <span className="label-text">Token amount</span>
          </label>
          <div className="w-full input-group">
            <input
              disabled={loading}
              required
              name="amount"
              type="number"
              placeholder="Enter amount to send"
              className="w-full input input-bordered"
            />
            <button
              className={cn('btn btn-primary', {
                loading,
                'opacity-30': loading || recipientAddress.length === 0,
                'opacity-100': !loading && recipientAddress.length > 0,
              })}
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
        <br />
        {txhash && transferFee && (
          <div>
            <div>Transfer fee: {transferFee}</div>
            <div>Net amount to send: {amount - transferFee}</div>
          </div>
        )}
        <br />
        {txhash && (
          <button className="btn btn-accent">
            <a
              href={`https://testnet.axelarscan.io/transfer/${txhash}`}
              target="blank"
            >
              Axelarscan Deposit Address status
            </a>
          </button>
        )}
      </form>
    </div>
  );
  };