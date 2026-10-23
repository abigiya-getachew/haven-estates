# DATABASE.md

# HAVEN Estates Addis — Database Design

## 1. Purpose

This document defines the database schema, relationships, constraints, indexing strategy, access policies, and operational requirements for HAVEN Estates Addis.

The database supports the product requirements and architecture defined in `PRD.md` and `ARCHITECTURE.md`.

The primary goals are to:

- Store and retrieve real estate listings reliably.
- Support property search and filtering.
- Serve published property details through stable URLs.
- Support property images and galleries.
- Enable WhatsApp-based inquiries without requiring inquiry records in the database.
- Support contact form submissions according to the approved contact workflow.
- Restrict property management to authorized administrators.
- Prevent public access to unpublished properties and private contact information.
- Maintain data integrity while keeping the initial schema simple.

The database should use a small number of well-defined tables, with additional structures introduced only when justified by an approved requirement.

---

## 2. Database Technology

### 2.1 Recommended Technology

Use **PostgreSQL managed through Neon**.

PostgreSQL provides:

- Relational integrity through primary and foreign keys.
- Constraints for validating property data.
- Efficient filtering and sorting.
- Transactions for related database changes.
- Indexes for common search queries.
- Row Level Security (RLS) for access control.
- A straightforward migration and backup strategy.

Neon provides managed PostgreSQL, database administration, authentication integration, and optional image storage.

### 2.2 Database Configuration

Recommended defaults:

| Setting                     | Decision                                            |
| --------------------------- | --------------------------------------------------- |
| Database engine             | PostgreSQL                                          |
| Hosting                     | Neon                                            |
| Primary key strategy        | UUID                                                |
| Timestamp storage           | `TIMESTAMPTZ` in UTC                                |
| Text encoding               | UTF-8                                               |
| Monetary values             | `NUMERIC`, never floating-point                     |
| Referential integrity       | Foreign keys                                        |
| Schema management           | Version-controlled migrations                       |
| Public database access      | Restricted through RLS and server-side access rules |
| Image storage               | Neon Storage or another approved image service  |
| Application database access | Dedicated server-side data-access layer             |

Use the PostgreSQL version supported by the selected Neon project. Avoid relying on features unavailable in that version.

### 2.3 Schema Namespace

Use the `public` schema for application tables unless a specific operational requirement justifies a separate schema.

Enable RLS on tables exposed through Neon's API.

Database tables must not become publicly readable merely because they exist in the `public` schema.

---

## 3. Data Model Overview

The initial data model contains two core entities:

1. `properties`
2. `property_images`

A third entity, `contact_inquiries`, is optional and should be included if the approved contact workflow requires persistent inquiry storage.

Administrator identities are managed by Neon Auth. A separate application user table is unnecessary for a single administrator role unless the implementation requires an explicit application-managed role record.

### 3.1 Core Tables

| Table               | Purpose                                                     | MVP status                                                    |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| `properties`        | Stores property listings and publication status.            | Required for database-backed listings.                        |
| `property_images`   | Stores references and display metadata for property images. | Required if image galleries or multiple images are supported. |
| `contact_inquiries` | Stores submitted contact inquiries.                         | Conditional on approved persistence requirements.             |

### 3.2 Data Ownership

- The database owns authoritative property details.
- The database owns listing publication status.
- The image storage service owns the actual image files.
- The `property_images` table owns the relationship between images and properties.
- Neon Auth owns authentication identities.
- The contact form does not automatically require a database record.
- WhatsApp conversations are managed by WhatsApp and are not stored by the website unless a separate integration is introduced.

Do not duplicate property records in frontend constants, analytics systems, or unrelated tables.

---

## 4. Entity Relationship Diagram

```text
                  AUTHENTICATION PROVIDER
                       Neon Auth
                           |
                           |
                  Administrator identity
                           |
                 Server-side authorization
                           |
                           v
+------------------------------------------------+
|                   properties                   |
+------------------------------------------------+
| id                 UUID PK                     |
| slug               TEXT UNIQUE                 |
| title              TEXT                        |
| description        TEXT                        |
| transaction_type   TEXT                        |
| property_type      TEXT                        |
| location           TEXT                        |
| price_amount       NUMERIC                     |
| price_currency     TEXT                        |
| bedrooms           INTEGER                     |
| bathrooms          INTEGER                     |
| area_value         NUMERIC                     |
| area_unit          TEXT                        |
| featured_image_url TEXT                        |
| status             TEXT                        |
| is_featured        BOOLEAN                     |
| created_at         TIMESTAMPTZ                 |
| updated_at         TIMESTAMPTZ                 |
| published_at       TIMESTAMPTZ                 |
+------------------------------------------------+
           |                       |
           | 1                     | 1
           |                       |
           | 0..N                  | 0..N
           v                       v
+--------------------------+  +-------------------------+
|      property_images     |  |    contact_inquiries    |
+--------------------------+  +-------------------------+
| id            UUID PK    |  | id           UUID PK    |
| property_id   UUID FK    |  | property_id  UUID FK    |
| image_url     TEXT       |  | name         TEXT       |
| alt_text      TEXT       |  | email        TEXT       |
| sort_order    INTEGER    |  | phone        TEXT       |
| created_at    TIMESTAMPTZ|  | message      TEXT       |
+--------------------------+  | status       TEXT       |
                              | created_at   TIMESTAMPTZ|
                              +-------------------------+

Note: contact_inquiries is optional.
```

