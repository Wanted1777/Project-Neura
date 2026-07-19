import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Sparkles, LineChart, Target } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Performance Prediction System" },
      { name: "description", content: "Predict student scores and grades using ML. Get personalized study tips." },
      { property: "og:title", content: "Student Performance Prediction System" },
      { property: "og:description", content: "ML-based prediction of student scores and grades with study recommendations." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Ambient background layers ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* Large drifting orbs */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/35 blur-3xl animate-float-orb" />
        <div className="absolute top-1/3 -right-48 h-[580px] w-[580px] rounded-full bg-primary/30 blur-3xl animate-float-orb" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-glow/25 blur-3xl animate-float-orb" style={{ animationDelay: "-4s" }} />
        <div className="absolute -bottom-20 right-1/3 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl animate-float-orb" style={{ animationDelay: "-1s" }} />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl animate-float-orb" style={{ animationDelay: "-3s" }} />

        {/* Diagonal sweeping light beam */}
        <div className="bg-beam absolute inset-0" />

        {/* Floating glowing particles */}
        <div className="particle h-2 w-2 bg-primary/70 text-primary" style={{ top: "18%", left: "12%", animation: "particle-a 4s ease-in-out infinite" }} />
        <div className="particle h-1.5 w-1.5 bg-accent/80 text-accent" style={{ top: "60%", left: "8%", animation: "particle-b 5s ease-in-out infinite", animationDelay: "-1.5s" }} />
        <div className="particle h-2.5 w-2.5 bg-glow/60 text-glow" style={{ top: "30%", right: "14%", animation: "particle-c 3.5s ease-in-out infinite" }} />
        <div className="particle h-1.5 w-1.5 bg-primary/60 text-primary" style={{ top: "75%", right: "20%", animation: "particle-a 4.5s ease-in-out infinite", animationDelay: "-2s" }} />
        <div className="particle h-2 w-2 bg-accent/70 text-accent" style={{ top: "45%", left: "50%", animation: "particle-b 3.8s ease-in-out infinite", animationDelay: "-0.8s" }} />
        <div className="particle h-1 w-1 bg-glow/90 text-glow" style={{ top: "85%", left: "35%", animation: "particle-c 5.2s ease-in-out infinite", animationDelay: "-3s" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg" />
      </div>

      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          Built with Random Forest ML
        </div>

        <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          Student Performance <br />
          <span className="animated-gradient-text">Prediction System</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          An ML-based system that predicts student scores and grades using study hours,
          attendance, and class participation data. Get personalized study tips too.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/predict"
            className="group btn-press focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-glow to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground neon-ring"
          >
            Run a prediction
            <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
          <a
            href="#capabilities"
            className="btn-ghost-fx focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md"
          >
            <span className="relative z-10">Explore capabilities</span>
          </a>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-3 gap-4">
          {[
            { k: "~70%", v: "Model accuracy" },
            { k: "3", v: "Input features" },
            { k: "10k", v: "Training samples" },
          ].map((s) => (
            <div key={s.v} className="glass interactive rounded-2xl p-5">
              <div className="font-mono text-2xl font-bold sm:text-3xl glow-text">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// what it does</div>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">How the prediction works</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Three ML components that analyze student data, predict outcomes, and suggest improvements.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Feature
            icon={<LineChart className="h-5 w-5" />}
            tag="01 · Regression"
            title="Score Prediction"
            desc="Uses a Random Forest regressor to predict the student's exam score (0-100) based on 3 input features."
          />
          <Feature
            icon={<Target className="h-5 w-5" />}
            tag="02 · Classification"
            title="Grade Prediction"
            desc="A Random Forest classifier that predicts the letter grade (A through F) with confidence percentages."
          />
          <Feature
            icon={<Sparkles className="h-5 w-5" />}
            tag="03 · AI Recommendations"
            title="Study Recommendations"
            desc="Generates personalized study tips based on the predicted score and where the student needs to improve."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="glass neon-ring relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
          </div>
          <Brain className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-6 text-3xl font-semibold sm:text-4xl">Try it out yourself</h3>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Enter study hours, attendance, and participation to get an instant prediction.
          </p>
          <Link
            to="/predict"
            className="group btn-press focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            Get Prediction <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Feature({ icon, tag, title, desc }: { icon: React.ReactNode; tag: string; title: string; desc: string }) {
  return (
    <div className="glass interactive group relative overflow-hidden rounded-2xl p-7">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{tag}</div>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Neura<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <Link to="/" className="story-link hover:text-foreground">Home</Link>
          <Link to="/predict" className="story-link hover:text-foreground">Predict</Link>
          <a href="/#capabilities" className="story-link hover:text-foreground">Capabilities</a>
        </nav>
        <Link
          to="/predict"
          className="group btn-ghost-fx focus-ring rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-primary"
        >
          <span className="relative z-10 inline-flex items-center gap-1">Launch <span className="icon-nudge inline-block">→</span></span>
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-muted-foreground">
        <div className="font-mono uppercase tracking-widest">© 2026 Student Performance Predictor</div>
        <div className="font-mono uppercase tracking-widest">PBEL Project</div>
      </div>
    </footer>
  );
}
