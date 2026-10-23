# ARCHITECTURE.md

# HAVEN Estates Addis — Application Architecture

## 1. Document Purpose

This document defines the technical architecture for HAVEN Estates Addis, a premium real estate website serving the Addis Ababa property market.

It uses `PRD.md` as the source of truth for product requirements and `DESIGN.md` as the source of truth for visual design and user experience.

The architecture prioritizes:

- Fast page loads and responsive browsing.
- Search-engine-friendly property pages.
- Reliable property listings and filtering.
- Clear property inquiry flows through WhatsApp and a contact form.
- Secure handling of contact information.
- Straightforward content and property management.
- Low operational cost and minimal infrastructure.
- Maintainable code that can evolve as the product grows.

The initial implementation should be a **single web application backed by a managed database**, not a collection of microservices.

---

## 2. Architectural Principles

### 2.1 Simplicity First

Use a small, cohesive technology stack with clear responsibilities.

Avoid introducing separate backend services, message queues, caching layers, container orchestration, or complex state-management libraries until actual requirements justify them.

### 2.2 Server-First Rendering

Render public pages on the server where practical.

This approach supports:

- Search engine indexing.
- Fast initial page rendering.
- Shareable property URLs.
- Reduced client-side JavaScript.
- Consistent property information across visitors.

Use client-side JavaScript only for interactive experiences such as search filters, mobile navigation, form feedback, and lightweight UI transitions.

### 2.3 One Source of Truth for Property Data

Property listings must come from a single authoritative database.

Do not hardcode separate copies of property information across the homepage, search results, and property detail pages.

### 2.4 Security by Default

Public visitors can browse and inquire about properties without creating accounts.

Only authorized administrators may create, edit, publish, unpublish, or delete property listings.

Public database access must not expose private administrative information.

### 2.5 Progressive Enhancement

Core property information and navigation should remain usable without unnecessary JavaScript dependencies.

Critical information should not depend on animations, external widgets, or third-party scripts being available.

### 2.6 Build for the MVP, Leave Room to Grow

Implement only the infrastructure needed for the initial product.

Design module boundaries so future capabilities can be added without requiring a complete rewrite.

---

## 3. Recommended Technology Stack

| Layer                 | Recommended technology                                    | Reason                                                                                                          |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Language              | TypeScript                                                | Provides type safety across application boundaries.                                                             |
| Frontend framework    | Next.js with App Router                                   | Supports server rendering, static generation, routing, metadata, and server-side operations.                    |
| UI library            | React                                                     | Supports reusable interface components and interactive elements.                                                |
| Styling               | Tailwind CSS                                              | Enables consistent implementation of the design system with minimal styling overhead.                           |
| UI primitives         | Native HTML and lightweight custom components             | Keeps the interface accessible and avoids unnecessary component-library dependencies.                           |
| Form validation       | Zod                                                       | Provides consistent validation for form inputs and server-side requests.                                        |
| Database              | PostgreSQL                                                | Supports relational property data, filtering, constraints, and reliable transactions.                           |
| Database platform     | Neon                                                      | Provides managed PostgreSQL, backups, database access controls, and an optional managed authentication service. |
| Database access       | Neon server-side client with explicit query functions      | Provides a simple integration with PostgreSQL and supports server-side data access.                             |
| Authentication        | Neon Auth                                                 | Provides managed administrator authentication if administrative access is required in the MVP.                  |
| Image storage         | Neon Storage or another managed image service             | Stores property images independently of application deployments.                                                |
| Contact delivery      | WhatsApp click-to-chat                                    | Enables direct property inquiries without requiring a WhatsApp API integration.                                 |
| Email delivery        | Managed transactional email provider, if configured       | Enables optional delivery of contact form notifications.                                                        |
| Hosting               | Vercel                                                    | Provides straightforward deployment and native support for Next.js.                                             |
| Testing               | Vitest, React Testing Library, and Playwright             | Covers unit, component, integration, and browser-level behavior.                                                |
| Code quality          | ESLint and Prettier                                       | Enforces consistent code style and catches common issues.                                                       |
| Dependency management | npm                                                       | Keeps dependency installation and scripts straightforward.                                                      |
| Version control       | Git with GitHub                                           | Supports source control, review, and deployment integration.                                                    |

### 3.1 Stack Decisions

#### Next.js

Use Next.js App Router for page routing, server-rendered content, metadata, and server-side request handling.

The application should use Server Components by default. Client Components should be introduced only where browser interaction is necessary.

Avoid building a separate Express or NestJS API server for the initial product.

#### PostgreSQL and Neon

Use PostgreSQL because property listings have clear relationships and structured attributes.

Neon reduces operational overhead by providing a managed database and related services.

The application should access property data through a dedicated server-side data-access layer rather than allowing UI components to issue arbitrary database queries.

**Security decision:** Neon's database credentials and API keys must never be exposed to the browser.

#### Styling

Use Tailwind CSS to implement the existing `DESIGN.md` specifications.

Define shared design tokens for colors, typography, spacing, borders, and responsive behavior.

Do not introduce a second styling system unless a specific requirement cannot be met cleanly with the selected approach.

#### Authentication

If an administrator needs to manage listings in the MVP, use Neon Auth with a restricted administrative interface.

If the initial release is a static portfolio demonstration with no real administrative interface, authentication and write operations can remain out of scope until needed.

#### External Services

Prefer direct links to WhatsApp rather than the WhatsApp Business API.

A transactional email service is optional and should be introduced only if contact form submissions must be delivered to an agency inbox.

---

## 4. High-Level System Architecture

The application consists of four primary areas:

1. Public frontend.
2. Server-side application logic.
3. Managed data and image storage.
4. External communication services.

### 4.1 Logical Architecture

