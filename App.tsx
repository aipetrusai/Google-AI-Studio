
import React, { useState, useCallback } from 'react';
import { generateProjectIdea } from './services/geminiService';
import { SkillCard } from './components/SkillCard';
import { ReactIcon, TailwindIcon, TypescriptIcon, GeminiIcon, ResponsiveIcon, PerformanceIcon, ArrowIcon } from './components/Icons';

const skills = [
  {
    icon: <ReactIcon />,
    title: "React & TypeScript",
    description: "Construyo interfaces de usuario modernas, escalables y seguras con tipado estático."
  },
  {
    icon: <TailwindIcon />,
    title: "Diseño y Estética",
    description: "Obsesionado con la UI/UX. Fusiono estilos como Neo-Brutalismo y la limpieza de Apple para crear experiencias únicas."
  },
  {
    icon: <GeminiIcon />,
    title: "Integración Gemini API",
    description: "Conecto tus aplicaciones con el poder de la IA de Google para funcionalidades inteligentes y creativas."
  },
  {
    icon: <ResponsiveIcon />,
    title: "Diseño Adaptable",
    description: "Enfoque 'Mobile-First'. Experiencias fluidas y consistentes en cualquier dispositivo, desde móviles hasta desktops."
  },
  {
    icon: <PerformanceIcon />,
    title: "Rendimiento Optimizado",
    description: "Código limpio y eficiente que garantiza tiempos de carga rápidos y una interacción sin fricciones."
  },
];

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await generateProjectIdea(prompt);
      setResponse(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-zinc-900 text-neutral-100 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="py-8 text-center sm:text-left">
          <h1 className="font-mono text-xl font-bold tracking-wider text-emerald-400">DEMO_AI_ENGINEER</h1>
        </header>

        <main>
          <section id="hero" className="py-16 md:py-24 text-center">
            <h2 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              ¿Qué tan bueno soy <br className="hidden md:block"/> creando webs?
            </h2>
            <p className="mt-6 text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
              Juzga por ti mismo. Fusiono la crudeza del <span className="text-emerald-400">neo-brutalismo</span> con la elegancia pulida de la tecnología de <span className="text-neutral-50">Apple</span>.
            </p>
          </section>

          <section id="skills" className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <SkillCard key={index} {...skill} />
              ))}
               <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left bg-zinc-800 p-8 border-2 border-neutral-100">
                  <h3 className="text-2xl font-bold font-mono">Y Mucho Más...</h3>
                  <p className="mt-2 text-neutral-300">Siempre aprendiendo y explorando nuevas tecnologías para llevar cada proyecto al siguiente nivel.</p>
                </div>
            </div>
          </section>

          <section id="cta" className="py-16 md:py-24 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-mono text-3xl md:text-4xl font-bold">Tienes una idea. <br/> Yo la puedo construir.</h3>
              <p className="mt-4 text-lg text-neutral-300">
                Describe tu idea de aplicación web y usaré la API de Gemini para generar un plan de acción inicial.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ej: Una app para organizar torneos de ajedrez"
                  className="flex-grow bg-zinc-800 border-2 border-neutral-100 p-4 text-lg placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="group bg-emerald-400 text-zinc-900 font-bold text-lg p-4 border-2 border-zinc-900 flex items-center justify-center gap-2 hover:bg-emerald-300 disabled:bg-zinc-600 disabled:text-neutral-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
                >
                  {isLoading ? 'Generando...' : 'Generar Plan'}
                  {!isLoading && <ArrowIcon />}
                </button>
              </div>

              {response && (
                 <div className="mt-8 p-6 bg-black border-2 border-emerald-400 text-left whitespace-pre-wrap font-mono text-emerald-300">
                  <h4 className="text-lg font-bold text-neutral-100 mb-4">Plan de Acción Sugerido:</h4>
                  {response}
                </div>
              )}
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
          </section>
        </main>
        
        <footer className="text-center py-8 border-t-2 border-zinc-800">
          <p className="text-neutral-500 font-mono">Creado con React, TypeScript, Tailwind CSS y Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
