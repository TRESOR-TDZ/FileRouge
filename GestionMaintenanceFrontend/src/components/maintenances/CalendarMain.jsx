import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import classNames  from 'classnames';
const cn = classNames;

const Calendar = ({ selected, onSelect, className }) => {
  return (
    <div className={cn('relative', className)}>
      <input
        type="date"
        value={selected ? format(selected, 'yyyy-MM-dd') : ''}
        onChange={(e) => onSelect(e.target.valueAsDate)}
        className="block w-full pl-3 pr-10 py-2 text-base border rounded-md"
      />
      <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export { Calendar };