```text
                         VISITOR
                            |
                            v
                    Next.js Web App
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
         Homepage       Properties      Property Detail
                            |
                            v
                  Server-Side Data Layer
                            |
                            v
                    Neon PostgreSQL
                            |
                            v
                   Property Data Results

Visitor Inquiry
      |
      +--------------------------+
      |                          |
      v                          v
WhatsApp Click-to-Chat     Contact Form
                                 |
                                 v
                       Server-Side Validation
                                 |
                                 v
                      Optional Email Provider

Administrator
      |
      v
Protected Admin Interface
      |
      v
Server-Side Authorization
      |
      v
Property Data Layer
      |
      v
PostgreSQL and Image Storage
```

### 4.2 Application Boundaries

#### Public Frontend

Responsible for:

- Homepage content.
- Property listings.
- Property search and filters.
- Property detail pages.
- About and contact pages.
- Navigation and responsive layouts.
- Property inquiry entry points.
- Client-side form feedback.

#### Server-Side Application

Responsible for:

- Retrieving published property listings.
- Validating search parameters.
- Enforcing listing visibility.
- Processing contact form submissions.
- Enforcing administrator permissions.
- Validating and saving property changes.
- Generating metadata and structured property content.
- Handling failures without exposing sensitive information.

#### Database

Responsible for:

- Storing property records.
- Maintaining property attributes and publication status.
- Enforcing data integrity.
- Supporting property search and filtering.
- Recording contact inquiries if persistent inquiry storage is required.

#### Image Storage

Responsible for:

- Storing property images.
- Providing stable image URLs.
- Restricting administrative write access.
- Supporting optimized image delivery.

#### External Communication

Responsible for:

- Opening WhatsApp conversations through a user-initiated link.
- Optionally delivering contact form notifications through a transactional email provider.

---

## 5. Frontend Architecture

### 5.1 Rendering Strategy

Use a hybrid rendering model based on page requirements.

| Page or feature   | Rendering approach                                        | Reason                                                   |
| ----------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Homepage          | Server-rendered or statically generated with revalidation | Fast delivery and SEO.                                   |
| Property listings | Server-rendered                                           | Supports URL-based filters and current database results. |
| Property detail   | Server-rendered with revalidation where appropriate       | Provides indexable property content and shareable URLs.  |
| About page        | Static generation                                         | Content changes infrequently.                            |
| Contact page      | Static generation with interactive form                   | Mostly static content with client-side feedback.         |
| Not Found page    | Framework-supported error route                           | Consistent handling of unavailable URLs.                 |
| Admin pages       | Server-rendered with protected access                     | Keeps privileged data and operations on the server.      |

Use static generation and caching only where the data freshness requirements permit it.

Published property pages may use revalidation to reduce database traffic. Unpublishing or materially changing a property must trigger cache invalidation where applicable.

Administrative pages and sensitive operations must not use shared public caching.

### 5.2 Component Architecture

Organize the frontend into three component categories.

**Page-level components**

Compose the full layout for a route and coordinate server-side data retrieval.

Examples:

- Home page.
- Properties page.
- Property detail page.
- Contact page.

**Feature components**

Represent a reusable real estate feature.

Examples:

- Property card.
- Property grid.
- Property filter controls.
- Property image gallery.
- Property price display.
- Property status label.
- Inquiry form.

**Shared UI components**

Implement reusable interface elements.

Examples:

- Header.
- Footer.
- Button.
- Input.
- Select.
- Textarea.
- Form error message.
- Loading indicator.
- Empty state.
- Error state.

Components must follow the visual system in `DESIGN.md`, including the specified typography, colors, spacing, focus states, and responsive behavior.

### 5.3 Client and Server Component Rules

Use Server Components for:

- Displaying property data.
- Rendering page content.
- Generating page metadata.
- Building property detail layouts.
- Retrieving data from the server-side data layer.

Use Client Components for:

- Mobile navigation interactions.
- Interactive property filters where immediate browser feedback is needed.
- Contact form submission and feedback.
- Image gallery controls.
- Lightweight interface state.

Do not convert an entire page into a Client Component merely because one element requires interactivity.

### 5.4 State Management

Use the simplest state-management approach that fits each feature.

- URL search parameters: shareable property filters and sorting, if enabled.
- Local React state: open menus, selected images, and form feedback.
- Server-rendered data: property information and public page content.
- Database state: authoritative property records and publication status.

Do not introduce Redux, Zustand, or another global state library for the MVP unless application complexity demonstrably requires it.

### 5.5 Search and Filtering

Property search should be driven by URL parameters.

Supported parameters should align with the PRD:

- Transaction purpose.
- Property type.
- Location.
- Minimum price.
- Maximum price.
- Bedrooms.

The server must validate and normalize all incoming parameters before querying the database.

Filters must be combined into a single database query rather than implemented by loading every property and filtering the entire collection in the browser.

When filters change, update the URL so visitors can share or revisit a search.

---

## 6. Backend Architecture

### 6.1 Modular Monolith

Use a modular monolith: one deployable Next.js application with clearly separated internal responsibilities.

The backend should not be split into independent services for the initial release.

Organize server-side functionality into modules:

- Property queries.
- Property administration.
- Contact inquiries.
- Authentication and authorization.
- Image management.
- Shared validation and error handling.

Each module should have a defined responsibility and expose a small set of functions.

### 6.2 Server-Side Responsibilities

Server-side code must handle:

- Database access.
- Input validation.
- Property visibility rules.
- Authorization checks.
- Contact submission processing.
- Image upload authorization.
- Cache invalidation.
- Error logging.

Never rely on frontend visibility, hidden controls, or client-side validation as the only security boundary.

### 6.3 Server Actions and Route Handlers

Use Server Actions for internal, application-bound form mutations when appropriate.

Use Route Handlers when an explicit HTTP endpoint is needed, such as:

- Contact form submissions.
- A future public integration.
- A webhook that has been explicitly introduced.
- A dedicated health endpoint, if operational monitoring requires one.

Do not create an endpoint for every database operation simply for consistency.

All mutations must validate their input and enforce authorization on the server.

---

## 7. Data Model

The database should support the current property browsing and inquiry requirements without introducing unnecessary entities.

