import { toast } from "react-toastify";

export default function showToast(text, type="success", autoClose){
  toast[type](text, {
    position: "top-center",
    autoClose: autoClose || 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}