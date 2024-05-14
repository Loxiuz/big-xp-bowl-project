import { useEffect, useState } from "react";
import { BookingCalendarProps } from "../services/types";

export default function BookingCalendar({
  availableDates,
  availableTimes,
  onDateTimeSelected,
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setSelectedDateTime(selectedDate);
  };

  useEffect(() => {
    if (selectedDateTime && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      selectedDateTime.setHours(hours);
      selectedDateTime.setMinutes(minutes);
      if (onDateTimeSelected) {
        onDateTimeSelected(selectedDateTime);
      }
    }
  });

  return (
    <div>
      <h2>Booking Times</h2>
      <div>
        {availableDates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={(e) => {
              e.preventDefault();
              handleDateClick(date);
            }}
            style={{
              backgroundColor: selectedDate === date ? "green" : "black",
            }}
          >
            {date.toLocaleDateString()}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div>
          <h3>Selected Date: {selectedDate.toLocaleDateString()}</h3>
          <ul>
            {availableTimes.map((timeSlot) => (
              <button
                key={timeSlot}
                onClick={(e) => {
                  e.preventDefault();
                  handleTimeClick(timeSlot);
                }}
                style={{
                  backgroundColor:
                    selectedTime === timeSlot ? "green" : "black",
                }}
              >
                {timeSlot}
              </button>
            ))}
            {selectedTime && <p>Selected Time: {selectedTime}</p>}
          </ul>
        </div>
      )}
    </div>
  );
}
