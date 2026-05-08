import "./MasterCardLogo.css";

export function MasterCardLogo({ size = 28 }) {
  return (
    <img
      src="/mc-logo.svg"
      alt="Mastercard"
      className="mc-logo"
      width={size * 1.625}
      height={size}
      draggable="false"
    />
  );
}