The relationship between properties and images is one-to-many.

The relationship between properties and contact inquiries is also one-to-many if inquiry persistence is enabled. A general contact inquiry may have no associated property.

The administrator identity is managed by Neon Auth. Property ownership is not modeled as a user relationship in the MVP because a single agency-wide administrator role is sufficient.

---

## 5. Table: `properties`

### 5.1 Purpose

Stores all real estate listings, including drafts, published properties, and archived properties.

This table is the authoritative source for:

- Homepage property sections.
- Property search results.
- Property detail pages.
- Property filters.
- Property publication status.
- Administrative property management.

### 5.2 Columns

| Column               | PostgreSQL type | Nullable | Default                  | Description                                           |
| -------------------- | --------------- | -------- | ------------------------ | ----------------------------------------------------- |
| `id`                 | `UUID`          | No       | `gen_random_uuid()`      | Unique property identifier.                           |
| `slug`               | `TEXT`          | No       | None                     | Unique URL identifier.                                |
| `title`              | `TEXT`          | No       | None                     | Property title.                                       |
| `description`        | `TEXT`          | No       | None                     | Property description.                                 |
| `transaction_type`   | `TEXT`          | No       | None                     | Sale or rent.                                         |
| `property_type`      | `TEXT`          | No       | None                     | Supported property category.                          |
| `location`           | `TEXT`          | No       | None                     | Display location.                                     |
| `price_amount`       | `NUMERIC(14,2)` | No       | None                     | Listing price.                                        |
| `price_currency`     | `TEXT`          | No       | Approved default, if any | Currency code.                                        |
| `bedrooms`           | `INTEGER`       | Yes      | `NULL`                   | Number of bedrooms where applicable.                  |
| `bathrooms`          | `INTEGER`       | Yes      | `NULL`                   | Number of bathrooms where applicable.                 |
| `area_value`         | `NUMERIC(12,2)` | Yes      | `NULL`                   | Property area.                                        |
| `area_unit`          | `TEXT`          | Yes      | `NULL`                   | Area measurement unit.                                |
| `featured_image_url` | `TEXT`          | Yes      | `NULL`                   | Main property image URL or storage path.              |
| `status`             | `TEXT`          | No       | `'draft'`                | Publication lifecycle status.                         |
| `is_featured`        | `BOOLEAN`       | No       | `FALSE`                  | Whether the property may appear in featured sections. |
| `created_at`         | `TIMESTAMPTZ`   | No       | `now()`                  | Creation timestamp.                                   |
| `updated_at`         | `TIMESTAMPTZ`   | No       | `now()`                  | Last modification timestamp.                          |
| `published_at`       | `TIMESTAMPTZ`   | Yes      | `NULL`                   | Timestamp of publication.                             |

### 5.3 Primary Key

`id` is the primary key.

Use UUIDs so property identifiers are unique without depending on sequential identifiers exposed through public URLs.

### 5.4 Slugs

`slug` is a unique, human-readable identifier used in property detail URLs.

Example:

`/properties/modern-villa-bole`

Requirements:

- Slugs must be unique.
- Slugs must be normalized before saving.
- Slugs should use lowercase letters, numbers, and hyphens.
- Slugs must not be empty.
- Slug changes should be deliberate because they affect existing links and search engine indexing.

If slugs can change after publication, a future redirect mechanism may be required. A slug-history table is not needed for the initial release unless preserving old URLs becomes an explicit requirement.

### 5.5 Transaction Type

Supported values:

- `sale`
- `rent`

The application and database must use the same canonical values.

If additional transaction types are required later, update validation rules and database constraints through a migration.

### 5.6 Property Type

Property types should be controlled rather than accepting arbitrary values.

The final set must be approved before implementation.

Possible examples include:

- `apartment`
- `house`
- `villa`
- `commercial`
- `land`

These are proposed values, not a finalized business taxonomy.

Use a database constraint to reject unsupported values. A separate property-type lookup table is unnecessary unless categories need independent metadata or administrative management.

