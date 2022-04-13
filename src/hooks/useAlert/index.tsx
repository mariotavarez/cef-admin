import { ToastContainer, toast } from "react-toastify";

const useAlert = () => {
  const notify = (message: string, type: string) => {
    if (type === "success") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return { notify };
};

export default useAlert;
