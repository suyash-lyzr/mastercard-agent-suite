import "./MasterCardLogo.css";

export function MasterCardLogo({ size = 28 }) {
  const w = size * 1.55;
  const h = size;
  const r = size / 2;
  const overlap = size * 0.32;
  return (
    <svg
      className="mc-logo"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="Mastercard"
    >
      <circle cx={r} cy={r} r={r} fill="#EB001B" />
      <circle cx={w - r} cy={r} r={r} fill="#F79E1B" />
      <path
        d={`M ${w / 2 - overlap / 2 + overlap / 2},${r}
            a ${overlap / 2},${overlap / 2} 0 0,1 ${overlap},0
            a ${overlap / 2},${overlap / 2} 0 0,1 -${overlap},0`}
        fill="#FF5F00"
        opacity="0.95"
      />
    </svg>
  );
}
