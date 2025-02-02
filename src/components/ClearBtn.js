function ClearBtn({clearHistory}) {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={clearHistory}
          style={{
            padding: "8px 15px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Clear History
        </button>
      </div>
    </div>
  );
}

export default ClearBtn;
