
import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const LogoutButton = async () => {
  
  const { push } = useRouter();

  function logoutHandler() {
    cookies().delete(COOKIE_NAME);
    push("/");
  }

  return (
    <a onClick={logoutHandler} className="btn btn-register">
      Log Out
    </a>
  );
};

export default LogoutButton;
