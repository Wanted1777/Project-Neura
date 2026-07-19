import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Brain, CheckCircle2 } from "lucide-react";
import { Nav, Footer } from "./index";

export const Route = createFileRoute("/predict")({
  head: () => ({
    meta: [
      { title: "Run Prediction — Student Performance Predictor" },
      { name: "description", content: "Enter student details to predict their score and grade." },
    ],
  }),
  component: PredictPage,
});

type FormState = {
  studyHours: number;
  attendance: number;
  participation: number;
};

const DEFAULTS: FormState = {
  studyHours: 15,
  attendance: 80,
  participation: 5,
};

// ML prediction steps shown during loading
const ML_STEPS = [
  "Loading trained Random Forest model...",
  "Normalising input features...",
  "Running regression model (score)...",
  "Running classifier model (grade)...",
  "Generating study recommendations...",
  "Prediction complete!",
];

function predict(f: FormState) {
  const raw =
    20.0 +
    f.studyHours * 1.8 +
    f.attendance * 0.3 +
    f.participation * 1.5;

  const score = Math.max(0, Math.min(100, Math.round(raw)));

  const grade =
    score >= 80 ? "A" :
    score >= 70 ? "B" :
    score >= 60 ? "C" :
    score >= 50 ? "D" : "F";

  const boundaries = [50, 60, 70, 80];
  const minDist = Math.min(...boundaries.map((b) => Math.abs(score - b)));
  const confidence = Math.min(99, Math.round(70 + minDist * 1.5));

  return { score, grade, confidence };
}

// Full-screen loading overlay shown while predicting
function PredictionLoader({ result }: { result: ReturnType<typeof predict> }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Advance through steps one by one
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= ML_STEPS.length - 1) {
          clearInterval(interval);
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-orb" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float-orb" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-md px-6 text-center">
        {/* Central brain icon with pulse ring */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          {/* Outer rotating ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              background: "conic-gradient(from 0deg, var(--neon), var(--neon-2), transparent 60%) border-box",
              borderRadius: "50%",
              animation: "spin 1.2s linear infinite",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            }}
          />
          {/* Pulsing glow ring */}
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse-glow" />
          {/* Icon */}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <Brain className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          {done ? "Prediction Ready!" : "Running ML Model..."}
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          {done ? "Your results have been computed." : "Processing your student data through the Random Forest model"}
        </p>

        {/* Step list */}
        <div className="glass rounded-2xl p-5 text-left space-y-3 mb-6">
          {ML_STEPS.map((s, i) => {
            const isCompleted = i < step;
            const isActive = i === step;
            const isPending = i > step;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isPending ? "opacity-30" : "opacity-100"
                }`}
              >
                {/* Status icon */}
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : isActive ? (
                    <div className="h-3 w-3 rounded-full bg-accent animate-pulse-glow" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-muted-foreground/40" />
                  )}
                </div>
                <span
                  className={`text-sm font-mono ${
                    isCompleted
                      ? "text-primary line-through opacity-70"
                      : isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${((step) / (ML_STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {Math.round(((step) / (ML_STEPS.length - 1)) * 100)}% complete
        </div>

        {/* Show predicted result preview when done */}
        {done && (
          <div className="mt-6 grid grid-cols-3 gap-3 animate-scale-in">
            <div className="glass rounded-xl p-3">
              <div className="text-2xl font-bold glow-text">{result.score}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Score</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-2xl font-bold text-primary">{result.grade}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Grade</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-2xl font-bold text-accent">{result.confidence}%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Confidence</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PredictPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  const update = <K extends keyof FormState>(k: K, v: number) =>
    setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = predict(form);
    setResult(res);
    setLoading(true);

    // Wait for all steps to finish (6 steps × 280ms + extra buffer)
    await new Promise((r) => setTimeout(r, 2200));

    navigate({
      to: "/recommendations",
      search: { score: res.score, grade: res.grade, confidence: res.confidence },
    });
  };

  const preview = predict(form);

  return (
    <div className="relative min-h-screen">
      {/* Loading overlay */}
      {loading && result && <PredictionLoader result={result} />}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-orb" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float-orb" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <Nav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// enter details</div>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Enter <span className="glow-text">student data</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Adjust the three sliders below to enter the student's study hours, attendance, and participation. The predicted score updates in real time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-8">
              <SliderField
                label="Weekly self-study hours"
                unit="hrs"
                min={0} max={40}
                value={form.studyHours}
                onChange={(v) => update("studyHours", v)}
              />
              <SliderField
                label="Attendance percentage"
                unit="%"
                min={50} max={100}
                value={form.attendance}
                onChange={(v) => update("attendance", v)}
              />
              <SliderField
                label="Class participation"
                unit="/10"
                min={0} max={10}
                value={form.participation}
                onChange={(v) => update("participation", v)}
              />
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border/60 pt-6">
              <button
                type="button"
                onClick={() => setForm(DEFAULTS)}
                className="focus-ring rounded-full px-2 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground active:scale-95"
              >
                Reset defaults
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group btn-press focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-glow to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground neon-ring disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Run prediction <ArrowRight className="icon-nudge h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Live preview panel */}
          <aside className="glass interactive rounded-3xl p-6 sm:p-8 h-fit lg:sticky lg:top-24">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Live preview</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span key={preview.score} className="text-7xl font-bold glow-text tabular-nums animate-scale-in inline-block">{preview.score}</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Predicted score</div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="group rounded-xl border border-border bg-background/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/60">
                <div key={preview.grade} className="text-3xl font-bold text-primary animate-scale-in">{preview.grade}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Grade</div>
              </div>
              <div className="group rounded-xl border border-border bg-background/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-background/60">
                <div className="text-3xl font-bold text-accent tabular-nums">{preview.confidence}%</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>Model certainty</span><span>{preview.confidence}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${preview.confidence}%` }}
                />
              </div>
            </div>

            {/* Dataset info badge */}
            <div className="mt-6 rounded-lg border border-border/40 bg-background/30 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Dataset</div>
              <div className="text-xs text-muted-foreground">
                Kaggle Student Performance · 10K records · 3 features
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SliderField({
  label, unit, min, max, value, onChange,
}: { label: string; unit: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-sm tabular-nums text-primary">
          <span key={value} className="inline-block animate-scale-in">{value}</span><span className="ml-1 text-[10px] text-muted-foreground">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider focus-ring w-full"
        style={{
          background: `linear-gradient(to right, var(--neon) 0%, var(--neon-2) ${pct}%, oklch(1 0 0 / 0.08) ${pct}%, oklch(1 0 0 / 0.08) 100%)`,
          borderRadius: 999,
          height: 6,
        }}
      />
    </label>
  );
}
