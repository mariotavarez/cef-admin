import axios from "axios";

interface IProps {
  url: string;
  body?: any;
}

const useFetch = () => {
  // const base = "http://cronomonkey.com/stp-estados-financieros/api";
  const base = "https://stp.mx/estados-financieros/api";
  // Post Request
  const postRequest = async ({ url, body }: IProps) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const response = await axios.post(`${base}/${url}`, body, config);

    return response;
  };
  // Get Request
  const getRequest = async ({ url }: IProps) => {
    const response = await axios.get(`${base}/${url}`);

    return response;
  };

  return { postRequest, getRequest };
};

export default useFetch;
