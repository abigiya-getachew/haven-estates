# HAVEN Estates Addis — Implementation Plan

## 1. Planning principles

This plan organizes development into small, independently verifiable phases for the premium real estate website. It follows the established MVP direction: a polished property-discovery experience, property detail pages, filtering, contact inquiries, WhatsApp contact, and protected administrative property management where required by the project documents.

The plan prioritizes **foundations before dependent features**, limits changes to the documented scope, and requires verification at every stage.

### Execution rules

1. Read `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, and `AGENTS.md` before implementation.
2. Inspect the repository before creating or modifying files.
3. Treat the six project documents as the source of truth; resolve material contradictions before implementing affected functionality.
4. Build on the existing stack and established project patterns.
5. Complete and verify one phase before beginning dependent work.
6. Keep each task small enough to review and test independently.
7. Do not add features, services, or dependencies without documented justification.
8. Do not use fabricated listings or testimonials as genuine business information.
9. Keep secrets server-side and enforce authorization at trusted server boundaries.
10. Update relevant documentation whenever implementation decisions materially change.

### MVP delivery sequence

The recommended development order is:

**Repository assessment → application foundation → design system → database and access controls → property data access → public pages → search and filters → property details → contact and WhatsApp → administrative operations → quality assurance → deployment readiness.**

The exact sequence of database and UI work may be adjusted to accommodate existing code, but security and data-access foundations must precede dependent features.

## Phase 0 — Project discovery and requirements verification

**Goal:** Establish the actual state of the repository and reconcile the project documents before implementation begins.

### Tasks

1. Inspect the repository structure and identify the application entry points.
2. Read all six project documents.
3. Inspect the package manifest, lockfile, TypeScript configuration, framework configuration, and existing scripts.
4. Identify existing pages, components, utilities, tests, and database integrations.
5. Compare the documented architecture with the actual implementation.
6. Identify missing requirements, conflicting decisions, and implementation blockers.
7. Create a concise task checklist based on the verified repository state.

### Files or modules likely affected

- `PRD.md`
- `DESIGN.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `API.md`
- `AGENTS.md`
- `package.json` and existing configuration files, for inspection only unless a change is needed.

### Dependencies and prerequisites

- Access to the repository.
- Access to all six project documents.
- No code changes are required to complete this phase.

### Database/API changes

- None.
- Document any unresolved database or API design conflicts for resolution before implementation.

### Tests required

- No application tests.
- Confirm that the existing project can be inspected and that the available development and verification commands are identified.

### Completion criteria

- [ ] The current project structure is understood.
- [ ] The existing stack and conventions are confirmed.
- [ ] The six project documents have been reviewed.
- [ ] Existing work and uncommitted changes have been identified.
- [ ] Major architectural or requirements conflicts are resolved or explicitly recorded.
- [ ] The implementation checklist reflects the actual codebase.

---

## Phase 1 — Application foundation and development tooling

**Goal:** Establish a stable application foundation before building product functionality.

### Tasks

1. Confirm that the application starts in the local development environment.
2. Verify the framework, TypeScript, package manager, and existing dependency versions.
3. Configure or repair essential development scripts where needed.
4. Verify formatting, linting, type checking, and build commands.
5. Establish the global layout and application shell.
6. Configure the approved font loading strategy.
7. Establish shared metadata defaults and basic document structure.
8. Add environment-variable validation if required by the architecture.
9. Confirm that server-only modules cannot accidentally be imported into client components.

Avoid replacing a functioning setup merely to match a preferred template.

### Files or modules likely affected

Depending on the existing repository:

- `package.json`
- Lockfile
- `tsconfig.json`
- Framework configuration
- `app/layout.tsx`
- `app/globals.css`
- Existing font or metadata modules
- Environment configuration utilities
- `.env.example`

### Dependencies and prerequisites

- Phase 0 completed.
- The existing technology stack confirmed against `ARCHITECTURE.md`.

### Database/API changes

- None.
- Do not connect application features to production services yet unless the existing architecture requires early integration.

### Tests required

- Development server starts.
- Type checking passes.
- Linting passes.
- Production build succeeds.
- Required environment variables are validated appropriately.
- Server-only modules remain outside client bundles.

### Completion criteria

- [ ] The application starts reliably.
- [ ] Existing tooling works.
- [ ] The root layout is established.
- [ ] Environment configuration is understood.
- [ ] No unnecessary dependencies have been introduced.
- [ ] The foundation is ready for shared UI development.

