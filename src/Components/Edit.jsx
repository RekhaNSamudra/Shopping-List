import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editItem } from "../features/shoppingListSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({});

  const { items, loading } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    if (id) {
      const singleItem = items.find((ele) => ele.id === id);
      setUpdateData(singleItem);
    }
  }, [id, items]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editItem(updateData));
    navigate("/list");
  };

  return (
    <div>
      <h2 className="text-center my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-8 mx-auto">
              <label className="form-label">Item Name</label>

              <input
                type="text"
                name="item"
                className="form-control"
                value={updateData.item || ""}
                onChange={newData}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-8 mx-auto">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                value={updateData.quantity || ""}
                onChange={newData}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-8 mx-auto">
              <label className="form-label">Units</label>
              <input
                type="text"
                name="unit"
                className="form-control"
                value={updateData.unit || ""}
                onChange={newData}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
