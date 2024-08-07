import React, { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  showUser,
  updateItemStatus,
  deleteItem,
} from "../features/shoppingListSlice";
import Modal from "./Modal";

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const { items, loading } = useSelector((state) => state.shoppingList);

  const handleCheck = (index) => {
    const item = items[index];
    dispatch(updateItemStatus({ id: item.id, bought: !item.bought }));
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  if (loading) {
    return <h2 className={styles.loading}>Loading...</h2>;
  }

  return (
    <>
      <div className={showPopup ? styles.modalBackground : ""}>
        {showPopup && (
          <Modal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
        )}
        <div className={showPopup ? styles.hiddenContent : ""}>
          <div style={{ marginLeft: "25%" }}>
            <Link to="/">Add Item</Link>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-6 col-sm-3">
              <div className={styles.tableContainer}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Bought</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td
                            style={{
                              textDecoration: item.bought
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {item.item}
                          </td>
                          <td>{item.quantity}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.bought}
                              onChange={() => handleCheck(index)}
                            />
                          </td>
                          <td>
                            <div className="d-flex justify-content-between">
                              <button
                                className={styles.noButtonStyle}
                                onClick={() => [
                                  setId(item.id),
                                  setShowPopup(true),
                                ]}
                              >
                                <i
                                  className={`bi bi-eye-fill ${styles.icon} ${styles.iconGreen}`}
                                ></i>
                              </button>
                              <Link
                                to={`/edit/${item.id}`}
                                className={styles.noLinkDecoration}
                              >
                                <i
                                  className={`bi bi-pencil-square ${styles.icon} ${styles.iconPurple}`}
                                ></i>
                              </Link>
                              <button
                                className={styles.noButtonStyle}
                                onClick={() => handleDelete(item.id)}
                              >
                                <i
                                  className={`bi bi-trash3 ${styles.icon} ${styles.iconRed}`}
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
