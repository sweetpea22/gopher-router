"use client"
import { axelarSend, truncatedAddress } from '@/formulas/bridges/axelar/axelar';
import cn from 'classnames';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { Chains } from '../constants';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

//@ts-ignore
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export default function SendToken() {
  const [customRecipientAddress, setCustomRecipientAddress] = useState<string>('');
  const [sendMethod, setSendMethod] = useState<string>('sendToken');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [balances, setBalances] = useState<string[]>([]);
  const [senderBalance, setSenderBalance] = useState<string>();
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

    const send = axelarSend;

    setLoading(true);

    const cb = (data: any) => {
      setTxhash(data.txHash);
      setTransferFee(data.transferFee);
      setDepositAddress(data.depositAddress);
    };

    await send(Chains[0], Chains[2], '0x7d78A8bF127410DBEeaCEF3E3991E802dB46bd03', '5', cb).finally(() => {
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
      <h1 className="text-3xl font-medium text-center">{sendMethod === 'sendToken' ? 'Send Token' : 'Deposit Address'}</h1>
      <br />
      <div className="flex justify-center">
        <button
          onClick={() => setSendMethod('sendToken')}
          className={`m-1 btn ${sendMethod === 'sendToken' ? 'btn-primary' : 'btn-active btn-ghost'}`}
        >
          Gateway Send Token
        </button>
        <button
          onClick={() => setSendMethod('depositAddress')}
          className={`m-1 btn  ${sendMethod === 'depositAddress' ? 'btn-primary' : 'btn-active btn-ghost'}`}
        >
          Deposit Address
        </button>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-5 justify-items-center">
        {/* source chain card */}
        <div className="row-span-2 shadow-xl card w-96 bg-base-100">
          <figure
            className="h-64 bg-center bg-no-repeat bg-cover image-full"
            style={{ backgroundImage: "url('/assets/avalanche.gif')" }}
          />
          <div className="card-body">
            <h2 className="card-title">Avalanche (Token Sender)</h2>
            <p>
              Sender ({truncatedAddress(address as `0x${string}`)}) balance: {senderBalance}
            </p>
            <div className="justify-end mt-2 card-actions">
              <form className="flex flex-col w-full" autoComplete="off" onSubmit={handleOnSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Moonbeam Recipient Address</span>
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
                      href={`https://testnet.axelarscan.io/${sendMethod === 'sendToken' ? 'sent' : 'transfer'
                        }/${txhash}`}
                      target="blank"
                    >
                      Axelarscan {sendMethod === 'sendToken' ? 'sendToken' : 'Deposit Address'} status
                    </a>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>


    </div>
  );
  };