### 7.1 Property Entity

The `properties` table is the primary source of truth for listings.

Recommended fields:

| Field                | Type                     | Purpose                                                               |
| -------------------- | ------------------------ | --------------------------------------------------------------------- |
| `id`                 | UUID                     | Unique property identifier.                                           |
| `slug`               | Text, unique             | Human-readable URL identifier.                                        |
| `title`              | Text                     | Property title.                                                       |
| `description`        | Text                     | Full property description.                                            |
| `transaction_type`   | Enum or constrained text | Sale or rent.                                                         |
| `property_type`      | Enum or constrained text | Supported property category.                                          |
| `location`           | Text                     | Display location in Addis Ababa or another explicitly supported area. |
| `price_amount`       | Numeric                  | Listing price.                                                        |
| `price_currency`     | Text                     | Currency code, subject to product decisions.                          |
| `bedrooms`           | Integer, nullable        | Number of bedrooms where applicable.                                  |
| `bathrooms`          | Integer, nullable        | Number of bathrooms where applicable.                                 |
| `area_value`         | Numeric, nullable        | Property area.                                                        |
| `area_unit`          | Text, nullable           | Area measurement unit.                                                |
| `featured_image_url` | Text, nullable           | Main property image.                                                  |
| `status`             | Enum or constrained text | Draft, published, or archived.                                        |
| `is_featured`        | Boolean                  | Whether the listing can appear in featured sections.                  |
| `created_at`         | Timestamp                | Creation time.                                                        |
| `updated_at`         | Timestamp                | Last modification time.                                               |
| `published_at`       | Timestamp, nullable      | Publication time.                                                     |

Additional fields should be added only when supported by the PRD or required for a specific listing feature.

**Decision requiring approval:** Confirm the supported transaction types, property categories, currency, area units, and whether fields such as bedrooms and bathrooms are mandatory for particular property types.

### 7.2 Property Images

For a basic implementation, property image URLs can be stored in a `property_images` table.

Recommended fields:

| Field         | Type      | Purpose                           |
| ------------- | --------- | --------------------------------- |
| `id`          | UUID      | Unique image record.              |
| `property_id` | UUID      | Associated property.              |
| `image_url`   | Text      | Public image URL or storage path. |
| `alt_text`    | Text      | Accessible image description.     |
| `sort_order`  | Integer   | Display order.                    |
| `created_at`  | Timestamp | Creation time.                    |

The `property_id` field must reference the corresponding property.

Use foreign-key constraints and an explicit deletion policy to prevent orphaned image records.

If image ordering and galleries are not needed in the initial demonstration, a simpler image representation may be used until the gallery requirement is confirmed.

### 7.3 Contact Inquiries

A `contact_inquiries` table is optional and should be introduced only if inquiries must be persisted.

Recommended fields:

| Field         | Type                     | Purpose                                    |
| ------------- | ------------------------ | ------------------------------------------ |
| `id`          | UUID                     | Unique inquiry identifier.                 |
| `name`        | Text                     | Visitor's name.                            |
| `email`       | Text, nullable           | Email address, if provided.                |
| `phone`       | Text, nullable           | Phone number, if provided.                 |
| `message`     | Text                     | Inquiry message.                           |
| `property_id` | UUID, nullable           | Related property, if applicable.           |
| `created_at`  | Timestamp                | Submission time.                           |
| `status`      | Enum or constrained text | Optional administrative processing status. |

At least one contact method must be provided, consistent with the contact form requirements.

Collect only the information necessary to respond to an inquiry.

If the form only needs to notify the agency by email and no inquiry history is required, database persistence can be omitted from the MVP.

### 7.4 Administrative Users

If Neon Auth is used, authentication identities should be managed by the authentication provider.

An application-specific administrator profile or role record may be maintained separately if role checks require it.

Do not create a custom password storage system.

### 7.5 Relationships

The basic relationships are:

- One property can have multiple images.
- One property can have zero or more associated contact inquiries.
- An inquiry may be associated with a property or be a general contact request.
- An administrator can manage multiple properties.

### 7.6 Data Integrity

Enforce data integrity through database constraints wherever possible.

Requirements include:

- Unique property slugs.
- Valid transaction and property types.
- Nonnegative prices.
- Valid foreign-key relationships.
- Required property fields.
- Valid publication states.
- Reasonable length limits for user-entered content.

The application must distinguish between missing data and valid zero values.

For example, an unknown bedroom count must not be treated as zero bedrooms.

---

## 8. Database Interaction

### 8.1 Data Access Layer

Create a dedicated server-side data-access layer.

Page components should not contain duplicated SQL or Neon query logic.

The data-access layer should provide focused operations such as:

- Retrieve published properties.
- Retrieve featured properties.
- Search published properties.
- Retrieve a published property by slug.
- Create a property.
- Update a property.
- Change a property's publication status.
- Delete or archive a property.
- Store an inquiry, if inquiry persistence is enabled.

Read operations should return only the fields needed by the calling feature.

### 8.2 Public Read Rules

Public property queries must return only published listings.

Draft and archived properties must never appear in:

- Public search results.
- Homepage featured listings.
- Public property detail pages.
- Publicly accessible property APIs.

Use both application-level checks and appropriate database access policies.

An unpublished property URL should return a not-found response to public visitors rather than exposing the listing's contents.

### 8.3 Administrative Write Rules

Property mutations must require an authenticated, authorized administrator.

The server must verify permissions on every mutation, including:

- Creating a property.
- Updating listing details.
- Publishing a listing.
- Unpublishing a listing.
- Archiving or deleting a listing.
- Uploading or removing property images.

Hiding administrative controls in the interface is not an authorization mechanism.

### 8.4 Query Performance

Start with simple indexed PostgreSQL queries.

Consider indexes for:

- `properties.slug`.
- `properties.status`.
- `properties.transaction_type`.
- `properties.property_type`.
- `properties.location`, if filtering frequently uses exact location values.
- Relevant price or bedroom fields if query patterns justify them.
- `property_images.property_id`.

