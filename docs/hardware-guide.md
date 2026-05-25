# Hardware Guide

A practical reference for **what your machine can actually run**. Numbers are field-tested rules of thumb, not theoretical maxima.

## How to read this guide

LLM inference is bottlenecked on two things:

1. **Memory** — the model weights have to fit. If they don't, you swap to disk and inference goes from "fast" to "unusable".
2. **Memory bandwidth** — once the model fits, tokens-per-second is roughly proportional to how fast your hardware can stream the weights through the compute units.

Quantization shrinks both. A 70B parameter model in full FP16 is ~140 GB. The same model in 4-bit quantization (Q4_K_M, common default) is ~40 GB. Quality loss for Q4 on modern models is small; for Q3 and below it becomes noticeable.

The tables below assume **GGUF Q4_K_M quantization** unless noted. Add ~20% headroom for KV cache (context window) and OS.

## VRAM by model size

| Model size | Q8 (~8 bpw) | Q5 (~5.5 bpw) | Q4 (~4.5 bpw) | Q3 (~3.5 bpw) | Notes |
|---|---|---|---|---|---|
| 1B–2B | 2 GB | 1.5 GB | 1 GB | 0.8 GB | Fits on phones. |
| 7B–8B | 9 GB | 6 GB | 5 GB | 4 GB | The "sweet spot" for laptops. |
| 13B | 15 GB | 10 GB | 8 GB | 6 GB | Fits on 8-12 GB consumer GPUs. |
| 30B–34B | 36 GB | 24 GB | 20 GB | 15 GB | Needs a 24 GB GPU minimum. |
| 70B | 75 GB | 50 GB | 40 GB | 30 GB | Two GPUs or a unified-memory Mac. |
| 120B+ | 130 GB+ | 90 GB+ | 70 GB+ | 55 GB+ | Server hardware or Mac Studio. |

Add 2–8 GB for context window. A 32K-token context on a 13B model is roughly 4 GB extra.

## Recommended hardware by budget

### Phones & laptops (no discrete GPU)

- Modern phone (8 GB RAM) → 1B–3B Q4 models. Try [PocketPal](https://github.com/a-ghorbani/pocketpal-ai).
- Intel/AMD laptop, integrated GPU → 7B Q4 at 5–15 tokens/sec on CPU.
- Apple Silicon laptop (16 GB) → 7B at 20–40 tok/sec, 13B Q4 with a tighter budget.

### Apple Silicon (the under-rated path)

Apple's unified memory architecture means the GPU sees system RAM directly. A Mac with 96 GB RAM can run 70B models at usable speed — something that requires two RTX 4090s on the PC side.

| Mac | Usable RAM for LLM | Realistic max model |
|---|---|---|
| MacBook Air M3, 16 GB | ~10 GB | 8B Q4 |
| MacBook Pro M3, 36 GB | ~28 GB | 30B Q4 |
| MacBook Pro M3 Max, 64 GB | ~52 GB | 70B Q4 |
| Mac Studio M2 Ultra, 192 GB | ~170 GB | 120B+ |

Apple Silicon strength: memory capacity. Weakness: prompt processing on very long contexts is slower than NVIDIA. For chat use cases, that doesn't matter; for agents that re-read large contexts, it can.

Use [mlx-lm](https://github.com/ml-explore/mlx-examples/tree/main/llms) for best throughput. [Ollama](https://ollama.com) is easier and only ~15% slower.

### Consumer NVIDIA GPUs

| GPU | VRAM | Realistic Q4 model | Notes |
|---|---|---|---|
| RTX 3060 12 GB | 12 GB | 13B | The bang-for-buck pick for entry-level local LLM. |
| RTX 4060 Ti 16 GB | 16 GB | 13B comfortably | More headroom for context. |
| RTX 3090 (used) | 24 GB | 34B Q4 / 70B Q3 | Still the best price/VRAM in 2026. |
| RTX 4090 | 24 GB | 34B Q4 / 70B Q3 | Faster than 3090 but ~3× the cost. |
| RTX 5090 | 32 GB | 70B Q3.5 | Recent generation; expensive. |
| 2× RTX 3090 | 48 GB | 70B Q4 | The "I'm serious about local AI" build. |
| 4× RTX 3090 | 96 GB | 120B Q5 / 70B Q8 | Power and cooling become real issues. |

ROCm (AMD) and Vulkan paths exist and are improving, but the NVIDIA tooling ecosystem is still notably ahead for inference.

### Data-center class

- L40S, A100 (80 GB), H100 — for serious multi-user serving with [vLLM](https://github.com/vllm-project/vllm) or [SGLang](https://github.com/sgl-project/sglang). Out of scope for most personal use but worth knowing exists.
- Used A100 40GB is sometimes findable at competitive prices for hobbyists with the budget.

### CPU only

Yes, it's possible. No, it's not fast.

- A modern desktop CPU (8+ cores) with DDR5 → 7B Q4 at 8–15 tok/sec.
- Server CPUs with 8+ memory channels → 70B Q4 at 2–4 tok/sec. Slow but usable for batch jobs.

For CPU inference, memory bandwidth matters more than core count. DDR5 > DDR4. Multi-channel memory is the biggest single upgrade.

## Power and noise

Running a 4090 24/7 at 80% utilization is roughly 250–350 W continuous. That's $25–60/month in most US markets, plus heat and fan noise.

Apple Silicon is notably more power-efficient for inference per token. A Mac Studio loaded with a 70B model draws ~150 W at full tilt.

If you're putting a GPU rig in a small room, plan for cooling and noise. [Liquid cooling](https://en.wikipedia.org/wiki/Computer_cooling#Water_cooling) starts looking attractive faster than people expect.

## Quick selection algorithm

1. **What's the biggest model I want to run?** Look up its size + your target quantization in the VRAM table.
2. **Do I have that much VRAM (or unified RAM)?** If yes, you're done. If no, drop a quantization step or drop a model size and re-check.
3. **Is the resulting tokens/sec acceptable for my use?** Chat tolerates 8+ tok/sec. Code completion needs 15+. Background batch jobs tolerate anything.
4. **Will I serve multiple users?** Multiply VRAM requirements by concurrent-request factor, or switch to [vLLM](https://github.com/vllm-project/vllm)/[SGLang](https://github.com/sgl-project/sglang) which batch efficiently.

## What you don't need

- A new GPU every year. The RTX 3090 from 2020 is still excellent for local LLM in 2026.
- Datacenter cooling for a home rig. A well-ventilated case and one extra exhaust fan is usually enough.
- More than 64 GB of system RAM for GPU-based inference. The model lives in VRAM.
- An NVMe drive faster than ~3 GB/s for inference. Loading is one-time; tokens/sec is unrelated.
