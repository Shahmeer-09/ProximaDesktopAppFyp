import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Toaster } from "sonner";
import ControlLayout from "./layouts/ControlLayout";
import AuthButton from "./components/AuthButton";
import Widget from "./components/Widget";

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <ControlLayout>
          <AuthButton />
          <Widget/>
        </ControlLayout>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
