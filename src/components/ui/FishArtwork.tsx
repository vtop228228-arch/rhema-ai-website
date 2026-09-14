// Use the original fish silhouette, including its tapered tail, without redrawing it.
export default function FishArtwork({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="80 190 470 250" width="470" height="250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <image href="/logo.png" width="1725" height="624" />
    </svg>
  );
}
