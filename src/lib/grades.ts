export const GRADE_OPTIONS = [
  { value: "6", label: "Grade 6" },
  { value: "7", label: "Grade 7" },
  { value: "8", label: "Grade 8" },
  { value: "9", label: "Grade 9" },
  { value: "10", label: "Grade 10" },
  { value: "AS", label: "AS Level" },
  { value: "A2", label: "A2 Level" },
] as const;

export function gradeLabel(value: string | null | undefined) {
  return GRADE_OPTIONS.find((g) => g.value === value)?.label ?? value ?? "—";
}
