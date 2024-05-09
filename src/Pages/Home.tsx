import React, { useState } from "react";
import { CalLayout, Modal } from "../Components";
import { MONTHS } from "../Utils";

interface Event {
  id: number;
  date: number;
  year: number;
  month: number;
  title: string;
}

const Home: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [dateHandling, setDateHandling] = useState<number | null>(null);
  const [eventIdEditing, setEventIdEditing] = useState<number | null>(null);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      date: 2,
      year: 2018,
      month: 2,
      title: "Holi",
    },
  ]);

  const getPrevious = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const getNext = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const filterEvents = (date: number): Event[] => {
    return events.filter(
      (i) => i.month === month && i.year === year && i.date === date
    );
  };

  const handleDeleteClick = (id: number) => {
    if (id) {
      setEvents((prevEvents) => prevEvents.filter((i) => i.id !== id));
    }
  };

  const handleSaveClick = (value: string, id?: number) => {
    let updatedEvents = [...events];
    if (id) {
      const index = updatedEvents.findIndex((i) => i.id === id);
      if (index !== -1) {
        updatedEvents[index].title = value;
        setEvents(updatedEvents);
      }
    } else {
      const maxId = Math.max(...updatedEvents.map((i) => i.id), 0);
      updatedEvents.push({
        id: maxId + 1,
        date: dateHandling!,
        year: year,
        month: month,
        title: value,
      });
      setEvents(updatedEvents);
    }
  };

  const handleClick = (date: number) => {
    setModalShow(true);
    setDateHandling(date);
  };

  const handleClickCloseModal = () => {
    setModalShow(false);
  };

  return (
    <div className="w-[90%] mt-5 m-auto">
      <div className="flex items-center justify-between py-4 border-b">
        <div onClick={getPrevious} className="arrow left cursor-pointer"></div>
        <span className="text-2xl font-normal">
          {MONTHS[month]} {year}
        </span>
        <div onClick={getNext} className="arrow right cursor-pointer"></div>
      </div>
      <CalLayout
        month={month}
        year={year}
        onCellClick={handleClick}
        getEvents={filterEvents}
      />
      <Modal
        isVisible={modalShow}
        onClose={handleClickCloseModal}
        date={dateHandling}
        month={month}
        year={year}
        events={filterEvents(dateHandling!)}
        onSave={handleSaveClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default Home;
