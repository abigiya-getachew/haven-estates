# AGENTS.md

# HAVEN Estates Addis — Coding Agent Rules

## 1. Purpose

This document defines the mandatory rules for AI coding agents and human developers working on HAVEN Estates Addis.

The product is a premium real estate website for the Addis Ababa market. Its primary purpose is to help visitors discover properties, evaluate listings, and contact the agency.

The implementation must prioritize:

- Correctness and reliability.
- Security and privacy.
- Maintainable, readable code.
- Consistent design and user experience.
- Type safety.
- Accessibility.
- Performance.
- Minimal complexity.
- Accurate alignment with the approved product requirements.

These rules apply throughout development, debugging, testing, refactoring, and deployment preparation.

---

## 2. Source of Truth

Before implementing or modifying functionality, consult the relevant project documents:

1. `PRD.md` — product scope, users, journeys, and functional requirements.
2. `DESIGN.md` — visual design, components, interactions, responsive behavior, and accessibility.
3. `ARCHITECTURE.md` — application structure, technology choices, data flow, and security boundaries.
4. `DATABASE.md` — schema, relationships, constraints, indexes, and database access policies.
5. `API.md` — endpoint contracts, validation, authorization, integrations, and error conventions.
6. `AGENTS.md` — development rules and coding standards.

### 2.1 Precedence

Follow this decision order:

1. Security, privacy, and correctness requirements.
2. Approved product requirements in `PRD.md`.
3. Architecture decisions in `ARCHITECTURE.md`.
4. Database contracts in `DATABASE.md`.
5. API contracts in `API.md`.
6. Visual and interaction requirements in `DESIGN.md`.
7. Implementation conventions in this document.

These documents should be consistent with one another. If they conflict, do not silently choose an interpretation that could affect security, data integrity, or product behavior.

Identify the conflict, explain its impact, and request clarification when necessary.

### 2.2 No Invented Requirements

Do not introduce features simply because they are common in other applications.

Unless explicitly approved, do not add:

- Visitor registration or user accounts.
- Saved properties or favorites.
- Payment processing.
- AI-powered property recommendations.
- Real-time chat.
- Complex analytics systems.
- Microservices.
- A separate backend application.
- Unnecessary administrative capabilities.
- Additional third-party integrations.

Implement the simplest reliable solution that satisfies the documented requirements.

### 2.3 Document Changes

If an implementation decision materially changes an approved requirement, architecture, API contract, database model, or design behavior, update the relevant documentation in the same change.

Do not let the codebase and project documentation silently diverge.

---

## 3. Inspect Before Changing

**Mandatory rule: inspect the existing codebase before modifying it.**

Before making changes:

1. Inspect the repository structure.
2. Read the relevant project documents.
3. Inspect the relevant source files.
4. Check existing components, utilities, hooks, services, and types.
5. Review existing dependency and configuration files.
6. Inspect related tests.
7. Understand the existing implementation and its callers.
8. Identify the smallest change that solves the problem.

Do not assume that a file, component, function, package, or configuration is absent without checking.

### 3.1 Preserve Existing Work

- Do not overwrite working code without understanding it.
- Do not replace established patterns without a concrete reason.
- Do not recreate functionality that already exists.
- Do not delete code merely because it appears unused without verifying its usage.
- Do not replace entire files when a focused change is sufficient.
- Do not discard user changes.
- Do not reset, revert, or overwrite unrelated work.

### 3.2 Existing Changes

Before making broad changes, inspect the repository's current change state when Git is available.

Treat uncommitted changes as user-owned unless explicitly instructed otherwise.

Do not assume that modified files are safe to overwrite just because they are part of the current task.

---

## 4. Code Quality and Naming

### 4.1 General Standards

Write code that is:

- Readable.
- Explicit.
- Small in scope.
- Easy to test.
- Easy to maintain.
- Consistent with existing project conventions.
- Appropriate for the actual complexity of the feature.

Prefer straightforward solutions over clever abstractions.

Avoid:

- Deeply nested conditional logic.
- Large functions that handle unrelated responsibilities.
- Duplicate business rules.
- Hidden side effects.
- Unnecessary global state.
- Magic values scattered throughout the codebase.
- Premature abstractions.
- Comments that merely restate the code.

### 4.2 Naming Conventions