Use composite indexes only after examining the actual query patterns.

For the initial property catalogue, standard indexed queries should be sufficient.

Do not introduce a separate search engine until property volume, full-text search requirements, or relevance-ranking needs justify it.

### 8.5 Pagination

Use server-side pagination for property results.

Return a bounded number of records per request, with the initial page size selected based on the design and expected catalogue size.

The interface should display an appropriate empty state when no properties match the current filters.

Pagination must remain consistent with active URL parameters.

### 8.6 Transactions

Use database transactions for operations that must succeed or fail together.

For example, a property update involving multiple related database records should not leave partially updated data.

Where an operation combines database changes with image storage, account for partial failures explicitly. Database transactions do not automatically roll back changes made to an external storage service.

---

## 9. API Architecture

### 9.1 API Strategy

The MVP does not require a large public REST API.

Use server-side data-access functions for internal page rendering and mutations.

Expose HTTP endpoints only where there is a concrete requirement.

### 9.2 Potential Endpoints

If Route Handlers are used, the following endpoint conventions are recommended.

| Method   | Endpoint                     | Purpose                                                     | Access               |
| -------- | ---------------------------- | ----------------------------------------------------------- | -------------------- |
| `GET`    | `/api/properties`            | Retrieve published property results with validated filters. | Public               |
| `GET`    | `/api/properties/[slug]`     | Retrieve a published property by slug.                      | Public               |
| `POST`   | `/api/contact`               | Validate and process a contact inquiry.                     | Public, rate-limited |
| `POST`   | `/api/admin/properties`      | Create a property.                                          | Administrator        |
| `PATCH`  | `/api/admin/properties/[id]` | Update a property.                                          | Administrator        |
| `DELETE` | `/api/admin/properties/[id]` | Delete or archive a property, if deletion is supported.     | Administrator        |

These endpoints are optional architectural interfaces, not a requirement to implement every route.

If property reads are handled directly by server-rendered pages, do not build redundant read endpoints.

### 9.3 Request Validation

Every request must be validated on the server.

Validation should cover:

- Required fields.
- Input types.
- Maximum field lengths.
- Valid property identifiers.
- Valid filter values.
- Price and bedroom ranges.
- Valid email format when email is provided.
- Contact method requirements.
- Permitted state transitions.

Use shared validation schemas where they can be safely reused across frontend forms and server operations.

Client-side validation improves usability but never replaces server-side validation.

### 9.4 Response Design

For explicit API endpoints, use predictable response formats.

Successful responses should contain only the data necessary for the requested operation.

Error responses should provide a stable error code and a user-safe message.

Do not expose:

- SQL statements.
- Database credentials.
- Internal stack traces.
- Authentication tokens.
- Raw provider errors.
- Private administrative data.

Use appropriate HTTP status codes, including:

- `200` for successful retrieval or update.
- `201` for successful resource creation.
- `400` for invalid requests.
- `401` for unauthenticated requests.
- `403` for authenticated users without permission.
- `404` for unavailable resources.
- `409` for conflicts, such as duplicate slugs.
- `429` for rate-limited requests.
- `500` for unexpected server failures.

The exact status codes should reflect the behavior of each implemented endpoint.

---

## 10. Authentication and Authorization

### 10.1 Public Visitors

Public visitors do not need accounts.

They can:

- Browse published properties.
- Search and filter listings.
- View property details.
- Open WhatsApp inquiry links.
- Submit contact forms.

No visitor account system should be implemented unless a future product requirement introduces saved properties, personal dashboards, or similar features.

### 10.2 Administrators

If the MVP includes property management, administrators must authenticate before accessing protected functionality.

Recommended implementation:

- Neon Auth for identity management.
- Server-side session validation.
- An explicit administrator role or allowlist.
- Authorization checks for every privileged operation.
- Secure session handling and logout behavior.

An authenticated user must not automatically receive administrative permissions.

### 10.3 Role Model

For the initial release, a single administrative role is sufficient.

| Role           | Permissions                                                 |
| -------------- | ----------------------------------------------------------- |
| Public visitor | Read published properties and submit permitted inquiries.   |
| Administrator  | Manage properties, publication status, and property images. |

A separate editor, agent, or manager role is unnecessary unless the PRD explicitly requires different administrative permissions.

### 10.4 Session Security

Use the authentication provider's supported session mechanisms.

- Validate sessions on the server.
- Protect administrative routes and mutations.
- Use secure cookie settings supported by the deployment platform.
- Prevent session tokens from being exposed in URLs or logs.
- Implement logout and session expiration behavior.
- Avoid storing privileged authentication tokens in browser-accessible persistent storage.

### 10.5 Database Authorization

Use Neon Row Level Security (RLS) where applicable.

Recommended policy boundaries:

- Anonymous users may read only published property records.
- Anonymous users may not modify property records.
- Authenticated users may not write property records unless explicitly authorized as administrators.
- Public users must not read private inquiry records.
- Image upload and deletion permissions must be restricted.
- Administrative access must be validated against a trusted role or allowlist.

Never assume that authentication alone makes a database operation safe.

If the server uses a privileged service-role credential that bypasses RLS, the server must enforce authorization independently before performing the operation.

---

## 11. External Services

### 11.1 WhatsApp Click-to-Chat

Use a direct WhatsApp click-to-chat link for property inquiries.

The link should:

- Use the agency's verified business phone number.
- Include a prefilled message where useful.
- Reference the relevant property title or URL.
- Work on mobile and desktop.
- Be available without requiring the visitor to register.

Do not include private information in prefilled messages.

WhatsApp is an external communication channel. The application must not claim that a message has been sent merely because a visitor clicks the link.

### 11.2 Transactional Email

Email delivery is optional and depends on the approved contact form workflow.

If email notifications are required:

- Use a managed transactional email provider.
- Store API credentials in server-side environment variables.
- Validate submissions before attempting delivery.
- Use a verified sender identity.
- Avoid accepting arbitrary user-provided sender addresses as the email's authenticated sender.
- Send the visitor's email as a reply-to value only after validation.
- Handle provider failures without exposing provider details to visitors.

