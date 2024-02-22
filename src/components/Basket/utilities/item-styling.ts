export function itemStyling(item: HTMLElement, state: "Zero" | "Normalize") {
  if (state === "Zero") {
    item.style.animation = "";
    item.style.transform = "";
    item.style.fontSize = "0";
    item.style.flex = "0";
    item.style.opacity = "0";
    item.style.margin = "0";
  } else if (state === "Normalize") {
    item.style.animation = "";
    item.style.transform = "";
    item.style.fontSize = "var(--itemFont)";
    item.style.flex = "1";
    item.style.opacity = "1";
  }
}
