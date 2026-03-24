(function () {
  "use strict";

  const PROOFPOST_HOST = "https://proofpost-alpha.vercel.app";

  // Find all ProofPost embed scripts
  const scripts = document.querySelectorAll("script[data-proofpost-id]");

  scripts.forEach(function (script) {
    const id = script.getAttribute("data-proofpost-id");
    const theme = script.getAttribute("data-theme") || "light";
    const style = script.getAttribute("data-style") || "carousel"; // "carousel" or "marquee"
    const width = script.getAttribute("data-width") || "100%";
    const maxWidth = script.getAttribute("data-max-width") || (style === "marquee" ? "100%" : "500px");

    if (!id) return;

    // Create container
    var container = document.createElement("div");
    container.style.width = width;
    container.style.maxWidth = maxWidth;
    container.style.margin = "0 auto";

    // Create iframe
    var iframe = document.createElement("iframe");
    iframe.src = PROOFPOST_HOST + "/embed/" + id + "?theme=" + theme + "&style=" + style;
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.overflow = "hidden";
    iframe.style.minHeight = "400px";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("title", "ProofPost Testimonial");
    iframe.setAttribute(
      "allow",
      "clipboard-write"
    );

    // Auto-resize iframe based on content
    window.addEventListener("message", function (event) {
      if (event.origin !== PROOFPOST_HOST) return;
      if (event.data && event.data.type === "proofpost-resize" && event.data.id === id) {
        iframe.style.height = event.data.height + "px";
      }
    });

    container.appendChild(iframe);
    script.parentNode.insertBefore(container, script.nextSibling);
  });
})();
