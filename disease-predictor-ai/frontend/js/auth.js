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
        if (data.session) window.location.href = "index.html";
    });

    // ── 2. TABS ───────────────────────────────────────────────────────────────
    if (typeof window.authMode === 'undefined') window.authMode = "login";

    // ── 3. EMAIL / PASSWORD AUTH ──────────────────────────────────────────────
    document.getElementById("authBtn").onclick = async () => {

        const email    = document.getElementById("emailInput").value.trim();
        const password = document.getElementById("passInput").value.trim();
        const btn      = document.getElementById("authBtn");

        clearMsg();

        if (!email || !password) { showError("Please enter your email and password."); return; }
        if (password.length < 6) { showError("Password must be at least 6 characters."); return; }

        btn.disabled    = true;
        btn.textContent = "Please wait...";

        if (window.authMode === "login") {

            const { error } = await sb.auth.signInWithPassword({ email, password });
            btn.disabled = false; btn.textContent = "Login";
            if (error) { showError(friendlyError(error.message)); return; }
            window.location.href = "index.html";

        } else {

            const name = document.getElementById("nameInput").value.trim();
            if (!name) {
                showError("Please enter your full name.");
                btn.disabled = false; btn.textContent = "Sign Up";
                return;
            }

            // ── Check if email already exists ──
            // Try signing in with a wrong password — if error is "Invalid login"
            // it means the email EXISTS. If error is "user not found" it's new.
            const { error: loginCheck } = await sb.auth.signInWithPassword({
                email,
                password: "____check____"
            });

            const emailExists =
                loginCheck &&
                (loginCheck.message.includes("Invalid login") ||
                 loginCheck.message.includes("Email not confirmed") ||
                 loginCheck.message.includes("invalid_credentials"));

            if (emailExists) {
                btn.disabled = false; btn.textContent = "Sign Up";
                showError("This email is already registered. Please login instead.");
                // Switch to login tab and prefill email
                document.getElementById("loginTab").click();
                document.getElementById("emailInput").value = email;
                document.getElementById("passInput").focus();
                return;
            }

            // Email is new — proceed with real signup
            const { error: signupError } = await sb.auth.signUp({
                email, password,
                options: { data: { full_name: name } }
            });

            btn.disabled = false; btn.textContent = "Sign Up";
            if (signupError) { showError(friendlyError(signupError.message)); return; }
            showSuccess("Account created! Check your email to confirm, then login.");
        }
    };

    document.getElementById("passInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("authBtn").click();
    });

    // ── 4. GOOGLE OAUTH ───────────────────────────────────────────────────────
    document.getElementById("googleBtn").onclick = async () => {
        const btn = document.getElementById("googleBtn");
        btn.disabled = true; btn.textContent = "Redirecting to Google...";

        const { error } = await sb.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: window.location.origin + "/index.html" }
        });

        if (error) {
            showError(error.message);
            btn.disabled = false; btn.textContent = "Continue with Google";
        }
    };

    // ── 5. FORGOT PASSWORD ────────────────────────────────────────────────────
    const forgotBtn  = document.getElementById("forgotBtn");
    const modal      = document.getElementById("modal");
    const modalClose = document.getElementById("modalClose");
    const resetBtn   = document.getElementById("resetBtn");
    const resetEmail = document.getElementById("resetEmail");
    const resetMsg   = document.getElementById("resetMsg");

    forgotBtn.addEventListener("click", () => {
        resetEmail.value     = document.getElementById("emailInput").value.trim();
        resetMsg.textContent = "";
        resetMsg.className   = "msg";
        modal.classList.add("open");
        setTimeout(() => resetEmail.focus(), 80);
    });

    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.remove("open"); });

    resetBtn.addEventListener("click", async () => {
        const email = resetEmail.value.trim();
        if (!email) {
            resetMsg.textContent = "Please enter your email address.";
            resetMsg.className   = "msg error";
            return;
        }

        resetBtn.disabled = true; resetBtn.textContent = "Checking...";

        // Check if email is registered using wrong-password trick
        const { error: check } = await sb.auth.signInWithPassword({
            email,
            password: "____check____"
        });

        const emailExists =
            check &&
            (check.message.includes("Invalid login") ||
             check.message.includes("Email not confirmed") ||
             check.message.includes("invalid_credentials"));

        if (!emailExists) {
            resetBtn.disabled    = false;
            resetBtn.textContent = "Send Reset Link";
            resetMsg.textContent = "No account found with this email. Please sign up first.";
            resetMsg.className   = "msg error";
            return;
        }

        const { error } = await sb.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/reset-password.html"
        });

        resetBtn.disabled    = false;
        resetBtn.textContent = "Send Reset Link";

        if (error) {
            resetMsg.textContent = friendlyError(error.message);
            resetMsg.className   = "msg error";
        } else {
            resetMsg.textContent = "✓ Reset link sent — check your inbox!";
            resetMsg.className   = "msg success";
        }
    });

    resetEmail.addEventListener("keydown", (e) => { if (e.key === "Enter") resetBtn.click(); });

    // ── HELPERS ───────────────────────────────────────────────────────────────
    function showError(msg) {
        const el = document.getElementById("authMsg");
        el.className = "auth-error"; el.textContent = msg;
    }
    function showSuccess(msg) {
        const el = document.getElementById("authMsg");
        el.className = "auth-success"; el.textContent = msg;
    }
    function clearMsg() {
        const el = document.getElementById("authMsg");
        el.textContent = ""; el.className = "auth-error";
    }
    function friendlyError(msg) {
        if (msg.includes("Invalid login"))       return "Wrong email or password. Please try again.";
        if (msg.includes("Email not confirmed")) return "Please confirm your email first, then login.";
        if (msg.includes("already registered"))  return "This email is already registered. Try logging in.";
        if (msg.includes("Password should"))     return "Password must be at least 6 characters.";
        if (msg.includes("Unable to validate"))  return "Invalid email address.";
        return msg;
    }

});
