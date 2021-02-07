import axios from "axios";

const getPDF = async (formData) => {
  try {
    const { data } = await axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_URL,
      data: {
        resumeData: formData,
      },
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
    });
    const blob = new Blob([data], { type: "application/pdf" });
    return blob;
  } catch (err) {
    console.log(err);
  }
};

export default getPDF;
