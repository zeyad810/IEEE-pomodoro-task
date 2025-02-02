    function Setting({
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    setShowSettings,
    }) {
    function handelTimer() {
        setShowSettings((setting) => !setting);
    }
   
    return (
        <section >
        <div>
            <h2>workTime Is: {workTime}.00</h2>

            <input
            type="range"
            max={120}
            value={workTime}
            onChange={(e) => setWorkTime(e.target.value)}
            />
        </div>
        <div>
            <h2>breakTime Is : {breakTime}.00</h2>
            <input
            type="range"
            value={breakTime}
            max={120}
            onChange={(e) => setBreakTime(e.target.value)}
            />
        </div>
        <button
            style={{
            fontSize: 18,
            width: 280,
            margin: "10px 0 ",
            border: "1px solid #007bff",
            borderRadius: 20,
            }}
            onClick={handelTimer}
        >
            Confirm Timer
        </button>
        </section>
    );
    }

    export default Setting;
