import { useEffect } from "react";

const BOOKING_SCRIPTS = [
  "https://www.reserveport.com/media/api5/jquery.min.js",
  "https://www.reserveport.com/media/api5/popper.min.js",
  "https://www.reserveport.com/media/api5/bootstrap.min.js",
  "https://reservations.reserveport.com/static/js/manifest.js",
  "https://reservations.reserveport.com/static/js/vendor.js",
  "https://reservations.reserveport.com/static/js/app.js",
];

const BOOKING_STYLES = [
  "https://reservations.reserveport.com/static/css/app.css",
  "https://www.reserveport.com/media/api5/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.css",
  "http://bookings.reserveport.com/reservations/laroza/booking.css"
];


const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.setAttribute("data-booking", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.body.appendChild(script);
  });

const loadStyle = (href: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute("data-booking", "true");
  document.head.appendChild(link);
};

const BookingWidget = () => {
  useEffect(() => {
    // 1. External CSS
    BOOKING_STYLES.forEach(loadStyle);

    // 2. Custom styles appended after — higher cascade priority
    const style = document.createElement("style");
    style.setAttribute("data-booking", "true");
    style.textContent = `
      #booking-widget h2 { font-size: 2.5rem; }
      #booking-widget .notify-container .fa,
      #booking-widget .notify-container h4.notify-title,
      #booking-widget .notify-text span.timerspan,
      #modalbookingForm .modal-header { color: #fff !important; }
    `;
    document.head.appendChild(style);

    // 3. Scripts in sequence
    BOOKING_SCRIPTS.reduce(
      (chain, src) => chain.then(() => loadScript(src)),
      Promise.resolve()
    ).then(() => {
      const trigger = document.getElementById("mobile_booking_triger");
      if (trigger) trigger.innerText = "Set Booking Filters";
      history.pushState("", "", `${location.pathname}${location.search}`);
    });

    // 4. Cleanup on unmount
    return () => {
      document.querySelectorAll("[data-booking]").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <booking-widget id="2325"></booking-widget>
    </>
  );
};

export default BookingWidget;