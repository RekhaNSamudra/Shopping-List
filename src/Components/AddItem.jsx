import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/shoppingListSlice";

const AddItem = () => {
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    unit: "kg",
  });

  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.shoppingList.items);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const { item, quantity } = formData;

    if (!item.trim() || !quantity || isNaN(quantity) || Number(quantity) <= 0) {
      alert("Please enter valid item and quantity");
      return;
    }
    console.log("Submitted", formData);
    // Add your submit logic here
    dispatch(createUser(formData));
  };

  const handleClear = () => {
    setFormData({
      item: "",
      quantity: "",
      unit: "kg",
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className={styles.addItemContainer}>
          <div className="d-flex justify-content-between">
            <h3>Add Item</h3>
            <Link to="/list">
              <button className={styles.noButtonStyle}>
                {" "}
                Shopping List(
                <span style={{ color: "red" }}>{allItems.length}</span>)
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label>Item</label>
                <input
                  type="text"
                  className="form-control"
                  name="item"
                  value={formData.item}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label>Unit</label>
                <select
                  className="form-select"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                >
                  <option value="kg">kg</option>
                  <option value="litre">litre</option>
                  <option value="units">units</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