Follow the established repository conventions. If none exist, use the following defaults:

| Item                        | Convention                                             | Example                    |
| --------------------------- | ------------------------------------------------------ | -------------------------- |
| React components            | PascalCase                                             | `PropertyCard`             |
| Component files             | Match component name                                   | `PropertyCard.tsx`         |
| Functions and variables     | camelCase                                              | `getPublishedProperties`   |
| Constants                   | camelCase unless project conventions specify otherwise | `defaultPageSize`          |
| Types and interfaces        | PascalCase                                             | `PropertySummary`          |
| Custom hooks                | `use` prefix                                           | `usePropertyFilters`       |
| Database tables and columns | Follow `DATABASE.md`                                   | `properties`, `created_at` |
| API routes                  | Follow framework conventions                           | `app/api/contact/route.ts` |
| Test files                  | Follow existing test conventions                       | `PropertyCard.test.tsx`    |
| Environment variables       | UPPER_SNAKE_CASE                                       | `NEXT_PUBLIC_SITE_URL`     |

Use names that communicate purpose rather than implementation details.

Avoid vague names such as `data`, `item`, `process`, or `helper` when a more specific name is available.

### 4.3 Function Responsibilities

Each function should have a clear responsibility.

Separate concerns when useful:

- UI rendering.
- Form state and interaction.
- Input validation.
- Business rules.
- Database access.
- External service calls.
- Authorization.
- Error mapping.

Do not introduce extra abstraction layers for trivial operations unless they improve reuse, testability, or separation of concerns.

### 4.4 Comments

Write comments when they explain:

- Why a non-obvious decision exists.
- A security constraint.
- A business rule that could otherwise be misunderstood.
- A workaround for a known limitation.
- An important performance consideration.

Keep comments accurate as code changes.

Do not use comments as a substitute for clear naming or simple logic.

---

## 5. Project and Folder Structure

Follow `ARCHITECTURE.md` and the existing repository structure.

If the application uses Next.js App Router, organize functionality according to the established route and module conventions.

A typical logical organization may include:

- `app/` — routes, layouts, pages, and Route Handlers.
- `components/` — reusable UI components.
- `components/ui/` — shared, low-level interface components where appropriate.
- `features/` — feature-specific modules if the existing architecture uses them.
- `lib/` — shared utilities and infrastructure clients.
- `lib/db/` — Neon/Drizzle database client setup if this matches the approved architecture.
- `types/` — shared domain and application types when not better colocated.
- `tests/` — tests that cannot be kept alongside their implementation.
- `public/` — static assets.
- `drizzle/migrations/` — database migrations if this matches the approved database workflow.

This is a guideline, not permission to restructure the repository.

### 5.1 Organization Rules

- Keep route-specific components close to their route when appropriate.
- Keep reusable components separate from feature-specific components.
- Keep database access out of presentational components.
- Keep external provider logic out of unrelated UI modules.
- Avoid circular dependencies.
- Avoid creating a folder for a single trivial file unless it improves clarity.
- Do not create multiple competing locations for the same responsibility.
- Do not move files solely to make the structure look cleaner.

### 5.2 Import Boundaries

Follow the architecture's trust boundaries.

- Client components must not import server-only modules.
- Browser code must not import service-role database clients or private credentials.
- Presentational components should not import database clients directly.
- Shared modules must not accidentally pull server-only dependencies into client bundles.
- Server-only modules should use explicit server-only protections where supported by the framework.

Use existing path aliases and import conventions.

---

## 6. Component Reuse and UI Standards

### 6.1 Reuse Before Creating

Before creating a component, inspect the existing component library.

Reuse existing components when they provide the required behavior and accessibility.

Relevant reusable components may include:

- Buttons.
- Links.
- Form fields.
- Select controls.
- Property cards.
- Property galleries.
- Navigation.
- Filter controls.
- Loading indicators.
- Empty states.
- Error messages.
- Modal or dialog components, if required.

Do not create duplicate components with slightly different names to avoid understanding an existing implementation.

### 6.2 Avoid Over-Abstraction

Reuse does not mean that every element needs its own component.

Create a shared component when it provides meaningful reuse, consistent behavior, or a clear responsibility.

Do not create a generic component system for a single use case when a small local component is clearer.

### 6.3 Follow DESIGN.md

All user-facing changes must respect `DESIGN.md`.

