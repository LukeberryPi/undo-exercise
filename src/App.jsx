import { useState, useRef } from "react";

const useReversibleState = (initialState) => {
  const [currentState, setCurrentState] = useState(initialState);
  const previousStateRef = useRef(null);
  const isUndoPerformedRef = useRef(false);

  const setReversibleState = (newState) => {
    previousStateRef.current = currentState;
    setCurrentState(newState);
    isUndoPerformedRef.current = false;
  };

  const undo = () => {
    if (!isUndoPerformedRef.current && previousStateRef.current !== null) {
      setCurrentState(previousStateRef.current);
      isUndoPerformedRef.current = true;
    }
  };

  return [currentState, setReversibleState, undo];
};

export default function App() {
  const [dataArray, setReversibleArray, undo] = useReversibleState([]);

  const handleAddElement = () => {
    const newArray = [...dataArray, dataArray.length + 1];
    setReversibleArray(newArray);
  };

  const handleRemoveElement = () => {
    const newArray = dataArray.slice(0, dataArray.length - 1);
    setReversibleArray(newArray);
  };

  return (
    <div>
      <button onClick={handleAddElement}>Add Element</button>
      <button onClick={handleRemoveElement}>Remove Element</button>
      <button onClick={undo}>Undo</button>
      <div>{JSON.stringify(dataArray)}</div>
    </div>
  );
}
