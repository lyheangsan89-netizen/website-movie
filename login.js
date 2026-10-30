/* Admin login page controller.
 * Compiled + obfuscated into build/login.js by `npm run build`.
 */
(function () {
  "use strict";

  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");
  const errorText = document.getElementById("error-text");
  const card = document.getElementById("login-card");
  const passInput = document.getElementById("password");
  const toggleBtn = document.getElementById("toggle-pass");
  const eyeIcon = document.getElementById("eye-icon");

  const EYE_OPEN =
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z";
  const EYE_OFF =
    "M3 3l18 18M10.584 10.587a2 2 0 002.828 2.83M9.363 5.365A9.466 9.466 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.771 9.771 0 01-4.293 5.226M6.228 6.228A9.75 9.75 0 002.458 12c1.274 4.057 5.064 7 9.542 7a9.47 9.47 0 004.135-.94";

  const showError = (message) => {
    errorText.textContent = message || "Invalid username or password";
    errorMsg.classList.remove("hidden");
    card.classList.remove("animate-shake");
    void card.offsetWidth;
    card.classList.add("animate-shake");
  };

  // Already signed in as an admin? Go straight to the dashboard.
  if (!window.SV_AUTH) {
    showError("Auth service failed to load. Refresh the page.");
  } else {
    const current = SV_AUTH.getUser();
    if (current && current.role === "admin") {
      window.location.replace("admin.html");
    }
  }

  toggleBtn.addEventListener("click", () => {
    const show = passInput.type === "password";
    passInput.type = show ? "text" : "password";
    if (eyeIcon) eyeIcon.setAttribute("d", show ? EYE_OFF : EYE_OPEN);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!window.SV_AUTH) {
      showError("Auth service failed to load. Refresh the page.");
      return;
    }

    const username = document.getElementById("username").value.trim();
    const result = SV_AUTH.login(username, passInput.value);

    if (!result.ok) {
      showError(result.error);
      return;
    }

    if (result.user.role !== "admin") {
      showError("This account does not have admin access.");
      return;
    }

    errorMsg.classList.add("hidden");
    window.location.replace("admin.html");
  });
})();