### 5.7 Location

For the MVP, store the visitor-facing location as text.

Example:

`Bole, Addis Ababa`

A separate location hierarchy is not required if the site uses simple location filtering.

If location filtering becomes unreliable because of inconsistent spelling or duplicate labels, introduce a controlled location taxonomy in a later migration.

Do not store private property-owner addresses in this field.

### 5.8 Price

Store prices using `NUMERIC(14,2)` rather than floating-point types.

This avoids floating-point precision errors in monetary values.

`price_currency` must use an approved currency code, such as `ETB` or `USD`, if those currencies are confirmed for the product.

**Decision requiring approval:** Confirm the currency or currencies supported by the initial release. Do not assume that all listings use the same currency without a product decision.

If all properties use one currency, a database default may be appropriate after the currency is confirmed.

### 5.9 Bedrooms and Bathrooms

Both fields are nullable because they may not apply to all property types.

Constraints:

- Values must not be negative.
- Missing information must be stored as `NULL`.
- Zero must be reserved for a genuinely applicable value of zero.

For example, land listings may not have a meaningful bedroom count.

### 5.10 Area

`area_value` stores the numeric measurement.

`area_unit` identifies the unit.

Possible units include:

- `sqm`
- `sqft`

The supported set must be confirmed before implementation.

Constraints:

- Area must be positive when supplied.
- Area unit must be present when area value is present.
- Area unit must be absent when area value is absent, unless the product explicitly allows an unknown area value with a known unit.

### 5.11 Featured Image

`featured_image_url` identifies the primary image displayed on property cards and detail pages.

If a gallery is supported, the primary image may also be represented by the first ordered record in `property_images`.

Do not maintain two independently editable sources of truth for the primary image.

**Recommended rule:** If `property_images` is implemented, use its lowest `sort_order` value as the canonical gallery image. Retain `featured_image_url` only if the application requires a separate primary-image field for simpler or faster reads. Otherwise, remove it to avoid duplication.

The implementation must choose one approach before schema creation.

### 5.12 Publication Status

Supported values:

- `draft`
- `published`
- `archived`

Behavior:

- `draft`: Visible to authorized administrators only.
- `published`: Available through public listing queries and property pages.
- `archived`: Not publicly accessible, but retained for administrative reference.

Sold or rented properties may remain published or be archived according to the approved product policy. Do not introduce additional lifecycle states unless the PRD requires them.

### 5.13 Publication Timestamp

`published_at` records when a property was published.

Recommended behavior:

- Set when the property transitions from draft to published.
- Retain the original publication time during ordinary edits.
- Clear or reset it only if the publication policy explicitly requires that behavior.
- Keep it `NULL` for never-published drafts.

A database trigger or controlled server-side mutation may maintain this field, but the chosen approach must be consistent.

### 5.14 Timestamps

`created_at` and `updated_at` must use `TIMESTAMPTZ`.

Store timestamps in UTC and convert them to the desired local time for display.

`updated_at` must change whenever a property is modified. This can be maintained through a database trigger or an application-managed update mechanism. A database trigger is preferable when multiple write paths exist.

---

## 6. Table: `property_images`

### 6.1 Purpose

Stores image metadata and the relationship between property listings and their images.

The actual image files belong in the configured image-storage service.

### 6.2 Columns

| Column        | PostgreSQL type | Nullable | Default             | Description                                |
| ------------- | --------------- | -------- | ------------------- | ------------------------------------------ |
| `id`          | `UUID`          | No       | `gen_random_uuid()` | Unique image record.                       |
| `property_id` | `UUID`          | No       | None                | Associated property.                       |
| `image_url`   | `TEXT`          | No       | None                | Public image URL or storage path.          |
| `alt_text`    | `TEXT`          | No       | None                | Accessible image description.              |
| `sort_order`  | `INTEGER`       | No       | `0`                 | Display order within the property gallery. |
| `created_at`  | `TIMESTAMPTZ`   | No       | `now()`             | Creation timestamp.                        |

### 6.3 Primary and Foreign Keys

- Primary key: `id`
- Foreign key: `property_id` references `properties(id)`

Use a foreign-key deletion policy consistent with property lifecycle management.

If a property is permanently deleted, its related image metadata should not remain orphaned.

A suitable policy is `ON DELETE CASCADE` for image metadata, provided permanent deletion is restricted to authorized administrative operations.

Archiving a property must not delete its images.

### 6.4 Image Validation

Enforce:

- Nonempty image location.
- Nonnegative `sort_order`.
- A reasonable maximum length for `alt_text`.
- Administrator-only insert, update, and delete operations.

The application should validate file type and size before uploading the actual image.

