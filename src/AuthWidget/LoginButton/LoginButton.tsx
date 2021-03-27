import { PrimaryButton } from "@fluentui/react";
import { useAuthContext } from "../../AuthProvider/AuthProvider";

export const LoginButton: React.FC = () => {
  const { login } = useAuthContext();

  const handleLoginClick = () => {
    if (login) {
      login();
    }
  };

  return <PrimaryButton onClick={handleLoginClick}>Login</PrimaryButton>;
};
