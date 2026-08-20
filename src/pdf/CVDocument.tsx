import type { CVData } from "../types";
import { SidebarCVDocument } from "./SidebarCVDocument";
import { ClassicCVDocument } from "./ClassicCVDocument";

export function CVDocument({ data }: { data: CVData }) {
  return data.template === "classic" ? (
    <ClassicCVDocument data={data} />
  ) : (
    <SidebarCVDocument data={data} />
  );
}
