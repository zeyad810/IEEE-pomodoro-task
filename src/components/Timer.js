import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayBtn from "./PlayBtn";
import PauseBtn from "./PauseBtn";
import SettingsBtn from "./SettingsBtn";
import { useEffect, useState, useRef } from "react";
import ClearBtn from "./ClearBtn";
import ShowHistory from "./ShowHistory";

function Timer({ setShowSettings, workTime, breakTime }) {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");
  const [sessionHistory, setSessionHistory] = useState([]);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function handleShowSettings() {
    setShowSettings((setting) => !setting);
  }

  function handlePlayPause() {
    setIsPaused((prev) => !prev);
    isPausedRef.current = !isPausedRef.current;
  }

  function initTimer() {
    const initialTime = workTime * 60;
    setSecondsLeft(initialTime);
    secondsLeftRef.current = initialTime;
  }

  function saveSession(prevMode, prevTime) {
    const newSession = {
      mode: prevMode,
      duration: prevTime,
      completedAt: new Date().toLocaleString(),
    };

    setSessionHistory((prev) => {
      const updatedSessions = [...prev, newSession];
      localStorage.setItem("sessionHistory", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
  }

  function clearHistory() {
    localStorage.removeItem("sessionHistory");
    setSessionHistory([]);
  }
  function handleMode() {
    const prevMode = modeRef.current;
    const prevTime = prevMode === "work" ? workTime : breakTime;
    saveSession(prevMode, prevTime);
    const nextMode = prevMode === "work" ? "break" : "work";
    const nextSeconds = nextMode === "work" ? workTime * 60 : breakTime * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        handleMode();
      } else {
        tick();
      }
    }, 10);

    return () => clearInterval(interval);
  }, [workTime, breakTime]);

  useEffect(() => {
    const storedSessions = localStorage.getItem("sessionHistory");
    if (storedSessions) {
      setSessionHistory(JSON.parse(storedSessions));
    }
  }, []);

  useEffect(() => {
    if (sessionHistory.length > 0) {
      localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }
  }, [sessionHistory]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {mode === "work" ? "Work Time 🏋️" : "Break Time ☕"}
      </h2>
      <CircularProgressbar
        value={secondsLeft}
        maxValue={mode === "work" ? workTime * 60 : breakTime * 60}
        text={`
        ${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}
        :
        ${String(secondsLeft % 60).padStart(2, "0")}`}
      />

      <div className="flex">
        <div onClick={handlePlayPause}>
          {isPaused ? <PlayBtn /> : <PauseBtn />}
        </div>
        <div>
          <SettingsBtn onClick={handleShowSettings} />
        </div>
      </div>

      <ShowHistory sessionHistory={sessionHistory} />
      <ClearBtn clearHistory={clearHistory} />
    </div>
  );
}

export default Timer;
