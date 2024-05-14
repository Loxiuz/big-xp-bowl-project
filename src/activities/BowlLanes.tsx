import "./Activities.css";
import { LaneTable } from "../services/types";
import { useEffect, useState } from "react";

interface BowlLanesProps {
  lanesTables: LaneTable[];
  onChange: (lanes: number[]) => void;
}

export default function BowlLanes({ lanesTables, onChange }: BowlLanesProps) {
  const [selectedLanes, setSelectedLanes] = useState<number[]>([]);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const laneId = parseInt(e.target.id.split("-")[1]);
    if (e.target.checked) {
      setSelectedLanes([...selectedLanes, laneId]);
    } else {
      setSelectedLanes(selectedLanes.filter((id) => id !== laneId));
    }
  }

  useEffect(() => {
    onChange(selectedLanes);
  }, [selectedLanes, onChange]);

  return (
    <>
      <h3>Choose up to 4 lanes:</h3>
      <div className="lanes-tables-form">
        {lanesTables.map((laneTable) => {
          if (laneTable.type === "lane") {
            return (
              <div key={laneTable.id}>
                <input
                  type="checkbox"
                  id={`lane-${laneTable.id}`}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={`lane-${laneTable.id}`}
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
