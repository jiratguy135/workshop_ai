import React, { useState, useMemo, useEffect, useRef } from 'react'
import './Datepicker.css'

const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const datepickerRef = useRef(null)

  const formattedDate = useMemo(() => 
    selectedDate ? selectedDate.toLocaleDateString() : '', 
    [selectedDate]
  )

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const calendarDays = useMemo(() => {
    const days = []
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    
    // Previous month days
    const prevMonthDays = daysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        otherMonth: true,
      })
    }
    
    // Current month days
    const thisMonthDays = daysInMonth(currentYear, currentMonth)
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({ 
        date: new Date(currentYear, currentMonth, i), 
        otherMonth: false 
      })
    }
    
    // Next month days (fill to 6 weeks grid)
    const nextDays = 42 - days.length
    for (let i = 1; i <= nextDays; i++) {
      days.push({ 
        date: new Date(currentYear, currentMonth + 1, i), 
        otherMonth: true 
      })
    }
    
    return days
  }, [currentYear, currentMonth])

  const currentMonthName = useMemo(() =>
    new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }),
    [currentYear, currentMonth]
  )

  const toggleCalendar = () => setShowCalendar(!showCalendar)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const selectDate = (day) => {
    if (day.otherMonth) return
    setSelectedDate(day.date)
    setShowCalendar(false)
  }

  const isSelected = (day) =>
    selectedDate && day.date.toDateString() === selectedDate.toDateString()

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="datepicker-container" ref={datepickerRef}>
      <input
        type="text"
        readOnly
        value={formattedDate}
        onClick={toggleCalendar}
        placeholder="Select date"
        className="datepicker-input"
      />
      {showCalendar && (
        <div className="datepicker-calendar">
          {/* Header */}
          <div className="datepicker-header">
            <button onClick={prevMonth} className="datepicker-nav-btn">
              &lt;
            </button>
            <span className="datepicker-month-year">
              {currentMonthName} {currentYear}
            </span>
            <button onClick={nextMonth} className="datepicker-nav-btn">
              &gt;
            </button>
          </div>
          
          {/* Weekdays */}
          <div className="datepicker-weekdays">
            {weekdays.map((day) => (
              <span key={day} className="datepicker-weekday">
                {day}
              </span>
            ))}
          </div>
          
          {/* Days */}
          <div className="datepicker-days">
            {calendarDays.map((day, index) => (
              <span
                key={index}
                onClick={() => selectDate(day)}
                className={`datepicker-day ${
                  day.otherMonth ? 'other-month' : ''
                } ${isSelected(day) ? 'selected' : ''}`}
              >
                {day.date.getDate()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Datepicker
