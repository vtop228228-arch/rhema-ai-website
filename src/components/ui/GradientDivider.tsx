export default function GradientDivider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent 0%, rgba(77,159,255,0.45) 35%, rgba(37,99,235,0.2) 65%, transparent 100%)',
      flexShrink: 0,
    }} />
  );
}
