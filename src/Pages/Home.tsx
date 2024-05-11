import React, { useEffect, useRef, useState } from "react";
import { CalLayout, LOADER, MODEL } from "../Components";
import { MONTHS } from "../Utils";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  extractDateDetails,
  formatAvalibleDate,
  getImageThumbUrl,
} from "../Functions";
import { useOnClickOutside } from "../Hooks";

interface Event {
  id: number;
  date: number;
  year: number;
  month: number;
  title: string;
  summary: string;
  imageFilenameThumb: string;
  imageFilenameFull: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const logoutRef = useRef(null);
  const onLogoutToggle = (v: boolean) =>
    v === !modalShow && setModalShow(v);
  const hideLogoutToggle = () => onLogoutToggle(false);
  useOnClickOutside(logoutRef, hideLogoutToggle);

  const [dateHandling, setDateHandling] = useState<number | null>(null);
  const [month, setMonth] = useState<number>(
    parseInt(params?.queryMonth as string)
  );
  const [year, setYear] = useState<number>(
    parseInt(params?.queryYear as string)
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventData, setSelectedEvetData] = useState<any>(null);

  // ------------------ FOR CHANGE URL WITH PARAMS ------------------
  function setParamsHandle(path: string, queryParams: (string | number)[]) {
    navigate(`${path}${queryParams.join("/")}`);
  }

  const getPrevious = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth === 0) {
      newMonth = 12;
      newYear--;
    }
    setMonth(newMonth);
    setYear(newYear);
    setParamsHandle("/", [newYear, newMonth]);
  };

  const getNext = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth === 13) {
      newMonth = 1;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
    setParamsHandle("/", [newYear, newMonth]);
  };

  const filterEvents = (date: number): Event[] => {
    return events.filter(
      (i) => i.month === month && i.year === year && i.date === date
    );
  };

  const handleClick = (eventData: any) => {
    setModalShow(true);
    setSelectedEvetData(eventData);
  };

  const [fetchEventLoader, setFetchEventLoader] = useState(false);

  const fetchEventData = async () => {
    try {
      setFetchEventLoader(true);
      const response = await fetch(
        "https://amock.io/api/pratikuser/calendar/events"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setFetchEventLoader(false);
      // setEvents(jsonData?.events);

      const transformedEvents: Event[] = jsonData?.events?.map(
        (event: any) => ({
          id: parseInt(event.id), // Assuming id is a number
          ...extractDateDetails(event.launchDate), // Extract date details
          title: event?.title,
          summary: event?.summary,
          launchDate: event?.launchDate,
          imageFilenameThumb: event?.imageFilenameThumb,
          imageFilenameFull: event?.imageFilenameFull,
        })
      );
      // Set the transformed events to state
      setEvents(transformedEvents);
    } catch (error) {
      toast.error(`Somthing want to wrang. Please try again.`);
      setFetchEventLoader(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <>
      {fetchEventLoader ? (
        <div className="h-[100dvh] w-full flex flex-col items-center justify-center">
          <LOADER />
        </div>
      ) : (
        <div className="w-[90%] relative mt-5 m-auto">
          <div className="flex items-center justify-between py-4 border-b">
            <div
              onClick={getPrevious}
              className="arrow left cursor-pointer"
            ></div>
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
        </div>
      )}
      {modalShow && (
        <MODEL
          showModel={modalShow}
          setShowModel={() => {
            setModalShow(false);
            setSelectedEvetData(null);
          }}
        >
          <div
            className="h-[50dvh] w-full px-20 py-20"
            style={{
              backgroundImage: `url(${getImageThumbUrl(
                selectedEventData,
                true
              )})`,
              backgroundPosition: "center",
              objectFit: "contain",
            }}
          >
            <div className="w-9/12 flex flex-col drop-shadow-2xl shadow-black">
              <span className="text-3xl text-white font-semibold drop-shadow-2xl shadow-black">
                {selectedEventData[0]?.title}
              </span>
              <span className="text-base mt-2 text-white font-normal drop-shadow-2xl shadow-black">
                {selectedEventData[0]?.summary}
              </span>
              <span className="text-lg mt-2 text-white font-medium drop-shadow-2xl shadow-black">
                Avalible {formatAvalibleDate(selectedEventData[0]?.launchDate)}
              </span>
              <div className="flex items-center mt-5">
                <button className="bg-blue-500 text-white font-medium rounded-3xl px-4 py-2">
                  Learn More
                </button>
                <button className="ms-3 bg-red-500 text-white font-medium rounded-3xl px-4 py-2">
                  Pre Order Now
                </button>
              </div>
            </div>
          </div>
        </MODEL>
      )}
    </>
  );
};

export default Home;
