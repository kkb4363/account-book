import { useState } from "react";

export default function useHandler(initial) {
  // const initialState = Object.fromEntries(initial.map((field) => [field, false]));
  const initialState = [];
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
}
