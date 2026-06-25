// Shared contact-form submission for both division pages.
//
// Both forms POST to a single Google Form's `formResponse` endpoint so every
// lead lands in one response Sheet. Each page sets `data-division` on its form
// ("Real Estate" / "Healthcare") so the Sheet records the source.
//
// SETUP (one-time): create the Google Form, then fill in the values below.
//   1. Form questions (short answer unless noted): Name, Email, Organization,
//      Message (paragraph), Division (short answer).
//   2. Settings → turn OFF "require sign in / limit to 1 response" and verified
//      email collection, or anonymous submissions are silently rejected.
//   3. ⋮ → "Get pre-filled link" → put a dummy value in each field → "Get link".
//      The generated URL contains `entry.<id>=dummy` for each question.
//   4. Paste each id below; set GOOGLE_FORM_ACTION to the form URL with
//      `/viewform` replaced by `/formResponse`.
//
// These ids are public by design (anyone can view the form), so committing them
// is fine — they are not secrets.
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

const ENTRY = {
  name: "entry.__NAME__",
  email: "entry.__EMAIL__",
  organization: "entry.__ORGANIZATION__",
  message: "entry.__MESSAGE__",
  division: "entry.__DIVISION__",
};

/**
 * Wire a contact form to submit to the Google Form.
 *
 * Expected markup:
 *   <form data-division="Real Estate"> … </form>
 * with named inputs (name/email/organization/message), a submit <button>, and
 * a status region: <p data-form-status role="status" aria-live="polite">.
 *
 * @param {HTMLFormElement | null} form
 */
export function initContactForm(form) {
  if (!form) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  // The status region lives as a sibling so it survives `form.hidden = true`
  // on success; fall back to inside the form if placed there.
  const status =
    (form.parentElement &&
      form.parentElement.querySelector("[data-form-status]")) ||
    form.querySelector("[data-form-status]");
  const submitLabel = submitButton ? submitButton.textContent : "";

  const setStatus = (message, state) => {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.dataset.state = state; // "success" | "error" (for styling)
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Native validation: focuses the first invalid field.
    if (!form.reportValidity()) {
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
      submitButton.setAttribute("aria-busy", "true");
    }
    setStatus("", undefined);

    const body = new URLSearchParams();
    for (const field of ["name", "email", "organization", "message"]) {
      const input = form.elements.namedItem(field);
      if (input && ENTRY[field]) {
        body.set(ENTRY[field], input.value);
      }
    }
    if (form.dataset.division && ENTRY.division) {
      body.set(ENTRY.division, form.dataset.division);
    }

    try {
      // `no-cors` returns an opaque response (Google blocks cross-origin
      // reads), so success is optimistic — only network failures throw.
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      form.reset();
      form.hidden = true;
      setStatus("Thanks — we'll be in touch shortly.", "success");
    } catch {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
        submitButton.removeAttribute("aria-busy");
      }
      setStatus(
        "Something went wrong. Email us directly at hello@ascotsoftware.com.",
        "error",
      );
    }
  });
}
