import React, { useEffect, useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense, initialData }) => {
  // Use `initialData` to pre-fill the form for editing
  const [expense, setExpense] = useState({
    category: initialData?.category || '',
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    date: initialData?.date || '',
    icon: initialData?.icon || '',
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setExpense({
        category: initialData.category || '',
        description: initialData.description || '',
        amount: initialData.amount || '',
        date: initialData.date || '',
        icon: initialData.icon || '',
      });
    }
  }, [initialData]);
  

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!expense.category || !expense.amount || !expense.date) {
      alert("Please fill in all required fields");
      return;
    }

    onAddExpense(expense);

    // Reset form only when adding a new expense
    if (!initialData) {
      setExpense({
        category: '',
        description: '',
        amount: '',
        date: '',
        icon: '',
      });
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      <Input
        value={expense.description}
        onChange={({ target }) => handleChange('description', target.value)}
        label="Description"
        placeholder=""
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          {initialData ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