The database cannot, by itself, guarantee that an external URL points to a valid image.

### 6.5 Image Storage References

If Neon Storage is used, prefer storing a stable storage path or canonical object reference rather than a temporary signed URL.

Signed URLs expire and should not be stored as permanent public image references.

If another image service is selected, follow its stable asset-reference model.

### 6.6 Ordering

Use `sort_order` to determine gallery display order.

For deterministic results, sort by:

1. `sort_order`
2. `id`

This avoids inconsistent ordering when multiple images have the same sort value.

A unique constraint on `(property_id, sort_order)` is optional. It should be added only if the application guarantees that each image has a distinct position and updates are handled without temporary conflicts.

---

## 7. Optional Table: `contact_inquiries`

### 7.1 Purpose

Stores contact form submissions when the approved workflow requires inquiry history, administrative review, or persistent records.

This table is **not required solely to support WhatsApp inquiries**.

Before implementing it, decide whether contact submissions must be:

- Emailed to the agency only.
- Stored in the database only.
- Both emailed and stored.

If the agency only needs an email notification and no inquiry history, omit this table from the MVP.

### 7.2 Columns

| Column        | PostgreSQL type | Nullable | Default             | Description                         |
| ------------- | --------------- | -------- | ------------------- | ----------------------------------- |
| `id`          | `UUID`          | No       | `gen_random_uuid()` | Unique inquiry identifier.          |
| `property_id` | `UUID`          | Yes      | `NULL`              | Associated property, if applicable. |
| `name`        | `TEXT`          | No       | None                | Visitor's name.                     |
| `email`       | `TEXT`          | Yes      | `NULL`              | Visitor's email address.            |
| `phone`       | `TEXT`          | Yes      | `NULL`              | Visitor's phone number.             |
| `message`     | `TEXT`          | No       | None                | Inquiry message.                    |
| `status`      | `TEXT`          | No       | `'new'`             | Administrative processing status.   |
| `created_at`  | `TIMESTAMPTZ`   | No       | `now()`             | Submission timestamp.               |

### 7.3 Primary and Foreign Keys

- Primary key: `id`
- Foreign key: `property_id` references `properties(id)`

A general contact inquiry may have `property_id = NULL`.

If the associated property is archived, the inquiry should remain intact.

If a property is permanently deleted, the foreign key should be set to `NULL` rather than deleting the inquiry record.

Recommended foreign-key behavior:

`ON DELETE SET NULL`

### 7.4 Contact Method Constraint

At least one contact method must be provided.

Valid cases:

- Email is provided.
- Phone is provided.
- Both are provided.

Invalid case:

- Both email and phone are `NULL` or empty after trimming.

Validate this condition on the server and enforce an appropriate database constraint.

### 7.5 Inquiry Status

If inquiry management is required, use a controlled status set.

Recommended values:

- `new`
- `in_progress`
- `resolved`
- `spam`

If the product does not include an administrative inquiry-management interface, the status field may be unnecessary. Omit it if no workflow will use it.

### 7.6 Personal Data Handling

Inquiry records contain personal information.

Requirements:

- Public visitors must not be able to read inquiry records.
- Only explicitly authorized administrators may access them.
- Inquiry content must not appear in public page responses.
- Personal data must not be sent to analytics systems.
- Retention must be defined before production use.
- Deletion must be supported when required by the retention policy.

Do not collect identity documents, payment information, or other sensitive data through the general contact form.

---

## 8. Constraints and Validation

Database constraints are a final line of defense, not a replacement for application-level validation.

### 8.1 Required Constraints

#### Properties

- `id` is the primary key.
- `slug` is unique and nonempty.
- `title` is nonempty.
- `description` is nonempty.
- `transaction_type` belongs to the supported set.
- `property_type` belongs to the approved set.
- `location` is nonempty.
- `price_amount >= 0`.
- `price_currency` uses the approved currency format and supported values.
- `bedrooms IS NULL OR bedrooms >= 0`.
- `bathrooms IS NULL OR bathrooms >= 0`.
- `area_value IS NULL OR area_value > 0`.
- `status` belongs to the supported lifecycle set.
- `is_featured` is non-null.
- `published_at` is nullable for unpublished listings.

A published property must have the required content and imagery defined by the product's publication rules.

If the publication process requires a primary image, enforce that requirement in the publication operation or through an appropriate database-level mechanism.

#### Property Images

- `id` is the primary key.
- `property_id` is a valid foreign key.
- `image_url` is nonempty.
- `alt_text` is nonempty and meaningful.
- `sort_order >= 0`.

#### Contact Inquiries

If the table is enabled:

- `id` is the primary key.
- `name` is nonempty.
- `message` is nonempty.
- At least one contact method is provided.
- `status` belongs to the approved set, if status tracking is used.
- `property_id` references a valid property when supplied.

