# API.md

# HAVEN Estates Addis — API Specification

## 1. Purpose

This document defines how HAVEN Estates Addis communicates between its frontend, server-side application, database, and external services.

It follows the requirements and technical decisions established in:

- `PRD.md` — product requirements and user journeys.
- `ARCHITECTURE.md` — application architecture and security boundaries.
- `DATABASE.md` — database schema, relationships, and access policies.

The API design prioritizes:

- Reliable property browsing and filtering.
- Secure property administration.
- Validated contact form submissions.
- Direct WhatsApp property inquiries.
- Consistent error handling.
- Protection of personal information and administrative data.
- Minimal infrastructure and dependencies.

**Architectural decision:** The MVP does not require a separate backend service or a comprehensive public REST API. Use Next.js server-side functions for internal operations and expose HTTP endpoints only where an explicit interface is needed.

---

## 2. API Architecture

### 2.1 Communication Overview

```text
Visitor Browser
      |
      v
Next.js Application
      |
      +-----------------------------+
      |                             |
      v                             v
Server-Rendered Pages          Interactive Forms
      |                             |
      v                             v
Property Data Layer           Contact Endpoint
      |                             |
      v                             v
Neon PostgreSQL             Validation and Processing
                                    |
                                    v
                           Optional Email Provider

Visitor Browser
      |
      v
WhatsApp Click-to-Chat
      |
      v
WhatsApp Application or Website

Administrator
      |
      v
Protected Admin Interface
      |
      v
Server-Side Authentication and Authorization
      |
      v
Property Management Operations
      |
      v
Neon PostgreSQL and Image Storage
```

### 2.2 Communication Types

The application uses three types of communication.

| Type                            | Mechanism                                        | Purpose                                                          |
| ------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Internal application operations | Server-side functions and services               | Retrieve and manage property data.                               |
| HTTP API endpoints              | Next.js Route Handlers where needed              | Process contact submissions and explicitly defined integrations. |
| External links and services     | WhatsApp, optional email provider, image storage | Support inquiries, notifications, and image delivery.            |

Internal server-side functions are not public HTTP endpoints. They must not be treated as directly accessible APIs merely because they are used by application pages.

### 2.3 API Scope

The initial implementation may require only one public application endpoint:

- `POST /api/contact`

Property reads can be performed directly through server-side data-access functions without creating redundant REST endpoints.

Administrative mutations may use Server Actions or protected Route Handlers, depending on the implementation. They must follow the same validation and authorization requirements in this document.

---

## 3. API Conventions

### 3.1 Base URL

The production base URL is the approved canonical domain.

Example:

`https://<production-domain>`

The actual domain must be configured before deployment.

Local development may use the framework's local development URL.

### 3.2 HTTP and Content Types

For JSON endpoints:

- Requests use `Content-Type: application/json`.
- Successful responses use `Content-Type: application/json`.
- Errors use a consistent JSON error format.
- Unsupported request content types should be rejected.

The contact endpoint must enforce a reasonable request-body size limit.

### 3.3 Naming Conventions

Use:

- Lowercase, plural nouns for resource collections.
- Stable property slugs for public property URLs.
- UUIDs for internal record identifiers.
- ISO 8601 timestamps for API timestamp values.
- Consistent snake_case field names when returning database-aligned property objects.

Example property resource:

- `id`
- `slug`
- `title`
- `transaction_type`
- `property_type`
- `price_amount`
- `price_currency`
- `created_at`

The public website does not need to expose every database column. Responses must contain only fields required by the requesting feature.

### 3.4 Versioning

Do not introduce versioned API paths for the initial application unless an external consumer requires a stable API contract.

If a public API is introduced later, define a versioning policy before exposing it to external developers.

Internal application operations can evolve with the application, provided changes remain consistent with the database schema and user experience.

---

## 4. Endpoint Inventory

### 4.1 Initial API Surface

