document.documentElement.classList.add("js");
const root = document.body.dataset.root || "";
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const mobileMenu = document.querySelector(".mobile-menu");
const navigation = document.querySelector("#main-nav");
function closeNav() {
  mobileMenu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.querySelectorAll(".nav-group").forEach((group) => {
    group.classList.remove("is-open");
    group.querySelector("button").setAttribute("aria-expanded", "false");
  });
}
mobileMenu.addEventListener("click", () => {
  const open = mobileMenu.getAttribute("aria-expanded") !== "true";
  mobileMenu.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
});
const navGroups = [...document.querySelectorAll(".nav-group")];
function setDropdown(group, open) {
  navGroups.forEach((item) => {
    const expanded = item === group && open;
    item.classList.toggle("is-open", expanded);
    item
      .querySelector(".nav-trigger")
      .setAttribute("aria-expanded", String(expanded));
  });
}
navGroups.forEach((group, index) => {
  const button = group.querySelector(".nav-trigger");
  const panel = group.querySelector(".submenu");
  panel.id = `nav-submenu-${index}`;
  button.setAttribute("aria-controls", panel.id);
  button.querySelector("span").setAttribute("aria-hidden", "true");
  button.addEventListener("click", () =>
    setDropdown(group, !group.classList.contains("is-open")),
  );
  group.addEventListener("pointerenter", (event) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(min-width:1025px)").matches
    )
      setDropdown(group, true);
  });
  group.addEventListener("pointerleave", (event) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(min-width:1025px)").matches &&
      !group.contains(document.activeElement)
    )
      setDropdown(group, false);
  });
  group.addEventListener("focusout", (event) => {
    if (!group.contains(event.relatedTarget)) setDropdown(group, false);
  });
  button.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setDropdown(group, true);
      panel.querySelector("a").focus();
    }
  });
  group.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setDropdown(group, false);
      button.focus();
    }
  });
});
document.addEventListener("click", (event) => {
  if (!event.target.closest("header")) closeNav();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
}

const quoteDialog = document.querySelector("#quote-dialog");
document.querySelectorAll(".quote-trigger").forEach((button) =>
  button.addEventListener("click", () => {
    if (button.dataset.plan)
      document.querySelector("#quote-plan").value = button.dataset.plan;
    if (button.dataset.family)
      document.querySelector("#quote-family").value = button.dataset.family;
    quoteDialog.showModal();
  }),
);
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => quoteDialog.close());
document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = document.querySelector("#quote-plan").value;
  const age = document.querySelector("#quote-age").value;
  const family = document.querySelector("#quote-family").value;
  const message =
    plan === "Group Societies"
      ? "Hello Bontle Ba Rona, I'd like a quote for a group society package."
      : `Hello Bontle Ba Rona, I'd like a quote for ${plan}. Age band: ${age}. Main member + dependants: ${family}. Please confirm the premium and policy terms.`;
  window.location.href =
    "https://wa.me/27818366788?text=" + encodeURIComponent(message);
});

document.querySelectorAll("[role=tablist]").forEach((list) => {
  const tabs = Array.from(list.querySelectorAll("[role=tab]"));
  function activate(tab) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden =
        !selected;
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (i + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        activate(tabs[next]);
        tabs[next].focus();
      }
    });
  });
});

const photos = Array.isArray(window.sitePhotos) ? window.sitePhotos : [];
const photoDialog = document.querySelector("#photo-dialog");
let lightboxItems = [];
let lightboxIndex = 0;
function displayPhoto() {
  const photo = lightboxItems[lightboxIndex];
  const image = document.querySelector("#lightbox-image");
  image.src = root + photo.file;
  image.alt = photo.alt || photo.caption || "Bontle Ba Rona gallery photograph";
  document.querySelector("#photo-caption").textContent = photo.caption || "";
  document.querySelector("#photo-count").textContent =
    `${lightboxIndex + 1} / ${lightboxItems.length}`;
  document.querySelector(".photo-prev").hidden = lightboxItems.length < 2;
  document.querySelector(".photo-next").hidden = lightboxItems.length < 2;
}
function openPhotos(items, index) {
  lightboxItems = items;
  lightboxIndex = index;
  displayPhoto();
  photoDialog.showModal();
}
document
  .querySelector(".photo-close")
  .addEventListener("click", () => photoDialog.close());
function movePhoto(change) {
  lightboxIndex =
    (lightboxIndex + change + lightboxItems.length) % lightboxItems.length;
  displayPhoto();
}
document
  .querySelector(".photo-prev")
  .addEventListener("click", () => movePhoto(-1));
