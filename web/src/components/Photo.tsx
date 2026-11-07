import { useState, type CSSProperties } from 'react';
import { DEMO_IMAGE, images } from '../data/images';

export type PhotoProps = {
  id: string;
  className?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  priority?: boolean;
  ratio?: string;
  label?: string;
};

export function Photo({id, className = '', fit = 'cover', position, priority = false, ratio, label}: PhotoProps) {
  const entry = images[id];
  if (!entry) throw new Error(`Missing image key: ${id}`);
  const [failed, setFailed] = useState(false);
  const image = failed ? DEMO_IMAGE : entry.src;
  const style = {
    '--photo-ratio': ratio || entry.aspectRatio,
    '--photo-position': position || entry.objectPosition,
    '--photo-fit': fit,
  } as CSSProperties;
  return <figure className={`photo ${className}`} style={style} data-image-id={id}>
    <img
      src={image}
      alt={entry.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => { if (!failed && image !== DEMO_IMAGE) setFailed(true); }}
    />
    {label && <figcaption className="photo__label">{label}</figcaption>}
  </figure>;
}
