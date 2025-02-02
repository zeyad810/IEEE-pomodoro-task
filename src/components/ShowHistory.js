    function ShowHistory({ sessionHistory }) {
    return (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Session History 📜</h3>
        <ul
            style={{
            listStyle: "none",
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
            }}
        >
            {sessionHistory.length > 0 ? (
            sessionHistory.map(({ mode, completedAt, duration }, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                {mode.toUpperCase()} - {duration} min -{completedAt}
                </li>
            ))
            ) : (
            <p>No sessions recorded yet.</p>
            )}
        </ul>
        </div>
    );
    }

    export default ShowHistory;