Preserve the approved:

- Brand direction.
- Color palette.
- Typography.
- Spacing and layout.
- Component behavior.
- Responsive breakpoints.
- Property-card proportions.
- Form interactions.
- Loading, empty, and error states.
- Accessibility requirements.

Use established design tokens rather than introducing arbitrary colors, font sizes, spacing values, or shadows.

Do not introduce a new visual style without approval.

### 6.4 Property Content

- Use actual approved property data when available.
- Do not invent real estate listings and present them as genuine.
- Clearly identify demonstration listings as demo content.
- Do not invent testimonials, awards, agency credentials, or customer statistics.
- Use appropriately licensed images.
- Provide meaningful alternative text for informative images.
- Avoid misleading prices, availability, or property descriptions.

### 6.5 Responsive Behavior

Verify that changed UI works across supported viewport sizes.

At minimum, consider:

- Small mobile screens.
- Larger mobile screens.
- Tablets.
- Desktop screens.

Prevent horizontal overflow, clipped controls, unusable navigation, and inaccessible form fields.

Do not solve desktop layout problems by breaking mobile behavior.

---

## 7. Type Safety

### 7.1 TypeScript

If the project uses TypeScript, preserve and strengthen type safety.

- Avoid `any`.
- Prefer `unknown` when a value's type is not yet known.
- Narrow untrusted values before using them.
- Define explicit domain types where they improve clarity.
- Use appropriate return types for important service boundaries.
- Avoid unnecessary type assertions.
- Do not use non-null assertions to suppress unresolved uncertainty.
- Keep types aligned with the database and API contracts.

Do not weaken compiler settings to make an implementation pass.

### 7.2 Runtime Validation

TypeScript does not validate incoming HTTP requests or external data at runtime.

Validate untrusted values received from:

- Contact forms.
- Query parameters.
- Route parameters.
- Server Actions.
- HTTP request bodies.
- External APIs.
- Uploaded files.
- Environment variables.

Reuse the project's existing validation library if one is already approved.

Do not add another validation dependency without a clear justification.

### 7.3 Database Types

Use generated database types when supported by the established Drizzle/Neon workflow.

Keep database types synchronized with schema migrations.

Do not manually redefine database records in multiple locations when a shared or generated type is available.

Avoid exposing internal database row types directly to every UI component. Use purpose-specific types when public responses need fewer fields than the underlying record.

### 7.4 External Data

Treat external service responses as untrusted.

Check their shape and handle missing or malformed fields before using them.

Do not assume that a successful HTTP status guarantees a valid response body.

---

## 8. Dependency Management

### 8.1 Before Adding a Dependency

Before installing a package:

1. Check whether the project already has a suitable dependency.
2. Check whether the framework or platform already provides the required capability.
3. Determine whether a small native implementation would be sufficient.
4. Evaluate security, maintenance, compatibility, and bundle-size implications.
5. Confirm that the package fits the approved architecture.
6. Add the dependency only if it provides meaningful value.

### 8.2 Prohibited Practices

Do not:

- Add a library for a trivial one-line operation without justification.
- Introduce multiple libraries that solve the same problem.
- Replace an existing library without a concrete benefit.
- Install packages solely for speculative future features.
- Upgrade unrelated dependencies during a focused task.
- Change the package manager without approval.
- Manually edit a lockfile when the package manager should update it.
- Use unmaintained or untrusted packages for security-sensitive operations.

### 8.3 Dependency Changes

When a dependency is necessary:

- Use the repository's existing package manager.
- Keep versions consistent with the project's dependency policy.
- Update the appropriate manifest and lockfile.
- Verify compatibility with the installed framework version.
- Run relevant tests and build checks.
- Document material architectural changes.

---

## 9. Error Handling

### 9.1 General Rules

Errors must be handled intentionally.

- Do not silently swallow unexpected exceptions.
- Do not use empty `catch` blocks.
- Do not display raw internal errors to visitors.
- Do not fabricate successful results after an operation fails.
- Do not treat a failed database query as an empty result set.
- Do not ignore failed external service calls.
- Do not log secrets or unnecessary personal information.

Distinguish between expected failures and unexpected system failures.

### 9.2 User-Facing Errors

Follow the error states defined in `DESIGN.md`.

Messages should be clear and actionable without exposing implementation details.

