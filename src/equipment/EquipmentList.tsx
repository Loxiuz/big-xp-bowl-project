import "./EquipmentList.css";
import { useEffect, useState } from "react";
import { Equipment } from "../services/types";
import { getEquipment } from "../services/EquipmentApi";
import EquipmentOrderDialog from "./EquipmentOrderDialog";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>({
    id: 0,
    name: "",
    quantity: 0,
    status: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      const response = await getEquipment();
      setEquipment(response);
    };
    fetchEquipment();
  }, [setEquipment]);

  function equipmentRow() {
    return equipment.map((equipment) => {
      return (
        <tr key={equipment.id}>
          <td>{equipment.name}</td>
          <td>{equipment.quantity}</td>
          <td>
            <button
              onClick={() => {
                setSelectedEquipment(equipment);
                setIsDialogOpen(true);
              }}
            >
              {". . ."}
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h2>Equipment</h2>
      <table id="equipment_list_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Details/Status</th>
          </tr>
        </thead>
        <tbody>{equipmentRow()}</tbody>
      </table>
      <EquipmentOrderDialog
        equipment={selectedEquipment}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}
