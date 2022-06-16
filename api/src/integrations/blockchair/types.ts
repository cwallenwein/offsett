export interface IAddressEndpoint {
  data: {
    [bitcoinAddress: string]: IAddressData;
  };
  context: {
    code: number;
    source: string;
    limit: string;
    offset: string;
    results: number;
    state: number;
    market_price_usd: number;
    cache: {
      live: boolean;
      duration: number;
      since: string;
      until: string;
      time: string;
    };
    api: {
      version: string;
      last_major_update: string;
      next_major_update: string;
      documentation: string;
      notice: string;
    };
    server: string;
    time: number;
    render_time: number;
    full_time: number;
    request_cost: number;
  };
}

export interface IAddressData {
  address: {
    type: string;
    script_hex: string;
    balance: number;
    balance_usd: number;
    received: number;
    received_usd: number;
    spent: number;
    spent_usd: number;
    output_count: number;
    unspent_output_count: number;
    first_seen_receiving: string;
    last_seen_receiving: string;
    first_seen_spending: string;
    last_seen_spending: string;
    scripthash_type: null;
    transaction_count: number;
  };
  transactions: ITransactionDataOfAddress[];
  utxo: [
    {
      block_id: number;
      transaction_hash: string;
      index: number;
      value: number;
    },
  ];
}

export interface ITransactionDataOfAddress {
  block_id: number;
  hash: string;
  time: string;
  balance_change: number;
}

export interface ITransactionEndpoint {
  data: {
    [transactionID: string]: ITransactionData;
  };
  context: {
    code: number;
    source: string;
    results: number;
    state: number;
    market_price_usd: number;
    cache: {
      live: boolean;
      duration: number;
      since: string;
      until: string;
      time: string;
    };
    api: {
      version: number;
      last_major_update: string;
      next_major_update: string;
      documentation: string;
      notice: string;
    };
    server: string;
    time: number;
    render_time: number;
    full_time: number;
    request_cost: number;
  };
}

export interface ITransactionData {
  transaction: {
    block_id: number;
    id: number;
    hash: string;
    date: string;
    time: string;
    size: number;
    weight: number;
    version: number;
    lock_time: number;
    is_coinbase: boolean;
    has_witness: boolean;
    input_count: number;
    output_count: number;
    input_total: number;
    input_total_usd: number;
    output_total: number;
    output_total_usd: number;
    fee: number;
    fee_usd: number;
    fee_per_kb: number;
    fee_per_kb_usd: number;
    fee_per_kwu: number;
    fee_per_kwu_usd: number;
    cdd_total: number;
    is_rbf: boolean;
  };
  inputs: {
    block_id: number;
    transaction_id: number;
    index: number;
    transaction_hash: string;
    date: string;
    time: string;
    value: number;
    value_usd: number;
    recipient: string;
    type: string;
    script_hex: string;
    is_from_coinbase: boolean;
    is_spendable: boolean;
    is_spent: boolean;
    spending_block_id: number;
    spending_transaction_id: number;
    spending_index: number;
    spending_transaction_hash: string;
    spending_date: string;
    spending_time: string;
    spending_value_usd: number;
    spending_sequence: number;
    spending_signature_hex: string;
    spending_witness: string;
    lifespan: number;
    cdd: number;
    scripthash_type?: string | null;
  }[];
  outputs: {
    block_id: number;
    transaction_id: number;
    index: number;
    transaction_hash: string;
    date: string;
    time: string;
    value: number;
    value_usd: number;
    recipient: string;
    type: string;
    script_hex: string;
    is_from_coinbase: boolean;
    is_spendable: boolean;
    is_spent: boolean;
    spending_block_id: number;
    spending_transaction_id: number;
    spending_index: number;
    spending_transaction_hash: string;
    spending_date: string;
    spending_time: string;
    spending_value_usd: number;
    spending_sequence: number;
    spending_signature_hex: string;
    spending_witness: string;
    lifespan: number;
    cdd: number;
    scripthash_type?: string | null;
  }[];
}

export interface IDailyTransactionCountEndpoint {
  data: {
    date: string;
    "count()": number;
  }[];
  context: {
    code: number;
    source: number;
    limit: number;
    offset: number;
    rows: number;
    pre_rows: number;
    total_rows: number;
    state: number;
    market_price_usd: number;
    cache: {
      live: boolean;
      duration: number;
      since: string;
      until: string;
      time: string;
    };
    api: {
      version: number;
      last_major_update: string;
      next_major_update: string;
      documentation: string;
      notice: string;
    };
    server: string;
    time: number;
    render_time: number;
    full_time: number;
    request_cost: number;
  };
}
