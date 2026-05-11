export function Separator({ className = "" }) {
  return <div aria-hidden="true" className={`h-px w-full bg-ink/10 ${className}`.trim()} />;
}