---

## Phase 2 — Design system and reusable UI components

**Goal:** Implement the shared visual foundation before building individual pages.

### Tasks

1. Translate the design tokens from `DESIGN.md` into reusable styles or CSS variables.
2. Configure the approved typography:
   - DM Serif Display.
   - Inter.
3. Establish the global page background, text colors, surfaces, borders, and focus styles.
4. Implement shared layout primitives, such as:
   - Container.
   - Section.
   - Page heading.
   - Responsive grid.
5. Implement or adapt shared interface components:
   - Buttons and links.
   - Form fields.
   - Select controls.
   - Loading indicators.
   - Empty states.
   - Error messages.
6. Establish consistent interaction states for hover, focus, disabled, and loading.
7. Verify responsive behavior and accessibility.
8. Build a minimal component preview or use existing development routes to verify components if supported by the project.

### Files or modules likely affected

- `app/globals.css`
- `components/ui/`
- `components/layout/`
- Existing design-token or theme modules
- Existing form-control components

Create folders only when they fit the current repository structure.

### Dependencies and prerequisites

- Phase 1 completed.
- `DESIGN.md` reviewed.
- Existing UI dependencies and components inspected.

### Database/API changes

- None.

### Tests required

- Verify shared component rendering.
- Test keyboard interaction and focus visibility.
- Test form-label associations.
- Check color contrast for important interface states.
- Verify layouts on mobile and desktop.
- Run linting and type checking.

### Completion criteria

- [ ] Design tokens match the approved design.
- [ ] Typography is configured consistently.
- [ ] Reusable controls are available.
- [ ] Focus and disabled states are implemented.
- [ ] Shared components are accessible.
- [ ] No duplicate design system has been introduced.

---

## Phase 3 — Database schema, security policies, and backend foundations

**Goal:** Establish the data model and secure server-side access before implementing data-dependent features.

### Tasks

1. Review `DATABASE.md` and compare its schema with the actual database.
2. Confirm the required property fields, property-image relationships, publication status, and inquiry relationships.
3. Identify required indexes, constraints, and relationships.
4. Prepare versioned migrations for missing or changed schema elements.
5. Establish the approved Neon/Drizzle client configuration.
6. Separate public/server-side access from privileged administrative access.
7. Configure Row-Level Security (RLS) policies.
8. Confirm that public property queries cannot expose unpublished listings.
9. Protect inquiry records from unauthorized access.
10. Establish generated database types if supported by the existing workflow.
11. Prepare safe development seed data if needed.
12. Document the local database setup and migration process.

### Files or modules likely affected

- `drizzle/migrations/`
- Existing database configuration
- `lib/db/` or the existing approved database module
- Generated database types
- `.env.example`
- Database setup documentation

### Dependencies and prerequisites

- Phase 0 completed.
- `DATABASE.md` and `ARCHITECTURE.md` reviewed.
- Neon project access where database deployment or policy verification is required.

### Database/API changes

**Database:**

- Add or adjust only the schema elements documented in `DATABASE.md`.
- Implement required constraints and indexes.
- Apply appropriate RLS policies.
- Preserve existing data.
- Clearly distinguish demo records from real property records.

**API:**

- No public API endpoint is required solely to establish the database foundation.
- Prepare server-side database access for later property and inquiry features.

### Tests required

- Migration applies successfully in a development environment.
- Constraints reject invalid records.
- Public queries exclude unpublished properties.
- Unauthorized users cannot access protected inquiry records.
- RLS policies enforce the intended permissions.
- Generated database types agree with the schema.

### Completion criteria

- [ ] Schema matches the approved database design.
- [ ] Migrations are version-controlled.
- [ ] RLS policies are active and tested.
- [ ] Privileged credentials remain server-only.
- [ ] Database types are synchronized.
- [ ] Development data is clearly identified.

**Dependency gate:** Do not build administrative write operations until the authentication, authorization, and database security boundaries are understood and verified.

---

## Phase 4 — Property data-access layer

**Goal:** Provide a consistent, typed server-side interface for retrieving property data.

### Tasks

1. Define or confirm the public property summary type.
2. Define or confirm the full property detail type.
3. Implement the shared data-access functions required by the documented pages.
4. Implement retrieval of published properties.
5. Implement retrieval of a single property by slug.
6. Handle missing, unpublished, or unavailable properties consistently.
7. Retrieve related property images in the intended display order.
8. Add server-side pagination.
9. Establish the documented default and maximum page sizes.
10. Define safe database error handling.
11. Determine caching and revalidation behavior according to `API.md` and the architecture.
12. Ensure administrative-only fields are never included in public results.