Examples of appropriate messages include:

- "We couldn't load the properties. Please try again."
- "Please check the highlighted fields."
- "Your inquiry could not be submitted. Please try again or contact us directly."

Provide recovery actions where appropriate.

### 9.3 Server-Side Errors

Use the error conventions in `API.md`.

- Return the correct HTTP status.
- Use consistent error codes.
- Validate inputs before database writes.
- Log useful, non-sensitive diagnostics.
- Avoid leaking stack traces or raw provider errors.
- Preserve request correlation information where available.

### 9.4 Partial Failures

Consider operations that can partially succeed.

Examples include:

- Inquiry persistence succeeding while email delivery fails.
- An image upload succeeding while the database update fails.
- A property update succeeding while cache invalidation fails.

Handle these cases explicitly. Do not assume operations across separate services are atomic.

### 9.5 Loading, Empty, and Error States

For each data-driven interface, determine how it behaves when:

- Data is loading.
- No matching records exist.
- The request fails.
- A record is unavailable.
- An operation is in progress.
- A submission succeeds.
- A submission fails.

Do not use an empty state to conceal a backend failure.

---

## 10. Security and Secrets

Security requirements apply to every change, including UI changes and refactoring.

### 10.1 Secrets

Never expose:

- Database service-role keys.
- Private API keys.
- Email provider credentials.
- Authentication secrets.
- Signing keys.
- Private connection strings.
- Other server-only credentials.

Never place secrets in:

- Client-side code.
- `NEXT_PUBLIC_` environment variables.
- Browser storage.
- URLs.
- HTML attributes.
- Public API responses.
- Screenshots or generated documentation.
- Git commits.

Use environment variables and the deployment platform's secret-management facilities.

Use `.env.example` only for variable names and safe placeholder values.

If a secret is exposed, stop treating it as trusted and report the exposure so the credential can be rotated.

### 10.2 Authentication

When implementing protected functionality:

- Verify the session server-side.
- Handle missing and expired sessions.
- Never trust client-supplied user IDs as proof of identity.
- Never trust a role or permission supplied by the browser.
- Keep authentication logic consistent with `ARCHITECTURE.md`.

### 10.3 Authorization

Authentication does not automatically grant permission to perform an operation.

Verify authorization on every protected server-side operation.

This includes:

- Creating and updating properties.
- Publishing and unpublishing listings.
- Managing property images.
- Reading administrative inquiry records.
- Updating inquiry status.
- Performing other privileged database operations.

Do not rely on hidden buttons, frontend route guards, or client-side checks as the only security boundary.

### 10.4 Input Validation

Treat all external input as untrusted.

Validate and normalize:

- Form fields.
- Query parameters.
- Route parameters.
- IDs and slugs.
- File uploads.
- External service responses.
- Environment configuration.

Use parameterized database operations or the approved query builder.

Never construct unsafe SQL by concatenating user-controlled input.

### 10.5 Cross-Site Scripting

- Use framework-provided output escaping.
- Avoid rendering untrusted HTML.
- Do not use unsafe HTML injection APIs unless explicitly justified and safely sanitized.
- Treat property descriptions and contact messages as untrusted content.
- Validate URLs before rendering user-controlled links.

### 10.6 Request Abuse

Follow `API.md` for:

- Rate limiting.
- Request-size limits.
- Content-type validation.
- Origin protection where applicable.
- Form abuse prevention.

Do not introduce permissive CORS rules or disable existing security controls to resolve a local development problem.

### 10.7 File Uploads

If property image uploads are implemented:

- Verify authorization before accepting uploads.
- Validate file size.
- Validate permitted formats.
- Do not trust the supplied filename or MIME type alone.
- Generate safe object names.
- Use the approved storage bucket and access policy.
- Prevent unauthorized uploads, replacements, or deletions.
- Avoid allowing uploaded content to execute as application code.

### 10.8 Privacy

- Collect only required personal information.
- Do not log full contact messages by default.
- Do not expose contact submissions through public queries.
- Avoid sending personal data to analytics or unrelated third parties.
- Follow the approved retention and deletion policy.
- Keep administrative data out of public caches.

---

## 11. Database Access

### 11.1 Follow DATABASE.md

The database schema and relationships defined in `DATABASE.md` are authoritative.

