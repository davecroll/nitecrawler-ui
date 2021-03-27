import { useAuthContext } from "../AuthProvider/AuthProvider";
import { LoginButton } from "./LoginButton/LoginButton";
import { LogoutButton } from "./LogoutButton/LogoutButton";

export const AuthWidget: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <>
      {!!user ? (
        <>
          <div style={{ padding: "25px" }}>
            <LogoutButton />
          </div>
          <div>hello {user.nickname}</div>
        </>
      ) : (
        <div style={{ padding: "25px" }}>
          <LoginButton />
        </div>
      )}
    </>
  );
};
