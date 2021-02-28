import { AuthProvider } from "./AuthProvider/AuthProvider";
import { AuthWidget } from "./AuthWidget/AuthWidget";
import { PublicationList } from "./PublicationList/PublicationList";

function App() {
  return (
    <AuthProvider>
      <AuthWidget />
      <PublicationList />
    </AuthProvider>
  );
}

export default App;
