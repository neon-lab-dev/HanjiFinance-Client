import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isPast,
  isSameDay,
  isSameMonth,
  isSunday,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { startOfWeek } from "date-fns/fp";
import { useState } from "react";
import TimePicker from "./TimePicker";


const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2025-07-30T13:00",
    endDatetime: "2025-07-30T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2025-07-24T09:00",
    endDatetime: "2025-07-24T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2025-07-26T17:00",
    endDatetime: "2025-07-26T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2025-07-29T13:00",
    endDatetime: "2025-07-29T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-13T14:00",
    endDatetime: "2022-05-13T14:30",
  },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Calender() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [hoverInfo, setHoverInfo] = useState<{
    date: Date | null;
    status: string | null;
  }>({
    date: null,
    status: null,
  });

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  const hoverDateDetail = (day: Date) => {
    if (
      isSunday(day) ||
      (isPast(day) && !isToday(day)) ||
      meetings.some((meeting) =>
        isSameDay(parseISO(meeting.startDatetime), day)
      )  && isSameMonth(day,firstDayCurrentMonth)
    ) {
      setHoverInfo({ date: day, status: "slot not Available" });
    } else {
      setHoverInfo({ date: day, status: "slot Available" });
    }
  };

  // const selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // );

  return (
    <div className="bg-surface-75 font-Montserrat p-6 rounded-tl-[20px] rounded-tr-[20px] rounded-t-[20px] lg:rounded-tr-none lg:rounded-t-none lg:rounded-l-[20px] w-full lg:w-[40%]">
      <h1 className="text-xl font-bold text-neutral-30 text-center">
        Select a Slot
      </h1>
      <div className="max-w-md p-5 mx-auto md:max-w-4xl bg-white border border-neutral-120 rounded-xl shadow-2xl mt-6">
        <div className="flex w-full justify-between items-center">
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-neutral-115 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
          </button>
          <h2 className=" text-center text-lg text-neutral-20 font-semibold ">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-neutral-115 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 font-semibold tracking-[-0.16] leading-6 text-center text-gray-500 text-base ">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                onMouseEnter={() => {
                  hoverDateDetail(day);
                }}
                onMouseLeave={() => setHoverInfo({ date: null, status: null })}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) &&
                    "text-primary-15",
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    !meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) &&
                    "text-success-20",
                  ((!isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    isPast(day)) ||
                    (isSunday(day) &&
                      isSameMonth(day, firstDayCurrentMonth))) &&
                    "text-neutral-125 hover:border border-neutral-125 transition duration-300 ease-in",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-neutral-98",
                  // isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                  isEqual(day, selectedDay) &&
                    (isToday(day) || !isToday(day)) &&
                    "bg-secondary-10",

                  (!isEqual(day, selectedDay) || isEqual(day, selectedDay)) &&
                    (isToday(day) || !isToday(day)) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) &&
                    "text-primary-15 hover:border border-primary-15 transition duration-300 ease-in",
                  (!isEqual(day, selectedDay) || isEqual(day, selectedDay)) &&
                    (isToday(day) || !isToday(day)) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    !meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) &&
                    !isSunday(day) &&
                    !isPast(day) &&
                    "text-success-20 hover:border border-success-20 transition duration-300 ease-in",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto relative flex text-sm font-medium h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
                {hoverInfo.date && isSameDay(hoverInfo.date, day) && (
                  <p className="opacity-100 z-[100] translate-y-0 absolute top-[-50px] transform translate-x-[-50%] font-medium left-[50%] w-max py-[7px] px-[20px] rounded-sm bg-neutral-110 text-[13px] dark:text-[#abc2d3] text-neutral-135  transition-all duration-200">
                    {hoverInfo.status}
                    {/* arrow */}
                    <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>

        <div
          className={`${
            (isPast(selectedDay) && !isToday(selectedDay)) ||
            meetings.some((meeting) =>
              isSameDay(parseISO(meeting.startDatetime), selectedDay)
            ) || !isSameMonth(selectedDay, firstDayCurrentMonth) || isSunday(selectedDay)
              ? "hidden"
              : "block"
          } `}
        >
          <h2 className="mt-12 text-gray-900 mb-5">
            Choose slot time (only 30min)
          </h2>
          <TimePicker />
          <div></div>
        </div>
        {/* <section className="mt-12 md:mt-0 md:pl-14">
          <h2 className="font-semibold text-gray-900">
            Schedule for{" "}
            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
              {format(selectedDay, "MMM dd, yyy")}
            </time>
          </h2>
        </section> */}

      </div>
    </div>
  );
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
