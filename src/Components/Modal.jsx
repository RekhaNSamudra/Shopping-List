import React from "react";
import { useSelector } from "react-redux";

const Modal = ({ id, setShowPopup }) => {
  const allItems = useSelector((state) => state.shoppingList.items);

  const singleItem = allItems.filter((item) => item.id === id);
  console.log("singleuser", singleItem);
  return (
    <>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h3>Item Details</h3>
              <p>Name: {singleItem[0].item}</p>
              <p>Quantity: {singleItem[0].quantity}</p>
              <p>Unit: {singleItem[0].unit}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