The interface must clearly distinguish between a successfully submitted inquiry and a delivery failure if email delivery is part of the submission's success criteria.

### 11.3 Image Storage and Delivery

Store property images in a managed image-storage service.

Requirements:

- Restrict uploads to authorized administrators.
- Validate file types and file sizes.
- Use generated storage object names rather than trusting arbitrary filenames.
- Avoid accepting executable content as images.
- Use appropriate image formats and dimensions.
- Generate optimized image variants where supported.
- Use responsive image delivery.
- Provide meaningful alternative text.

Publicly displayed property images may use public read access if the storage design requires it. Administrative upload and deletion permissions must remain restricted.

Only use images that the agency owns, has licensed, or is otherwise authorized to publish.

### 11.4 Analytics

Analytics are optional for the initial release.

If introduced, track only events that provide actionable product information, such as:

- Property detail views.
- Property filter usage.
- WhatsApp inquiry clicks.
- Contact form submission outcomes.

Do not send names, phone numbers, email addresses, inquiry messages, or other personal information to analytics systems.

### 11.5 External Service Failure

External services must not make the entire site unavailable.

- Property browsing should continue if email delivery fails.
- Property detail pages should remain usable if WhatsApp cannot open.
- Contact forms should display clear feedback if submission fails.
- Image failures should produce graceful visual fallbacks.

---

## 12. AI Architecture

### 12.1 MVP Decision

**No AI functionality is required for the MVP.**

The product's primary value comes from presenting property information clearly and converting visitor interest into inquiries.

An AI integration would add cost, complexity, operational dependencies, and potential data-quality risks without being necessary for the defined user journeys.

### 12.2 Future AI Opportunities

Potential future capabilities include:

- Natural-language property search.
- Property description assistance for administrators.
- Automated classification of property attributes.
- Inquiry categorization.

These features should be evaluated only after the core browsing and inquiry experience is reliable.

### 12.3 Future AI Boundaries

If AI functionality is added later:

- Treat database records as the authoritative source of property facts.
- Do not invent prices, availability, amenities, locations, or legal details.
- Do not expose private inquiry information to an AI provider without a documented purpose and appropriate safeguards.
- Validate generated content before publication.
- Require human approval before AI-generated listing content becomes public.
- Keep AI services outside the critical path for basic property browsing.

---

## 13. Environment Configuration

### 13.1 Environments

Use separate configurations for:

- Local development.
- Preview or staging.
- Production.

Where practical, use separate database projects and storage environments for preview and production.

Never use production credentials in an untrusted preview environment.

### 13.2 Environment Variables

Configuration should be supplied through environment variables.

Potential variables include:

| Variable                        | Purpose                                                                                 | Exposure    |
| ------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| `DATABASE_URL`                  | Neon PostgreSQL connection string.                                                      | Server only |
| `NEON_API_KEY`                  | Neon API key for privileged server-side operations, if required.                        | Server only |
| `RESEND_API_KEY`                | Transactional email authentication, if Resend is selected.                              | Server only |
| `CONTACT_EMAIL_TO`              | Agency destination for contact notifications.                                           | Server only |
| `NEXT_PUBLIC_SITE_URL`          | Canonical public site URL.                                                              | Public      |
| `ADMIN_EMAIL_ALLOWLIST`         | Optional approved administrator identities.                                             | Server only |

Only define variables for services actually used.

If a different email provider is selected, use that provider's corresponding environment variable names.

### 13.3 Configuration Rules

- Never commit secrets to version control.
- Maintain an `.env.example` file containing variable names and safe placeholder values.
- Validate required environment variables during application startup or deployment.
- Fail clearly when mandatory configuration is missing.
- Avoid silently switching to insecure defaults.
- Never expose service-role credentials through `NEXT_PUBLIC_` variables.
- Rotate credentials if they are accidentally committed or disclosed.
- Restrict access to production deployment settings.

### 13.4 Site URL

Use one canonical production URL for:

- Canonical metadata.
- Open Graph URLs.
- Sitemap generation.
- Absolute property links.
- Email notification links.

Avoid generating production metadata from untrusted request host headers.

---

## 14. Error Handling

### 14.1 Error Categories

Handle failures according to their source.

| Error category         | Example                            | Expected behavior                                                            |
| ---------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| Validation             | Invalid price filter               | Show a useful validation message or safely normalize the filter.             |
| Not found              | Missing property slug              | Return a proper not-found page.                                              |
| Unpublished listing    | Draft property accessed publicly   | Do not disclose listing details.                                             |
| Database failure       | Query unavailable                  | Show a recoverable error state.                                              |
| Authentication failure | Expired administrator session      | Request reauthentication.                                                    |
| Authorization failure  | Non-administrator attempts a write | Deny the operation.                                                          |
| Contact failure        | Email provider unavailable         | Show appropriate failure feedback and preserve entered form data where safe. |
| Image failure          | Image cannot load                  | Display a fallback image or placeholder.                                     |
| Rate limit             | Excessive contact submissions      | Return a controlled response and request the visitor to try later.           |
| Unexpected error       | Unhandled server exception         | Show a generic error page and record diagnostic information securely.        |

### 14.2 User-Facing Errors

Messages should be concise and actionable.

Examples:

- "We couldn't load properties right now. Please try again."
- "No properties match your selected filters."
- "This property is no longer available."
- "Please check the highlighted fields."
- "Your inquiry couldn't be submitted. Please try again or contact us through WhatsApp."

Do not expose stack traces, SQL errors, credentials, or internal service details.

### 14.3 Logging

Use structured server-side logs where supported.

Logs may include:

- Timestamp.
- Error category.
- Route or operation.
- Request correlation identifier.
- Non-sensitive diagnostic context.

Logs must not include:

- Passwords.
- Authentication tokens.
- API keys.
- Full inquiry messages.
- Unnecessary personal contact information.

