/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class ZenDrone {
  private ctx: AudioContext | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private secondaryOsc: OscillatorNode | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  start() {
    try {
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.resume();
        return;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Deep, resonant base tone (C2 65.4Hz)
      this.primaryOsc = this.ctx.createOscillator();
      this.primaryOsc.type = 'sine';
      this.primaryOsc.frequency.setValueAtTime(65.407, this.ctx.currentTime);

      const primaryGain = this.ctx.createGain();
      primaryGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      // Perfect fifth overtone (G2 98.0Hz)
      this.secondaryOsc = this.ctx.createOscillator();
      this.secondaryOsc.type = 'sine';
      this.secondaryOsc.frequency.setValueAtTime(97.999, this.ctx.currentTime);

      const secondaryGain = this.ctx.createGain();
      secondaryGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      // Connect sine oscillators
      this.primaryOsc.connect(primaryGain);
      this.secondaryOsc.connect(secondaryGain);

      primaryGain.connect(this.masterGain);
      secondaryGain.connect(this.masterGain);

      // Generate simulated low-pass wind/breath noise
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(220, this.ctx.currentTime); // Low wind frequency
      this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime); // Subtle wind whispering

      noiseSource.connect(this.filterNode);
      this.filterNode.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);

      // Organic LFO modulation to represent natural breathing (0.15Hz)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(0.15, this.ctx.currentTime); // Subtle modulation strength

      // Modulate the primary gain and wind frequency slightly
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(primaryGain.gain);

      // Start everything
      this.primaryOsc.start(0);
      this.secondaryOsc.start(0);
      noiseSource.start(0);
      this.lfo.start(0);

      // Elegant fade-in over 3 seconds
      this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 3);
    } catch (e) {
      console.warn("Audio initialization bypassed due to environment constraints or missing user click.", e);
    }
  }

  stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      // Elegant fade-out over 1.5 seconds to prevent pops
      const currentGain = this.masterGain.gain.value;
      this.masterGain.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);

      const context = this.ctx;
      setTimeout(() => {
        try {
          context.close();
        } catch (err) {}
      }, 1500);

      this.ctx = null;
    } catch (e) {
      console.error("Error stopping Zen drone", e);
    }
  }
}

export const zenDroneInstance = new ZenDrone();