Do not independently invent new tables, columns, constraints, or relationships without updating the database design and obtaining approval where necessary.

### 11.2 Data Access Boundaries

- Keep database operations in the approved server-side data-access layer.
- Do not query the database directly from presentational components.
- Do not duplicate database access logic across multiple pages.
- Reuse established query functions when their behavior matches the requirement.
- Select only the fields needed by the operation.
- Apply filters and pagination at the database level where appropriate.

### 11.3 Public Property Queries

All public property reads must exclude unpublished and archived listings.

Apply the publication restriction in the actual data-access or database security layer, not just in the rendered UI.

Do not expose internal property notes or administrative metadata through public responses.

### 11.4 Privileged Database Access

Treat service-role database access as highly privileged.

- Use it only on the server.
- Perform explicit authorization checks before privileged operations.
- Never expose the key to client components.
- Never assume RLS protects operations performed with a credential that bypasses RLS.
- Keep privileged operations narrowly scoped.

### 11.5 Row-Level Security

Follow the policies specified in `DATABASE.md`.

Do not disable RLS simply to make a query work.

Do not introduce broad policies such as unrestricted access to all rows unless explicitly required and approved.

Verify that policies permit intended operations while preventing unauthorized access.

### 11.6 Database Errors

Handle expected database failures appropriately.

- Treat missing records distinctly from unexpected failures.
- Handle unique-constraint conflicts intentionally.
- Avoid returning raw SQL or provider errors.
- Preserve transactional integrity where multiple database changes must succeed together.
- Do not retry writes blindly when the previous operation may already have succeeded.

---

## 12. API and External Service Access

### 12.1 Follow API.md

Keep API behavior consistent with `API.md`.

Do not change endpoint contracts, status codes, response structures, validation rules, or authorization behavior without considering existing callers and updating the relevant documentation.

### 12.2 Contact Endpoint

The public contact endpoint must:

- Validate request bodies server-side.
- Enforce the approved field requirements.
- Apply request-size limits.
- Apply rate limiting.
- Avoid exposing personal data.
- Handle external service failures.
- Return accurate submission status.
- Avoid logging sensitive message content.

Never report successful delivery if the required submission workflow failed.

### 12.3 WhatsApp

Use the approved WhatsApp click-to-chat approach.

- Encode message content correctly.
- Use the configured agency number.
- Avoid embedding secrets in URLs.
- Do not claim that clicking the link means a message was sent.
- Preserve alternative contact methods.

Do not introduce WhatsApp Business API integration or webhook handling without approval.

### 12.4 Email

If email notifications are enabled:

- Keep provider credentials server-side.
- Validate email addresses.
- Use the configured recipient and verified sender.
- Handle provider failures.
- Avoid unnecessary personal data.
- Do not expose provider responses to visitors.

Do not add an email provider if the approved contact workflow does not require one.

### 12.5 External Service Reliability

External services can fail, time out, or return malformed data.

Use bounded timeouts and appropriate error handling where supported.

Retry operations only when retrying is safe.

Avoid infinite retries, uncontrolled request loops, and duplicate notifications.

Do not introduce background job infrastructure unless a documented requirement justifies it.

---

## 13. Forms and Validation

### 13.1 Client and Server Validation

Use client-side validation to improve usability and server-side validation to enforce correctness and security.

Client validation never replaces server validation.

### 13.2 Contact Form

Follow the approved requirements:

- Name is required.
- A message is required.
- At least one contact method must be provided.
- Email must be valid when supplied.
- Phone input must follow the accepted format.
- Property references must be validated when included.

Display field-level errors clearly.

Preserve user input after recoverable errors when safe to do so.

Prevent accidental duplicate submissions while a request is in progress.

### 13.3 Form States

Implement appropriate states for:

- Initial.
- Submitting.
- Success.
- Validation failure.
- Server failure.
- Rate limiting.

Ensure the success state corresponds to the actual outcome of the configured submission workflow.

Do not clear form data before the operation has reached an appropriate success state.

---

## 14. Testing

### 14.1 General Rule

Add or update tests for behavior changed by the task.

Do not assume that a successful build proves the feature is correct.

Use the existing test framework and conventions.

Do not add a new test framework without justification.

### 14.2 Required Test Categories

Where relevant, cover:

