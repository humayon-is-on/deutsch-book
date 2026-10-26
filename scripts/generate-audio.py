"""Records German words and sentences with Piper (voice: Thorsten).

Usage: python scripts/generate-audio.py <voice.onnx> < todo.jsonl
Reads the list from scripts/audio-list.ts and writes each recording as a small
mono MP3 to content/<file>. Run by the "Generate audio" workflow.
"""
import json
import os
import subprocess
import sys
import tempfile
import wave

from piper import PiperVoice, SynthesisConfig

voice = PiperVoice.load(sys.argv[1])
# A little slower than normal speech, for learners.
config = SynthesisConfig(length_scale=1.12)

done = 0
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    job = json.loads(line)
    target = os.path.join("content", job["file"])
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        with wave.open(tmp.name, "wb") as wav:
            voice.synthesize_wav(job["text"], wav, syn_config=config)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ac", "1", "-ar", "22050",
             "-codec:a", "libmp3lame", "-b:a", "32k", target],
            check=True,
        )
    done += 1
    if done % 100 == 0:
        print(f"{done} recorded", flush=True)
print(f"{done} recorded in total")