### Files or modules likely affected

- `lib/` or the existing server-side data-access module
- Property domain types
- Database query utilities
- Generated database types
- Property data-access tests

### Dependencies and prerequisites

- Phase 3 completed.
- Database schema and access policies verified.

### Database/API changes

**Database:**

- No schema changes expected unless Phase 0 identifies a documented mismatch.

**API:**

- Implement internal server-side data-access functions.
- Do not create unnecessary public JSON endpoints.
- Preserve the distinction between internal data access and the explicit public contact endpoint described in `API.md`.

### Tests required

- Published properties are returned.
- Unpublished properties are excluded.
- A valid slug retrieves the correct property.
- Missing or unpublished slugs return the expected result.
- Image ordering is correct.
- Pagination limits are enforced.
- Database errors are not incorrectly represented as empty results.
- Public result types exclude administrative fields.

### Completion criteria

- [ ] Property queries are reusable and typed.
- [ ] Publication restrictions are enforced.
- [ ] Pagination is implemented.
- [ ] Error handling is consistent.
- [ ] Data access is separate from presentation.
- [ ] No redundant API layer has been created.

---

## Phase 5 — Shared site navigation and static pages

**Goal:** Build the site structure and the main informational pages before integrating complex property interactions.

### Tasks

1. Implement the shared site header and navigation.
2. Implement the footer and shared contact links.
3. Build the homepage structure.
4. Build the About page.
5. Build the Contact page structure.
6. Implement the not-found page.
7. Add page titles and metadata.
8. Implement responsive navigation.
9. Add the documented calls to action linking visitors to property discovery and contact options.
10. Use approved business information and assets only.

The homepage should establish the premium brand experience. It should not imply that demo listings or invented credentials are genuine.

### Files or modules likely affected

- `app/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/not-found.tsx`
- `components/layout/`
- `components/home/`
- Shared metadata utilities
- Relevant styles and assets

Adapt paths to the actual routing structure.

### Dependencies and prerequisites

- Phase 1 completed.
- Phase 2 completed.
- Approved copy and image assets available.
- Property data-access functions may be integrated as Phase 4 becomes available.

### Database/API changes

- No schema changes expected.
- No contact submission integration yet unless it is intentionally implemented as a small part of a later phase.

### Tests required

- Each route renders successfully.
- Navigation links work.
- Not-found behavior works.
- Responsive navigation is usable by keyboard and touch.
- Page metadata is present.
- Layouts match the design on mobile and desktop.
- No unsupported business claims appear.

### Completion criteria

- [ ] Shared navigation and footer are consistent.
- [ ] Homepage layout is established.
- [ ] About and Contact pages exist.
- [ ] Not-found behavior is implemented.
- [ ] Calls to action link to the intended destinations.
- [ ] Responsive and accessibility checks pass.

---

## Phase 6 — Property cards and property discovery page

**Goal:** Enable visitors to browse published property listings through a clear, consistent interface.

### Tasks

1. Implement the reusable property card.
2. Display the approved primary image, title, location, price, and relevant property attributes.
3. Implement the Properties page.
4. Connect the page to the property data-access layer.
5. Display the documented property fields consistently.
6. Implement loading, empty, error, and populated states.
7. Add server-side pagination controls.
8. Implement property-card navigation to the detail route.
9. Ensure missing images and optional fields are handled gracefully.
10. Verify that demo content is clearly identified wherever required.

### Files or modules likely affected

- `app/properties/page.tsx`
- `components/properties/PropertyCard.tsx`
- `components/properties/PropertyGrid.tsx`
- `components/properties/PropertyListState.tsx`, if justified
- Property data-access modules
- Property card and page tests

### Dependencies and prerequisites

- Phase 2 completed.
- Phase 4 completed.
- Phase 5 established the site shell.

### Database/API changes

- Use existing property read functions.
- No new public REST endpoint expected.
- Use the pagination behavior defined in `API.md`.

### Tests required

- Published properties render correctly.
- Property cards navigate to the correct detail route.
- Pagination returns the correct records.
- Empty results display an appropriate empty state.
- Query failures display an error state.
- Images have suitable alternative text or are treated as decorative.
- Layout remains usable at supported viewport sizes.

