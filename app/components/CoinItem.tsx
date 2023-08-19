import React from "react";
import { useRouter } from "next/navigation";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
export default function CoinItem(props: any) {
  const router = useRouter();

  function handleClick() {
    router.push("/coin?id=" + props.coins.id);
  }
  return (
    <div
      onClick={handleClick}
      className=" flex hover:scale-105 duration-300 cursor-pointer justify-between items-center shadow-md shadow-black rounded mx-1 px-1 py-4 my-4 md:m-8 md:p-3 "
    >
      <p>{props.coins.market_cap_rank}</p>
      <div className="md:mx-14 flex m-auto">
        <img
          className="h-8 md:h-10 m-0 w-auto "
          src={props.coins.image}
          alt=""
        />
        <p className=" pt-2 px-2 hidden md:flex ">{props.coins.name}</p>
        <p className=" uppercase pt-2 px-2 flex md:hidden ">
          {props.coins.symbol}
        </p>
      </div>
      <p>{props.coins.current_price.toLocaleString()} €</p>
      {props.coins.price_change_percentage_24h < 0 && (
        <p className=" ml-10 text-red-500 flex">
          {props.coins.price_change_percentage_24h.toFixed(2)}%
          <AiFillCaretDown fill="red" />
        </p>
      )}
      {props.coins.price_change_percentage_24h >= 0 && (
        <p className=" ml-10 text-green-500 flex">
          {props.coins.price_change_percentage_24h.toFixed(2)}%
          <AiFillCaretUp fill="green" />
        </p>
      )}
      <p className="hidden md:flex">
        {props.coins.total_volume.toLocaleString()}
      </p>
      <p className="hidden md:flex">
        {props.coins.market_cap.toLocaleString()} €
      </p>
    </div>
  );
}