### 8.2 Validation Boundaries

**Frontend validation**

Improves usability by providing immediate feedback.

**Server-side validation**

Validates all external inputs before database operations.

**Database constraints**

Prevent invalid records even if a write bypasses the normal application path.

All three layers should agree on canonical values and required fields.

### 8.3 Text Length Limits

Use application-level maximum lengths appropriate to the user interface.

Recommended initial limits, subject to product confirmation:

| Field                  | Suggested maximum |
| ---------------------- | ----------------: |
| Property title         |    160 characters |
| Slug                   |    180 characters |
| Property description   | 12,000 characters |
| Location               |    180 characters |
| Image alternative text |    300 characters |
| Inquiry name           |    160 characters |
| Inquiry message        |  5,000 characters |

The database may enforce these limits using `CHECK` constraints or bounded types where appropriate.

Avoid excessively restrictive limits that would interfere with legitimate property descriptions.

---

## 9. Indexing Strategy

Indexes must support actual product queries rather than hypothetical future features.

### 9.1 Required Indexes

| Table               | Index                                                     | Reason                                                      |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `properties`        | Unique index on `slug`                                    | Fast lookup of a property by URL slug.                      |
| `properties`        | Index on `status` where useful                            | Supports publication-state filtering.                       |
| `properties`        | Index on `property_images.property_id`                    | Efficient image retrieval and relationship operations.      |
| `contact_inquiries` | Index on `created_at DESC`, if inquiry storage is enabled | Supports newest-first inquiry management.                   |
| `contact_inquiries` | Index on `property_id`, if inquiry storage is enabled     | Supports retrieval of inquiries associated with a property. |

A primary key and unique constraint already create their own indexes. Do not create duplicate indexes for the same columns.

### 9.2 Property Listing Queries

Expected queries include:

1. Retrieve published properties.
2. Retrieve featured published properties.
3. Filter published properties by transaction type.
4. Filter by property type.
5. Filter by location.
6. Filter by minimum and maximum price.
7. Filter by bedroom count.
8. Retrieve a single published property by slug.
9. Paginate search results.

### 9.3 Composite Indexes

A composite index may help the common published-listing query:

- `status`
- `transaction_type`
- `property_type`
- `price_amount`

However, do not create a single large composite index containing every filter field without examining real query plans.

The usefulness of an index depends on:

- Filter selectivity.
- Query frequency.
- Sort order.
- Catalogue size.
- The combination of filters commonly applied.

Start with the unique slug index and essential foreign-key indexes. Add or refine composite indexes after examining `EXPLAIN ANALYZE` results and actual query patterns.

### 9.4 Featured Listings

If featured properties are frequently queried, consider a partial index limited to published, featured listings.

This avoids indexing every non-featured or unpublished record for that query.

Add it only if it improves measured query performance.

### 9.5 Location Search

If location filters use exact matches or normalized labels, a standard B-tree index may be sufficient.

If the product requires substring matching or full-text search across descriptions and locations, evaluate PostgreSQL text-search or trigram indexes later.

Do not introduce a separate search service for the initial catalogue.

---

## 10. Ownership and Authorization

### 10.1 Public Property Access

Public visitors may retrieve only published properties.

Public reads must exclude:

- Draft properties.
- Archived properties.
- Private administrative data.
- Inquiry records.
- Internal operational fields not needed by the frontend.

Use a server-side data-access layer that explicitly requests published records.

### 10.2 Administrator Access

Only authorized administrators may:

- Create properties.
- Update property information.
- Publish properties.
- Unpublish properties.
- Archive properties.
- Delete properties.
- Upload, reorder, or remove property images.
- Read or manage inquiries, if that capability exists.

Authentication and authorization must be checked for each protected operation.

### 10.3 Application-Level Authorization

The server must verify that the current user is authorized before executing any privileged mutation.

Do not trust a role value supplied by the browser.

Use a trusted authorization source, such as a server-verified role or a controlled administrator allowlist.

### 10.4 Database-Level Authorization

Enable RLS on application tables accessible through Neon's API.

Recommended policy behavior:

| Table               | Anonymous read                                                          | Anonymous write                                                        | Authorized administrator                              |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| `properties`        | Published properties only                                               | Denied                                                                 | Full permitted management                             |
| `property_images`   | Images associated with published properties, if direct access is needed | Denied                                                                 | Full permitted management                             |
| `contact_inquiries` | Denied                                                                  | Denied unless a specifically designed submission policy is implemented | Read and manage if inquiry administration is required |

For contact submissions, a server-side endpoint is the preferred initial boundary.

Do not expose unrestricted direct database insertion to anonymous clients simply to simplify form submission.