### Completion criteria

- [ ] The Properties page uses real data-access functions.
- [ ] Cards are reusable.
- [ ] Published listings display correctly.
- [ ] Pagination works.
- [ ] Loading, empty, and error states are implemented.
- [ ] No unpublished property data leaks into the interface.

---

## Phase 7 — Property filters and search behavior

**Goal:** Allow visitors to narrow the property list using the approved search criteria.

### Tasks

1. Implement filters for:
   - Transaction purpose.
   - Property type.
   - Location.
   - Minimum price.
   - Maximum price.
   - Bedrooms.
2. Define filter defaults and valid option values from the documented domain model.
3. Validate query parameters.
4. Apply filters server-side.
5. Combine multiple filters correctly.
6. Preserve filter state when navigating between result pages.
7. Reset pagination when filters change.
8. Implement a clear-filters action.
9. Display an accurate result count if required by the design.
10. Handle combinations that produce no matches.
11. Ensure the interface is usable on mobile.

### Files or modules likely affected

- `app/properties/page.tsx`
- `components/properties/PropertyFilters.tsx`
- `components/properties/PropertyGrid.tsx`
- Property query and validation modules
- Property filter tests

### Dependencies and prerequisites

- Phase 4 completed.
- Phase 6 completed.
- Property fields and valid filter values confirmed in `DATABASE.md`.

### Database/API changes

**Database:**

- Reuse existing columns and indexes where possible.
- Add an index only when justified by the documented query patterns and observed performance.

**API:**

- Use the server-side property query interface.
- Validate query parameters before querying the database.
- Do not introduce a separate search service or public endpoint unless the approved architecture requires it.

### Tests required

- Each filter works independently.
- Combined filters return the correct results.
- Minimum and maximum price boundaries work correctly.
- Invalid query parameters are handled safely.
- Pagination remains consistent with active filters.
- Clearing filters restores the default listing.
- No-match results show the correct empty state.
- Filtering is performed server-side rather than by downloading the entire dataset to the browser.

### Completion criteria

- [ ] All documented filters work.
- [ ] Filters combine predictably.
- [ ] Invalid parameters cannot break queries.
- [ ] Pagination preserves filter state.
- [ ] Mobile filter interactions work.
- [ ] Query performance is acceptable for the expected dataset.

---

## Phase 8 — Property detail pages and inquiry entry points

**Goal:** Provide a complete property evaluation page that encourages visitors to make an inquiry.

### Tasks

1. Implement the property detail route using the approved routing convention.
2. Retrieve the property using its slug.
3. Display the property title, price, location, description, and available attributes.
4. Implement the property image gallery.
5. Handle missing, unavailable, or unpublished properties.
6. Add a contact CTA linked to the selected property.
7. Add the WhatsApp inquiry entry point.
8. Ensure the relevant property reference is preserved when opening the contact form.
9. Add appropriate metadata for public property pages.
10. Verify image behavior, accessibility, and responsive layout.

### Files or modules likely affected

- `app/properties/[slug]/page.tsx`
- `components/properties/PropertyGallery.tsx`
- `components/properties/PropertyDetails.tsx`
- Property inquiry CTA components
- Property metadata utilities
- Property detail tests

### Dependencies and prerequisites

- Phase 4 completed.
- Phase 6 completed.
- Phase 2 design system available.

### Database/API changes

- Use existing property and image queries.
- No new endpoint expected.
- Confirm that only published properties are accessible publicly.

### Tests required

- Valid slugs render the correct property.
- Missing or unpublished slugs return the correct not-found behavior.
- Images display in the intended order.
- Optional property attributes do not break rendering.
- The contact CTA carries the correct property reference.
- WhatsApp links use the configured business number.
- Metadata does not expose private data.
- The page remains responsive and accessible.

### Completion criteria

- [ ] Each published property has a complete detail page.
- [ ] Gallery behavior is correct.
- [ ] Inquiry actions are available and correctly associated with the property.
- [ ] Missing properties are handled safely.
- [ ] Property-specific metadata is implemented.
- [ ] Responsive and accessibility checks pass.

---

## Phase 9 — Contact form and inquiry submission

**Goal:** Implement a reliable contact workflow that allows visitors to send inquiries.

### Tasks

1. Implement the contact form using the shared form components.
2. Support the documented fields:
   - Name.
   - Email, optional.
   - Phone, optional.
   - Message.
   - Optional property reference.
