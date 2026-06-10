import { useEffect, useRef } from "react"
import { animate, stagger, createTimeline, utils } from "animejs"
import {
  GitBranch,
  Rocket,
  Shield,
  Zap,
  GitCommit,
  Globe,
  ArrowRight,
  Cpu,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import "./App.css"

/* ─── Datos de las tarjetas de tecnologías ─── */
const techCards = [
  {
    icon: GitBranch,
    title: "GitHub Actions",
    description:
      "Workflow automatico que se dispara en cada push a main. Sin intervención manual.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Rocket,
    title: "Surge.sh",
    description:
      "Hosting estático gratuito y ultra-rápido. En línea en segundos.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Secrets Seguros",
    description:
      "El token de Surge se guarda cifrado en GitHub. Nunca queda expuesto.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
]

/* ─── Pasos del pipeline ─── */
const pipeline = [
  { label: "commit", icon: GitCommit },
  { label: "push", icon: ArrowRight },
  { label: "Actions", icon: Cpu },
  { label: "Surge.sh", icon: Rocket },
  { label: "En línea", icon: Globe },
]

export default function App() {
  const heroRef = useRef(null)
  const pipelineRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    // ── Timeline principal con anime.js v4 ──
    const tl = createTimeline({
      defaults: { ease: "spring(1, 80, 10, 0)" },
    })

    // 1. Badge superior
    tl.add(".hero-badge", {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
    })
    // 2. Título principal con stagger por palabras
    tl.add(".hero-word", {
      translateY: [60, 0],
      opacity: [0, 1],
      delay: stagger(80),
      duration: 900,
    }, "-=400")
    // 3. Subtítulo
    tl.add(".hero-sub", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
    }, "-=500")
    // 4. Pipeline steps con stagger
    tl.add(".pipeline-item", {
      scale: [0.6, 1],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 700,
      ease: "spring(2, 80, 10, 0)",
    }, "-=400")
    // 5. Cards con stagger
    tl.add(".tech-card", {
      translateY: [50, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 800,
    }, "-=300")

    // ── Orbes flotantes continuas ──
    animate(".orb", {
      translateY: [-18, 0],
      loop: true,
      alternate: true,
      duration: 3200,
      ease: "inOutSine",
      delay: stagger(700),
    })

    // ── Rotación del anillo animado ──
    animate(".animated-ring", {
      rotate: 360,
      duration: 12000,
      loop: true,
      ease: "linear",
    })

    // ── Hover interactivo en cada tarjeta ──
    const cards = document.querySelectorAll(".tech-card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        animate(card, { scale: 1.04, duration: 300, ease: "outQuad" })
      })
      card.addEventListener("mouseleave", () => {
        animate(card, { scale: 1, duration: 400, ease: "spring(1, 80, 10, 0)" })
      })
    })
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">

      {/* ── Orbes de fondo ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb will-animate absolute -left-40 -top-40 size-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="orb will-animate absolute -bottom-20 -right-20 size-[400px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="orb will-animate absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[100px]" />
      </div>

      {/* ── Contenido principal ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16">

        {/* ── HERO ── */}
        <header ref={heroRef} className="mb-16 text-center">
          {/* Badge "en vivo" */}
          <div className="hero-badge mb-6 flex justify-center opacity-0">
            <Badge variant="default" className="gap-2 px-4 py-1.5 text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Desplegado con CI/CD · Electiva 2
            </Badge>
          </div>

          {/* Título: cada palabra animada por separado */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {["¡Hola,", "Mundo!"].map((word, i) => (
              <span
                key={i}
                className="hero-word gradient-text mr-3 inline-block opacity-0"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtítulo */}
          <div className="hero-sub mx-auto max-w-xl opacity-0">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Este es mi{" "}
              <span className="font-semibold text-foreground">
                primer parcial para Electiva 2
              </span>
              . Estoy aprendiendo{" "}
              <span className="font-semibold text-primary">CI/CD</span> con{" "}
              <span className="font-semibold text-accent">GitHub Actions</span>{" "}
              y{" "}
              <span className="font-semibold text-pink-400">Surge.sh</span>.
            </p>
          </div>
        </header>

        {/* ── PIPELINE VISUAL ── */}
        <section ref={pipelineRef} className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pipeline.map(({ label, icon: Icon }, idx) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="pipeline-item will-animate flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 opacity-0"
                  style={{ minWidth: "80px" }}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {label}
                  </span>
                </div>
                {idx < pipeline.length - 1 && (
                  <ArrowRight className="size-4 shrink-0 text-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── TECH CARDS ── */}
        <section ref={cardsRef} className="mb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {techCards.map(({ icon: Icon, title, description, color, bg }) => (
              <Card key={title} className="tech-card will-animate cursor-pointer opacity-0 transition-shadow hover:glow">
                <CardHeader>
                  <div className={`mb-3 flex size-11 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`size-5 ${color}`} />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* ── STACK BADGES ── */}
        <section className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Stack utilizado
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Vite", "Tailwind CSS", "shadcn/ui", "Anime.js", "GitHub Actions", "Surge.sh"].map(
              (tech) => (
                <Badge key={tech} variant="outline" className="px-3 py-1 text-sm">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="mt-16 text-center text-xs text-muted-foreground">
          <div className="mx-auto mb-3 flex items-center justify-center gap-2">
            <div className="animated-ring size-4 rounded-full border-2 border-primary opacity-60" />
            <span>CI/CD activo — Electiva 2 · 2026</span>
          </div>
          <p>
            Construido con React · Automatizado con{" "}
            <a
              href="https://github.com/features/actions"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              GitHub Actions
            </a>{" "}
            · Alojado en{" "}
            <a
              href="https://surge.sh"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              Surge.sh
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
