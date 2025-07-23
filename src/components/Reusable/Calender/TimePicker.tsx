import { useState } from "react";

const TimePicker = ({ disabled = true }) => {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  return (
    <div className="flex items-center space-x-2 ">
      {/* Hour */}
      <select
        className="border border-neutral-120 rounded-lg px-3 py-1 text-sm text-medium tracking-wide  text-neutral-110 focus:outline-none "
        value={hour}
        onChange={(e) => setHour(Number(e.target.value))}
        disabled={disabled}
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <span className="text-sm text-medium tracking-wide  text-neutral-110">:</span>

      {/* Minute */}
      <select
        className="border border-neutral-120 rounded-lg px-3 py-1 text-sm text-medium tracking-wide  text-neutral-110 focus:outline-none "
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        disabled={disabled}
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* AM/PM */}
      <select
        className="border border-neutral-120 rounded-lg px-3 py-1 text-sm text-medium tracking-wide  text-neutral-110 focus:outline-none "
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        disabled={disabled}
      >
        {periods.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
