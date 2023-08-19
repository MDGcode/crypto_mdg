"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import DOMPurify from "dompurify";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  description: {
    en: string;
  };
  image: {
    small: string;
  };
  market_data: {
    circulating_supply: number;
    market_cap: {
      eur: number;
    };
    current_price: {
      eur: number;
    };
    low_24h: {
      eur: number;
    };
    high_24h: {
      eur: number;
    };
    price_change_percentage_1h_in_currency: {
      eur: number;
    };
    price_change_percentage_24h_in_currency: {
      eur: number;
    };
    price_change_percentage_7d_in_currency: {
      eur: number;
    };
    price_change_percentage_14d_in_currency: {
      eur: number;
    };
    price_change_percentage_30d_in_currency: {
      eur: number;
    };
    price_change_percentage_1y_in_currency: {
      eur: number;
    };
  };
  // Add other properties as needed
}

interface CoinProps {
  searchParams: {
    id: string;
  };
}

export default function Coin(props: CoinProps) {
  const { searchParams } = props;
  const { id } = searchParams;
  const [coin, setCoin] = useState<CoinData | null>(null); // Initialize with null or an empty object if needed
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  if (!coin) {
    return (
      <div className="bg-inherit">
        <div>Loading...</div>
      </div>
    );
    // Add a loading state or message
  }

  return (
    <>
      <div className=" m-0 p-6 ">
        <Link href="/" className=" no-underline">
          <Navbar />
        </Link>

        <div className="">
          <div className="content md:max-w-3xl md:m-4 m-2 max-w-full py-0 px-2 md:p-3 flex flex-col bg-transparent shadow-xl shadow-slate-900 rounded-lg ">
            <div className="rank m-2">
              <span className="rank-btn border border-solid shadow-md shadow-slate-900 bg-sky-500  border-sky-500 rounded-lg p-1">
                Rank # {coin.market_cap_rank}
              </span>
            </div>
            <div className="info grid grid-cols-2">
              <div className="coin-heading flex items-center m-4">
                <img src={coin.image.small} alt="" />
                <div className=" grid grid-cols-1">
                  <p className="pl-2">{coin.name}</p>
                  <p className=" pl-3 uppercase">({coin.symbol})</p>
                </div>
              </div>
              <div className="coin-price flex items-center justify-center">
                {coin.market_data.current_price.eur?.toLocaleString()} €
              </div>
            </div>
          </div>

          <div className="content max-w-3xl m-4 p-3 flex flex-col bg-transparent shadow-xl shadow-slate-900 rounded-lg ">
            <table className="m-2 hidden md:table">
              <thead>
                <tr>
                  <th className=" p-2  text-center bg-cyan-600 ">1h</th>
                  <th className=" p-2  text-center bg-cyan-600 ">24h</th>
                  <th className=" p-2  text-center bg-cyan-600">7d</th>
                  <th className=" p-2  text-center bg-cyan-600">14d</th>
                  <th className=" p-2  text-center bg-cyan-600 ">30d</th>
                  <th className=" p-2  text-center bg-cyan-600">1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {coin.market_data.price_change_percentage_1h_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_1h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1h_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_1h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_24h_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_24h_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_7d_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_7d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_7d_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_7d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_14d_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_14d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_14d_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_14d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_30d_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_30d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_30d_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_30d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1y_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_1y_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1y_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_1y_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            <table className="m-2 md:hidden">
              <thead>
                <tr>
                  <th className=" p-2  text-center bg-cyan-600 ">1h</th>
                  <th className=" p-2  text-center bg-cyan-600 ">24h</th>
                  <th className=" p-2  text-center bg-cyan-600">7d</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {coin.market_data.price_change_percentage_1h_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_1h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1h_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_1h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_24h_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_24h_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_7d_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_7d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_7d_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_7d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            <table className="m-2 md:hidden">
              <thead>
                <tr>
                  <th className=" p-2  text-center bg-cyan-600">14d</th>
                  <th className=" p-2  text-center bg-cyan-600 ">30d</th>
                  <th className=" p-2  text-center bg-cyan-600">1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {coin.market_data.price_change_percentage_14d_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_14d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_14d_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_14d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}

                  {coin.market_data.price_change_percentage_30d_in_currency
                    .eur < 0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_30d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_30d_in_currency
                    .eur > 0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_30d_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1y_in_currency.eur <
                    0 && (
                    <td className=" p-2  text-center text-red-500">
                      {coin.market_data.price_change_percentage_1y_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                  {coin.market_data.price_change_percentage_1y_in_currency.eur >
                    0 && (
                    <td className=" p-2  text-center text-green-500">
                      {coin.market_data.price_change_percentage_1y_in_currency.eur.toFixed(
                        2
                      )}
                      %
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content md:max-w-3xl md:m-4 m-2 max-w-full py-0 px-2 md:p-3 flex flex-col bg-transparent shadow-xl shadow-slate-900 rounded-lg ">
            <div className="stats grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="left">
                <div className="row flex justify-between border-b border-solid border-cyan-600 m-2 pb-2">
                  <h4>24 Hour Low</h4>
                  <p className="">
                    {coin.market_data.low_24h.eur?.toLocaleString()} €
                  </p>
                </div>
                <div className="row flex justify-between border-b border-solid border-cyan-600 m-2 pb-2">
                  <h4>24 Hour High</h4>
                  <p>{coin.market_data.high_24h.eur?.toLocaleString()} €</p>
                </div>
              </div>
              <div className="right">
                <div className="row flex justify-between border-b border-solid border-cyan-600 m-2 pb-2">
                  <h4>Market Cap</h4>
                  <p>{coin.market_data.market_cap.eur?.toLocaleString()} €</p>
                </div>
                <div className="row flex justify-between border-b border-solid border-cyan-600 m-2 pb-2">
                  <h4>Circulating Supply</h4>
                  <p>{coin.market_data.circulating_supply?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content md:max-w-3xl md:m-4 m-2 max-w-full py-0 px-2 md:p-3 flex flex-col bg-transparent shadow-xl shadow-slate-900 rounded-lg ">
            <div className="about">
              <h3 className=" m-4 font-bold">About</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    coin.description ? coin.description.en : ""
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
