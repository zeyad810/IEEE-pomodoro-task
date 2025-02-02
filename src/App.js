import Timer from "./components/Timer";
import "./App.css";
import { useState } from "react";
import Setting from "./components/Setting";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(45);
  const [breakTime, setBreakTime] = useState(10);
  return (
    <main>
      <section>
        {showSettings ? (
          <Setting
            workTime={workTime}
            setWorkTime={setWorkTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            setShowSettings={setShowSettings}
          />
        ) : (
          <Timer
            setShowSettings={setShowSettings}
            workTime={workTime}
            breakTime={breakTime}
          />
        )}
      </section>
    </main>
  );
}

export default App;
