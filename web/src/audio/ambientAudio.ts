/**
 * Subtle cinematic ambient sound generator using Web Audio API.
 * Modulates harmonic timbre with scroll scrubbing velocity.
 */
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private isPlaying = false;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(380, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // Warm chord (D major 9th / ambient drone)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(146.83, this.ctx.currentTime); // D3

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(220.00, this.ctx.currentTime); // A3

    this.osc3 = this.ctx.createOscillator();
    this.osc3.type = 'sine';
    this.osc3.frequency.setValueAtTime(277.18, this.ctx.currentTime); // C#4

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.osc3.connect(this.filter);
    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    const targetGain = this.isPlaying ? 0.08 : 0;
    this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.8);
    return this.isPlaying;
  }

  public updateVelocity(velocity: number) {
    if (!this.isPlaying || !this.ctx || !this.filter) return;
    const normalized = Math.min(Math.abs(velocity) * 40, 1);
    const targetFreq = 380 + normalized * 1200;
    this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