- Unit tests for business rules and utilities.
- Component tests for interactive UI behavior.
- Integration tests for database and API boundaries.
- Authorization tests for privileged operations.
- Validation tests for untrusted input.
- End-to-end tests for critical user journeys.

### 14.3 Property Browsing

Test:

- Published properties appear.
- Draft and archived properties do not appear publicly.
- Property filters behave correctly.
- Price boundaries work correctly.
- Bedroom filtering matches the approved interpretation.
- Pagination behaves correctly.
- Missing property slugs render the expected not-found state.
- Property images have appropriate fallback behavior.

### 14.4 Contact Form

Test:

- Valid submissions.
- Missing required fields.
- Invalid email addresses.
- Missing both contact methods.
- Invalid property references.
- Submission loading state.
- Successful submission.
- Failed submission.
- Rate limiting.
- External provider failures when applicable.

### 14.5 Authorization and Security

Where relevant, test:

- Unauthenticated access.
- Authenticated users without administrative permission.
- Authorized administrative operations.
- Attempts to modify another user's protected data.
- RLS policy behavior.
- Malformed requests.
- Oversized payloads.
- Invalid file uploads.
- Duplicate submissions.

### 14.6 Regression Testing

Before completing a change, consider whether it affects:

- Existing page routes.
- Shared components.
- Responsive layouts.
- Database queries.
- Authentication.
- API contracts.
- Accessibility.
- SEO metadata.
- Performance.

Run the relevant regression tests.

### 14.7 Report Test Results Honestly

Report:

- Which checks were run.
- Which checks passed.
- Which checks failed.
- Which checks could not be run and why.

Never claim that tests passed if they were not executed.

---

## 15. Accessibility

Follow `DESIGN.md` and the project's accessibility requirements.

At minimum:

- Use semantic HTML.
- Provide accessible labels for form controls.
- Associate validation errors with relevant fields.
- Preserve keyboard navigation.
- Provide visible focus states.
- Maintain sufficient color contrast.
- Use appropriate alternative text for meaningful images.
- Avoid conveying status through color alone.
- Ensure dialogs and menus are keyboard-accessible when implemented.
- Respect reduced-motion preferences.
- Ensure interactive targets are usable on touch devices.

Do not remove accessibility attributes or keyboard behavior to simplify implementation.

When modifying a shared component, consider the accessibility impact on every place it is used.

---

## 16. Performance

Follow the performance goals in `DESIGN.md`.

Prefer:

- Server rendering for public property pages where appropriate.
- Server-side filtering and pagination.
- Optimized image delivery.
- Correct image dimensions and aspect ratios.
- Lazy loading for off-screen images where appropriate.
- Minimal client-side JavaScript.
- Reuse of existing dependencies.
- Targeted cache revalidation.
- Efficient database queries.

Avoid:

- Fetching the same data repeatedly without a reason.
- Loading entire property datasets into the browser for filtering.
- Making client components unnecessarily large.
- Adding heavy libraries for minor interactions.
- Introducing expensive database queries without evaluating their impact.
- Caching private data in public caches.

Do not sacrifice security or correctness for marginal performance improvements.

---

## 17. SEO and Public Content

Preserve the public website's search-engine accessibility.

Where applicable:

- Use descriptive page titles and metadata.
- Generate canonical URLs consistently.
- Provide meaningful property page metadata.
- Handle unavailable properties correctly.
- Avoid indexing private administrative pages.
- Avoid exposing draft property information in metadata.
- Ensure public property content is rendered in a crawler-accessible way.

Do not invent property facts or publish misleading structured data.

When changing routing or metadata behavior, consider its effect on existing property URLs and indexing.

---

## 18. Documentation Rules

Keep technical documentation accurate and useful.

Update relevant documents when changes affect:

- Product behavior: `PRD.md`.
- Visual behavior: `DESIGN.md`.
- Architecture: `ARCHITECTURE.md`.
- Database structure: `DATABASE.md`.
- API contracts: `API.md`.
- Coding-agent rules: `AGENTS.md`.

### 18.1 Database Changes

Every schema change must include the appropriate migration and any necessary updates to generated types, constraints, indexes, RLS policies, and seeds.

Do not rely on undocumented manual production database edits.

### 18.2 Environment Variables

When adding or changing environment variables:

- Update the relevant documentation.
- Update `.env.example` with placeholder values.
- State whether the variable is public or server-only.
- Document when it is required.
- Never include actual secrets.

