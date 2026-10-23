import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { Robotics } from "@/components/robotics";

export const metadata: Metadata = constructMetadata({
  title: "Robotics Kinematics Sandbox | Technical Demonstration",
  description:
    "An isolated engineering prototype and technical demonstration of HAVEN's design primitives, motion safety, and accessibility standards.",
  pathname: "/demo",
  noIndex: true, // Keep isolated demo out of search engine index as required
});

export default function DemoPage() {
  return <Robotics />;
}
