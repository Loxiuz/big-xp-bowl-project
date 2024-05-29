import "./CustomerForm.css/";

import { ChangeEvent, useEffect, useState } from "react";
import "./CustomerForm.css/";
import { Customer } from "../services/types";

interface CustomerFormProps {
  onChange: (customer: Customer) => void;
  customerToEdit?: Customer;
}

export default function CustomerForm({
  onChange,
  customerToEdit,
}: CustomerFormProps) {
  const [customerForm, setCustomerForm] = useState<Customer>({
    id: null,
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: null,
  });

  useEffect(() => {
    if (customerToEdit && customerToEdit.id) {
      const customer = {
        ...customerToEdit,
        birthDate: new Date(customerToEdit.birthDate || "0001:01:01T00:00:00Z"),
      };
      setCustomerForm(customer);
    }
  }, [customerToEdit, setCustomerForm]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCustomerForm({ ...customerForm, [name]: value });
    onChange({ ...customerForm, [name]: value });
  }

  return (
    <div id="customer-form">
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        name="fullName"
        onChange={handleInputChange}
        defaultValue={customerForm.fullName}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        onChange={handleInputChange}
        defaultValue={customerForm.email}
      />
      <label htmlFor="phoneNumber">Phone:</label>
      <input
        type="text"
        name="phoneNumber"
        onChange={handleInputChange}
        defaultValue={customerForm.phoneNumber}
      />
      <label htmlFor="birthDate">Birth Date:</label>
      <input
        type="date"
        name="birthDate"
        onChange={handleInputChange}
        defaultValue={customerForm.birthDate?.toISOString().split("T")[0]}
      />
    </div>
  );
}