| Method                 | Endpoint or operation       | Purpose                                                 | Access               |
| ---------------------- | --------------------------- | ------------------------------------------------------- | -------------------- |
| Internal read          | Published property query    | Retrieve properties for the homepage and listings page. | Public page data     |
| Internal read          | Property detail query       | Retrieve one published property by slug.                | Public page data     |
| Internal read          | Property image query        | Retrieve images associated with a published property.   | Public page data     |
| `POST`                 | `/api/contact`              | Validate and process contact form submissions.          | Public, rate-limited |
| Internal mutation      | Create property             | Create a listing.                                       | Administrator        |
| Internal mutation      | Update property             | Update an existing listing.                             | Administrator        |
| Internal mutation      | Publish or archive property | Change listing visibility.                              | Administrator        |
| Internal mutation      | Manage property images      | Add, reorder, or remove images.                         | Administrator        |
| Internal read/mutation | Manage inquiries            | Retrieve or update inquiry records, if implemented.     | Administrator        |

The internal read operations do not require separate HTTP endpoints.

Administrative operations should use Server Actions or Route Handlers based on the selected implementation. Do not implement both interfaces for the same operation without a clear requirement.

### 4.2 Endpoints Explicitly Out of Scope

The MVP does not require:

- Visitor registration endpoints.
- Public authentication endpoints.
- Saved-property endpoints.
- Payment endpoints.
- AI endpoints.
- Public agent directories.
- Real-time messaging endpoints.
- WhatsApp webhook endpoints.
- Public property-write endpoints.
- A general-purpose administrative API for third-party consumers.

---

## 5. Property Data Access

### 5.1 Homepage Property Query

**Operation:** Retrieve featured properties.

**Access:** Public page data.

**Purpose:** Populate the homepage's featured property section.

#### Query Rules

- Return published properties only.
- Include featured properties only.
- Return a bounded number of results.
- Use deterministic ordering.
- Retrieve only fields required by the homepage.

#### Response Data

The internal query should return a list of property summaries containing the required display fields, such as:

- Property ID.
- Slug.
- Title.
- Transaction type.
- Property type.
- Location.
- Price and currency.
- Bedroom and bathroom counts where applicable.
- Area and unit where applicable.
- Primary image reference.

This operation does not need to be exposed as a public JSON endpoint.

### 5.2 Property Listings Query

**Operation:** Retrieve published property results.

**Access:** Public page data.

**Purpose:** Display property listings and apply search filters.

#### Supported Filters

| Parameter          | Type             | Purpose                                                           |
| ------------------ | ---------------- | ----------------------------------------------------------------- |
| `transaction_type` | String           | Filter by sale or rent.                                           |
| `property_type`    | String           | Filter by supported property category.                            |
| `location`         | String           | Filter by supported location matching rules.                      |
| `min_price`        | Decimal          | Minimum price.                                                    |
| `max_price`        | Decimal          | Maximum price.                                                    |
| `bedrooms`         | Integer          | Minimum or exact bedroom count, as defined by the PRD.            |
| `page`             | Positive integer | Page number, if offset pagination is used.                        |
| `page_size`        | Positive integer | Number of results per page, subject to a server-enforced maximum. |

Use the parameter names consistently across URL filters, server-side validation, and data-access functions.

The precise interpretation of `bedrooms` must be consistent across the UI and database query. If the product requires an exact count rather than a minimum count, the implementation must use exact matching.

### 5.3 Filter Validation

The server must:

- Reject unsupported transaction types.
- Reject unsupported property categories.
- Trim and normalize location values.
- Reject negative minimum or maximum prices.
- Reject malformed numeric values.
- Reject invalid page numbers.
- Enforce a maximum page size.
- Handle minimum prices greater than maximum prices consistently.

Invalid query parameters must never cause arbitrary database queries.

Depending on the user experience, invalid filters may produce a validation response or be normalized to safe defaults.

### 5.4 Pagination

Use server-side pagination.

Recommended initial behavior:

- Default page size: 12 properties.
- Maximum page size: 48 properties.
- Default page: 1.

These values are implementation defaults and should be adjusted if the approved product requirements specify different values.

Apply filters before pagination.

Return pagination metadata internally, including:

- Current page.
- Page size.
- Number of returned results.
- Whether another page is available.

Avoid calculating the total number of matching records on every request unless the interface requires an exact result count.

### 5.5 Property Detail Query

**Operation:** Retrieve a published property by slug.

**Access:** Public page data.