If the application uses a privileged server-side database key that bypasses RLS, the server must enforce all relevant permissions before performing the operation.

### 10.5 Administrator Identity Storage

Do not create a separate `users` table merely to duplicate Neon Auth identities.

For the initial single-role model, use Neon Auth plus a trusted administrator allowlist or an explicit role mapping if needed.

If a database-backed administrator profile becomes necessary, reference the authentication provider's user identifier and enforce strict write permissions.

---

## 11. Row Level Security Policies

### 11.1 General Requirements

RLS must be enabled for every application table accessible through Neon's Data API.

RLS policies should follow the principle of least privilege.

A policy must never assume that every authenticated user is an administrator.

### 11.2 Properties

Recommended access rules:

- Anonymous users may select rows where `status = 'published'`.
- Anonymous users may not insert, update, or delete properties.
- Authenticated users may not write properties unless their administrator permission is verified.
- Administrative writes must validate both the user's identity and authorization.

If property queries are performed exclusively through a privileged server-side client, use server-side authorization and ensure that the public database credentials cannot bypass RLS.

### 11.3 Property Images

Recommended access rules:

- Public users may read image metadata only when associated with a published property.
- Public users may not insert, update, or delete image metadata.
- Only authorized administrators may manage image metadata.
- Storage upload and deletion permissions must be enforced separately from database policies.

Database RLS does not automatically secure the actual image files in object storage.

### 11.4 Contact Inquiries

If inquiry storage is enabled:

- Anonymous users must not select inquiry records.
- Anonymous users must not update or delete inquiry records.
- Administrative users may read and manage records only when explicitly authorized.
- Contact submissions should be written through a validated server-side workflow.

A public insert policy is not required if the server handles all submissions using a privileged database client.

### 11.5 Policy Verification

Test RLS policies using:

- Anonymous access.
- Authenticated non-administrator access.
- Authorized administrator access.
- Direct API requests.
- Attempts to access unpublished property IDs.
- Attempts to retrieve inquiry records.
- Attempts to modify another record's ownership or permissions, if ownership fields are introduced later.

Security tests must verify actual database behavior rather than relying only on the user interface.

---

## 12. Sensitive-Data Handling

### 12.1 Sensitive Data Categories

| Data                                    | Sensitivity                                | Handling                                          |
| --------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| Public property title and description   | Public after publication                   | May be returned to visitors.                      |
| Property prices and general location    | Public after publication                   | May be displayed on published listings.           |
| Draft listing information               | Confidential business data                 | Administrator-only access.                        |
| Contact names                           | Personal information                       | Restrict to authorized staff.                     |
| Contact email addresses                 | Personal information                       | Restrict to authorized staff.                     |
| Contact phone numbers                   | Personal information                       | Restrict to authorized staff.                     |
| Inquiry messages                        | Potentially sensitive personal information | Restrict access and define retention.             |
| Authentication credentials and API keys | Secret                                     | Store only in approved secret-management systems. |

### 12.2 Data Minimization

Do not collect more information than necessary.

For the general contact form, collect only:

- Name.
- At least one contact method.
- Message.
- Optional related property reference.

Avoid collecting unnecessary demographic information, identity documents, payment information, or other sensitive details.

### 12.3 Secret Management

Never store application secrets in:

- Property records.
- Inquiry records.
- Public database columns.
- Frontend source code.
- Public environment variables.
- Logs.

Use environment variables or the hosting platform's secret-management capabilities.

### 12.4 Logging

Do not log full inquiry messages, passwords, authentication tokens, or unnecessary personal data.

Operational logs should contain enough information to diagnose failures without exposing private information.

### 12.5 Retention and Deletion

If contact inquiries are stored, establish a retention policy before production deployment.

The policy should specify:

- Retention duration.
- Who may access inquiry records.
- How expired records are deleted.
- Whether backups retain deleted records until their retention period expires.
- How data deletion requests are handled.

Avoid retaining personal data indefinitely without a business requirement.

---

## 13. Migration Strategy

### 13.1 Version-Controlled Migrations

Use Neon migrations to manage all schema changes.

Each migration should be:

- Version-controlled.
- Reviewed before deployment.
- Tested in a non-production environment.
- Repeatable in the intended deployment workflow.
- Consistent with the application's expected schema.

Migrations should include changes to:

- Tables.
- Columns.
- Constraints.
- Indexes.
- RLS policies.
- Database triggers.
- Functions, if required.

### 13.2 Initial Migration

The initial schema migration should establish:

1. `properties`.
2. `property_images`, if galleries are supported.
3. `contact_inquiries`, only if persistence is approved.
4. Primary and foreign keys.
5. Unique constraints.
6. Validation constraints.
7. Required indexes.
8. RLS enablement.
9. Access policies.
10. Timestamp-maintenance behavior, if implemented through triggers.

