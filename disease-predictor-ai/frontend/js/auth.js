// auth.js — Authentication Logic

document.addEventListener("DOMContentLoaded", () => {

    if (!window.supabaseClient) {
        console.error("Supabase not loaded! Check js/supabase.js path.");
        document.getElementById("authMsg").textContent = "Connection error. Please refresh.";
        return;
    }

    const sb = window.supabaseClient;

    // ── 1. IF ALREADY LOGGED IN → skip to app ────────────────────────────────
    sb.auth.getSession().then(({ data }) => {
        if (data.session) {
            window.location.href = "index.html";
        }
    });

    // ── 2. TABS — (UI logic moved to login.html so it's instant) ──────────────
    // We read window.authMode which is set by the instant UI script
    if (typeof window.authMode === 'undefined') window.authMode = "login";

    // ── 3. EMAIL / PASSWORD AUTH ──────────────────────────────────────────────
    document.getElementById("authBtn").onclick = async () => {

        const email = document.getElementById("emailInput").value.trim();
        const password = document.getElementById("passInput").value.trim();
        const btn = document.getElementById("authBtn");

        clearMsg();

        if (!email || !password) {
            showError("Please enter your email and password.");
            return;
        }

        if (password.length < 6) {
            showError("Password must be at least 6 characters.");
            return;
        }

        btn.disabled = true;
        btn.textContent = "Please wait...";

        let result;

        if (window.authMode === "login") {
            result = await sb.auth.signInWithPassword({ email, password });
        } else {
            const name = document.getElementById("nameInput").value.trim();
            if (!name) {
                showError("Please enter your full name.");
                btn.disabled = false;
                btn.textContent = "Sign Up";
                return;
            }
            result = await sb.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name }
                }
            });
        }

        btn.disabled = false;
        btn.textContent = window.authMode === "login" ? "Login" : "Sign Up";

        if (result.error) {
            showError(friendlyError(result.error.message));
            return;
        }

        if (window.authMode === "signup") {
            showSuccess("Account created! Check your email to confirm, then login.");
        } else {
            window.location.href = "index.html";
        }
    };

    document.getElementById("passInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("authBtn").click();
    });

    // ── 4. GOOGLE OAUTH ───────────────────────────────────────────────────────
    document.getElementById("googleBtn").onclick = async () => {

        const btn = document.getElementById("googleBtn");
        btn.disabled = true;
        btn.textContent = "Redirecting to Google...";

        const { error } = await sb.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/index.html"
            }
        });

        if (error) {
            showError(error.message);
            btn.disabled = false;
            btn.textContent = "Continue with Google";
        }
    };

    // ── 5. FORGOT PASSWORD ────────────────────────────────────────────────────
    const forgotBtn = document.getElementById("forgotBtn");
    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("modalClose");
    const resetBtn = document.getElementById("resetBtn");
    const resetEmail = document.getElementById("resetEmail");
    const resetMsg = document.getElementById("resetMsg");

    // Open modal
    forgotBtn.addEventListener("click", () => {
        // Pre-fill email if user already typed it
        resetEmail.value = document.getElementById("emailInput").value.trim();
        resetMsg.textContent = "";
        resetMsg.className = "msg";
        modal.classList.add("open");
        setTimeout(() => resetEmail.focus(), 80);
    });

    // Close modal
    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") modal.classList.remove("open");
    });

    // Send reset email
    resetBtn.addEventListener("click", async () => {
        const email = resetEmail.value.trim();

        if (!email) {
            resetMsg.textContent = "Please enter your email address.";
            resetMsg.className = "msg error";
            return;
        }

        resetBtn.disabled = true;
        resetBtn.textContent = "Sending...";

        const { error } = await sb.auth.resetPasswordForEmail(email, {
            // ⚠️ Change this URL to wherever your reset-password page lives.
            // Must also be added in Supabase Dashboard (see instructions below).
            redirectTo: window.location.origin + "/reset-password.html"
        });

        resetBtn.disabled = false;
        resetBtn.textContent = "Send Reset Link";

        if (error) {
            resetMsg.textContent = friendlyError(error.message);
            resetMsg.className = "msg error";
        } else {
            resetMsg.textContent = "✓ Reset link sent — check your inbox!";
            resetMsg.className = "msg success";
        }
    });

    resetEmail.addEventListener("keydown", (e) => {
        if (e.key === "Enter") resetBtn.click();
    });

    // ── HELPERS ───────────────────────────────────────────────────────────────
    function showError(msg) {
        const el = document.getElementById("authMsg");
        el.className = "auth-error";
        el.textContent = msg;
    }

    function showSuccess(msg) {
        const el = document.getElementById("authMsg");
        el.className = "auth-success";
        el.textContent = msg;
    }

    function clearMsg() {
        const el = document.getElementById("authMsg");
        el.textContent = "";
        el.className = "auth-error";
    }

    function friendlyError(msg) {
        if (msg.includes("Invalid login")) return "Wrong email or password. Please try again.";
        if (msg.includes("Email not confirmed")) return "Please confirm your email first, then login.";
        if (msg.includes("already registered")) return "This email is already registered. Try logging in.";
        if (msg.includes("Password should")) return "Password must be at least 6 characters.";
        if (msg.includes("Unable to validate")) return "Invalid email address.";
        return msg;
    }

});