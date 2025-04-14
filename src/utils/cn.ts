
// export function cn(...inputs: (string | undefined | null | boolean)[]) {
//   return twMerge(clsx(inputs));
// }
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