**Purpose:** Render the property detail page and its inquiry options.

#### Behavior

- Match the requested slug.
- Require `status = 'published'`.
- Retrieve associated image metadata.
- Return the required public property fields.
- Return a not-found result when no published property matches.

Do not disclose whether a missing property exists as a draft or archived record.

### 5.6 Caching and Revalidation

Property reads may use framework-supported caching and revalidation.

When a property is published, unpublished, or materially updated:

- Revalidate the affected property page.
- Revalidate listing pages that may display the property.
- Revalidate the homepage if the featured section is affected.

Do not cache administrative data or contact inquiry records in public shared caches.

---

## 6. Contact Form API

### 6.1 Endpoint

`POST /api/contact`

### 6.2 Purpose

Accept a general inquiry or a property-related inquiry from the contact form.

The endpoint must validate the request and execute the approved contact workflow.

Depending on the product decision, the workflow may:

- Deliver an email notification.
- Store an inquiry in the database.
- Perform both operations.

The endpoint must not claim an inquiry was delivered if the configured workflow failed.

### 6.3 Authentication

Authentication is not required for public contact submissions.

The endpoint must use server-side validation and abuse protection.

### 6.4 Request Headers

Required:

- `Content-Type: application/json`

The endpoint may also use request metadata for origin checks, rate limiting, and diagnostic correlation.

Do not trust client-supplied identity or authorization fields.

### 6.5 Request Body

Expected fields:

| Field         | Type   | Required    | Description                                 |
| ------------- | ------ | ----------- | ------------------------------------------- |
| `name`        | String | Yes         | Visitor's name.                             |
| `email`       | String | Conditional | Visitor's email address.                    |
| `phone`       | String | Conditional | Visitor's phone number.                     |
| `message`     | String | Yes         | Inquiry message.                            |
| `property_id` | UUID   | No          | Related property identifier, if applicable. |

At least one of `email` or `phone` must be supplied.

The request must not include trusted administrative fields such as inquiry status, creation timestamp, or authorization role. Those values are controlled by the server.

### 6.6 Validation Rules

Validate all fields on the server.

**Name**

- Required.
- Must not be empty after trimming.
- Must not exceed the approved length limit.

**Email**

- Optional.
- Must follow the accepted email format when supplied.
- Must not exceed the approved length limit.

**Phone**

- Optional.
- Must be nonempty after trimming if supplied.
- Must conform to the application's accepted phone-number input rules.

**Message**

- Required.
- Must not be empty after trimming.
- Must not exceed the approved maximum length.

**Property ID**

- Optional.
- Must be a valid UUID if supplied.
- If the workflow requires an active public listing, the property must exist and be published.
- Invalid property references must not expose unpublished property details.

### 6.7 Successful Response

For a workflow that completes successfully:

HTTP status: `200 OK`

Example response:

    {
      "success": true,
      "message": "Your inquiry has been submitted successfully."
    }

Do not return the stored inquiry record or repeat personal information in the response.

If inquiry creation is modeled as a resource-creation API, `201 Created` may be used instead. Choose one convention and apply it consistently.

### 6.8 Validation Error Response

HTTP status: `400 Bad Request`

Example:

    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Please check the submitted information.",
        "fields": {
          "email": "Enter a valid email address or provide a phone number."
        }
      }
    }

Field errors should identify the relevant input without echoing sensitive submitted content.

### 6.9 Other Responses

| Status         | Error code               | Meaning                                                               |
| -------------- | ------------------------ | --------------------------------------------------------------------- |
| `400`          | `VALIDATION_ERROR`       | Request fields are invalid.                                           |
| `400`          | `INVALID_REQUEST`        | Request structure is invalid.                                         |
| `403`          | `ORIGIN_NOT_ALLOWED`     | Request origin is not permitted, where origin validation is enforced. |
| `404`          | `PROPERTY_NOT_FOUND`     | The specified property is unavailable for the requested operation.    |
| `413`          | `PAYLOAD_TOO_LARGE`      | Request body exceeds the permitted size.                              |
| `415`          | `UNSUPPORTED_MEDIA_TYPE` | Request content type is unsupported.                                  |
| `429`          | `RATE_LIMITED`           | Submission limit exceeded.                                            |
| `500`          | `INTERNAL_ERROR`         | Unexpected processing failure.                                        |
| `502` or `503` | `DELIVERY_UNAVAILABLE`   | A required external delivery service is unavailable.                  |

