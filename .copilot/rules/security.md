# Security Rules (React Project)

1. **XSS Safety**
   - React escapes values by default, making it XSS-safe in most cases.
   - Only use dangerouslySetInnerHTML when absolutely necessary, and sanitize input before rendering.

2. **Safe HTML Rendering**
   - Create a utility (e.g., SafeHTMLRenderer) that sanitizes HTML before injecting it.
   - Never render raw HTML strings directly without sanitization.

3. **HTTP Requests**
   - Use fetch or axios for API calls.
   - Centralize API logic in services; never call API endpoints directly in components.

4. **Logging**
   - No Personally Identifiable Information (PII) in logs.
   - Log only technical details needed for debugging (error codes, endpoints, timestamps).

5. **Sensitive Data**
   - Never include sensitive data (tokens, passwords) in URL parameters.
   - Use headers or secure storage mechanisms instead.