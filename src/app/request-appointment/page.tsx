import { AppointmentShell } from "@/components/sections";
import { appointmentPage } from "@/data/appointment";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Request an appointment",
  description: appointmentPage.description,
  path: "/request-appointment",
});

export default function Page() {
  return <AppointmentShell />;
}