Use `404` for an unavailable property reference only if the workflow requires the property to be publicly available. A general inquiry without a property reference must remain valid.

### 6.10 Contact Workflow and Partial Failures

If the contact form stores inquiries and sends email, database persistence and email delivery are separate operations.

The system must define what happens if one succeeds and the other fails.

Recommended initial behavior:

1. Validate the request.
2. Apply abuse controls.
3. Persist the inquiry if storage is enabled.
4. Attempt email delivery if configured.
5. Return a response that accurately represents the outcome.

If the inquiry is stored but email delivery fails, do not tell the visitor that the inquiry was entirely lost.

If email delivery is the only configured submission mechanism and it fails, return a recoverable error and provide an alternative contact method.

Do not automatically retry an email delivery indefinitely from the synchronous request.

If guaranteed delivery becomes a requirement, introduce a durable retry mechanism or an outbox/job-processing design as a separate, approved enhancement.

---

## 7. Administrative Operations

### 7.1 Scope

Administrative operations are required only if the MVP includes live property management.

The initial product does not require a separate public administrative API.

Use Server Actions or protected Route Handlers for:

- Creating properties.
- Updating properties.
- Publishing and unpublishing listings.
- Archiving listings.
- Managing property images.
- Managing contact inquiries, if supported.

### 7.2 Authentication and Authorization

Every administrative mutation must:

1. Validate the administrator's authentication session.
2. Verify the user's administrative permission.
3. Validate the submitted data.
4. Perform the database operation.
5. Return a safe response.

Authentication alone is not sufficient.

Do not accept a client-provided role, user ID, or permission flag as proof of authorization.

### 7.3 Create Property

**Operation:** Create a property.

**Method:** Server Action or protected `POST` handler.

The request must contain the approved property fields.

The server must:

- Validate required values.
- Normalize the slug.
- Verify transaction and property types.
- Validate the price and currency.
- Validate optional area and room attributes.
- Enforce publication rules.
- Set server-controlled timestamps and status defaults.
- Reject duplicate slugs.

On success, return the new property's identifier and slug to the authorized administrator.

Do not expose internal database errors.

### 7.4 Update Property

**Operation:** Update an existing property.

**Method:** Server Action or protected `PATCH` handler.

The server must:

- Verify administrator authorization.
- Validate the property identifier.
- Validate changed fields.
- Preserve fields not included in the update.
- Enforce slug uniqueness.
- Update `updated_at`.
- Maintain publication metadata consistently.
- Revalidate affected public pages.

Return `404` when the target cannot be managed through the requested operation.

Return `409` when an update conflicts with a unique constraint or another explicitly handled resource conflict.

### 7.5 Publish, Unpublish, and Archive

Publication changes must be explicit, validated transitions.

Publishing a listing requires all mandatory public fields and required imagery.

Unpublishing or archiving a property must immediately prevent it from appearing in public queries, subject to cache invalidation.

Do not rely on frontend hiding to remove a property from public access.

### 7.6 Image Management

Image management must verify administrator authorization before allowing:

- Uploads.
- Deletion.
- Reordering.
- Association with a property.

Validate file types and sizes before upload.

The database must store stable image references rather than temporary signed URLs.

If an upload succeeds but the database update fails, the application must handle the orphaned object rather than assuming both operations were atomic.

### 7.7 Inquiry Management

If inquiry persistence is enabled and an administrative interface is included, only authorized administrators may:

- View inquiries.
- Update inquiry status.
- Delete records where permitted by the retention policy.

Public visitors must never receive inquiry records through a property or contact endpoint.

---

## 8. Authentication and Session Handling

### 8.1 Public Routes

The following routes do not require visitor authentication:

- Homepage.
- Property listings.
- Property detail pages.
- About page.
- Contact page.
- Public contact submission endpoint, subject to abuse controls.

### 8.2 Administrative Routes

Administrative pages and mutations require a valid authenticated administrator session.

The authentication provider is Neon Auth.