3. Enforce the requirement that at least one contact method is supplied.
4. Implement client-side validation for usability.
5. Implement authoritative server-side validation.
6. Implement the explicit `POST /api/contact` endpoint.
7. Apply the documented request-size and rate-limiting controls.
8. Verify any supplied property reference.
9. Implement the approved inquiry persistence workflow.
10. Integrate email notification only if required and approved.
11. Implement submission, success, validation-error, and failure states.
12. Prevent accidental duplicate submissions.
13. Preserve the visitor's input after recoverable failures.
14. Review the privacy and logging implications of contact data.

### Files or modules likely affected

- `app/contact/page.tsx`
- `components/contact/ContactForm.tsx`
- `app/api/contact/route.ts`
- Existing contact validation utilities
- Server-side inquiry data-access module
- Optional email integration module
- Contact form and API tests

### Dependencies and prerequisites

- Phase 2 completed.
- Phase 3 completed.
- Phase 4 completed.
- Phase 5 completed.
- Phase 8 completed if the contact form must receive a property reference from detail pages.

### Database/API changes

**Database:**

- Use the approved inquiry schema.
- Add schema changes only if required by `DATABASE.md`.
- Keep inquiries inaccessible to unauthorized public users.

**API:**

- Implement `POST /api/contact` according to `API.md`.
- Validate the body and enforce request protections.
- Return the documented success and error responses.
- Do not report success when the required inquiry persistence operation fails.
- Handle optional email delivery as a separate failure mode when applicable.

### Tests required

- Valid inquiry submission.
- Missing name or message.
- Missing both email and phone.
- Invalid email.
- Invalid phone format where validation is defined.
- Invalid property reference.
- Malformed request body.
- Oversized request.
- Rate limiting.
- Database failure.
- Optional email provider failure.
- Duplicate submission behavior.
- No sensitive data in public responses or logs.

### Completion criteria

- [ ] The contact form works end to end.
- [ ] Server-side validation is authoritative.
- [ ] Inquiry persistence follows the approved data model.
- [ ] Public responses use consistent error handling.
- [ ] Rate limiting and request protections are active.
- [ ] Submission states accurately represent the outcome.
- [ ] Privacy requirements are satisfied.

---

## Phase 10 — WhatsApp contact integration

**Goal:** Provide a reliable direct-contact path through WhatsApp without introducing an unnecessary messaging backend.

### Tasks

1. Configure the approved WhatsApp business number through server-safe or public configuration as appropriate.
2. Generate click-to-chat links using the approved URL format.
3. Encode prefilled message content safely.
4. Include property context when the visitor starts from a property detail page.
5. Preserve a general contact option from other pages.
6. Ensure the contact action is accessible and responsive.
7. Verify behavior on mobile and desktop.
8. Ensure visitors are not told that a message has been sent merely because they clicked the link.

### Files or modules likely affected

- Existing shared contact CTA components
- Property detail CTA components
- Contact page components
- Environment configuration
- Relevant component tests

### Dependencies and prerequisites

- Phase 2 completed.
- Phase 8 completed.
- The business WhatsApp number is available.

### Database/API changes

- None expected.
- No WhatsApp API, webhook, or message-processing backend is required for the documented click-to-chat workflow.

### Tests required

- The generated link uses the correct number.
- Prefilled messages are correctly encoded.
- Property context is included where appropriate.
- Missing configuration is handled intentionally.
- Links are accessible and work at supported viewport sizes.

### Completion criteria

- [ ] WhatsApp CTAs work on relevant pages.
- [ ] Property inquiries include appropriate context.
- [ ] No unnecessary messaging infrastructure exists.
- [ ] The interface accurately represents what happens after a click.

_This phase can be implemented alongside Phase 9 once the shared contact components and property context are available._

---

## Phase 11 — Protected administrative property management

**Goal:** Implement only the administrative capabilities explicitly required by the approved MVP.

This phase depends on confirming the precise administrative scope in `PRD.md`, `ARCHITECTURE.md`, `DATABASE.md`, and `API.md`. If administrative property management is not part of the approved MVP, omit this phase rather than introducing an unrequested feature.

### Tasks

