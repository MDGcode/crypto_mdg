import React from "react";
import { LiaCoinsSolid } from "react-icons/lia";
export default function Navbar() {
  return (
    <>
      <div className=" flex justify-center items-center">
        <div className=" text-4xl">
          <LiaCoinsSolid />
        </div>
        <h1 className=" font-extrabold text-3xl">
          MDG <span className=" text-sky-400">Search</span>
        </h1>
      </div>
    </>
  );
}
