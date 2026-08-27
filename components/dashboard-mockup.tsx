"use client";

import {
  Bike,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

const chartBars = [42, 58, 45, 70, 62, 84, 76, 92, 68, 88, 95, 80];

const rows = [
  { plate: "AB-12-CD", model: "Honda CB650R", job: "Scheduled service", status: "In progress", tone: "text-amber-400 bg-amber-400/10" },
  { plate: "EF-34-GH", model: "Yamaha MT-07", job: "Brake pad replacement", status: "Completed", tone: "text-emerald-400 bg-emerald-400/10" },
  { plate: "IJ-56-KL", model: "KTM 390 Duke", job: "AI diagnosis · P0301", status: "Awaiting parts", tone: "text-sky-400 bg-sky-400/10" },
];

/* Hand-built SaaS dashboard illustration — no screenshots needed. */
export function DashboardMockup() {
  return (
    <div
      className="glass-strong overflow-hidden rounded-2xl text-left shadow-2xl shadow-black/50"
      role="img"
      aria-label="Illustration of the MotoFull management panel"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-1 text-[10px] text-mist sm:block">
          panel.motofull.com.tr
        </span>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-white/8 p-3 sm:flex">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: ClipboardList, label: "Work orders" },
            { icon: Users, label: "Customers" },
            { icon: Bike, label: "Motorcycles" },
            { icon: Boxes, label: "Inventory" },
            { icon: Sparkles, label: "AI diagnosis" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium ${
                item.active ? "bg-accent/15 text-accent-soft" : "text-mist"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
        </div>

        {/* main */}
        <div className="flex-1 space-y-4 p-4">
          {/* stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Open work orders", value: "14", sub: "+3 today" },
              { label: "Jobs this month", value: "96", sub: "sample data" },
              { label: "Parts on order", value: "6", sub: "2 critical" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <p className="text-[10px] text-mist">{s.label}</p>
                <p className="font-display text-lg font-bold text-frost">{s.value}</p>
                <p className="text-[10px] text-accent-soft">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium text-frost">Weekly service volume</p>
              <span className="text-[10px] text-mist">Last 12 weeks</span>
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/30 to-accent"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* work order table */}
          <div className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.03]">
            <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
              <Wrench className="h-3.5 w-3.5 text-accent" />
              <p className="text-[11px] font-medium text-frost">Active work orders</p>
            </div>
            {rows.map((r) => (
              <div
                key={r.plate}
                className="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-frost">
                    {r.plate} · {r.model}
                  </p>
                  <p className="truncate text-[10px] text-mist">{r.job}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${r.tone}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