Do not include optional tables until their requirements are confirmed.

### 13.3 Schema Changes

Prefer additive, backward-compatible changes where possible.

For example:

1. Add a nullable column.
2. Deploy application code that supports the new column.
3. Backfill existing records if necessary.
4. Add stricter constraints after data is valid.
5. Remove obsolete columns only after all dependent code has been migrated.

Avoid combining unrelated schema changes into a single difficult-to-recover deployment.

### 13.4 Production Migration Rules

- Never make untracked schema changes directly in production.
- Back up production data before high-risk migrations.
- Test destructive migrations on a staging copy.
- Confirm the rollback or recovery plan before deployment.
- Treat data migrations separately from schema changes when this improves safety.

Database rollback is not always a simple reverse operation. A migration that deletes or transforms data may require restoration from backup.

---

## 14. Seed Data Strategy

### 14.1 Purpose

Seed data supports local development, testing, and portfolio demonstrations.

It should not be mixed with real production listings unless explicitly approved.

### 14.2 Seed Content

Demonstration data may include a small collection of properties representing the supported property types and filter combinations.

Seed records should cover:

- Sale and rental listings, if both are supported.
- Multiple property types.
- Different price ranges.
- Different locations.
- Properties with and without bedroom counts.
- Featured and non-featured properties.
- Draft and published properties for access-control testing.

Use only appropriately licensed images.

### 14.3 Publication Safety

Seed data should make demonstration content clearly distinguishable from real inventory.

Never present fictional availability, prices, testimonials, credentials, or property claims as verified real-world facts.

Do not run development seed scripts automatically against production.

### 14.4 Repeatability

Seed scripts should be safe to rerun in development.

Use stable identifiers or deterministic slugs where practical.

Seed scripts must not overwrite real production content or create duplicate property records.

---

## 15. Backup and Recovery

### 15.1 Backup Strategy

Use the managed backup capabilities available under the selected Neon plan.

Before production deployment, verify:

- Whether automated backups are included.
- Backup frequency.
- Retention duration.
- Point-in-time recovery availability.
- Recovery procedure.
- Any additional costs associated with recovery features.

Do not assume a particular backup capability is included without confirming the selected plan.

### 15.2 Recovery Scope

Recovery planning must consider:

- Property records.
- Property image metadata.
- Contact inquiry records, if enabled.
- Database constraints and RLS policies.
- Schema migrations.
- External image files.

Restoring PostgreSQL does not necessarily restore external image objects that were separately deleted from storage.

### 15.3 Image Recovery

If property images are stored in Neon Storage or another external object store, verify the provider's retention, versioning, and recovery capabilities.

Maintain a recovery plan for both image metadata and image objects.

Do not treat a URL in the database as a backup of the actual image.

### 15.4 Recovery Testing

Periodically test restoration in a non-production environment.

Verify that:

- Property records are restored.
- Relationships remain valid.
- Published property pages render correctly.
- Image references resolve.
- RLS policies remain correct.
- Inquiry data is restored where applicable.
- The restored application is compatible with the restored schema.

### 15.5 Recovery Objectives

Define recovery point and recovery time objectives based on the agency's business needs.

For an initial portfolio project, simple managed backups may be sufficient. A production agency with active listings and customer inquiries may require more frequent recovery points and a documented restoration procedure.

---

## 16. Query Patterns and Data Access

### 16.1 Homepage

Retrieve a bounded set of published featured properties.

Required conditions:

- `status = 'published'`
- `is_featured = TRUE`

Apply deterministic ordering and a limit.

Do not retrieve drafts or archived records.

### 16.2 Property Listings

Filter by the supported query parameters:

- Transaction type.
- Property type.
- Location.
- Minimum price.
- Maximum price.
- Bedrooms.

All parameters must be validated on the server.

The database query should apply filters before pagination.

### 16.3 Property Detail

Retrieve one property by its unique slug.

The query must require:

- A matching slug.
- Published status for public requests.

Retrieve related images in a predictable order.

If no published property matches the slug, return the public not-found experience.

### 16.4 Contact Form

If inquiry persistence is enabled:

1. Validate submitted fields on the server.
2. Confirm at least one contact method is present.
3. Validate the related property reference if supplied.
4. Insert the inquiry record.
5. Send the required notification if email is enabled.
6. Return the appropriate outcome to the visitor.

If the workflow requires both storage and email, define how partial failures are handled. A successful database insert does not guarantee successful email delivery.

For a simple MVP, it is acceptable to store the inquiry and report notification failure separately, provided the user experience makes the outcome clear.

