const VIEWPORT_EPSILON = 0.5;

type OverflowEntry = {
  element: HTMLElement;
  overflow: number;
  left: number;
  right: number;
  width: number;
};

function describeElement(element: HTMLElement) {
  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : "";
  const classes = typeof element.className === "string"
    ? element.className.trim().split(/\s+/).filter(Boolean).slice(0, 6).join(".")
    : "";
  const classSuffix = classes ? `.${classes}` : "";
  const text = (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80);

  return `${tag}${id}${classSuffix}${text ? ` :: ${text}` : ""}`;
}

export function reportHorizontalOverflow(context: string) {
  if (typeof window === "undefined") return;

  const viewportWidth = window.innerWidth;
  const root = document.documentElement;
  const body = document.body;
  const elements = Array.from(document.querySelectorAll<HTMLElement>("body *"));

  const offenders: OverflowEntry[] = elements
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const isVisible = rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";

      if (!isVisible) return false;

      const overflowRight = rect.right - viewportWidth;
      const overflowLeft = -rect.left;
      const overflow = Math.max(overflowRight, overflowLeft, 0);

      return overflow > VIEWPORT_EPSILON;
    })
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const overflow = Math.max(rect.right - viewportWidth, -rect.left, 0);
      return {
        element,
        overflow,
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
      };
    })
    .sort((a, b) => b.overflow - a.overflow)
    .slice(0, 20);

  console.group(`[overflow-check] ${context}`);
  console.log({
    viewportWidth,
    documentClientWidth: root.clientWidth,
    documentScrollWidth: root.scrollWidth,
    bodyScrollWidth: body.scrollWidth,
    offenderCount: offenders.length,
  });

  offenders.forEach((entry, index) => {
    console.log(index + 1, {
      element: describeElement(entry.element),
      overflow: Number(entry.overflow.toFixed(2)),
      left: entry.left,
      right: entry.right,
      width: entry.width,
      scrollWidth: entry.element.scrollWidth,
      clientWidth: entry.element.clientWidth,
    });
  });

  console.groupEnd();
}
