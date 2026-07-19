import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft, BookOpen, Clock, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Nav, Footer } from "./index";

const searchSchema = z.object({
  score: z.number().default(75),
  grade: z.string().default("C"),
  confidence: z.number().default(85),
});

export const Route = createFileRoute("/recommendations")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Your Results — Student Performance Predictor" },
      { name: "description", content: "View your predicted score and get study recommendations." },
    ],
  }),
  component: Results,
});

function getRecommendations(score: number, grade: string) {
  if (score >= 80) {
    return {
      headline: "Great job! You're doing really well.",
      body: "Your scores show strong performance. Keep it up and try to push even further.",
      items: [
        { icon: Sparkles, title: "Try harder problems", desc: "Challenge yourself with advanced questions to keep improving." },
        { icon: Users, title: "Help your classmates", desc: "Teaching others is one of the best ways to strengthen your own understanding." },
        { icon: BookOpen, title: "Explore new topics", desc: "Read about related subjects to broaden your knowledge." },
      ],
    };
  }
  if (score >= 70) {
    return {
      headline: "Good performance overall.",
      body: "You're on the right track. A little more focus on weak areas can make a big difference.",
      items: [
        { icon: TrendingUp, title: "Work on weak areas", desc: "Find the topics you struggle with most and spend extra time on them." },
        { icon: Clock, title: "Practice with time limits", desc: "Try solving problems under exam-like conditions to get faster." },
        { icon: Zap, title: "Use active recall", desc: "Test yourself with flashcards instead of just re-reading notes." },
      ],
    };
  }
  if (score >= 60) {
    return {
      headline: "Average score — room to grow.",
      body: "The basics are there, but a more consistent study routine would help a lot.",
      items: [
        { icon: Clock, title: "Study a bit more", desc: "Adding even 5 extra hours of focused study per week can boost your grades." },
        { icon: Users, title: "Get some help", desc: "A weekly tutoring session can clear up confusing topics quickly." },
        { icon: BookOpen, title: "Go back to basics", desc: "Make sure you understand the earlier chapters before moving ahead." },
      ],
    };
  }
  if (score >= 50) {
    return {
      headline: "Needs improvement.",
      body: "Your predicted score is below passing. But don't worry — with some changes, you can turn this around.",
      items: [
        { icon: Zap, title: "Study a little every day", desc: "Even 25 minutes daily is better than cramming once a week." },
        { icon: Users, title: "Find a study partner", desc: "Studying alone can be tough. A partner keeps you accountable." },
        { icon: Clock, title: "Attend more classes", desc: "Just showing up regularly is the single biggest thing you can do." },
      ],
    };
  }
  return {
    headline: "Score is very low — action needed.",
    body: "This is a tough spot, but it's completely fixable. Start with the basics below.",
    items: [
      { icon: Users, title: "Talk to your teacher", desc: "Ask for help this week. Teachers want to see you succeed." },
      { icon: BookOpen, title: "Start from the basics", desc: "Go back to the beginning and make sure you understand each step." },
      { icon: Clock, title: "Make a daily schedule", desc: "Set fixed study times every day and stick to them. Attend every class." },
    ],
  };
}

function Results() {
  const { score, grade, confidence } = Route.useSearch();
  const rec = getRecommendations(score, grade);

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl animate-pulse-glow" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <Nav />

      <main className="mx-auto max-w-5xl px-6 py-14">
        <Link to="/predict" className="group focus-ring inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" /> New prediction
        </Link>

        {/* Result hero */}
        <div className="glass neon-ring relative mt-6 overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
            <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// results</div>

          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            <Metric label="Predicted Score" value={`${score}`} suffix="/ 100" accent="primary" big />
            <Metric label="Grade" value={grade} accent="accent" big />
            <Metric label="Confidence" value={`${confidence}%`} accent="glow" big />
          </div>

          <div className="mt-10 border-t border-border/60 pt-8">
            <h1 className="text-3xl font-semibold sm:text-4xl">{rec.headline}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{rec.body}</p>
          </div>
        </div>

        {/* Recommendations */}
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// suggestions</div>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">What you should do next</h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
              Generated · {rec.items.length} steps
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {rec.items.map((item, i) => (
              <div
                key={i}
                className="glass interactive group relative overflow-hidden rounded-2xl p-6"
                style={{ animation: `fade-in 0.6s ease-out ${i * 120}ms both` }}
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/predict"
            className="group btn-ghost-fx focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold backdrop-blur-md"
          >
            <span className="relative z-10">Run another prediction</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Metric({ label, value, suffix, big }: { label: string; value: string; suffix?: string; accent: string; big?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`${big ? "text-6xl sm:text-7xl" : "text-4xl"} font-bold glow-text tabular-nums`}>{value}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
