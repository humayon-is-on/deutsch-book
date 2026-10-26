"""Records the same sentences with several Piper German voices to compare them.
Usage: python scripts/voice-samples.py <voices dir> <out dir>"""
import os, subprocess, sys, tempfile, wave
from piper import PiperVoice, SynthesisConfig

TEXT = "Guten Tag! Ich heiße Anna und ich komme aus Bangladesch. Möchten Sie einen Kaffee? Das Wetter ist heute sehr schön."
SLOW = 1.25
voices_dir, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for name in sorted(f[:-5] for f in os.listdir(voices_dir) if f.endswith(".onnx")):
    voice = PiperVoice.load(os.path.join(voices_dir, name + ".onnx"))
    speakers = [None] if voice.config.num_speakers <= 1 else list(range(min(voice.config.num_speakers, 4)))
    for sp in speakers:
        label = name if sp is None else f"{name}-speaker{sp}"
        with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
            with wave.open(tmp.name, "wb") as w:
                voice.synthesize_wav(TEXT, w, syn_config=SynthesisConfig(length_scale=SLOW, speaker_id=sp))
            subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-i", tmp.name, "-ac", "1",
                            "-codec:a", "libmp3lame", "-b:a", "48k", os.path.join(out, label + ".mp3")],
                           check=True, stdin=subprocess.DEVNULL)
        print("recorded", label, flush=True)
