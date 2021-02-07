import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import CreateResumeForm from "./components/CreateResumeForm";
import NavbarComponent from "./components/Navbar";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <Container>
        <CreateResumeForm />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
