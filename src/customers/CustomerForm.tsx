import "./CustomerForm.css/";

import { ChangeEvent, useState } from "react";
import "./CustomerForm.css/";
import { Customer } from "../services/types";

interface CustomerFormProps {
  onChange: (customer: Customer) => void;
}

export default function CustomerForm({ onChange }: CustomerFormProps) {
  const [customerForm, setCustomerForm] = useState<Customer>({
    id: null,
    fullName: "",
    email: "",
    phone: "",
    birthDate: null,
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCustomerForm({ ...customerForm, [name]: value });
    onChange({ ...customerForm, [name]: value });
  }

  return (
    <div id="customer-form">
      <label htmlFor="fullName">Full Name:</label>
      <input type="text" name="fullName" onChange={handleInputChange} />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" onChange={handleInputChange} />
      <label htmlFor="phone">Phone:</label>
      <input type="text" name="phone" onChange={handleInputChange} />
      <label htmlFor="birthDate">Birth Date:</label>
      <input type="date" name="birthDate" onChange={handleInputChange} />
    </div>
  );
}
