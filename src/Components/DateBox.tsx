import React from "react";

interface Props {
  onClick: (date: number) => void;
  date: number | null;
  events: { id: number; title: string }[];
}

const DateBox: React.FC<Props> = ({ onClick, date, events }) => {
  const handleClick = () => {
    if (date) {
      onClick(date);
    }
  };

  let eventList = null;
  let renderedDate = null;

  if (events.length > 0) {
    eventList = events.map((event, key) => <li key={key}>{event.title}</li>);
  }

  if (date) {
    renderedDate = (
      <div className="w-full cursor-pointer" onClick={handleClick}>
        <span className="w-full">{date}</span>
        <ul>{eventList}</ul>
      </div>
    );
  } else {
    renderedDate = <div></div>;
  }

  return renderedDate;
};

export default DateBox;
