"use client";
import { useState } from "react";
import CoinItem from "./CoinItem";

export default function Coins(props: any) {
  const [query, setQuery] = useState("");
  return (
    <>
      <div className=" max-w-3/4 md:max-w-7xl m-auto">
        <div>
          <div className="flex justify-between items-center shadow-md shadow-black rounded mx-1 px-1 py-4 my-4 md:m-8 md:p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              className=" rounded-md p-2 w-full text-xl text-black"
              placeholder="Search coin"
            />
          </div>
          <div className=" flex justify-between items-center shadow-md shadow-black rounded mx-1 px-1 py-4 my-4 md:m-8 md:p-3 font-bold">
            <p>#</p>
            <p className="">Coin</p>
            <p>Price</p>
            <p>24h</p>
            <p className=" hidden md:flex">Volume</p>
            <p className=" hidden md:flex">Market cap</p>
          </div>
          {props.coins
            .filter((coins: any) => {
              return query.toLowerCase() === ""
                ? coins
                : coins.id.toLowerCase().includes(query);
            })
            .map((coins: any) => {
              return <CoinItem coins={coins} key={coins.id} />;
            })}
        </div>
      </div>
    </>
  );
}