### 18.3 Comments and Technical Notes

Keep documentation concise and specific.

Do not document behavior that the implementation does not provide.

Do not leave obsolete instructions after a feature changes.

---

## 19. Git and Change Discipline

### 19.1 Scope Control

Make only the changes needed to complete the requested task.

Do not include unrelated:

- Refactoring.
- Formatting changes across the repository.
- Dependency upgrades.
- Design changes.
- Database modifications.
- Configuration rewrites.
- Feature additions.
- File deletions.

If a broader change is necessary, explain why before proceeding when practical.

### 19.2 Preserve Existing Changes

- Do not overwrite unrelated uncommitted work.
- Do not discard changes you did not create.
- Do not use destructive Git operations without explicit authorization.
- Do not force-push or rewrite shared history unless specifically authorized.
- Do not automatically commit or push unless requested or required by the established workflow.

### 19.3 Review Before Completion

Review the final change set for:

- Accidental file modifications.
- Debug statements.
- Temporary files.
- Exposed secrets.
- Unnecessary dependencies.
- Broken imports.
- Missing tests.
- Inconsistent documentation.
- Unrelated formatting changes.

### 19.4 Formatting and Linting

Use the repository's existing formatter, linter, and type-checking configuration.

Avoid broad formatting changes unrelated to the task.

Do not disable lint rules or suppress TypeScript errors merely to get a passing check.

If a suppression is genuinely necessary, keep it narrow and document the reason.

---

## 20. Database Migrations and Seed Data

### 20.1 Migrations

Database changes must be represented through the approved migration workflow.

- Create migrations for schema changes.
- Preserve existing production data.
- Include required constraints and indexes.
- Include RLS policy changes when applicable.
- Review destructive operations carefully.
- Keep migrations consistent with `DATABASE.md`.
- Do not modify an already-applied migration in a way that assumes it will be rerun in existing environments.

For destructive or irreversible changes, explain the data impact and obtain approval before proceeding.

### 20.2 Seed Data

Seed data must be clearly distinguished from real business data.

- Do not seed fake listings into production as genuine properties.
- Do not create fake customer testimonials.
- Do not insert real personal information into development fixtures.
- Keep demo data deterministic where practical.
- Ensure seed scripts are safe to rerun where the workflow requires it.

### 20.3 Generated Artifacts

Do not manually modify generated files when they should be regenerated from their source.

Examples include generated database types and build artifacts.

Follow the repository's established generation workflow.

---

## 21. Environment and Configuration

### 21.1 Local Development

Use the existing project setup.

Before changing configuration:

- Understand its current purpose.
- Check whether the setting is required by the task.
- Consider its impact on local development, testing, and production.
- Preserve environment-specific behavior.

### 21.2 Production Safety

Never assume that local development settings are safe for production.

Verify that:

- Debug behavior is disabled where appropriate.
- Production credentials are configured securely.
- Database policies are active.
- Required environment variables exist.
- External services use the correct production configuration.
- Public pages do not expose administrative data.

### 21.3 Configuration Validation

Validate required environment variables through the project's established configuration approach.

Fail clearly when required configuration is missing.

Do not silently substitute insecure credentials or fabricated production values.

---

## 22. AI Coding Agent Workflow

For every task, follow this workflow.

### Step 1: Understand

- Read the task carefully.
- Identify the affected user journey.
- Consult the relevant project documents.
- Determine acceptance criteria.
- Identify security, data, and compatibility risks.

### Step 2: Inspect

- Inspect the repository structure.
- Read the relevant implementation.
- Check related components and utilities.
- Review existing tests.
- Check the current change state when Git is available.
- Identify reusable patterns.

### Step 3: Plan

- Choose the smallest sufficient implementation.
- Identify the files that need to change.
- Identify tests that should be added or updated.
- Identify whether documentation changes are required.
- Flag unresolved decisions that could materially affect the implementation.

Do not over-plan simple tasks.

### Step 4: Implement

- Follow existing conventions.
- Respect the approved architecture.
- Reuse suitable components and utilities.
- Preserve type safety.
- Validate untrusted input.
- Enforce authorization server-side.
- Keep the change focused.
- Avoid unnecessary dependencies.

### Step 5: Verify

Run the relevant available checks, such as:

