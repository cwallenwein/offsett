## Problem
Proof-of-Work-based cryptocurrencies are not sustainable, because the compute power needed for mining requires a lot of electricity. 
According to [Digiconomist](https://digiconomist.net/bitcoin-energy-consumption), a single Bitcoin transaction on July 16th, 2022 consumes ~1582 kWh, equivalent to ~882 kg CO2.

## Solution
This repo provides a Digiconomist-based carbon footprint calculator in the form of an API for Bitcoin transactions and entire Bitcoin wallets. It could provide the basis for tools that offset the carbon emissions of bitcoin (and other PoW coins). When you book a flight, there is often a button that you can click to support some project that compensates for the carbon footprint of your flight. There could be a similar button when you e.g. trade Bitcoin on Coinbase.

## Tips for implementation
- Use the [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbeci/index), instead of Digiconomist, they provide more accurate calculations ([source](https://cryptoclimate.org/wp-content/uploads/2021/12/RMI-CIP-CCA-Guidance-Documentation-Dec15.pdf))
- Understand how the calculations work. They can never be accurate and are subject to many assumptions depending on the used model (used hardware, energy mix of miners, location of miners, profitability, etc.).
- Check out [Cloverly](https://www.cloverly.com/) or [Wren](https://www.wren.co/) as potential partners for offsetting, but always double-check to verify, that there is no greenwashing involved (this is a general problem, not specifically for Cloverly or Wren).

## Error Codes

### 2xx Request was handled successfully

200 - OK

201 - Created

### 4xx Request failed because of user

These are errors because of users

### 5xx Request failed because of Offsett
These are operational errors
