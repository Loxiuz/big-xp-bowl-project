import "./EquipmentOrderDialog.css";
import { Equipment, equipmentOrderDialogProps } from "../services/types";
import { useEffect, useState } from "react";
import { createUpdateEquipment } from "../services/EquipmentApi";

export default function EquipmentOrderDialog({
  equipment,
  isOpen: open,
  onClose,
}: equipmentOrderDialogProps) {
  const [equipmentForm, setEquipmentForm] = useState<Equipment>({
    id: null,
    name: "",
    quantity: 0,
    status: "",
  });

  useEffect(() => {
    setEquipmentForm(equipment);
  }, [equipment]);

  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setEquipmentForm({ ...equipmentForm, [name]: value });
  }

  function onTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setEquipmentForm({ ...equipmentForm, [name]: value });
  }

  useEffect(() => {
    console.log(equipmentForm);
  });

  async function handleSubmit() {
    if (equipmentForm.id) {
      const response = await createUpdateEquipment(equipmentForm);
      if (response) {
        window.location.reload();
      } else {
        alert("Error updating equipment");
      }
    }
  }

  return (
    <>
      {open && (
        <dialog open id="equipment_order_dialog">
          <div id="equipment_order_dialog_content">
            <h2>Order Equipment</h2>
            <h3>{equipment.name}</h3>
            <div id="order_dialog_status">
              <h4>Current Status: </h4>
              <textarea
                name="status"
                defaultValue={equipment.status}
                rows={3}
                onChange={onTextAreaChange}
              />
            </div>
            <label htmlFor="quantity">Current Quantity: </label>
            <input
              type="number"
              name="quantity"
              defaultValue={equipment.quantity}
              onChange={onFormChange}
            />
            <br />
            <label htmlFor="order_quantity">Order Quantity: </label>
            <input type="number" name="order_quantity" />
            <br />
            <br />

            <button onClick={onClose} id="cancel_btn">
              Cancel
            </button>
            {equipmentForm.quantity !== equipment.quantity ||
            equipmentForm.status !== equipment.status ? (
              <button onClick={handleSubmit}>Save</button>
            ) : null}
            <button>Order</button>
          </div>
        </dialog>
      )}
    </>
  );
}
