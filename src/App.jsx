import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

function App() {
  // Add Modal State
  const [modal, setModal] = useState(false);

  // Edit Modal State
  const [editModal, setEditModal] = useState(false);

  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [email, setEmail] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [id, setId] = useState("");

  const handleClose = () => {
    setModal(false);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://6364e8ccf711cb49d1efbe1e.mockapi.io/crudOperation`
      );
      console.log("Get Data", response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dataUpdate]);

  const handleAdd = () => {
    const data = { name: name, email: email };
    console.log("Save data", data);
    axios
      .post(`https://6364e8ccf711cb49d1efbe1e.mockapi.io/crudOperation`, data)
      .then(function (response) {
        setDataUpdate(response);
        setModal(false);
        setName("");
        setEmail("");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://6364e8ccf711cb49d1efbe1e.mockapi.io/crudOperation/${id}`)
      .then(function (response) {
        setDataUpdate(response);
      });
  };

  const editShow = (id, name, email) => {
    console.log("ID", id);
    setEditModal(true);
    setId(id);
    setEditName(name);
    setEditEmail(email);
  };

  const handleUpdate = (id) => {
    const data = { name: editName, email: editEmail };
    console.log("Update data", data);
    axios
      .put(
        `https://6364e8ccf711cb49d1efbe1e.mockapi.io/crudOperation/${id}`,
        data
      )
      .then(function (response) {
        setDataUpdate(response);
        setEditModal(false);
      });
  };

  const handleSave = () => {
    handleUpdate(id);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between m-3">
        <h1>Crud Operation (API)</h1>
        <Button variant={"outline-info"} onClick={() => setModal(true)}>
          Add Data
        </Button>
      </div>

      {/* Add Modal here */}
      <Modal
        size="lg"
        show={modal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>Add Data</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <form>
              <div className="mb-3 mr-20">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={"primary"}
            className="custom-btn"
            onClick={handleAdd}
          >
            Save
          </Button>
          <Button
            variant={"secondary"}
            className="custom-btn"
            onClick={handleClose}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <div className="container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {data.map((item) => (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant={"outline-primary"}
                    className="custom-btn"
                    onClick={() => editShow(item.id, item.name, item.email)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant={"outline-danger"}
                    className="custom-btn m-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        size="lg"
        show={editModal}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>Add Data</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <form>
              <div className="mb-3 mr-20">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={"primary"}
            className="custom-btn"
            onClick={handleSave}
          >
            Update
          </Button>
          <Button
            variant={"secondary"}
            className="custom-btn"
            onClick={handleEditClose}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