1. Confirm the required administrative workflows.
2. Implement the approved authentication integration.
3. Establish server-side authorization checks.
4. Restrict administrative routes and actions.
5. Implement property creation and editing if required.
6. Implement publishing and unpublishing if required.
7. Implement image upload, replacement, and deletion if required.
8. Validate administrative inputs server-side.
9. Protect privileged database operations.
10. Implement appropriate loading, success, and error states.
11. Ensure public pages update correctly after administrative changes.
12. Review cache invalidation after property updates.

### Files or modules likely affected

Depending on the approved architecture:

- Administrative route modules.
- Authentication and authorization utilities.
- Server Actions or protected Route Handlers.
- Property administration components.
- Server-side property write operations.
- Database migrations or storage policies, if required.
- Administrative tests.

### Dependencies and prerequisites

- Phase 3 completed.
- Phase 4 completed.
- Authentication and authorization requirements confirmed.
- Property data-access layer established.

### Database/API changes

**Database:**

- Use the approved property schema and storage model.
- Apply the necessary constraints and policies.
- Do not weaken RLS for convenience.

**API:**

- Use protected Server Actions or Route Handlers as defined by the architecture.
- Do not create public property write endpoints.
- Validate and authorize every privileged operation server-side.

### Tests required

- Unauthenticated access is denied.
- Authenticated but unauthorized access is denied.
- Authorized administrators can perform approved operations.
- Invalid property data is rejected.
- Publishing state changes affect public visibility correctly.
- Upload validation and storage permissions work, if uploads are supported.
- Database failures are handled safely.
- Cache invalidation works after relevant changes.

### Completion criteria

- [ ] Only approved administrative features are implemented.
- [ ] All privileged actions enforce server-side authorization.
- [ ] Database and storage policies are tested.
- [ ] Public visitors cannot modify property data.
- [ ] Changes appear correctly on public pages.
- [ ] No additional administrative scope has been introduced.

---

## Phase 12 — Integration, accessibility, and regression testing

**Goal:** Verify the complete user journey and ensure the individual phases work together.

### Tasks

1. Verify navigation across all documented pages.
2. Test the homepage-to-property-discovery journey.
3. Test property filtering and pagination.
4. Test property-card-to-detail navigation.
5. Test contact submission from the general Contact page.
6. Test inquiry initiation from a property detail page.
7. Test WhatsApp contact links.
8. Test administrative workflows if included.
9. Review responsive layouts.
10. Review keyboard navigation and focus behavior.
11. Review page metadata and public indexing behavior.
12. Check for missing image alternatives, form labels, and error associations.
13. Test error and empty states.
14. Run a production build.
15. Review the final Git diff for unrelated changes.

### Files or modules likely affected

- Existing tests across all features.
- End-to-end test files, if the repository has an established framework.
- Accessibility-related components.
- Shared navigation and layout.
- Existing page and data-access modules.

### Dependencies and prerequisites

- All applicable feature phases completed.

### Database/API changes

- No planned schema changes.
- Fix only issues required to meet the approved contracts and security requirements.
- Document any material contract changes.

### Tests required

Run the relevant existing checks:

- Unit tests.
- Component tests.
- Integration tests.
- End-to-end tests.
- Linting.
- Type checking.
- Production build.

Also verify:

- Public data exposure.
- Authorization boundaries.
- Contact request abuse controls.
- Responsive behavior.
- Accessibility.
- Loading and error states.

### Completion criteria

- [ ] Critical user journeys work end to end.
- [ ] All relevant tests pass.
- [ ] No known critical security defects remain.
- [ ] No important accessibility regressions remain.
- [ ] The production build succeeds.
- [ ] The final change set contains no unrelated modifications.
- [ ] Remaining limitations are documented.

---

## Phase 13 — Production configuration and deployment readiness

**Goal:** Prepare the approved MVP for safe deployment and verify production-specific behavior.

### Tasks

1. Verify the intended deployment platform and deployment workflow from the project documents.
2. Configure production environment variables.
3. Confirm that all secrets are stored in the deployment platform's secret-management facility.
4. Verify the production Neon project and database policies.
5. Apply reviewed database migrations using the approved workflow.
6. Verify the public site URL and canonical metadata.
7. Verify the configured WhatsApp number.
8. Configure email credentials only if email delivery is enabled.
9. Verify production build and startup behavior.
10. Check public caching and revalidation behavior.
11. Confirm that private inquiry data is not publicly accessible or cached.
12. Run smoke tests against the deployed application.
13. Document the deployment and rollback procedures.
14. Record known limitations and any remaining operational tasks.