### 14.4 Recovery

For recoverable errors:

- Preserve safe form input where practical.
- Allow visitors to retry.
- Avoid duplicate inquiry processing where duplicate submissions would be harmful.
- Provide alternative contact options.
- Keep public navigation available if one data-dependent section fails.

Use framework-supported error boundaries for unexpected rendering failures.

---

## 15. Security Boundaries

### 15.1 Trust Boundaries

The architecture must distinguish between:

1. Untrusted browser input.
2. Public server-rendered data.
3. Authenticated administrative requests.
4. Privileged server-side operations.
5. External service providers.
6. Database and storage resources.

All data crossing these boundaries must be validated and authorized appropriately.

### 15.2 Input Security

Treat all user-controlled values as untrusted, including:

- Search parameters.
- Property slugs.
- Contact form fields.
- Property descriptions.
- Image filenames.
- Image metadata.
- Administrator-submitted listing content.

Use parameterized database queries through the selected database client.

Never build raw SQL by concatenating untrusted values.

Escape or safely render user-controlled text. Do not render arbitrary HTML from property descriptions without a deliberate sanitization strategy.

### 15.3 Cross-Site Scripting

- Prefer framework-safe text rendering.
- Avoid direct HTML injection.
- Sanitize any rich text that must be rendered as HTML.
- Validate and constrain externally supplied URLs.
- Use a Content Security Policy when compatible with the selected deployment and framework configuration.

### 15.4 Cross-Site Request Forgery

For cookie-authenticated mutations, use the framework's supported protections and enforce appropriate origin checks.

Do not assume every server-side mutation is automatically protected merely because it uses a Server Action.

For custom Route Handlers, explicitly assess CSRF risk based on the authentication mechanism and request behavior.

### 15.5 Contact Form Abuse

Public contact endpoints should include proportionate anti-abuse controls.

MVP protections should include:

- Server-side validation.
- Field length limits.
- Request rate limiting.
- A reasonable message size limit.
- Safe error responses.
- A honeypot or similar low-friction abuse control where appropriate.

Add CAPTCHA only if observed abuse warrants it or a deployment requirement demands it.

Rate limiting must work across application instances. Do not rely exclusively on in-memory counters in a serverless deployment.

### 15.6 File Upload Security

If property uploads are supported:

- Require administrator authorization.
- Enforce a file size limit.
- Allow only approved image formats.
- Verify content rather than trusting file extensions alone.
- Use generated filenames.
- Prevent executable files from being uploaded as images.
- Restrict storage permissions.
- Avoid exposing private storage credentials.

### 15.7 Data Privacy

Collect only the contact information necessary to respond to inquiries.

Define a retention policy before storing inquiries in the database.

Do not expose inquiry records through public queries, public page props, or browser-accessible administrative credentials.

Use HTTPS in production.

### 15.8 Security Headers

Configure appropriate production headers, including where applicable:

- `Strict-Transport-Security`.
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- A suitable `Content-Security-Policy`.
- Frame restrictions through CSP or compatible headers.
- Appropriate permissions policies.

Test security headers against the application's actual use of images, fonts, analytics, and external services.

### 15.9 Dependency Security

- Keep framework and dependency versions supported.
- Review dependency changes.
- Run dependency vulnerability checks in CI.
- Avoid unnecessary third-party packages.
- Do not install packages merely to replace a small, well-understood function.

---

## 16. Performance and Scalability

### 16.1 Performance Targets

Align implementation with the performance goals in `DESIGN.md`.

Target Core Web Vitals:

- Largest Contentful Paint (LCP): **2.5 seconds or less**.
- Interaction to Next Paint (INP): **200 milliseconds or less**.
- Cumulative Layout Shift (CLS): **0.1 or less**.

These are targets to validate with measurement, not guarantees provided by the framework.

### 16.2 Image Performance

Property imagery is likely to dominate page weight.

Use:

- Responsive image sizes.
- Modern formats where supported.
- Explicit width and height or aspect ratios.
- Lazy loading for below-the-fold images.
- Priority loading for the main above-the-fold image when appropriate.
- Appropriate image compression.
- Optimized thumbnails for property cards.

Avoid loading full-resolution gallery images into the initial page unnecessarily.

### 16.3 Caching

Cache public content only when safe.

Potential candidates:

- Static About and Contact content.
- Published property detail pages.
- Public property listing results, with appropriate revalidation.

Do not cache private inquiry records or administrator-specific content in shared public caches.

Invalidate relevant cached pages when a property is published, unpublished, or updated.

### 16.4 Database Scalability

Start with PostgreSQL indexes and bounded queries.

Add more advanced techniques only when required:

- Cursor-based pagination for large catalogues.
- Full-text search for richer text matching.
- Connection pooling for database access patterns that need it.
- Dedicated search infrastructure for large-scale search requirements.
- Read replicas if measured database load justifies them.

### 16.5 Infrastructure Scalability

The initial application can run as one Next.js deployment using managed database and storage services.

Avoid Kubernetes, service meshes, independent microservices, and custom caching infrastructure for the MVP.

The architecture should scale first through managed platform capabilities, efficient queries, image optimization, and caching.

---

## 17. Folder Structure

Recommended application structure:

```text
haven-estates-addis/
├── public/
│   ├── favicon.ico
│   ├── images/
│   │   └── placeholders/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── properties/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── properties/
│   │   │       ├── page.tsx
│   │   │       ├── new/
│   │   │       │   └── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts
│   │       └── admin/
│   │           └── properties/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-navigation.tsx
│   │   │
│   │   ├── properties/
│   │   │   ├── property-card.tsx
│   │   │   ├── property-grid.tsx
│   │   │   ├── property-filters.tsx
│   │   │   ├── property-gallery.tsx
│   │   │   └── property-inquiry-cta.tsx
│   │   │
│   │   └── contact/
│   │       └── contact-form.tsx
│   │
│   ├── features/
│   │   ├── properties/
│   │   │   ├── property.schemas.ts
│   │   │   ├── property.types.ts
│   │   │   └── property.service.ts
│   │   │
│   │   ├── contact/
│   │   │   ├── contact.schemas.ts
│   │   │   └── contact.service.ts
│   │   │
│   │   └── admin/
│   │       ├── admin.auth.ts
│   │       └── admin.service.ts
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   ├── schema.ts
│   │   │   └── service.ts
│   │   │
│   │   ├── env.ts
│   │   ├── errors.ts
│   │   ├── rate-limit.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── database.types.ts
│
├── drizzle/
│   ├── migrations/
│   └── seed.sql
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── PRD.md
├── DESIGN.md
└── ARCHITECTURE.md
```

