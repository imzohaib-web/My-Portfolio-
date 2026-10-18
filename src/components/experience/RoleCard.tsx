"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Building2, MapPin, Laptop, Award } from "lucide-react";
import { TechChip } from "@/components/ui/TechChip";
import { ExperienceLightbox } from "./ExperienceLightbox";
import type { Role } from "@/data/experience";

interface RoleCardProps {
  role: Role;
}

function toIsoMonth(dateStr?: string): string | undefined {
  if (!dateStr || !dateStr.trim()) return undefined;
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) {
    const monthMap: Record<string, string> = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const month = monthMap[parts[0]];
    const year = parts[1];
    if (month && year) return `${year}-${month}`;
  }
  return undefined;
}

export function RoleCard({ role }: RoleCardProps) {
  const [imageExists, setImageExists] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const hasStart = Boolean(role.start && role.start.trim());
  const hasEnd = Boolean(role.end && role.end.trim());
  const hasDuration = Boolean(role.duration && role.duration.trim());
  const hasLocation = Boolean(role.location && role.location.trim());
  const hasMode = Boolean(role.mode && role.mode.trim());
  const hasMeta = Boolean(hasLocation || hasMode);

  // Check if certificate image is available in public/
  useEffect(() => {
    if (!role.certificate?.image) return;

    let isMounted = true;
    const img = new window.Image();
    img.src = role.certificate.image;
    img.onload = () => {
      if (isMounted) setImageExists(true);
    };
    img.onerror = () => {
      if (isMounted) setImageExists(false);
    };

    return () => {
      isMounted = false;
    };
  }, [role.certificate?.image]);

  return (
    <article className="experience-card relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-7 transition-all duration-200 hover:border-white/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[200px_1fr] md:gap-8">
        {/* Left column: meta */}
        <div className="flex flex-col gap-3">
          {/* Period */}
          {hasStart ? (
            <div>
              <p className="font-mono text-sm text-[var(--accent-primary)]">
                <time dateTime={toIsoMonth(role.start)}>{role.start}</time>
                <span aria-hidden="true" className="mx-1.5">
                  –
                </span>
                {role.current ? (
                  <span>Present</span>
                ) : hasEnd ? (
                  <time dateTime={toIsoMonth(role.end)}>{role.end}</time>
                ) : null}
              </p>
              {hasDuration && (
                <p className="mt-1 text-xs text-zinc-400">{role.duration}</p>
              )}
            </div>
          ) : hasDuration ? (
            <p className="text-xs text-zinc-400">{role.duration}</p>
          ) : null}

          {/* Badges / Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {role.type && (
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                {role.type}
              </span>
            )}
            {role.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Current
              </span>
            )}
          </div>

          {/* Mode / Location line */}
          {hasMeta && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              {hasMode && (
                <span className="inline-flex items-center gap-1.5">
                  <Laptop className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
                  <span>{role.mode}</span>
                </span>
              )}
              {hasLocation && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
                  <span>{role.location}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right column: content */}
        <div className="flex flex-col">
          {/* Role title */}
          <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">
            {role.title}
          </h3>

          {/* Company */}
          <div className="mt-1 flex items-center gap-2 text-base text-zinc-300">
            <Building2 className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <span>{role.company}</span>
          </div>

          {/* Bullets */}
          {role.bullets && role.bullets.length > 0 && (
            <ul role="list" className="mt-4 flex flex-col gap-2.5">
              {role.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex max-w-[70ch] items-start gap-3 text-[15px] leading-relaxed text-zinc-300"
                >
                  <span
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech chips */}
          {role.tech && role.tech.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {role.tech.map((item) => (
                <TechChip
                  key={item}
                  label={item}
                  className="h-7 border-white/10 bg-white/5 px-2.5 text-xs text-zinc-300"
                />
              ))}
            </div>
          )}

          {/* Certificate row: button and thumbnail only if image exists */}
          {role.certificate && imageExists && (
            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/5">
                <Image
                  src={role.certificate.image}
                  alt={role.certificate.label || `Internship certificate, ${role.company}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex h-11 min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-sm"
              >
                <Award className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                <span>View certificate</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {role.certificate && imageExists && (
        <ExperienceLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          image={role.certificate.image}
          company={role.company}
          label={role.certificate.label}
          triggerRef={triggerRef}
        />
      )}
    </article>
  );
}
