import React from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Utils/EditModalStyle.css";

axios.defaults.withCredentials = true;
ReactModal.setAppElement("#root");
const ConfirmDeletionModal = ({
  siteModal,
  setModal,
  modal,
  setSites,
  sites,
  close,
}) => {
  const config = {
    withCredentials: true,
  };

  const modalSubmit = async (e) => {
    setModal(false);

    try {
      await axios.delete(
        `http://localhost:5000/api/record-delete/${siteModal._id}`,
        config
      );
      setSites(
        sites.filter((val) => {
          return val._id !== setModal._id;
        })
      );
      toast.success("Permenantly Deleted", {
        autoClose: 1000,
        transition: Flip,
      });
      setSites(
        sites.filter((val) => {
          return val.deleted === false;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ReactModal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            position: "static",
            inset: "0px",
            border: "none",
            background: "none",
            visibility: "none",
          },
          overlay: { backgroundColor: "rgb(184 184 184 / 75%)" },
        }}
      >
        <section className="modal__container">
          <span onClick={() => setModal(false)} className="close">
            <FaTimes />
          </span>
          <h3 className="modal__container--title">Delete</h3>
          <p className="modal__container--subtitle">
            This step deletes record Permenantly
          </p>
          <div className="modal__container--form-buttons">
            <button onClick={() => modalSubmit()} className="change__buttons">
              Delete
            </button>
            <button onClick={() => setModal(false)} className="cancel__buttons">
              Cancel
            </button>
          </div>
        </section>
      </ReactModal>
    </>
  );
};

export default ConfirmDeletionModal;
