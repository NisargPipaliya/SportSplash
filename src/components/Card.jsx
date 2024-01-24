import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Card({ id, tournamentName, user, startDate, endDate }) {
  return (
    <div className="w-[300px] rounded-md border bg-slate-300 m-1">
      {/* <img
        src={`/banner.png`}
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      /> */}
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {tournamentName} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600">{`University : ${user.university}`}</p>
        <p className="mt-1 text-sm text-gray-600">
          {`Start Date :- ${new Date(startDate).toDateString()}`}
        </p>
        <Link to={`/tournament/${id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Read
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
