import { useState } from 'react';

const UseHandler = (initial) => {
  const initialState = Object.fromEntries(initial.map((field) => [field, false]));
  const [open, setOpen] = useState(initialState);

  const closeAll = () => {
    setOpen(initialState);
  };
  const handleToggle = (field) =>
    setOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  return [open, closeAll, handleToggle];
};

export default UseHandler;
