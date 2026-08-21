import type { Metadata } from "next";
import { AppointmentShell } from "@/components/sections";
import { appointmentPage } from "@/data/appointment";

export const metadata: Metadata = {
  title: "Request an appointment",
  description: appointmentPage.description,
};

export default function Page() {
  return <AppointmentShell />;
}
