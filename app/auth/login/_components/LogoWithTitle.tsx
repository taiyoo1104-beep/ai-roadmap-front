import { Brain, Rocket } from "lucide-react"

export const LogoWithTitle = () => {
  return (
    <div className="flex w-full rounded-2xl border-2 border-cyan-200 bg-gradient-to-t from-[#007fff] to-[#00ffd9] p-8 shadow-lg lg:w-[45%] lg:p-16">
      <div className="flex w-full flex-col items-center justify-center gap-6 text-center lg:gap-10">
        <div className="relative">
          <Brain className="h-20 w-20 text-blue-900 lg:h-32 lg:w-32" strokeWidth={1.5} />
          <Rocket className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white lg:h-16 lg:w-16" strokeWidth={1} />
        </div>

        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
          AI Learning<br className="hidden lg:block" /> Roadmap -<br className="hidden lg:block" /> Chart Your Path.
        </h1>
      </div>
    </div>
  )
}