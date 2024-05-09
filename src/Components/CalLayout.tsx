import React from "react";
import DateBox from "./DateBox";
import { DAYS, getDateArray } from "../Utils";

interface Props {
  month: number;
  year: number;
  onCellClick: (date: number) => void;
  getEvents: (date: number) => any[];
}

const CalLayout: React.FC<Props> = ({ month, year, onCellClick, getEvents }) => {

  const dateArray = getDateArray(month, year);

  const rows = dateArray.map((week, i) => (
    <div className="flex w-full" key={i}>
      {week.map((date, j) => (
        <div className="w-full h-32 shadow-sm pt-2 pr-2 " key={j}>
          <DateBox onClick={onCellClick} date={date} events={getEvents(date)} />
        </div>
      ))}
    </div>
  ));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full grid grid-cols-7 gap-1 my-3">
        {DAYS.map((day, index) => (
          <div key={index} className="font-semibold text-center">{day}</div>
        ))}
      </div>
      <div className="w-full flex flex-col text-end">
        {rows}
      </div>
    </div>
  );
};

export default CalLayout;