This is a recommended structure, not a requirement to create every file immediately.

### 17.1 Folder Responsibilities

- `app/`: Routes, layouts, metadata, and HTTP handlers.
- `components/ui/`: Generic reusable interface elements.
- `components/layout/`: Shared site navigation and page framing.
- `components/properties/`: Property-specific presentation components.
- `features/`: Domain logic, validation, and application services.
- `lib/`: Infrastructure integrations and shared utilities.
- `types/`: Shared application and database types.
- `drizzle/migrations/`: Version-controlled database schema changes.
- `drizzle/seed.sql`: Non-production demonstration data.
- `tests/`: Automated tests grouped by purpose.

Keep the structure proportional to the product. Avoid creating empty abstraction layers or excessive files before they are needed.

---

## 18. Testing Strategy

### 18.1 Unit Tests

Use Vitest for isolated business logic and validation.

Test:

- Property filter normalization.
- Price and bedroom range validation.
- Slug handling.
- Property publication rules.
- Contact form validation.
- Permission-checking functions.
- Error mapping.

### 18.2 Component Tests

Use React Testing Library for interactive components.

Test:

- Property cards with complete and incomplete data.
- Filter controls.
- Mobile navigation.
- Contact form validation.
- Loading and error messages.
- Empty search results.
- Keyboard interaction and accessible labels.

### 18.3 Integration Tests

Test the application's interaction with the database layer.

Cover:

- Retrieving published properties.
- Excluding unpublished properties from public results.
- Property filtering.
- Handling missing properties.
- Creating and updating listings as an authorized administrator.
- Rejecting unauthorized mutations.
- Contact inquiry processing, if implemented.

Use an isolated test database or controlled test environment. Never run destructive tests against production data.

### 18.4 End-to-End Tests

Use Playwright to validate critical visitor journeys.

Required scenarios:

1. Open the homepage.
2. Navigate to the property listings page.
3. Filter properties by supported criteria.
4. Open a property detail page.
5. Verify property information and imagery.
6. Follow the property's WhatsApp inquiry link.
7. Submit an invalid contact form and verify validation.
8. Submit a valid contact form and verify the configured success behavior.
9. Open an unavailable property URL and verify the not-found experience.

If administrative functionality is implemented, also test:

- Administrator sign-in.
- Rejection of unauthorized access.
- Creating a property.
- Updating a property.
- Publishing and unpublishing a listing.
- Restricting image uploads to authorized users.

### 18.5 Accessibility Testing

Check:

- Keyboard navigation.
- Visible focus indicators.
- Semantic HTML.
- Form labels and validation messages.
- Image alternative text.
- Color contrast.
- Dialog and menu behavior.
- Responsive layouts at mobile, tablet, and desktop widths.

Use automated accessibility checks as a supplement to manual keyboard testing.

### 18.6 Quality Gates

Before merging or deploying changes:

- TypeScript checks pass.
- Linting passes.
- Unit and component tests pass.
- Critical integration tests pass.
- Production build succeeds.
- Critical end-to-end journeys pass in the deployment pipeline where practical.

---

## 19. Deployment Architecture

### 19.1 Hosting

Deploy the Next.js application to Vercel.

Use Neon for managed PostgreSQL and, if required, authentication and image storage.

This arrangement minimizes infrastructure administration and supports a small initial application.

### 19.2 Deployment Environments

Maintain:

**Development**

- Local application.
- Local or isolated development data.
- Non-production credentials.

**Preview**

- Pull-request or branch deployment.
- Non-production data.
- Restricted access if the preview contains private content.

**Production**

- Canonical public domain.
- Production database and storage.
- Production credentials.
- Monitoring and backup configuration.

### 19.3 CI/CD Pipeline

A standard deployment pipeline should:

1. Install locked dependencies.
2. Run linting.
3. Run type checks.
4. Run automated tests.
5. Build the production application.
6. Deploy a preview for review where applicable.
7. Deploy approved changes to production.
8. Apply database migrations through a controlled process.

Database migrations must be version-controlled and reviewed.

Avoid making untracked schema changes directly in production.

### 19.4 Database Migrations

Use version-controlled Neon migrations for:

- Table creation.
- Column changes.
- Constraints.
- Indexes.
- Row Level Security policies.
- Database functions, if required.

Test migrations against a non-production environment before applying them to production.

Prefer backward-compatible changes where the deployed application and database may temporarily run different versions.

### 19.5 Backups and Recovery

Configure managed database backups according to the selected Neon plan and the business's recovery requirements.

Document:

- Backup frequency.
- Retention period.
- Recovery procedure.
- Access to backup controls.
- Recovery objectives appropriate to the project.

Do not assume backups are sufficient without understanding their retention and restoration behavior.

### 19.6 Domain and HTTPS

Configure the production domain and HTTPS through the hosting provider.

Verify:

- Canonical domain behavior.
- HTTPS redirects.
- Canonical metadata.
- Sitemap accessibility.
- Robots directives.
- Public property URL behavior.
- Appropriate access restrictions for administrative pages.

---

## 20. MVP Implementation Scope

### 20.1 Required for the Public Website

