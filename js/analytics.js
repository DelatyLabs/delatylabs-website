(function () {
  const config = window.DELATY_ANALYTICS || {};
  const measurementId = String(config.measurementId || "").trim();

  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  const consentKey = "delaty-analytics-consent";
  let loaded = false;

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    bindInteractionTracking();
  }

  function sendEvent(name, parameters) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, parameters);
  }

  function linkCategory(link) {
    if (link.closest(".project")) return "project";
    if (link.closest(".socials")) return "social";
    if (link.closest(".nav-links, .brand")) return "navigation";
    if (link.href.startsWith("mailto:")) return "email";
    if (link.href.startsWith("tel:")) return "phone";
    if (link.classList.contains("btn")) return "call_to_action";
    return "content";
  }

  function bindInteractionTracking() {
    document.addEventListener("click", function (event) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;

      let destination = link.getAttribute("href") || "";
      try {
        destination = new URL(link.href, window.location.href).href;
      } catch (_) {
        // Keep non-URL schemes such as telephone and email links as written.
      }

      sendEvent("link_click", {
        link_category: linkCategory(link),
        link_text: (link.textContent || link.getAttribute("aria-label") || "").trim().slice(0, 100),
        link_url: destination,
        page_path: window.location.pathname,
      });
    });

    document.querySelectorAll(".filter[data-filter]").forEach(function (filter) {
      filter.addEventListener("click", function () {
        sendEvent("portfolio_filter", {
          filter_name: filter.dataset.filter,
          page_path: window.location.pathname,
        });
      });
    });

    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function () {
        sendEvent("generate_lead", {
          method: "contact_form",
          page_path: window.location.pathname,
        });
      });

      if (new URLSearchParams(window.location.search).get("submitted") === "true") {
        sendEvent("contact_form_complete", {
          page_path: window.location.pathname,
        });
      }
    }
  }

  function removeBanner() {
    document.querySelector(".analytics-consent")?.remove();
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(consentKey, value);
    } catch (_) {
      // Analytics still works for this page if storage is unavailable.
    }
  }

  function showConsentBanner() {
    if (document.querySelector(".analytics-consent")) return;
    const banner = document.createElement("aside");
    banner.className = "analytics-consent";
    banner.setAttribute("aria-label", "Analytics preferences");
    banner.innerHTML = `
      <div>
        <strong>Help us improve Delaty Labs</strong>
        <p>Allow anonymous analytics so we can understand visits, traffic sources, and which links people use.</p>
      </div>
      <div class="analytics-consent-actions">
        <button type="button" class="btn btn-primary" data-analytics-accept>Allow analytics</button>
        <button type="button" class="btn btn-ghost" data-analytics-decline>No thanks</button>
      </div>
    `;

    banner.querySelector("[data-analytics-accept]").addEventListener("click", function () {
      saveConsent("granted");
      removeBanner();
      loadAnalytics();
    });

    banner.querySelector("[data-analytics-decline]").addEventListener("click", function () {
      saveConsent("denied");
      removeBanner();
      if (loaded) window.location.reload();
    });

    document.body.appendChild(banner);
  }

  function addPreferencesControl() {
    const connectList = document.querySelector(".footer-col:nth-of-type(3) ul");
    if (!connectList) return;

    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "footer-preferences";
    button.textContent = "Analytics preferences";
    button.addEventListener("click", showConsentBanner);
    item.appendChild(button);
    connectList.appendChild(item);
  }

  let consent = null;
  try {
    consent = localStorage.getItem(consentKey);
  } catch (_) {
    consent = null;
  }

  addPreferencesControl();

  if (consent === "granted") {
    loadAnalytics();
  } else if (consent !== "denied") {
    showConsentBanner();
  }
})();