The application must verify the session on the server using the supported Neon integration.

### 8.3 Session Requirements

- Do not place authentication tokens in URLs.
- Do not expose service-role credentials to the browser.
- Do not store privileged credentials in browser-accessible persistent storage.
- Enforce authorization for each administrative operation.
- Handle expired sessions safely.
- Clear or invalidate the session during logout.
- Do not include session tokens in logs or error messages.

### 8.4 Database Access

Public page queries should use a restricted server-side database client or a correctly configured public client.

Privileged mutations must use a trusted server-side path with explicit authorization checks.

If a service-role key is used, assume it can bypass RLS and restrict its use accordingly.

---

## 9. WhatsApp Integration

### 9.1 Integration Type

Use WhatsApp click-to-chat.

This is a user-initiated external link, not a server-to-server API integration.

### 9.2 Behavior

When a visitor selects a property inquiry button:

1. The application constructs a WhatsApp click-to-chat link.
2. The link includes the verified agency phone number.
3. The link may include a prefilled message referencing the property.
4. The browser opens WhatsApp or the relevant web experience.
5. The visitor reviews and sends the message in WhatsApp.

### 9.3 Message Content

A prefilled message may contain:

- Property title.
- Property URL.
- A brief request for more information.

It must not include unnecessary personal information or internal identifiers.

### 9.4 Configuration

The agency's WhatsApp number must be configurable through an appropriate public application configuration value or server-rendered setting.

Because the number is displayed to visitors and embedded in a click-to-chat link, it is not a secret.

Do not place private API credentials in the link.

### 9.5 Failure Handling

The website cannot reliably confirm whether a visitor:

- Opened WhatsApp.
- Sent the message.
- Received a reply.

The UI must not claim that an inquiry has been submitted simply because the WhatsApp link was clicked.

If WhatsApp is unavailable, the website should retain the alternative contact form and any other approved contact information.

### 9.6 Webhooks

No WhatsApp webhook is required for the MVP.

If the product later introduces WhatsApp Business API messaging or automated inbound message processing, that integration must be specified separately, including webhook signature verification, message privacy, retry behavior, and delivery-state handling.

---

## 10. Email Integration

### 10.1 Scope

Email delivery is optional.

Introduce a transactional email provider only if the approved contact workflow requires email notifications.

The provider should support server-side authenticated delivery and provide clear delivery errors.

### 10.2 Outbound Email

If enabled, email may be used to notify the agency of a new contact inquiry.

Requirements:

- Use a verified sender address.
- Store provider credentials on the server.
- Use a configured destination address.
- Validate submitted email addresses before using them as reply-to values.
- Treat the inquiry message as untrusted user content.
- Avoid including unnecessary personal information.
- Do not expose provider response details to visitors.

### 10.3 Environment Configuration

If Resend is selected, use:

- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO`

These variables are required only when email notifications are enabled.

### 10.4 Failure Handling

The application must distinguish between:

- Validation failure.
- Database persistence failure, if applicable.
- Provider request failure.
- Provider acceptance without confirmed final delivery.

An accepted provider request does not necessarily mean the email reached the recipient's inbox.

If guaranteed asynchronous delivery is required later, introduce a durable job or outbox workflow rather than relying on a single synchronous request.

### 10.5 Inbound Email Webhooks

No inbound email webhook is required for the MVP.

If webhooks are added later, they must verify the provider's signature or equivalent authenticity mechanism, reject invalid requests, and handle duplicate events idempotently.

---

## 11. Webhooks

### 11.1 MVP Decision

The initial product does not require incoming webhooks.

The website can deliver the required browsing and inquiry experience without external services calling back into the application.

### 11.2 Future Webhook Requirements

Any future webhook endpoint must:

- Verify the sender's authenticity using the provider's documented method.
- Validate the request body.
- Reject invalid signatures.
- Avoid logging secrets or unnecessary personal data.
- Handle duplicate events safely.
- Return appropriate HTTP status codes.
- Avoid performing long-running work synchronously when a durable asynchronous process is more appropriate.
- Use idempotency controls when repeated events could cause duplicate operations.

Never accept an unauthenticated webhook as proof that an external action occurred.

---

## 12. Rate Limiting and Abuse Prevention

### 12.1 Public Contact Endpoint

`POST /api/contact` must be rate-limited.

Apply limits per suitable combination of client and request context, while avoiding unnecessary collection of identifying information.

The initial rate limit must be selected based on expected legitimate usage and the deployment platform's capabilities.

### 12.2 Rate-Limit Requirements

- Apply a reasonable request-body size limit.
- Reject malformed submissions before calling external providers.
- Prevent rapid repeated submissions.
- Avoid sending repeated identical notifications unnecessarily.
- Return `429 Too Many Requests` when the limit is exceeded.
- Include a safe retry indication when appropriate.

### 12.3 Distributed Deployment

Do not rely solely on an in-memory counter.

A serverless deployment may run multiple application instances, making in-memory limits inconsistent.

Use a shared rate-limiting service or platform-supported mechanism if a distributed limit is required.

The simplest suitable implementation should be selected after confirming hosting capabilities.

### 12.4 Administrative Endpoints

Administrative endpoints should also have proportionate abuse protection.

Authentication and authorization are mandatory regardless of rate limiting.

Rate limiting is not a substitute for access control.

### 12.5 CAPTCHA

CAPTCHA is not required by default.

Introduce it only if observed abuse or an operational requirement justifies the additional friction and dependency.

---

## 13. Error Conventions

### 13.1 Standard Error Format

HTTP API errors should follow a consistent structure.

Example:

    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Please check the submitted information."
      }
    }

For validation errors, an optional `fields` object may identify invalid inputs.

Do not expose stack traces, raw database errors, authentication tokens, provider credentials, or private records.

### 13.2 Standard Error Codes

| Code                     | Meaning                                        |
| ------------------------ | ---------------------------------------------- |
| `INVALID_REQUEST`        | Request format or structure is invalid.        |
| `VALIDATION_ERROR`       | One or more submitted fields are invalid.      |
| `UNAUTHENTICATED`        | Authentication is required.                    |
| `FORBIDDEN`              | The current user lacks permission.             |
| `NOT_FOUND`              | Requested resource is unavailable.             |
| `CONFLICT`               | The operation conflicts with existing data.    |
| `RATE_LIMITED`           | The request exceeds permitted frequency.       |
| `PAYLOAD_TOO_LARGE`      | Request body exceeds the allowed size.         |
| `UNSUPPORTED_MEDIA_TYPE` | Request content type is unsupported.           |
| `DEPENDENCY_UNAVAILABLE` | A required external dependency is unavailable. |
| `INTERNAL_ERROR`         | An unexpected application error occurred.      |

### 13.3 Error Mapping

Use consistent status codes.

| HTTP status                  | Use                                                                        |
| ---------------------------- | -------------------------------------------------------------------------- |
| `200 OK`                     | Successful retrieval or mutation where the endpoint convention uses `200`. |
| `201 Created`                | Successful resource creation where a resource is returned.                 |
| `400 Bad Request`            | Invalid request data.                                                      |
| `401 Unauthorized`           | Authentication is missing or invalid.                                      |
| `403 Forbidden`              | Authenticated user lacks permission.                                       |
| `404 Not Found`              | Resource is unavailable.                                                   |
| `409 Conflict`               | Duplicate slug or another resource conflict.                               |
| `413 Content Too Large`      | Request exceeds the permitted body size.                                   |
| `415 Unsupported Media Type` | Unsupported request content type.                                          |
| `429 Too Many Requests`      | Rate limit exceeded.                                                       |
| `500 Internal Server Error`  | Unexpected server failure.                                                 |
| `502 Bad Gateway`            | An upstream dependency failed in a way represented by the gateway.         |
| `503 Service Unavailable`    | Required service is temporarily unavailable.                               |

Use `502` or `503` only when appropriate to the actual failure. Do not convert every provider error into the same status without considering whether the operation was accepted or partially completed.

### 13.4 Logging and Diagnostics

Server-side logs may include:

- Timestamp.
- Route or operation.
- Error code.
- Request correlation ID.
- Non-sensitive diagnostic details.

Do not log:

- Passwords.
- API keys.
- Authentication tokens.
- Full inquiry messages.
- Unnecessary email addresses or phone numbers.

Where practical, return a request ID that support staff can use to locate the corresponding server-side log.

---

## 14. Environment Variables

Only define variables for integrations that are enabled.

| Variable                        | Required                                          | Purpose                                             | Client exposure                                                     |
| ------------------------------- | ------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Yes                                               | Canonical site URL for metadata and absolute links. | Public                                                              |
| `DATABASE_URL`                  | Yes                                               | Neon PostgreSQL connection string.                  | Server only                                                         |
| `NEON_API_KEY`                  | Only if privileged server-side access requires it | Performs trusted server-side operations.            | Server only                                                         |
| `RESEND_API_KEY`                | Only if Resend is selected                        | Authenticates outbound email requests.              | Server only                                                         |
| `CONTACT_EMAIL_TO`              | Only if email notifications are enabled           | Agency notification destination.                    | Server only                                                         |
| `ADMIN_EMAIL_ALLOWLIST`         | If this authorization approach is selected        | Identifies permitted administrators.                | Server only                                                         |
| `WHATSAPP_BUSINESS_NUMBER`      | If the number is configured server-side           | Agency WhatsApp contact number.                     | Server-side configuration; safe to expose in generated public links |

### 14.1 Secret Handling

- Never expose service-role credentials through `NEXT_PUBLIC_` variables.
- Never commit secret values to version control.
- Use hosting-provider secret configuration for production.
- Keep `.env.example` limited to placeholder values.
- Validate mandatory configuration during deployment or application startup.
- Rotate credentials if they are exposed.
- Use the least-privileged credential appropriate to each operation.

The Neon connection string contains database credentials and must be treated as a server-only secret. Never expose it through `NEXT_PUBLIC_` variables.

---

## 15. Data Privacy

### 15.1 Public Responses

Public responses must contain only data necessary for the visitor's current action.

Never return:

- Draft property descriptions.
- Administrative notes.
- Inquiry records.
- Administrator identities.
- Database credentials.
- Internal provider errors.
- Private property-owner information.

### 15.2 Contact Information

Contact form submissions may contain personal information.

Requirements:

- Validate before processing.
- Limit access to authorized staff.
- Avoid logging the submitted message.
- Avoid sending personal information to analytics services.
- Define retention if inquiry storage is enabled.
- Delete records when required by the approved retention policy.

### 15.3 Browser Exposure

Never send privileged credentials to the browser.

Do not embed private API keys in:

- Client-side JavaScript.
- Public page props.
- HTML attributes.
- URLs.
- Browser-accessible persistent storage.

The frontend may receive public property data and public contact information.

### 15.4 External Providers

Before sending inquiry information to an email provider or another external service, limit the payload to what is needed to deliver the inquiry.

External provider errors must not expose the submitted personal data to the visitor or to public logs.

---

## 16. Caching and Consistency

### 16.1 Public Property Data

Published property data may be cached to improve response times.

Caching must not allow unpublished or archived records to remain publicly accessible after a status change.

### 16.2 Cache Invalidation

After an administrative mutation, revalidate the affected public pages.

Examples:

- Publishing a property: update listing pages and the relevant detail page.
- Unpublishing a property: remove it from public listings and invalidate its detail page.
- Updating a price: refresh the detail page and listing cards.
- Changing a featured property: refresh the homepage's featured section.

### 16.3 Sensitive Data

Never cache contact inquiries or administrator-specific responses in a shared public cache.

For administrative operations, use appropriate private or uncached response behavior.

### 16.4 Failure Handling

If property data cannot be retrieved, render the defined error state rather than silently substituting stale or fabricated property information.

Stale public data may be acceptable only if the caching policy explicitly permits it and does not risk exposing unpublished information.

---

## 17. Testing Requirements

### 17.1 Property Reads

Test:

- Published property retrieval.
- Exclusion of drafts and archived records.
- Filtering by transaction type.
- Filtering by property type.
- Price range filtering.
- Location filtering.
- Bedroom filtering.
- Pagination boundaries.
- Missing property slugs.
- Property image ordering.

### 17.2 Contact Endpoint

Test:

- Valid contact submissions.
- Missing required fields.
- Invalid email addresses.
- Missing both email and phone.
- Invalid property IDs.
- Unpublished property references.
- Oversized request bodies.
- Unsupported content types.
- Rate-limit behavior.
- Email-provider failures, if email is enabled.
- Database failures, if inquiry persistence is enabled.
- Partial failure behavior when both persistence and email are enabled.

### 17.3 Administrative Operations

If administration is included, test:

- Unauthenticated requests.
- Authenticated non-administrator requests.
- Authorized administrator requests.
- Duplicate slugs.
- Invalid publication transitions.
- Invalid image uploads.
- Unauthorized image deletion.
- Cache invalidation after publication changes.
- RLS behavior when accessing the database directly.

### 17.4 External Integrations

Test WhatsApp link generation without assuming a message was sent.

If email delivery is enabled, test both successful provider acceptance and failure responses.

Do not use real production recipients or production inquiry data in automated integration tests.

---

## 18. Deployment and Operational Requirements

### 18.1 Deployment

Deploy the Next.js application through the approved hosting platform.

Configure the production environment variables and confirm database access permissions before deployment.

### 18.2 Production Readiness

Before release:

- Verify the canonical site URL.
- Confirm all required environment variables.
- Test RLS policies.
- Test administrative authorization.
- Test contact form validation.
- Confirm rate limiting.
- Verify WhatsApp links.
- Confirm email delivery if enabled.
- Confirm error responses do not expose internal details.
- Verify property cache invalidation.
- Confirm database migrations have been applied.
- Verify backups and recovery procedures.

### 18.3 Monitoring

Monitor:

- Contact submission failures.
- Database query failures.
- Authentication and authorization failures.
- Rate-limit events.
- External email delivery failures.
- Application errors affecting property pages.

Avoid collecting unnecessary personal data in monitoring systems.

### 18.4 API Changes

When an endpoint's request or response contract changes:

- Update this document.
- Update relevant validation schemas.
- Update automated tests.
- Review compatibility with frontend callers.
- Deploy the changes through the standard pipeline.

Because the initial API is primarily internal, coordinated application deployment is acceptable. Any future public API should receive a more explicit compatibility and versioning policy.

---

## 19. MVP Implementation Checklist

### Public Website

- [ ] Retrieve published properties through server-side data-access functions.
- [ ] Retrieve property details by unique slug.
- [ ] Support validated property filters.
- [ ] Apply server-side pagination.
- [ ] Exclude unpublished and archived records.
- [ ] Render property images safely.
- [ ] Generate WhatsApp click-to-chat links.
- [ ] Implement `POST /api/contact`.
- [ ] Validate contact requests server-side.
- [ ] Add rate limiting and request-size limits.
- [ ] Use consistent error responses.
- [ ] Protect personal information.

### Administration

If live property management is included:

- [ ] Require administrator authentication.
- [ ] Verify authorization on every mutation.
- [ ] Validate property creation and updates.
- [ ] Enforce unique slugs.
- [ ] Protect image uploads and deletion.
- [ ] Invalidate affected public caches.
- [ ] Prevent unauthorized access to inquiries.

### Integrations and Operations

- [ ] Configure required environment variables.
- [ ] Keep secrets server-side.
- [ ] Confirm whether email notifications are required.
- [ ] Handle external service failures.
- [ ] Verify database access policies.
- [ ] Test critical API and data-access paths.
- [ ] Configure production monitoring and backups.

---

## 20. Final API Decision

HAVEN Estates Addis should use **Next.js server-side operations as the primary internal API**, with a single explicit public endpoint, `POST /api/contact`, for contact submissions.

Property reads should use the server-side data-access layer unless a concrete requirement justifies dedicated read endpoints. Administrative operations should use protected Server Actions or Route Handlers with server-side authentication, authorization, validation, and database access controls.

WhatsApp should remain a direct click-to-chat integration. Email delivery should be added only if required by the approved contact workflow. Webhooks, AI endpoints, visitor authentication, and a comprehensive public REST API are outside the MVP scope.

All endpoints and internal operations must validate untrusted input, avoid exposing secrets, protect unpublished listings and personal information, apply appropriate abuse controls, and handle external service failures without misleading visitors.
