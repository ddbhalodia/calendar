import React from "react";
import { getImageThumbUrl } from "../Functions";
interface Props {
  onClick: (eventData:any) => void;
  date: number | null;
  events: { id: number; title: string }[];
}

const DateBox: React.FC<Props> = ({ onClick, date, events }) => {
  const handleClick = () => {
    if (date && getImageThumbUrl(events, false)) {
      onClick(events);
    }
  };
  let renderedDate = null;

  if (date) {
    renderedDate = (
      <div
        style={{
          backgroundImage: `url(${getImageThumbUrl(events, false)})`,
          backgroundPosition: "center",
          objectFit: "contain",
        }}
        className="w-full flex items-start justify-end h-full cursor-pointer pt-2 pr-2"
        onClick={handleClick}
      >
        <div
          className={`min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] flex items-center justify-center ${
            getImageThumbUrl(events, false)
              ? " rounded-full bg-blue-500 text-white"
              : ""
          } `}
        >
          {date}
        </div>
      </div>
    );
  } else {
    renderedDate = <div></div>;
  }

  return renderedDate;
};

export default DateBox;
