"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useToast } from "@/components/ui/toast";
import { trackEvent } from "@/lib/analytics";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Skeleton } from "@/components/ui/skeletons";
import { EmptyState } from "@/components/ui/empty-states";

export interface RoboticsTelemetry {
  jointAngles: [number, number, number];
  gripperState: "open" | "closed" | "holding";
  systemStatus: "idle" | "calibrating" | "active";
  payloadWeightKg: number;
}

export function Robotics() {
  const toast = useToast();
  const prefersReducedMotion = useReducedMotion();

  const [telemetry, setTelemetry] = useState<RoboticsTelemetry>({
    jointAngles: [45, 90, 15],
    gripperState: "open",
    systemStatus: "idle",
    payloadWeightKg: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);

  const handleSimulateTrajectory = () => {
    setIsLoading(true);
    trackEvent("robotics_demo_interacted", {
      control_id: "trajectory_sim",
      action: "start_simulation",
    });

    toast.info("Simulation Initialized", "Evaluating kinematic inverse coordinates.");

    setTimeout(() => {
      setTelemetry((prev) => ({
        ...prev,
        systemStatus: "active",
        jointAngles: [60, 120, 30],
        gripperState: "holding",
        payloadWeightKg: 2.4,
      }));
      setTelemetryLog((prev) => [
        `[${new Date().toLocaleTimeString()}] Kinematic trajectory planned: [60°, 120°, 30°]`,
        ...prev,
      ]);
      setIsLoading(false);
      toast.success("Trajectory Verified", "Motion profile converged safely.");
    }, 1200);
  };

  const handleReset = () => {
    setTelemetry({
      jointAngles: [45, 90, 15],
      gripperState: "open",
      systemStatus: "idle",
      payloadWeightKg: 0,
    });
    setTelemetryLog([]);
    trackEvent("robotics_demo_interacted", {
      control_id: "telemetry_reset",
      action: "reset",
    });
    toast.warning("Telemetry Reset", "Controller returned to baseline home orientation.");
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252723] pb-24">
      {/* Disclaimer Banner: Clearly labelled technical demonstration */}
      <div className="bg-[#1C2541] text-[#F7F5F0] py-2.5 px-4 text-center text-xs tracking-wider font-mono">
        TECHNICAL DEMONSTRATION &bull; For Engineering Benchmark &amp; Primitive Evaluation Only.
        HAVEN Estates is exclusively a residential real estate consultancy in Addis Ababa.
      </div>

      {/* Semantic Breadcrumbs Bar */}
      <div className="border-b border-[#252723]/10 bg-[#E9D8C4]/20 py-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Lab / Technical Demonstrations", href: "/demo", current: true },
            ]}
          />
          <span className="font-mono text-[11px] uppercase tracking-wider bg-[#252723]/5 px-2.5 py-1 rounded">
            Engineering Prototype
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#252723]/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C27803] mb-2 font-medium">
              Simulation Sandbox
            </p>
            <h1 className="font-serif italic text-4xl sm:text-5xl text-[#252723] font-normal tracking-tight">
              Robotic Kinematics Sandbox
            </h1>
            <p className="mt-2 text-sm text-[#252723]/75 max-w-2xl leading-relaxed">
              An isolated interactive technical demonstration showcasing the design system&apos;s
              claymorphism surfaces, typed telemetry states, toast feedback, and motion safety.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-[#252723]/30 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#252723] hover:bg-[#252723]/5 transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSimulateTrajectory}
              className="rounded-full bg-[#252723] px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-[#F7F5F0] hover:bg-[#1C2541] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Simulating..." : "Execute Trajectory"}
            </button>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#252723]/15 bg-gradient-to-br from-[#FAF8F5] to-[#E9D8C4]/40 p-8 shadow-[8px_8px_24px_rgba(37,39,35,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]">
              {isLoading ? (
                <div className="flex h-full w-full flex-col justify-between" aria-label="Loading simulation...">
                  <Skeleton className="h-8 w-48" />
                  <div className="space-y-4">
                    <Skeleton className="h-44 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#252723]/60">
                      Kinematic Arm Model: K-602
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        telemetry.systemStatus === "active"
                          ? "bg-[#286746]/10 text-[#286746]"
                          : "bg-[#252723]/10 text-[#252723]"
                      }`}
                    >
                      Status: {telemetry.systemStatus}
                    </span>
                  </div>

                  {/* Claymorphic Articulated Diagram */}
                  <div
                    className={`mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-white/80 p-6 shadow-[inset_2px_2px_6px_rgba(37,39,35,0.08),inset_-2px_-2px_6px_rgba(255,255,255,0.9)] border border-white ${
                      prefersReducedMotion ? "" : "transition-transform duration-700 ease-out"
                    }`}
                    style={{
                      transform: prefersReducedMotion
                        ? "none"
                        : `rotate(${telemetry.jointAngles[0] - 45}deg)`,
                    }}
                  >
                    <svg
                      className="h-28 w-28 text-[#252723]"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="50" cy="50" r="16" fill="#252723" />
                      <line
                        x1="50"
                        y1="50"
                        x2="85"
                        y2="25"
                        stroke="#A88752"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <circle cx="85" cy="25" r="8" fill="#C27803" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-[#252723]/10 pt-4 text-center font-mono text-xs">
                    <div>
                      <span className="text-[#252723]/60">Joint &alpha;:</span>{" "}
                      <span className="font-bold">{telemetry.jointAngles[0]}&deg;</span>
                    </div>
                    <div>
                      <span className="text-[#252723]/60">Joint &beta;:</span>{" "}
                      <span className="font-bold">{telemetry.jointAngles[1]}&deg;</span>
                    </div>
                    <div>
                      <span className="text-[#252723]/60">Joint &gamma;:</span>{" "}
                      <span className="font-bold">{telemetry.jointAngles[2]}&deg;</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Telemetry Output Log */}
            <div className="rounded-xl border border-[#252723]/10 bg-white p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#252723]/70 mb-3">
                Telemetry Log
              </h3>
              {telemetryLog.length === 0 ? (
                <EmptyState
                  title="No telemetry records captured"
                  description="Execute a simulation trajectory above to observe inverse kinematics and joint sensor logging."
                  actionText="Simulate Trajectory"
                  actionHref="#"
                />
              ) : (
                <ul className="space-y-1 font-mono text-xs text-[#252723]/80">
                  {telemetryLog.map((log, i) => (
                    <li key={i} className="py-1 border-b border-gray-100 last:border-0">
                      {log}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sidebar Specs and Architectural Links */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#252723]/10 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif italic text-2xl text-[#252723]">
                Sandbox Capabilities
              </h3>
              <p className="text-xs text-[#252723]/75 leading-relaxed">
                Demonstrates React 19 strict typing, accessibility patterns (WCAG 2.2 AA),
                prefers-reduced-motion compliance, and toast notification coordination.
              </p>

              <div className="border-t border-[#252723]/10 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#252723]/60">End Effector:</span>
                  <span className="font-semibold uppercase">{telemetry.gripperState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252723]/60">Payload:</span>
                  <span className="font-semibold">{telemetry.payloadWeightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252723]/60">Motion Safety:</span>
                  <span className="font-semibold">{prefersReducedMotion ? "Reduced" : "Standard"}</span>
                </div>
              </div>
            </div>

            {/* Internal Navigation to Prime Real Estate */}
            <div className="rounded-2xl border border-[#252723]/10 bg-[#E9D8C4]/25 p-6 shadow-sm space-y-3">
              <h4 className="font-serif italic text-xl text-[#252723]">
                Looking for HAVEN Properties?
              </h4>
              <p className="text-xs text-[#252723]/70 leading-relaxed">
                Explore our primary residential collection or contact our advisory desk in Addis Ababa.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/properties"
                  className="rounded-full bg-[#252723] px-4 py-2.5 text-center text-xs uppercase font-mono tracking-wider text-[#F7F5F0] hover:bg-[#1C2541] transition-colors"
                >
                  Browse Real Estate &rarr;
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-[#252723]/20 px-4 py-2.5 text-center text-xs uppercase font-mono tracking-wider text-[#252723] hover:bg-white transition-colors"
                >
                  Contact Advisory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
