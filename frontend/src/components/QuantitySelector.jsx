function QuantitySelector({ symbol, event, showShadow = false }) {
  return (
    <div
      className='prevent-select'
      style={{
        width: "24px",
        height: "24px",
        backgroundColor: "var(--brand-color-other)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: showShadow ? "var(--brand-color-other) 2px 2px 10px" : null,
      }}
      onClick={event}
    >
      <span
        style={{
          color: "white",
          fontWeight: "800",
          marginTop: "0px",
        }}
      >
        {symbol}
      </span>
    </div>
  )
}
export default QuantitySelector