document
  .querySelector(".photo-next")
  .addEventListener("click", () => movePhoto(1));
photoDialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    movePhoto(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    movePhoto(1);
  }
});
document
  .querySelectorAll(".flyer-open")
  .forEach((button) =>
    button.addEventListener("click", () =>
      openPhotos(
        [
          {
            file: button.dataset.image,
            caption: button.dataset.caption,
            alt: button.dataset.caption,
          },
        ],
        0,
      ),
    ),
  );
const gallery = document.querySelector("#gallery-grid");
if (gallery && photos.length) {
  document.querySelector(".gallery-empty").hidden = true;
  photos.forEach((photo, index) => {
    const tile = document.createElement("button");
    tile.className = "photo-tile";
    tile.setAttribute(
      "aria-label",
      `Open photograph ${index + 1}${photo.caption ? ": " + photo.caption : ""}`,
    );
    const img = document.createElement("img");
    img.src = root + photo.file;
    img.alt = photo.alt || photo.caption || "Bontle Ba Rona gallery photograph";
    img.loading = index < 3 ? "eager" : "lazy";
    tile.append(img);
    tile.addEventListener("click", () => openPhotos(photos, index));
    gallery.append(tile);
  });
}
document.querySelectorAll("[data-photo-slot]").forEach((el) => {
  const photo = photos[Number(el.dataset.photoSlot)];
  if (photo) {
    el.style.backgroundImage = `url("${root + photo.file}")`;
    el.setAttribute("role", "img");
    el.setAttribute(
      "aria-label",
      photo.alt || photo.caption || "Bontle Ba Rona",
    );
  }
});
const slideHost = document.querySelector(".hero-slides");
if (slideHost) {
  const pauseButton = document.querySelector(".slideshow-pause");
  const heroPhotos = photos.filter((photo) => photo.hero !== false).slice(0, 4);
  pauseButton.hidden = heroPhotos.length < 2;
  heroPhotos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (index === 0 ? " active" : "");
    slide.style.backgroundImage = `url("${root + photo.file}")`;
    slideHost.append(slide);
  });
  let activeSlide = 0;
  let paused = reducedMotion;
  const slides = Array.from(slideHost.children);
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute(
      "aria-label",
      paused ? "Play slideshow" : "Pause slideshow",
    );
    pauseButton.textContent = paused ? "▷" : "Ⅱ";
    slides.forEach((slide) => slide.classList.toggle("paused", paused));
  });
  if (slides.length > 1 && !reducedMotion)
    setInterval(() => {
      if (paused || document.hidden || document.querySelector("dialog[open]"))
        return;
      slides[activeSlide].classList.remove("active");
      activeSlide = (activeSlide + 1) % slides.length;
      slides[activeSlide].classList.add("active");
    }, 5000);
}
const track = document.querySelector(".plan-track");
if (track) {
  let paused = reducedMotion;
  let hovering = false;
  const pause = document.querySelector(".pause-plans");
  function step(direction) {
    const first = track.querySelector(".summary-card");
    const distance = first.getBoundingClientRect().width + 30;
    const end = track.scrollWidth - track.clientWidth;
    let target = track.scrollLeft + direction * distance;
    if (target > end + 5) target = 0;
    if (target < 0) target = end;
    track.scrollTo({
      left: target,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }
  document.querySelector(".previous-plan").addEventListener("click", () => {
    paused = true;
    pause.setAttribute("aria-pressed", "true");
    pause.setAttribute("aria-label", "Play plan carousel");
    pause.textContent = "▷";
    step(-1);
  });
  document.querySelector(".next-plan").addEventListener("click", () => {
    paused = true;
    pause.setAttribute("aria-pressed", "true");
    pause.setAttribute("aria-label", "Play plan carousel");
    pause.textContent = "▷";
    step(1);
  });
  pause.addEventListener("click", () => {
    paused = !paused;
    pause.setAttribute("aria-pressed", String(paused));
    pause.setAttribute(
      "aria-label",
      paused ? "Play plan carousel" : "Pause plan carousel",
    );
    pause.textContent = paused ? "▷" : "Ⅱ";
  });
  track.addEventListener("mouseenter", () => (hovering = true));
  track.addEventListener("mouseleave", () => (hovering = false));
  if (!reducedMotion)
    setInterval(() => {
      if (
        !paused &&
        !hovering &&
        !document.hidden &&
        !track.contains(document.activeElement) &&
        !document.querySelector("dialog[open]")
      )
        step(1);
    }, 5000);
}
