import { toast } from "react-toastify";

export const notify = (title, type, options, promise) => {
  switch (type) {
    case "success":
      toast.success(`${title}`, options);
      break;
    case "warning":
      toast.warning(`${title}`, options);
      break;
    case "info":
      toast.info(`${title}`, options);
      break;
    case "error":
      toast.error(`${title}`, options);
      break;
    case "promise":
      toast.promise(promise, {
        pending: "Promise is pending",
        success: "Promise  Loaded",
        error: "error",
      });
      break;
    default:
      toast(`${title}`, options);
  }
};
