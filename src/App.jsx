import "./App.css";
import { Outlet } from "react-router-dom";
import { ScreeningDetails } from "./components/ScreeningDetails/ScreeningDetails";

const testscreening = {
  id: 45,
  screeningDate: "Tisdag 24 okt. kl: 19:00",
  language: "sv",
  subtitle: "sv",
  theatre: "Lilla Visaren",
  totalSeats: "55",
  freeSeats: "55",
};
function App() {
  return (
    <>
      <ScreeningDetails screening={testscreening} />
      <Outlet />
    </>
  );
}

export default App;