### 16.5 Administrative Property Management

Administrative operations must:

1. Verify the administrator session.
2. Verify the user's authorization.
3. Validate all submitted values.
4. Execute the database mutation.
5. Confirm the operation succeeded.
6. Invalidate relevant public caches where necessary.
7. Return a safe success or error result.

The database must remain the authoritative source of the final property state.

---

## 17. Data Integrity and Operational Rules

### 17.1 Avoid Duplicate Sources of Truth

Do not independently maintain the same value in multiple places unless there is a clear reason.

Examples:

- Do not store both an authoritative gallery image and a separately editable featured-image field without a defined synchronization rule.
- Do not store formatted price strings as the authoritative price.
- Do not store computed property counts if they can be queried efficiently.
- Do not duplicate administrator credentials in application tables.

### 17.2 Publication Rules

Publishing a property should require the fields necessary for a complete, trustworthy public listing.

At minimum, confirm:

- Title.
- Description.
- Transaction type.
- Property type.
- Location.
- Price and currency.
- Required primary imagery, if specified by the PRD.

The exact requirements for publishing a listing should be finalized before implementing the administrative workflow.

### 17.3 Referential Integrity

Use foreign keys to prevent invalid relationships.

Image metadata must reference an existing property.

Inquiry records must reference an existing property when a property is specified.

Permanent deletion and archival must have distinct behavior.

### 17.4 Concurrency

For the MVP, ordinary PostgreSQL transaction behavior is sufficient.

If multiple administrators later edit the same property concurrently, introduce an explicit conflict-detection strategy, such as optimistic concurrency using a version field or modification timestamp.

Do not add concurrency-management fields before a real multi-editor requirement exists.

---

## 18. Implementation Decisions Requiring Approval

The following decisions should be resolved before finalizing the production schema.

| Decision              | Recommended default                                       | Reason                                                        |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| Inquiry persistence   | Omit unless inquiry history is required                   | Reduces personal-data storage and administrative overhead.    |
| Property galleries    | Use `property_images` if multiple images are required     | Supports ordered galleries and accessible image descriptions. |
| Primary image storage | Use one canonical source                                  | Prevents conflicting image references.                        |
| Currency              | Confirm supported currency before creating the constraint | Prevents incorrect price assumptions.                         |
| Area units            | Confirm supported units                                   | Ensures consistent display and filtering.                     |
| Property categories   | Approve a fixed initial set                               | Prevents inconsistent classification.                         |
| Location model        | Start with text if filtering is simple                    | Avoids premature location tables.                             |
| Sold/rented listings  | Define whether to archive or retain published status      | Establishes predictable visitor behavior.                     |
| Administrator model   | One role or allowlist for the initial release             | Keeps authorization simple.                                   |
| Image storage         | Confirm Neon Storage or an alternative                    | Determines how stable image references are stored.            |
| Inquiry retention     | Define before enabling inquiry storage                    | Limits unnecessary personal-data retention.                   |

---

## 19. Database Acceptance Criteria

The database design is ready for implementation when:

- [ ] PostgreSQL and the managed database platform are confirmed.
- [ ] Property schema fields match the approved PRD.
- [ ] Property slugs are unique.
- [ ] Prices use an exact numeric type.
- [ ] Supported transaction and property types are constrained.
- [ ] Optional property attributes support `NULL` where appropriate.
- [ ] Published property queries cannot return drafts or archived listings.
- [ ] Property images have valid foreign-key relationships.
- [ ] The primary image has one authoritative source.
- [ ] Contact inquiry storage is included only if required.
- [ ] Personal contact information is not publicly readable.
- [ ] RLS policies are enabled and tested for all exposed application tables.
- [ ] Privileged database access is restricted to trusted server-side operations.
- [ ] Indexes support the actual property query patterns.
- [ ] Migrations are version-controlled.
- [ ] Seed data is repeatable and isolated from production.
- [ ] Backup and recovery capabilities have been verified.
- [ ] Image objects and database records have a coordinated recovery strategy.
- [ ] Sensitive data is handled according to an explicit retention policy.

---

## 20. Final Database Decision

HAVEN Estates Addis should use **PostgreSQL through Neon**, with `properties` as the authoritative listing table and `property_images` as the related image metadata table when galleries are required.

Use UUID primary keys, unique property slugs, exact numeric price storage, foreign-key constraints, database validation, and indexes aligned with property browsing and filtering.

Enable Row Level Security for exposed application tables. Public visitors may access published property information only, while all property-management operations require verified administrator authorization. Contact inquiry storage should remain optional until its retention and delivery requirements are approved.

This model supports the initial real estate browsing experience without introducing unnecessary tables or infrastructure, while preserving a clear path toward administrative property management and future product growth.
