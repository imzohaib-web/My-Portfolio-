"use client";

export const HERO_TERMINAL_DATA = {
  windowTitle: "zohaib — portfolio",
  commands: [
    {
      id: "whoami",
      command: "whoami",
      lines: [
        "Zohaib · Full-Stack Developer",
        "AI-integrated web applications",
      ],
    },
    {
      id: "stack",
      command: "stack",
      lines: [
        "React · Next.js · TypeScript",
        "Node.js · Python · FastAPI",
      ],
    },
    {
      id: "experience",
      command: "experience",
      lines: [
        "MERN Intern @ EziTech",
      ],
    },
    {
      id: "building",
      command: "building",
      lines: [
        "FBISE Adaptive Learning Platform",
        "RAG over the curriculum",
      ],
    },
    {
      id: "status",
      command: "status",
      isStatus: true,
      lines: [
        "Open to internships",
        "AI/full-stack roles",
      ],
    },
  ],
};

export function HeroTerminal() {
  return (
    <div className="relative w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#131315] overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <span className="text-xs font-mono text-[#8f8f94] tracking-wide truncate select-none">
          {HERO_TERMINAL_DATA.windowTitle}
        </span>
        <div className="w-8 shrink-0" aria-hidden="true" />
      </div>

      <div
        className="p-5 sm:p-6 md:p-7 font-mono text-[13px] md:text-[14px] leading-relaxed space-y-4 select-text overflow-hidden"
        role="region"
        aria-label="Terminal hero card"
      >
        {HERO_TERMINAL_DATA.commands.map((item) => (
          <div key={item.id} className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-[#c6f432] font-medium select-none">$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>

            {item.isStatus ? (
              <div className="mt-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] shrink-0" aria-hidden="true" />
                <p className="text-[#ededed] font-normal">
                  <span className="inline">{item.lines[0]}</span>
                  <span className="inline text-[#8f8f94]"> · </span>
                  <span className="inline">{item.lines[1]}</span>
                </p>
              </div>
            ) : (
              <div className="mt-1 text-[#8f8f94]">
                {item.lines.map((line, idx) => (
                  <p key={idx} className="break-words">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 pt-0.5" aria-hidden="true">
          <span className="text-[#c6f432] font-medium select-none">$</span>
          <span className="inline-block w-1.5 h-3.5 bg-[#c6f432] align-middle" />
        </div>
      </div>
    </div>
  );
}
