export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
  angle?: number;
  spin?: number;
  sparkle?: boolean;
  type?: 'sparkle' | 'petal' | 'star';
}

export interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spin: number;
  alpha: number;
  color: string;
  swaySpeed: number;
  swayValue: number;
}

export interface Bokeh {
  x: number;
  y: number;
  size: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  color: string;
}
