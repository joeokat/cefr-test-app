# Listening-clip audio

`clip-41.mp3` through `clip-50.mp3` are real spoken audio, generated with
a local text-to-speech engine (eSpeak NG, Received Pronunciation voice) —
not placeholder tones. This gives a standard, consistent pronunciation
across all clips rather than variation from a human recording.

The script for each clip lives alongside its question in
`src/data/questions.js` (search `type: 'audio'`) as the `transcript`
field, so you can regenerate or edit any clip later without hunting for
the original text.

If you'd ever prefer a warmer, human-recorded voice instead, replace the
files here with real recordings — same filenames, or update `audioUrl` in
the question data if you rename them.
