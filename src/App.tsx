import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouter";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { LOGO_IC } from "./Assets";
import { LOADER } from "./Components";

function App() {
  function FallbackLoader() {
    return <LOADER />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoader />}>
        <AppRouter />
        <Toaster position="top-right" />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
