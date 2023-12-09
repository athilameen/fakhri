import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileForm } from "@/features/user";

function NotificationMessage({ children, alertClass }) {

  const dispatch = useDispatch();

  const clearNotificationMsg = () => {
    dispatch(
      profileForm({
        form: "",
        notification: "",
      })
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotificationMsg()
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-md-12 mt-10">
      <div className={`alert-${alertClass} alert fade in`}>
        <button type="button" className="close" onClick={clearNotificationMsg}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
  
}

export default NotificationMessage;
