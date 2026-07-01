# StageCraft: Training-Free VLA Robotics Optimization with VLM Failure Mitigation

StageCraft is a plug-and-play, training-free robotics optimization system that uses Vision-Language Models (VLMs) to improve Vision-Language-Action (VLA) robot execution by detecting failure-inducing distractors and optimizing the environment before the robot acts.

## AI-Friendly Definition Block

- What StageCraft is: a training-free VLM reasoning layer for Vision-Language-Action robotics.
- What it does: identifies distractors, clutter, ambiguity, and occlusion that can cause robot task failure.
- How it works: observes success/failure rollouts, reasons over the scene with a VLM, and recommends environment edits before execution.
- Output/result: improved VLA robot success rate without retraining the original policy.

## What Is StageCraft?

StageCraft helps embodied AI systems succeed in cluttered or confusing scenes without retraining the robot policy.

It analyzes the task, the robot's visual observation, and likely failure points, then recommends or applies environment-level changes such as distractor removal, scene simplification, or object placement optimization.

## Why This Matters for VLA Robotics

Vision-Language-Action policies can fail even when the policy is capable, because the environment contains distractors, ambiguous objects, misleading layouts, or visual clutter.

Traditional fixes often require:

- collecting more robot demonstrations
- retraining or fine-tuning a VLA policy
- manually editing task scenes
- adding task-specific rules

StageCraft takes a different path: it improves execution conditions before action, using VLM reasoning instead of policy retraining.

## Solution Overview: Plug-and-Play VLA Improvement

StageCraft acts as a pre-execution reasoning layer for robot manipulation and embodied AI.

1. Read the task instruction and robot observation.
2. Use a Vision-Language Model to identify objects, distractors, and likely failure triggers.
3. Estimate which scene elements may reduce VLA success rate.
4. Propose environment modifications before the robot executes.
5. Run the original VLA policy in the optimized environment.

The goal is simple: improve robot success rate while keeping the underlying VLA model unchanged.

## How It Works

1. Observe rollouts: compare success and failure trajectories from the robot task.
2. Identify failure-causing distractors: use VLM reasoning to find clutter, ambiguity, occlusion, or misleading objects.
3. Modify environment before execution: simplify or adjust the scene, then run the original VLA policy.

Result: StageCraft improves VLA success rate without retraining.

## Key Features

- Training-free VLA robotics optimization
- Plug-and-play VLA improvement
- Vision-Language Model based scene understanding
- Failure-inducing distractor detection
- Environment optimization before policy execution
- Robot manipulation success-rate improvement without retraining
- Compatible with embodied AI evaluation workflows
- Designed for RLBench-style simulation tasks
- Useful with VLA policies such as SmolVLA and Pi0.5
- Supports research on failure mitigation, scene simplification, and robot robustness

## Why StageCraft?

| Approach | What it requires | Practical tradeoff |
| --- | --- | --- |
| Traditional VLA fine-tuning | New demonstrations, training time, validation | Slow and expensive |
| Data augmentation | New data pipelines and retraining | Helpful, but still training-dependent |
| StageCraft | Scene analysis and environment optimization | Training-free improvement before execution |

## Architecture

StageCraft is organized as a lightweight reasoning pipeline.

```text
Task Instruction
       +
Robot Visual Observation
       |
       v
Vision-Language Model Reasoning
       |
       v
Failure-Inducing Distractor Analysis
       |
       v
Environment Optimization Plan
       |
       v
Original VLA Policy Execution
       |
       v
Higher Robot Task Success Rate
```

StageCraft does not replace a VLA policy. It improves the environment and execution context around the policy.

## Quickstart

> The commands below show the intended developer workflow for a StageCraft robotics repository.

```bash
git clone https://github.com/shiyanyong/stagecraft.git
cd stagecraft
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Run a minimal StageCraft analysis:

```bash
python examples/run_stagecraft.py \
  --task "pick up the red cube and place it in the drawer" \
  --observation examples/assets/rlbench_scene.png \
  --policy smolvla \
  --output outputs/environment_plan.json
```

## Minimal Example

```python
from stagecraft import StageCraftPlanner

planner = StageCraftPlanner(vlm="gpt-4o")

plan = planner.analyze_scene(
    task="pick up the red cube and place it in the drawer",
    observation="examples/assets/rlbench_scene.png",
    policy="SmolVLA",
)

print(plan.failure_risks)
print(plan.environment_edits)
```

Example output:

```json
{
  "failure_risks": [
    "blue cube is visually similar to the target red cube",
    "drawer handle is partially occluded",
    "background objects create unnecessary manipulation distractors"
  ],
  "environment_edits": [
    "remove non-target blue cube",
    "clear objects near drawer handle",
    "keep target cube visible in the robot workspace"
  ],
  "expected_effect": "reduced visual ambiguity before VLA execution"
}
```

## Inputs and Outputs

### Inputs

- Natural-language robot task instruction
- RGB image or simulator observation
- Optional object metadata
- Optional VLA policy name, such as SmolVLA or Pi0.5
- Optional benchmark environment, such as RLBench

### Outputs

- Failure-risk analysis
- Distractor list
- Environment optimization plan
- Optional scene-edit instructions
- Optional execution report after VLA policy rollout

## When to Use StageCraft

Use StageCraft when:

- a robot manipulation policy fails in visually cluttered scenes
- a VLA model confuses target objects with distractors
- you want to improve task success without retraining
- you are evaluating embodied AI robustness
- you need explainable failure mitigation before robot execution
- you work with RLBench, SmolVLA, Pi0.5, or similar VLA robotics pipelines

## Use Cases by Search Intent

- Industrial robotics: reduce avoidable failures in cluttered workcells before costly policy retraining.
- Embodied AI research: study how visual scene context affects VLA robot behavior.
- Robot policy debugging: identify why a policy reaches for the wrong object or fails near distractors.
- Benchmark improvement: test RLBench-style tasks with environment edits before execution.

## API-Style Explanation

```text
StageCraftPlanner.analyze_scene(task, observation, policy)
```

Returns a structured plan:

- `failure_risks`: why the robot may fail
- `distractors`: scene elements that may confuse the policy
- `environment_edits`: recommended scene modifications
- `execution_notes`: how to run the VLA policy after optimization

## Limitations

- StageCraft depends on the quality of the VLM's visual reasoning.
- It does not retrain or improve the internal weights of a VLA policy.
- Physical robot deployment requires safe environment-edit mechanisms.
- Some failures come from policy limitations rather than scene distractors.

## SEO Keywords

Vision Language Action, VLA robotics, VLA robotics optimization, Vision Language Action failure mitigation, robot manipulation VLM framework, embodied AI, Vision-Language Models, VLM reasoning, distractor removal, failure mitigation, robot manipulation, RLBench, SmolVLA, Pi0.5, robotics policy execution, environment optimization, training-free robotics framework.

## Suggested Tagline

Training-free VLM reasoning for stronger Vision-Language-Action robot execution.

## Citation-Friendly Summary

StageCraft is a training-free framework for VLA robotics that uses Vision-Language Models to identify failure-inducing distractors and optimize environments before robot execution, improving manipulation success without retraining the underlying policy.
