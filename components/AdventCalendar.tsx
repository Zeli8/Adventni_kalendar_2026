"use client";

import { useState } from "react";
import Image from "next/image";

type CalendarDay = {
  day: number;
  title: string;
  image: string;
  intro: string;
  activity: string;
  icon: string;
};

type Calendar = {
  id: string;
  name: string;
  description: string;
  days: CalendarDay[];
};

type AdventCalendarProps = {
  calendar: Calendar;
};

const CURRENT_DAY = 20;

export default function AdventCalendar({
  calendar,
}: AdventCalendarProps) {
  const days = Array.from({ length: 24 }, (_, index) => index + 1);

  const [openedDay, setOpenedDay] = useState<number | null>(null);
  const [lockedDay, setLockedDay] = useState<number | null>(null);

  function getDayContent(day: number) {
    return calendar.days.find((item) => item.day === day);
  }

  function openDay(day: number) {
    if (day > CURRENT_DAY) {
      setLockedDay(day);
      return;
    }

    setLockedDay(null);
    setOpenedDay(day);
  }

  function closeWindow() {
    setOpenedDay(null);
    setLockedDay(null);
  }

  const openedContent =
    openedDay !== null ? getDayContent(openedDay) : null;

  return (
    <main className="min-h-screen bg-stone-100 bg-cover bg-top bg-no-repeat px-6 py-12"style={{
        backgroundImage: "url('/images/backgrounds/christmas.png')",
        }}
    >
      <div className="mx-auto max-w-5xl">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-stone-900">
            {calendar.name}
          </h1>

          <p className="mt-3 text-stone-600">
            {calendar.description}
          </p>

          <p className="mt-2 text-sm text-stone-400">
            Testovací datum: {CURRENT_DAY}. prosince
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {days.map((day) => {
                const isLocked = day > CURRENT_DAY;
                const isCurrent = day === CURRENT_DAY;

                const dayContent = getDayContent(day);

                return (
                    <button
                    key={day}
                    onClick={() => openDay(day)}
                    className={`relative flex aspect-square flex-col items-center justify-center
                        overflow-hidden rounded-2xl border transition-all duration-200
                        ${
                            isCurrent
                            ? "cursor-pointer border-red-800 bg-red-800 text-white shadow-lg hover:bg-red-900 hover:shadow-xl"
                            : isLocked
                            ? "cursor-not-allowed border-stone-200 bg-stone-100/80 text-stone-400"
                            : "cursor-pointer border-amber-200 bg-[#fffaf0]/90 text-stone-800 shadow-sm hover:border-amber-300 hover:bg-amber-50 hover:-translate-y-1 hover:shadow-md"
                        }`}
                    >

                    {/* ČÍSLO DNE */}

                    <span className="text-3xl font-medium">
                        {day}
                    </span>

                    {/* MALÝ OBRÁZEK */}

                    {!isLocked && dayContent?.icon && (
                        <div className="relative mt-2 h-10 w-10 sm:h-12 sm:w-12">
                        <Image
                            src={dayContent.icon}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="48px"
                        />
                        </div>
                    )}

                    {/* ZÁMEK */}

                    {isLocked && (
                        <span className="mt-3 text-lg">
                        🔒
                        </span>
                    )}

                    </button>
                );
                })}
        </div>
      </div>

      {openedDay !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="flex min-h-full items-start justify-center py-6">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

                <button
                onClick={closeWindow}
                className="absolute right-5 top-4 text-3xl text-stone-400 hover:text-stone-900"
                aria-label="Zavřít"
                >
                ×
                </button>

                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-stone-500">
                        {openedDay}. prosince
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-stone-900">
                        {openedContent?.title ?? "Adventní překvapení"}
                    </h2>
                    {openedContent && (
                            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200">
                                <Image
                                src={openedContent.image}
                                alt={openedContent.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 672px"
                                />
                            </div>
                        )}

                    <div className="mt-6 text-left">

                            <p className="text-lg leading-8 text-stone-600">
                                {openedContent?.intro ??
                                "Překvapení pro tento den teprve připravujeme."}
                            </p>

                        {openedContent && (
                            <div className="mt-7 rounded-2xl bg-stone-100 p-6">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
                                ✨ Dnešní speciál
                            </p>

                            <p className="mt-3 text-lg leading-8 text-stone-800">
                                {openedContent.activity}
                            </p>
                            </div>
                            )}

                    </div>
              
                </div>

                <div className="mt-10 flex items-center justify-between gap-3">

                <button
                    onClick={() => setOpenedDay(openedDay - 1)}
                    disabled={openedDay === 1}
                    className="cursor-pointer rounded-xl border border-[#6B4A32] px-5 py-3 text-[#6B4A32] transition-all duration-200 hover:bg-[#6B4A32] hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-400 disabled:hover:shadow-none"
                >
                    
                    ← Předchozí
                </button>

                <button
                    onClick={closeWindow}
                   className="cursor-pointer rounded-xl bg-[#6B4A32] px-5 py-3 text-white transition-all duration-200 hover:bg-[#543824] hover:shadow-md"
                >    
                   Kalendář
                </button>

                <button
                    onClick={() => setOpenedDay(openedDay + 1)}
                    disabled={openedDay === CURRENT_DAY}
                    className="cursor-pointer rounded-xl border border-[#6B4A32] px-5 py-3 text-[#6B4A32] transition-all duration-200 hover:bg-[#6B4A32] hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-400 disabled:hover:shadow-none"
                >
                    Další →
                </button>

            </div>
          </div>
        </div>
        </div>
      )}

      {lockedDay !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

            <button
              onClick={closeWindow}
              className="absolute right-5 top-4 text-3xl text-stone-400 hover:text-stone-900"
              aria-label="Zavřít"
            >
              ×
            </button>

            <div className="text-5xl">🔒</div>

            <p className="mt-5 text-sm uppercase tracking-[0.25em] text-stone-500">
              {lockedDay}. prosince
            </p>

            <h2 className="mt-3 text-2xl font-bold text-stone-900">
              Ještě chvilku počkej
            </h2>

            <p className="mt-4 text-stone-600">
              Tohle adventní překvapení se otevře až {lockedDay}. prosince.
            </p>

            <button
              onClick={closeWindow}
              className="mt-7 rounded-full bg-stone-900 px-6 py-3 text-white"
            >
              Zpět na kalendář
            </button>

          </div>
        </div>
      )}
    <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-stone-600">

            <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border border-amber-300 bg-[#fffaf0]" />
                <span>Odemčený den</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-red-800" />
                <span>Dnešní den</span>
            </div>

            <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Zamčený den</span>
            </div>

    </div>
    </main>
  );
}