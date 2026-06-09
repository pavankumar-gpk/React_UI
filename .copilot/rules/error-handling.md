# Error Handling Rules (React Project)

1. **Top-Level ErrorBoundary**
   - Implement a top-level ErrorBoundary to catch rendering errors.

2. **Feature Route Isolation**
   - Wrap feature routes with ErrorBoundary for isolation.

3. **Async Error Handling**
   - Wrap all API calls (axios) in try/catch.