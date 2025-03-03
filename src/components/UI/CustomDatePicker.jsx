import React, {forwardRef} from 'react'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import "react-datepicker/dist/react-datepicker.css"

const CustomDatePicker = ({name, date, onDateChange, isClearable = true}) => {

const ExampleCustomInput = forwardRef(({value, onClick}, ref)=>(
    <button className={clsx("datepicker-btn", value ? "date-input-value" : "date-input-placeholder")} onClick={onClick} ref={ref}>{value ? moment(value).format("DD MM YYYY") : "Due Date"}</button>
))

  return (
    <div className='input-field-datepicker'>
      <DatePicker name={name} selected={date} onChange={onDateChange} isClearable={isClearable} customInput={<ExampleCustomInput />} />
    </div>
  )
}

export default CustomDatePicker