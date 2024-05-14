import "./Activities.css";
import { LaneTable } from "../services/types";
import { useEffect, useState } from "react";

interface AirTablesProps {
  lanesTables: LaneTable[];
  onChange: (tables: number[]) => void;
}

export default function AirTables({ lanesTables, onChange }: AirTablesProps) {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tableId = parseInt(e.target.id.split("-")[1]);
    if (e.target.checked) {
      setSelectedTables([...selectedTables, tableId]);
    } else {
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    }
  }

  useEffect(() => {
    onChange(selectedTables);
  }, [selectedTables, onChange]);

  return (
    <>
      <h3>Choose up to 4 lanes:</h3>
      <div className="lanes-tables-form">
        {lanesTables.map((laneTable) => {
          if (laneTable.type === "table") {
            return (
              <div key={laneTable.id}>
                <input
                  type="checkbox"
                  id={`airTable-${laneTable.id}`}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={`airTable-${laneTable.id}`}
                >{`${laneTable.id}`}</label>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
