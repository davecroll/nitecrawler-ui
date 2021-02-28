import { PrimaryButton } from "@fluentui/react";
import { useAuthContext } from "../AuthProvider/AuthProvider";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuthContext();

  const handleLogoutClick = () => {
    if (logout) {
      logout();
    }
  };

  return <PrimaryButton onClick={handleLogoutClick}>Logout</PrimaryButton>;
};
