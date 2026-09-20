import type { ComponentType, SVGProps } from "react";
import type {
  BadgeIconId,
  CornerActionGlyph,
} from "@/config/experience";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "size-4"}
      {...props}
    >
      {children}
    </svg>
  );
}

export function InfoGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7.5h.01" />
    </Svg>
  );
}

export function ArrowGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowUpRightGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}

export function PlayGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 7.5v9l8-4.5z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function PlusGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 6v12" />
      <path d="M6 12h12" />
    </Svg>
  );
}

export function ToothGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 5c1.2-1.4 6.8-1.4 8 0 1 1.2.8 3.2.2 5.2-.7 2.4-1 4.4-1.6 6.3-.4 1.2-1.8 1.4-2.4.3L11 13.5 9.8 16.8c-.6 1.1-2 1-2.4-.3C6.8 14.6 6.5 12.6 5.8 10.2 5.2 8.2 7 6.2 8 5z" />
    </Svg>
  );
}

export function ShieldGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5l7 3v5.2c0 4.2-2.8 7.4-7 8.8-4.2-1.4-7-4.6-7-8.8V6.5z" />
      <path d="M9.2 12.1l1.8 1.8 3.8-3.9" />
    </Svg>
  );
}

export function IndependentOwnershipGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M9 20v-7h6v7" />
      <path d="M4 20h16" />
    </Svg>
  );
}

export function HeartGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19s-6.5-4.2-8.2-8.1C2.4 8.2 4 5.5 6.8 5.5c1.7 0 3 1.1 3.7 2.4.7-1.3 2-2.4 3.7-2.4 2.8 0 4.4 2.7 3 5.4C18.5 14.8 12 19 12 19z" />
    </Svg>
  );
}

export function CalendarGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M4 10h16" />
    </Svg>
  );
}

export function TargetGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function MagnifierGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </Svg>
  );
}

export function HomeGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 11.5L12 5l8 6.5" />
      <path d="M6.5 10.5V19h11v-8.5" />
    </Svg>
  );
}

export function QuestionGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.3 2.2c-.7.3-1.2.8-1.2 1.6V14" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function CheckGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.6 2.6L16.2 9" />
    </Svg>
  );
}

export function SparkleGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v4" />
      <path d="M12 16v4" />
      <path d="M4 12h4" />
      <path d="M16 12h4" />
      <path d="M7 7l2.2 2.2" />
      <path d="M14.8 14.8L17 17" />
      <path d="M17 7l-2.2 2.2" />
      <path d="M9.2 14.8L7 17" />
    </Svg>
  );
}

export function YoutubeMark(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M11 10.2v3.6l3.2-1.8z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function XrayGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
    </Svg>
  );
}

export function FillingGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 6c2-2 6-2 8 0s.5 5-1 8-4 5-4 5-2.5-2-4-5-3-6-1-8z" />
      <path d="M10 11h4" />
    </Svg>
  );
}

export function CrownGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 16h14l-1.2-8-3.3 3-2.5-5-2.5 5-3.3-3z" />
      <path d="M6 18h12" />
    </Svg>
  );
}

export function ImplantGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v7" />
      <path d="M9 11h6" />
      <path d="M10 11c0 6 4 6 4 9" />
      <path d="M14 11c0 6-4 6-4 9" />
    </Svg>
  );
}

export function CanalGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 6c2-2 6-2 8 0 .8.9.8 3.4 0 6.2S12 18 12 18s-3.2-2.9-4-5.8-.8-5.3 0-6.2z" />
      <path d="M12 8v7" />
    </Svg>
  );
}

export function GumGlyph(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 16c2-3 4-4 7-4s5 1 7 4" />
      <path d="M8 7v6" />
      <path d="M12 6v7" />
      <path d="M16 7v6" />
    </Svg>
  );
}

const serviceIcons: Record<string, ComponentType<IconProps>> = {
  "pediatric-x-rays": XrayGlyph,
  "tooth-colored-fillings": FillingGlyph,
  "teeth-whitening": SparkleGlyph,
  "porcelain-crowns": CrownGlyph,
  "root-canals": CanalGlyph,
  "periodontal-therapy": GumGlyph,
  implants: ImplantGlyph,
};

export function ServiceGlyph({
  slug,
  ...props
}: IconProps & { slug: string }) {
  const Icon = serviceIcons[slug] ?? ToothGlyph;
  return <Icon {...props} />;
}

export function CornerGlyph({
  name,
  ...props
}: IconProps & { name: CornerActionGlyph }) {
  if (name === "info") return <InfoGlyph {...props} />;
  if (name === "play") return <PlayGlyph {...props} />;
  if (name === "plus") return <PlusGlyph {...props} />;
  return <ArrowGlyph {...props} />;
}

export function BadgeCenterGlyph({
  name,
  ...props
}: IconProps & { name: BadgeIconId }) {
  if (name === "sparkle") return <SparkleGlyph {...props} />;
  if (name === "plus") return <PlusGlyph {...props} />;
  return <ToothGlyph {...props} />;
}
