/** Decorative SVG silhouettes; they are not product images. */
const positions = ['bird--01','bird--02','bird--03','bird--04','bird--05','bird--06','bird--07'];
export function Birds({className = ''}: {className?: string}) {
  return <div className={`birds ${className}`} aria-hidden="true">
    {positions.map((position) => <svg key={position} className={`bird ${position}`} viewBox="0 0 120 58" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <path className="bird__wing bird__wing--left" d="M59 37C42 20 21 10 5 27c19-4 33 17 54 16Z" fill="currentColor"/>
      <path className="bird__wing bird__wing--right" d="M59 37C76 20 99 8 116 26c-24-4-33 16-57 17Z" fill="currentColor"/>
      <path d="M51 32q8 9 17 0l-9 15Z" fill="currentColor"/>
    </svg>)}
    <span className="sr-only">Đàn chim bay trên bầu trời</span>
  </div>;
}
