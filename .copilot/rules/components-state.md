# Component State Rules

- Separate container/smart components from presentational child components.
- Store asynchronous state in a centralized state layer, not inside deeply nested components.
- Use services for API calls and keep fetch logic outside UI components.
- Child components should receive data and callbacks through props only.
- Keep each component focused and under 150 lines where practical.
