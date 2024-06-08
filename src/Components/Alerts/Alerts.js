import { toast } from "react-toastify";
export const successAlert = (message) => {
  toast.success(message,{
    theme:"dark"
  });
};
export const errorAlert = (message) => {
  toast.error(message,{
    theme:"dark"
  });
};