- Tests.
- Linting.
- Type checking.
- Production build.
- Targeted integration tests.
- Manual verification of critical interactions.

Choose checks appropriate to the scope of the change.

If a check cannot run, report the limitation instead of implying success.

### Step 6: Review

Inspect the final diff.

Confirm that:

- Only intended files changed.
- No secrets were introduced.
- Existing behavior was not unintentionally broken.
- Error states are handled.
- Documentation is consistent.
- The implementation meets the acceptance criteria.

### Step 7: Report

Summarize the result clearly:

1. What changed.
2. Important implementation decisions.
3. Tests and checks performed.
4. Any known limitations.
5. Any unresolved decision requiring approval.

Do not claim that work was completed, tested, deployed, or verified when it was not.

---

## 23. When to Ask for Approval

Ask for clarification or approval before proceeding when a task requires:

- A material change to product scope.
- A new paid external service.
- A new architectural dependency.
- A change to authentication or authorization strategy.
- A relaxation of database security policies.
- A destructive database migration.
- Deletion or transformation of existing production data.
- A breaking API contract change.
- Exposure of additional personal information.
- A new user-facing feature not defined in the project documents.
- A change that conflicts with an approved requirement.

For low-risk implementation details, use the simplest option consistent with the project documents and established patterns.

Document material assumptions when approval is not immediately necessary.

---

## 24. Definition of Done

A task is complete only when all applicable criteria are satisfied.

### Correctness

- [ ] The requested behavior matches the approved requirements.
- [ ] Existing behavior remains intact where expected.
- [ ] Edge cases are handled.
- [ ] Errors are handled intentionally.

### Code Quality

- [ ] Existing patterns are reused appropriately.
- [ ] Naming and structure are consistent.
- [ ] Type safety is preserved.
- [ ] No unnecessary dependencies or abstractions were introduced.
- [ ] No unrelated files were changed.

### Security

- [ ] Untrusted input is validated.
- [ ] Server-side authorization is enforced where required.
- [ ] Secrets remain private.
- [ ] Database policies are preserved.
- [ ] Personal information is handled appropriately.

### User Experience

- [ ] The implementation follows `DESIGN.md`.
- [ ] Loading, empty, success, and error states are handled where applicable.
- [ ] Responsive behavior is considered.
- [ ] Accessibility is preserved.

### Verification

- [ ] Relevant tests were added or updated.
- [ ] Available checks were run.
- [ ] Failures and limitations are disclosed.
- [ ] The final change set was reviewed.

### Documentation

- [ ] Relevant project documents were updated when necessary.
- [ ] Environment variable documentation is accurate.
- [ ] Database migrations are included when required.
- [ ] API contracts remain consistent.

---

## 25. Non-Negotiable Rules

Every coding agent working on HAVEN Estates Addis must follow these rules:

1. **Inspect before changing.** Never modify code without understanding the relevant implementation and its dependencies.
2. **Follow the project documents.** Do not invent requirements or silently override approved decisions.
3. **Prefer minimal changes.** Solve the requested problem without unrelated rewrites.
4. **Reuse existing patterns.** Inspect components, utilities, dependencies, and tests before creating replacements.
5. **Protect secrets.** Never expose private credentials or privileged database access.
6. **Validate untrusted input.** Client-side types and validation are not security boundaries.
7. **Enforce authorization server-side.** Hiding an interface element does not secure an operation.
8. **Preserve database security.** Do not bypass RLS or weaken permissions to make an implementation easier.
9. **Handle failures honestly.** Never report success when the required operation failed.
10. **Test meaningful changes.** Do not claim that unexecuted checks passed.
11. **Keep documentation synchronized.** Material changes to architecture, data, APIs, or behavior must be reflected in the appropriate documents.
12. **Protect existing work.** Do not overwrite user changes or perform destructive Git operations without authorization.
13. **Avoid unnecessary complexity.** Do not introduce services, dependencies, abstractions, or features without a demonstrated need.
14. **Report accurately.** Clearly state what changed, what was verified, and what remains unresolved.

**Final principle:** Build the smallest secure, reliable, accessible, and maintainable implementation that fulfills the approved requirements of HAVEN Estates Addis. Every change must serve a defined product need, preserve the application's security boundaries, and remain consistent with the project's source-of-truth documents.
