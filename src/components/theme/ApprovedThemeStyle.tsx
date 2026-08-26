import { approvedTheme, approvedThemeStyleText } from "@/config/theme";

export function ApprovedThemeStyle() {
  return (
    <style
      id="wcda-approved-theme"
      dangerouslySetInnerHTML={{ __html: approvedThemeStyleText(approvedTheme) }}
    />
  );
}
