import { Modal } from "react-bootstrap";

const Loader = ({ visible }) => {
  return (
    <Modal show={visible}>
      <Modal.Body>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span class="sr-only">Generating your PDF...</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Loader;