### Files or modules likely affected

- Deployment configuration already used by the repository.
- Environment variable documentation.
- `.env.example`
- Database migration files.
- Metadata configuration.
- Deployment and setup documentation.

Do not add deployment tooling or infrastructure without confirming it fits the approved architecture.

### Dependencies and prerequisites

- Phase 12 completed.
- Production credentials and deployment access available.
- Database migrations reviewed.
- Required business configuration supplied.

### Database/API changes

- Apply approved migrations.
- Verify the contact endpoint and property reads in the production environment.
- Do not run destructive database changes without explicit approval.
- Do not substitute production data with unverified demo content.

### Tests required

- Production build succeeds.
- Public pages load.
- Published property data is visible.
- Unpublished properties remain hidden.
- Property filtering and detail routes work.
- Contact submission behaves correctly.
- WhatsApp links are valid.
- Unauthorized administrative operations are rejected.
- Environment configuration is complete.
- Production smoke tests pass.

### Completion criteria

- [ ] Deployment configuration matches the approved architecture.
- [ ] Secrets are configured securely.
- [ ] Database migrations and RLS policies are verified.
- [ ] Critical user journeys work in production.
- [ ] Contact and property data are handled securely.
- [ ] Deployment and rollback instructions are documented.
- [ ] Known limitations are recorded.

---

# 26. Cross-phase dependency map

| Phase | Name                                | Must precede                                                       |
| ----- | ----------------------------------- | ------------------------------------------------------------------ |
| 0     | Project discovery                   | All implementation phases                                          |
| 1     | Application foundation              | Shared UI and page implementation                                  |
| 2     | Design system                       | Public UI and form implementation                                  |
| 3     | Database and security foundations   | Data access, contact persistence, administration                   |
| 4     | Property data access                | Property listing, filtering, and detail pages                      |
| 5     | Shared site and static pages        | Main public user journeys                                          |
| 6     | Property discovery                  | Filtering and property browsing verification                       |
| 7     | Property filters                    | Complete discovery experience                                      |
| 8     | Property detail pages               | Property-specific inquiry integration                              |
| 9     | Contact form and inquiry submission | Complete inquiry workflow                                          |
| 10    | WhatsApp integration                | Can progress alongside Phase 9 after shared dependencies are ready |
| 11    | Administrative management           | Only if explicitly included in the MVP                             |
| 12    | Integration and regression testing  | Production readiness                                               |
| 13    | Deployment readiness                | Final release                                                      |

### Recommended parallel work

Parallel development should be limited to tasks with stable interfaces.

Potential parallel work includes:

- Static About page development while the database foundation is being completed.
- Shared visual component work alongside data-access development.
- Contact-page layout work before the contact endpoint is ready.
- WhatsApp link implementation alongside contact form work.

Avoid parallel implementation of the same shared component, database schema, or API contract without clear ownership. Do not build dependent features against assumed contracts that have not been agreed upon.

---

# 27. Recommended task sizing

Each phase should be broken into implementation tasks small enough to review independently.

A task should generally:

- Address one primary responsibility.
- Have clear acceptance criteria.
- Identify the relevant files or modules.
- Include tests for changed behavior.
- Avoid unrelated refactoring.
- Leave the codebase in a working state.

For example, **Phase 6 — Property discovery** should be implemented as separate tasks:

1. Define and verify the property summary type.
2. Implement the property card.
3. Test the property card.
4. Implement the property grid.
5. Connect the Properties page to the data-access layer.
6. Implement pagination.
7. Add loading, empty, and error states.
8. Verify responsive behavior.
9. Run regression checks.

Each task should be reviewed before proceeding to the next dependent task.

---

# 28. Recommended first task

**Start with Phase 0, Task 1: Inspect the repository and verify the six project documents.**

Before writing application code, establish:

- What already exists.
- Which technology stack is actually configured.
- Which project requirements are authoritative.
- Whether the database and security model are defined consistently.
- Which development and test commands are available.
- Which work can be reused rather than rebuilt.

The first implementation task should then be selected from the verified state of the repository, rather than assuming the project is empty or introducing a new starter structure.

**Deliverable for the first task:** a short repository assessment containing the current project structure, stack, existing functionality, document inconsistencies, available verification commands, and the exact next implementation task.

This provides a reliable starting point while keeping the MVP focused on its central objective: a premium real estate website that helps visitors discover properties and initiate inquiries.
