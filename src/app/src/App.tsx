import { ToastProvider } from "@components/ui/Toast/ToastProvider";
import { Routes } from "@core/routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
      <ToastProvider position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;
