export type TezosBlock = {
  blockLevel: number;
  proposer: TezosAccount;
  timestamp: string;
  numTnxsBlock: number;
  hash: string;
};

export type TezosAccount = {
  alias: string;
  address: string;
};

export type TezosTransaction = {
  sender: TezosAccount;
  target: TezosAccount;
  amount: number;
  status: string;
};
