# Offsett
A RESTful carbon footprint calculator for Bitcoin :deciduous_tree:

This repo consists of the API and an example website based on the API that people can use to calculate the carbon footprint of their Bitcoin transactions.

# Table of Contents
- [API](#api)
  - [Getting started](#getting-started-wapi)
  - [Endpoints](#endpoints)
  - [HTTP Status Codes](#http-status-codes)
- [Example Website](#example-website)
  - [Getting started](#getting-started-wwebsite)
- [Problem](#problem)
- [Solution](#solution)
- [Tips](#tips)


# API
This is a RESTful API that returns JSON-encoded responses. It is Node.js + Typescript based, uses Chai and Mocha for testing and Istanbul for tracking code coverage.

## Getting started w/API
Install dependencies: `npm install`

Start server: `npm start`

Run tests: `npm run test`

Run test + check for code coverage: `npm run test:coverage`

## Endpoints

**GET** */estimate-impact/wallet-id/:BitcoinAddress*

estimate the carbon footprint of an entire Bitcoin wallet
<br /><br />

**GET** */estimate-impact/transaction-id/:transactionID*

estimate the carbon footprint of a single Bitcoin transaction give the transaction ID
<br /><br />

**GET** */estimate-impact/transaction-date/:date*

estimate the carbon footprint of a single Bitcoin transaction, just knowing the date of transaction
<br /><br />

## HTTP Status Codes

**2xx** Request was handled successfully

**4xx** Request failed because of user

**5xx** Request failed because of errors in the API


# Example Website
The example website is based on React React APP (React.js), ant.design and Typescript.

## Getting started w/Website
Install dependencies: `npm install`

Start website: `npm start`

Build website: `npm run build`


# Problem
Proof-of-Work-based cryptocurrencies are not sustainable, because the compute power needed for mining requires a lot of electricity. 
According to [Digiconomist](https://digiconomist.net/bitcoin-energy-consumption), a single Bitcoin transaction on July 16th, 2022 consumes ~1582 kWh, equivalent to ~882 kg CO2.

# Solution
This repo provides a carbon footprint calculator as an API for Bitcoin wallets (based on Digiconomist). It could provide the basis for tools that offset the carbon emissions of bitcoin (and other PoW coins). When you book a flight, there is often a button that you can click to support some project that compensates for the carbon footprint of your flight. There could be a similar button when you e.g. trade Bitcoin on Coinbase.

# Tips
- Use the [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbeci/index), instead of Digiconomist, they provide more accurate calculations ([source](https://cryptoclimate.org/wp-content/uploads/2021/12/RMI-CIP-CCA-Guidance-Documentation-Dec15.pdf))
- Understand how the calculations work. They can never be accurate and are subject to many assumptions depending on the used model (used hardware, energy mix of miners, location of miners, profitability, etc.).
- Check out [Cloverly](https://www.cloverly.com/) or [Wren](https://www.wren.co/) as potential partners for offsetting, but always double-check to verify, that there is no greenwashing involved (this is a general problem, not specifically for Cloverly or Wren).