- Shared site layout.
- Homepage.
- Property listings page.
- Property detail pages.
- Property search and filters.
- About page.
- Contact page.
- Not-found page.
- Responsive layouts.
- Accessible navigation and form controls.
- Property image handling.
- WhatsApp inquiry links.
- Contact form with server-side validation.
- Appropriate loading, empty, success, and error states.
- Search engine metadata.
- Database-backed property data if the website is intended to be functional rather than purely static.

### 20.2 Required if the MVP Includes Live Administration

- Administrator authentication.
- Role-based authorization.
- Protected property management.
- Property creation and editing.
- Publication status management.
- Restricted image upload.
- Database migrations.
- Security policies and authorization tests.

### 20.3 Optional MVP Capabilities

Include these only if confirmed by the PRD:

- Persistent inquiry storage.
- Transactional email notifications.
- Property sorting.
- Administrative inquiry management.
- Analytics.
- Automated image transformation.
- Rich-text property descriptions.

### 20.4 Out of Scope

Unless future requirements explicitly demand them, do not implement:

- Microservices.
- Kubernetes.
- Dedicated search infrastructure.
- AI-powered property recommendations.
- AI chatbots.
- Visitor registration.
- Saved-property accounts.
- Real-time chat infrastructure.
- Online payments.
- Mortgage calculators.
- Complex agent management.
- Multi-tenant agency support.
- Advanced analytics dashboards.
- Event-driven processing infrastructure.

---

## 21. Future Scalability

The architecture can evolve without changing its core structure.

| Future requirement           | Recommended evolution                                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| More property listings       | Improve database indexes, pagination, and query plans.                      |
| Richer property search       | Add PostgreSQL full-text search or another search solution if justified.    |
| More administrators          | Introduce granular roles and permissions.                                   |
| Multiple agencies            | Add explicit agency ownership and tenant-aware authorization.               |
| More contact submissions     | Add persistent inquiry management and operational monitoring.               |
| More image traffic           | Use optimized image delivery and CDN capabilities.                          |
| External integrations        | Introduce documented API endpoints and verified webhooks.                   |
| Background processing        | Add a managed job queue only when asynchronous work becomes necessary.      |
| AI-assisted listing creation | Add a separately controlled AI integration with human approval.             |
| Multiple deployment regions  | Reassess hosting, database latency, caching, and availability requirements. |

Future changes should respond to measurable requirements rather than hypothetical scale.

---

## 22. Assumptions and Decisions Requiring Approval

The following decisions must be confirmed before implementation is finalized.

### Product and Data

- **Property data source:** Confirm whether the initial listings will be manually entered, imported, or managed through an administrative interface.
- **Property categories:** Confirm the supported property types.
- **Transaction types:** Confirm whether both sale and rental listings are supported.
- **Currency:** Confirm the currency used for prices and how currency is displayed.
- **Area units:** Confirm the accepted property area units.
- **Location model:** Confirm whether locations are free-text labels or selected from a controlled list.
- **Property availability:** Define how sold, rented, unavailable, and archived listings should behave.
- **Demo content:** Clearly identify fictional listings and use appropriately licensed imagery.

### Administration

- **Admin interface:** Confirm whether property management is required in the initial release or whether listings will be seeded manually.
- **Administrator access:** Confirm who may access the administrative interface.
- **Roles:** Confirm whether a single administrator role is sufficient.
- **Deletion policy:** Confirm whether listings should be permanently deleted or archived.

### Contact and Communication

- **WhatsApp number:** Confirm the agency's verified WhatsApp business number.
- **Contact form behavior:** Confirm whether submissions should be emailed, stored in the database, or both.
- **Email provider:** Select a transactional email provider only if email delivery is required.
- **Inquiry retention:** Define how long submitted inquiries should be retained.
- **Abuse controls:** Confirm the initial rate-limiting policy and whether additional bot protection is needed.

### Infrastructure

- **Hosting:** Confirm Vercel as the deployment platform.
- **Database:** Confirm Neon as the managed PostgreSQL platform.
- **Image storage:** Confirm whether Neon Storage or a dedicated image service will be used.
- **Domain:** Confirm the canonical production domain.
- **Operational requirements:** Define acceptable downtime, backup retention, and recovery expectations.

These decisions should be resolved before they materially affect the schema, authorization model, or deployment configuration.

---

## 23. Architecture Acceptance Criteria

The architecture is ready for implementation when:

- [ ] The application uses a single, maintainable Next.js deployment.
- [ ] The chosen database and image-storage services are configured.
- [ ] Property data has a documented schema and validation rules.
- [ ] Public queries return only published listings.
- [ ] Property filtering is performed server-side.
- [ ] Property pages have stable, shareable URLs.
- [ ] Administrative writes are protected by server-side authorization if administration is included.
- [ ] Privileged credentials are never exposed to the browser.
- [ ] Contact submissions are validated and handled according to the approved workflow.
- [ ] WhatsApp inquiry links are configured with the verified agency number.
- [ ] Loading, empty, error, and success states are implemented.
- [ ] Core pages meet responsive and accessibility requirements.
- [ ] Database migrations are version-controlled.
- [ ] Automated tests cover critical user journeys and security boundaries.
- [ ] Production configuration, HTTPS, backups, and deployment procedures are documented.
- [ ] The implementation avoids infrastructure that the MVP does not need.

---

## 24. Final Architecture Decision

HAVEN Estates Addis should be implemented as a **modular Next.js application using TypeScript, Tailwind CSS, managed PostgreSQL through Neon, and Vercel hosting**.

Public pages should be server-rendered where appropriate, with property data retrieved through a dedicated server-side data-access layer. Property filtering should use validated URL parameters and database queries. Contact requests should be handled through a validated server-side workflow, while property-specific inquiries should use direct WhatsApp click-to-chat links.

If the MVP includes property administration, Neon Auth, explicit administrator authorization, and appropriate database policies should protect all management operations.

This architecture provides the required browsing, filtering, property-detail, and inquiry experiences while keeping infrastructure, cost, and maintenance overhead low. It also establishes clear boundaries for future expansion without introducing unnecessary complexity into the initial product.
