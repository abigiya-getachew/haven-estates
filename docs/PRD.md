# PRD: HAVEN Estates Addis

**Product Requirements Document**

| Field                      | Details                                             |
| -------------------------- | --------------------------------------------------- |
| Product Name               | HAVEN Estates Addis                                 |
| Product Type               | Premium real estate website                         |
| Document Version           | 1.0                                                 |
| Status                     | Draft for implementation                            |
| Primary Market             | Addis Ababa, Ethiopia                               |
| Primary Users              | Property buyers, renters, and real estate investors |
| Business Owner             | Fictional real estate agency                        |
| Primary Goal               | Generate qualified property inquiries               |
| MVP Platform               | Responsive web application                          |
| Primary Conversion Channel | WhatsApp                                            |
| Currency                   | Ethiopian birr (ETB)                                |

---

## 1. Product Overview

### 1.1 Product Vision

HAVEN Estates Addis is a premium real estate website designed to showcase residential properties in Addis Ababa through an elegant, trustworthy, and user-friendly digital experience.

The website will allow prospective buyers and renters to discover properties, compare options, view detailed property information, and contact the agency through WhatsApp or an inquiry form.

The project serves two purposes:

1. Demonstrate the ability to design and develop a professional real estate website for the ChazonLabs portfolio.
2. Establish a reusable website concept that can be adapted and sold to real estate agencies and property companies in Addis Ababa.

The product should look and behave like a professional real estate business website, not a generic template or an administrative dashboard.

### 1.2 Problem Statement

Real estate businesses need an effective way to present properties online and convert interested visitors into prospective clients.

A business that relies primarily on social media posts and messaging applications may face several challenges:

- Property information is scattered across posts and conversations.
- Prospective clients have difficulty browsing multiple properties in one place.
- Property details and photographs may be presented inconsistently.
- Visitors may struggle to find properties matching their budgets and preferences.
- Contacting an agent about a specific property may require unnecessary steps.
- The business lacks a dedicated digital presence that communicates its professionalism and credibility.

HAVEN Estates Addis addresses these problems through a centralized property website with structured listings, property detail pages, search and filtering, and direct inquiry options.

### 1.3 Value Proposition

**For property seekers:** Discover properties in Addis Ababa, review their details, and contact the agency without unnecessary friction.

**For real estate businesses:** Present property inventory professionally, establish a recognizable online presence, and generate inquiries from prospective buyers and renters.

**For ChazonLabs:** Demonstrate the ability to build conversion-focused websites for a clearly defined business niche.

### 1.4 Product Positioning

HAVEN Estates Addis will position itself as a premium residential property agency.

Its digital experience should communicate:

- Trust and professionalism.
- High-quality property presentation.
- Clear and accessible information.
- Ease of property discovery.
- Direct communication with the agency.

The design should feel contemporary, restrained, and architectural.

The interface should use strong typography, high-quality property photography, generous spacing, and a consistent visual hierarchy.

---

## 2. Goals and Objectives

### 2.1 Primary Goals

1. Present residential properties in a visually compelling format.
2. Help visitors discover properties through browsing, search, and filtering.
3. Provide detailed information about individual properties.
4. Make contacting the agency straightforward.
5. Deliver a polished experience on desktop, tablet, and mobile devices.
6. Demonstrate commercial-quality web development for the ChazonLabs portfolio.

### 2.2 Secondary Goals

- Establish a reusable foundation for future real estate client projects.
- Demonstrate responsive design, data-driven listings, and third-party integrations.
- Create a portfolio project that can be presented to prospective real estate clients.

### 2.3 Non-Goals

The MVP is not intended to:

- Operate as a multi-agency property marketplace.
- Process property purchases or rental payments.
- Replace property management software.
- Provide a full customer relationship management system.
- Support property owners registering and publishing their own listings.
- Provide automated property valuation.
- Guarantee the availability or accuracy of live market inventory.

---

## 3. Target Users

### 3.1 Primary User: Property Buyer

**Description:** An individual looking to purchase an apartment, house, or other residential property in Addis Ababa.

**Needs:**

- Browse properties for sale.
- Understand property prices and locations.
- Review photographs and important property specifications.
- Compare available options.
- Contact the agency to request more information or arrange a viewing.

**Success outcome:** The buyer finds a relevant property and submits an inquiry.

### 3.2 Primary User: Property Renter

**Description:** An individual searching for a residential rental property in Addis Ababa.

**Needs:**

- Find properties available for rent.
- Filter listings according to relevant criteria.
- Review rent, location, and property features.
- Contact the agency about availability.
- Request a viewing.

**Success outcome:** The renter identifies a suitable property and contacts the agency.

### 3.3 Secondary User: Property Investor

**Description:** An individual evaluating residential properties as investment opportunities.

**Needs:**

- Explore properties in different locations.
- Review asking prices and property characteristics.
- Identify properties that match investment preferences.
- Contact the agency for additional information.

**Success outcome:** The investor submits an inquiry about a potentially suitable property.

### 3.4 Business User: Agency Representative

**Description:** A representative responsible for responding to prospective clients and providing property information.

**Needs:**

- Receive inquiries through WhatsApp or the contact form.
- Identify which property an inquiry concerns.
- Respond to prospective clients using existing communication workflows.

**Success outcome:** The representative receives sufficient information to follow up with the prospective client.

### 3.5 Website Administrator

**Description:** The person responsible for maintaining the website and its property information.

**Needs:**

- Add or update property listings.
- Manage prices, descriptions, locations, and photographs.
- Mark properties as unavailable.
- Feature selected properties on the homepage.

**Success outcome:** The website displays accurate and up-to-date property information.

**Assumption A1:** The initial implementation may use a fixed dataset of demonstration properties rather than a complete content management system. A production administration interface requires approval before it is included in the MVP.

---

## 4. Product Scope

### 4.1 MVP Scope

The MVP will include:

- A premium homepage.
- Property listing pages.
- Individual property detail pages.
- Property search and filtering.
- Property categories for sale and rent.
- Property photographs and galleries.
- Property prices and locations.
- Property specifications and descriptions.
- WhatsApp inquiry integration.
- A contact form.
- Responsive navigation and layouts.
- Clear calls to action.
- Loading, empty, and error states.
- Basic search engine optimization.
- Accessible interface components.
- A structured property data model.
- Fictional demonstration properties for the portfolio version.

### 4.2 Out of Scope

The following capabilities are excluded unless explicitly approved:

- User accounts and authentication for property seekers.
- Saved properties and personalized favorites.
- Property owner registration.
- Agent registration and multi-agency management.
- Online payments or deposits.
- Mortgage calculators.
- Automated property recommendations.
- Interactive maps requiring a paid mapping service.
- Real-time property availability synchronization.
- Appointment scheduling with calendar synchronization.
- An advanced analytics dashboard.
- Customer relationship management functionality.
- Multilingual content management.
- Native mobile applications.
- AI-powered property search.
- Automated notifications by SMS or email.
- Real-time chat within the website.
- A production administration dashboard, unless approved.

### 4.3 Scope Principle

Every MVP feature must support at least one of these outcomes:

1. Help visitors discover relevant properties.
2. Help visitors understand a property's value and characteristics.
3. Convert visitor interest into a direct inquiry.
4. Establish credibility for the agency.

Features that do not directly support these outcomes should be deferred.

---

## 5. Information Architecture

The website will contain the following primary routes.

| Page                | Suggested Route             | Purpose                                                |
| ------------------- | --------------------------- | ------------------------------------------------------ |
| Homepage            | `/`                         | Introduce the brand and showcase selected properties   |
| All Properties      | `/properties`               | Browse the available property inventory                |
| Properties for Sale | `/properties?purpose=sale`  | Browse properties listed for sale                      |
| Properties for Rent | `/properties?purpose=rent`  | Browse properties listed for rent                      |
| Property Details    | `/properties/:slug`         | Display detailed information about a specific property |
| About Us            | `/about`                    | Explain the agency's identity and service              |
| Contact             | `/contact`                  | Provide contact information and an inquiry form        |
| Not Found           | Application-level 404 route | Handle unknown or unavailable pages                    |

**Implementation note:** The sale and rent pages may share the same listing component and use query parameters rather than separate page implementations.

### 5.1 Global Navigation

The primary navigation should include:

- Brand logo.
- Home.
- Properties.
- Buy.
- Rent.
- About.
- Contact.
- A prominent inquiry or contact call to action.

On smaller screens, navigation should collapse into a mobile menu.

The menu must support keyboard interaction and clearly communicate its expanded or collapsed state.

### 5.2 Global Footer

The footer should contain:

- Brand name and a short description.
- Primary navigation links.
- Property browsing links.
- Contact information.
- WhatsApp contact link.
- Copyright information.
- A restrained visual treatment consistent with the brand.

Contact information must be configurable and should not contain invented real-world business details presented as verified facts.

---

## 6. User Journeys

### 6.1 Journey A: Discover and Inquire About a Property

1. The visitor opens the homepage.
2. The visitor sees the brand introduction and featured properties.
3. The visitor selects a property.
4. The website opens the property detail page.
5. The visitor reviews the price, location, photographs, and specifications.
6. The visitor selects the WhatsApp inquiry button.
7. WhatsApp opens with a prefilled message referencing the selected property.
8. The visitor sends the message to the agency.

**Expected outcome:** The agency receives a property-specific inquiry.

### 6.2 Journey B: Search for Properties Within a Budget

1. The visitor opens the properties page.
2. The visitor selects a transaction purpose, such as sale or rent.
3. The visitor enters a location or selects a location filter.
4. The visitor specifies a minimum or maximum price.
5. The visitor optionally selects property type or bedroom count.
6. The visitor applies or updates the filters.
7. The website displays matching results.
8. The visitor opens a relevant property.
9. The visitor contacts the agency.

**Expected outcome:** The visitor can narrow the property inventory to relevant options.

### 6.3 Journey C: Contact the Agency Through the Contact Form

1. The visitor opens the Contact page.
2. The visitor reviews the agency's contact information.
3. The visitor enters their name, contact information, and message.
4. The visitor submits the form.
5. The website validates the submitted information.
6. The website processes the inquiry through the configured submission mechanism.
7. The website displays a success or error message.

**Expected outcome:** The visitor receives clear feedback about whether the inquiry was submitted successfully.

**Assumption A2:** A frontend-only form cannot reliably deliver messages to the agency. The production implementation must use an approved form-processing service or backend endpoint. The selected delivery mechanism requires approval.

### 6.4 Journey D: Explore a Property Gallery

1. The visitor opens a property detail page.
2. The visitor sees the main property photograph.
3. The visitor selects another thumbnail or opens the gallery.
4. The website displays the selected photograph.
5. The visitor can move between available photographs.
6. The visitor closes the gallery or returns to the property details.
7. The visitor initiates an inquiry if interested.

**Expected outcome:** The visitor can inspect the property's visual presentation without leaving the detail page.

### 6.5 Journey E: Navigate on a Mobile Device

1. The visitor opens the website on a mobile device.
2. The visitor uses the mobile navigation menu.
3. The visitor browses property cards.
4. The visitor adjusts search filters.
5. The visitor opens a property detail page.
6. The visitor selects the WhatsApp contact action.

**Expected outcome:** The complete property discovery and inquiry journey works without requiring a desktop device.

---

## 7. User Stories and Acceptance Criteria

### 7.1 Homepage

**US-001: Understand the business**

As a visitor, I want to understand what the agency offers so that I can decide whether the website is relevant to my property search.

Acceptance criteria:

- The homepage displays the brand name and a clear headline.
- The introductory section communicates the agency's residential property focus.
- A primary call to action links to property listings.
- A secondary call to action provides a contact option.
- The layout adapts to mobile and desktop screens.

**US-002: Discover featured properties**

As a visitor, I want to see selected properties on the homepage so that I can quickly identify interesting options.

Acceptance criteria:

- Featured property cards display property photographs.
- Each card displays a property title, location, price, and relevant specifications.
- Each card links to the correct property detail page.
- Only properties designated as featured and available for display appear in the featured section.
- An appropriate empty state appears if no properties are featured.

### 7.2 Property Listings

**US-003: Browse properties**

As a visitor, I want to browse the available property inventory so that I can compare options.

Acceptance criteria:

- The properties page displays published properties.
- Each property card displays its main photograph, price, location, and title.
- Selecting a property opens its detail page.
- Unpublished properties do not appear in public results.
- Unavailable properties are handled according to the listing's status and the approved display policy.

**US-004: Filter properties**

As a visitor, I want to filter listings so that I can find properties matching my preferences.

Acceptance criteria:

- Visitors can filter by transaction purpose.
- Visitors can filter by property type.
- Visitors can specify a minimum price.
- Visitors can specify a maximum price.
- Visitors can filter by bedroom count when applicable.
- Visitors can filter by location.
- Multiple active filters work together.
- A visitor can clear the active filters.
- The results count updates when filters change.
- The interface displays a clear empty state when no properties match.
- Active filters are reflected in the URL where practical, allowing filtered results to be shared.

**US-005: Understand listing results**

As a visitor, I want to know how many properties match my search so that I can understand the available options.

Acceptance criteria:

- The results section displays the number of matching properties.
- The count reflects the active filters.
- Loading and empty states are visually distinct from populated results.

### 7.3 Property Details

**US-006: Inspect a property**

As a prospective buyer or renter, I want detailed information about a property so that I can decide whether to inquire.

Acceptance criteria:

- The page displays the property title and description.
- The page displays the asking price or rental price.
- The page displays the location.
- The page displays property type and transaction purpose.
- The page displays relevant specifications, such as bedrooms, bathrooms, and floor area, when available.
- The page displays available property photographs.
- The page provides a clear contact action.
- The page handles unknown or unavailable property slugs gracefully.

**US-007: Inquire about a specific property**

As a visitor, I want to contact the agency about the property I am viewing so that my inquiry includes the relevant context.

Acceptance criteria:

- The property page contains a WhatsApp inquiry action.
- The generated message includes the property title or identifier.
- The generated message contains the property URL when available.
- The WhatsApp number comes from configuration rather than being duplicated throughout the application.
- The inquiry link uses a valid WhatsApp URL format.
- The visitor can review and send the message through WhatsApp.

### 7.4 Contact

**US-008: Submit a contact inquiry**

As a prospective client, I want to send the agency a message so that I can request additional information.

Acceptance criteria:

- The form includes a name field.
- The form includes a contact method, such as email or phone number.
- The form includes a message field.
- Required fields are clearly identified.
- Invalid input produces understandable validation messages.
- A successful submission displays a confirmation message.
- A failed submission displays an error message and preserves the entered information where possible.
- The submit button indicates when a submission is in progress.
- Duplicate submissions are prevented during an active request.
- The form uses an approved message-delivery mechanism.

**US-009: Contact the agency directly**

As a visitor, I want to find the agency's contact information so that I can choose how to communicate.

Acceptance criteria:

- The website displays configured contact information.
- The WhatsApp link works on supported devices and browsers.
- The contact information is consistent across the website.
- Missing configuration does not result in broken or misleading contact links.

### 7.5 Responsive Experience

**US-010: Use the website on mobile**

As a mobile visitor, I want the website to work on a smaller screen so that I can search for properties and make inquiries conveniently.

Acceptance criteria:

- Navigation is usable on mobile devices.
- Property cards adapt to the available width.
- Images maintain appropriate aspect ratios.
- Forms remain usable without horizontal scrolling.
- Buttons have practical touch targets.
- Search controls remain accessible on small screens.
- No essential action requires a hover interaction.

### 7.6 Website Administration

**US-011: Maintain property information**

As a website administrator, I want to update property information so that visitors see accurate listings.

Acceptance criteria for a future administration interface:

- An authorized administrator can create, edit, publish, unpublish, and archive property listings.
- Required fields are validated.
- Property slugs are unique.
- Photographs can be associated with the correct property.
- Changes appear on the public website after successful publication.
- Unpublished listings are not exposed through public listing queries.

**MVP status:** This story is not required if the portfolio implementation uses a fixed local dataset. Its inclusion in a production MVP requires explicit approval.

---

## 8. Functional Requirements

### 8.1 Brand and Visual Design

**FR-001:** The website must use the HAVEN Estates Addis brand identity.

**FR-002:** The visual system must use a restrained premium aesthetic.

**FR-003:** The initial palette should include warm ivory, charcoal, and muted gold.

**FR-004:** Typography, spacing, buttons, form controls, cards, and navigation must follow a consistent design system.

**FR-005:** Property imagery must be visually prominent without overwhelming essential information.

**FR-006:** Calls to action must be distinguishable from secondary interface elements.

**FR-007:** The design must preserve usability and legibility across supported screen sizes.

### 8.2 Homepage

**FR-008:** The homepage must display a primary headline and introductory content.

**FR-009:** The homepage must provide navigation to property listings.

**FR-010:** The homepage must display a curated set of featured properties.

**FR-011:** The homepage must provide direct contact options.

**FR-012:** The homepage must include a concise section explaining the agency's service.

**FR-013:** The homepage must include a footer with navigation and contact information.

**FR-014:** Featured properties must come from the same property dataset used by the listing pages.

### 8.3 Property Inventory

**FR-015:** Each property must have a unique identifier.

**FR-016:** Each property must have a human-readable title and URL slug.

**FR-017:** Each property must have a transaction purpose: sale or rent.

**FR-018:** Each property must have a property type.

**FR-019:** Each property must have a price and currency.

**FR-020:** Each property must have a location.

**FR-021:** Each property must support a descriptive text field.

**FR-022:** Each property must support a primary photograph and an optional gallery.

**FR-023:** Each property must support relevant physical specifications when available.

**FR-024:** Each property must have a publication status.

**FR-025:** Each property must support a featured flag.

**FR-026:** Each property must support an availability status.

**FR-027:** Public pages must not present unpublished properties as publicly available listings.

**FR-028:** The application must distinguish missing information from valid numeric values, especially for prices and property specifications.

### 8.4 Property Search and Filtering

**FR-029:** Visitors must be able to browse all published properties.

**FR-030:** Visitors must be able to filter properties by transaction purpose.

**FR-031:** Visitors must be able to filter properties by location.

**FR-032:** Visitors must be able to filter properties by price range.

**FR-033:** Visitors must be able to filter properties by type.

**FR-034:** Visitors must be able to filter properties by bedroom count when applicable.

**FR-035:** Filters must combine using logical AND semantics.

**FR-036:** Clearing filters must restore the unfiltered result set.

**FR-037:** Search results must update without requiring a full page reload when technically appropriate.

**FR-038:** Invalid filter values must be ignored or safely normalized.

**FR-039:** The application must display an empty state when no matching properties exist.

**FR-040:** The application must preserve filter state in URL query parameters where practical.

### 8.5 Property Details

**FR-041:** Each published property must have a detail page.

**FR-042:** The detail page must display available property information in a structured layout.

**FR-043:** The detail page must display a photograph gallery when multiple photographs exist.

**FR-044:** The gallery must allow visitors to view individual photographs.

**FR-045:** The detail page must include a WhatsApp inquiry action.

**FR-046:** The detail page must include a route back to property listings.

**FR-047:** Invalid property routes must display a not-found state.

**FR-048:** Archived or unavailable properties must not be misleadingly presented as available.

### 8.6 WhatsApp Integration

**FR-049:** WhatsApp contact links must use a configurable agency phone number.

**FR-050:** Property-specific inquiry messages must include identifying property information.

**FR-051:** WhatsApp links must use URL-encoded message content.

**FR-052:** The website must not assume that WhatsApp is installed on the visitor's device.

**FR-053:** The website must not claim that a WhatsApp message has been sent merely because the visitor opens WhatsApp.

**FR-054:** The agency number must be configurable for future client deployments.

### 8.7 Contact Form

**FR-055:** The contact form must validate required fields before submission.

**FR-056:** The contact form must provide useful field-level validation messages.

**FR-057:** The form must indicate when a submission is in progress.

**FR-058:** The form must display a success state after the delivery mechanism confirms successful processing.

**FR-059:** The form must display an error state when processing fails.

**FR-060:** The form must prevent accidental duplicate submissions while a request is in progress.

**FR-061:** The form must not expose private service credentials in client-side code.

**FR-062:** The form must use a production-capable delivery mechanism before the website is deployed for real business use.

### 8.8 Content and Configuration

**FR-063:** The agency name, contact information, WhatsApp number, and social links must be maintained in a centralized configuration.

**FR-064:** The property inventory must have one authoritative data source.

**FR-065:** The portfolio dataset must be clearly identified as demonstration content.

**FR-066:** Fictional listings must not be represented as verified market inventory.

**FR-067:** The website must use appropriately licensed images.

### 8.9 SEO and Sharing

**FR-068:** Public pages must have descriptive page titles.

**FR-069:** Public pages must have appropriate meta descriptions.

**FR-070:** Property detail pages must have property-specific titles and descriptions.

**FR-071:** Property URLs must be human-readable.

**FR-072:** Public pages must use semantic HTML.

**FR-073:** The application should support social sharing metadata for the homepage and property detail pages.

**FR-074:** The production implementation should provide a sitemap and appropriate indexing rules.

---

## 9. Page and Screen Requirements

### 9.1 Homepage

**Purpose:** Establish credibility and guide visitors toward property discovery.

Required sections:

1. Header and navigation.
2. Hero section with a strong headline.
3. Primary property discovery call to action.
4. Featured properties.
5. Short agency introduction.
6. Property browsing or transaction-purpose links.
7. Contact call to action.
8. Footer.

**Hero content direction:**

Headline: _Find a Place That Feels Like Home._

Supporting text: _Explore thoughtfully selected residential properties across Addis Ababa, from contemporary apartments to exceptional family homes._

Primary CTA: _Explore Properties_

Secondary CTA: _Contact Our Team_

These are proposed marketing copy examples and may be revised before launch.

**Acceptance criteria:**

- The primary value proposition is visible without requiring extensive scrolling.
- The main call to action is immediately identifiable.
- Featured properties link to their respective detail pages.
- The page maintains visual hierarchy on mobile screens.

### 9.2 Property Listings Page

**Purpose:** Enable property discovery and comparison.

Required elements:

- Page title and introductory text.
- Search or filter controls.
- Transaction-purpose filter.
- Location filter.
- Property-type filter.
- Minimum and maximum price filters.
- Bedroom filter where applicable.
- Results count.
- Property grid.
- Empty state.
- Loading state where asynchronous data loading occurs.
- Pagination or incremental loading if required by inventory size.

**MVP implementation decision:** The initial demonstration dataset is expected to be small enough for client-side filtering. Pagination is optional unless the inventory grows enough to require it.

### 9.3 Property Card

Each property card must display:

- Primary photograph.
- Property title.
- Location.
- Price.
- Transaction purpose.
- Relevant property specifications.
- Optional featured label.
- Link to the property detail page.

Cards should have consistent dimensions and image treatment.

Hover effects may enhance desktop interactions but must not be necessary to reveal essential information.

### 9.4 Property Detail Page

**Purpose:** Help visitors evaluate a property and initiate an inquiry.

Required elements:

- Property title.
- Price.
- Location.
- Transaction purpose.
- Property type.
- Main photograph.
- Photograph gallery when applicable.
- Description.
- Available specifications.
- Availability status.
- WhatsApp inquiry button.
- Contact alternative.
- Link to browse additional properties.

Optional related-property recommendations are deferred unless they can be implemented without introducing unnecessary complexity.

### 9.5 About Page

**Purpose:** Communicate the brand's identity and service.

Required elements:

- Brand introduction.
- Description of the agency's focus.
- Explanation of its approach to property discovery.
- Contact call to action.

Because HAVEN Estates Addis is fictional, the page must not invent real employees, credentials, client testimonials, awards, or operating history.

### 9.6 Contact Page

**Purpose:** Provide a direct route for prospective clients to communicate with the agency.

Required elements:

- Page title.
- Short invitation to contact the agency.
- Configured contact information.
- WhatsApp link.
- Contact form.
- Field-level validation.
- Submission progress state.
- Success and error feedback.
- Privacy notice appropriate to the form's data collection.

### 9.7 Not Found Page

**Purpose:** Handle invalid routes and unavailable content.

Required elements:

- Clear message explaining that the requested page cannot be found.
- Link to the homepage.
- Link to property listings.
- Consistent branding.

### 9.8 Global Responsive Navigation

The navigation must support:

- Desktop navigation.
- Mobile menu.
- Clear active or current-page indication where appropriate.
- Keyboard navigation.
- Escape-key dismissal where applicable.
- Appropriate focus management when opening and closing the mobile menu.

---

## 10. Non-Functional Requirements

### 10.1 Performance

**NFR-001:** The website should load quickly on typical mobile connections.

**NFR-002:** Property images must use responsive sizing and modern image formats where supported.

**NFR-003:** Images below the initial viewport should be lazy-loaded where appropriate.

**NFR-004:** The initial page should avoid unnecessary JavaScript and large third-party dependencies.

**NFR-005:** Layout shifts caused by images or dynamic content should be minimized.

**NFR-006:** The production website should target the following Core Web Vitals at the 75th percentile of real user visits:

- Largest Contentful Paint (LCP): no more than 2.5 seconds.
- Interaction to Next Paint (INP): no more than 200 milliseconds.
- Cumulative Layout Shift (CLS): no more than 0.1.

These are production targets, not guaranteed results. Actual performance depends on hosting, image assets, third-party services, and user network conditions.

### 10.2 Responsiveness

**NFR-007:** The website must support mobile, tablet, and desktop layouts.

**NFR-008:** The interface must remain usable at a viewport width of 320 CSS pixels.

**NFR-009:** Content must not require horizontal scrolling at supported viewport widths, except for components where horizontal scrolling is an intentional and accessible design choice.

**NFR-010:** Forms, filters, galleries, and navigation must remain functional on touch devices.

### 10.3 Accessibility

**NFR-011:** The website should target WCAG 2.2 Level AA.

**NFR-012:** Text and interactive controls must have sufficient contrast.

**NFR-013:** Images must have appropriate alternative text when they convey information.

**NFR-014:** Decorative images must not create unnecessary screen-reader noise.

**NFR-015:** Forms must have programmatically associated labels.

**NFR-016:** Validation messages must be accessible to assistive technologies.

**NFR-017:** Interactive elements must support keyboard navigation.

**NFR-018:** Focus indicators must be visible.

**NFR-019:** Color must not be the sole means of communicating status or validation.

**NFR-020:** Motion effects must respect reduced-motion preferences when appropriate.

### 10.4 Reliability

**NFR-021:** Invalid property data must not cause the entire application to crash.

**NFR-022:** Failed contact-form submissions must produce understandable feedback.

**NFR-023:** External links must be generated from validated configuration.

**NFR-024:** Missing optional property fields must not break the layout.

**NFR-025:** The application must handle unknown property identifiers gracefully.

### 10.5 Security and Privacy

**NFR-026:** All production traffic must use HTTPS.

**NFR-027:** User-provided text must be handled safely and must not be interpreted as executable markup.

**NFR-028:** Contact-form processing must validate and sanitize submitted data on the server or at the approved processing service.

**NFR-029:** Secrets and private API credentials must not be exposed in frontend code.

**NFR-030:** The form should include reasonable abuse prevention, such as rate limiting or an appropriate anti-spam mechanism, depending on the selected backend.

**NFR-031:** The website must collect only the personal information needed to process inquiries.

**NFR-032:** Personal information must not be published in property listings or public URLs.

**NFR-033:** Production deployments must document how inquiry data is handled and who can access it.

### 10.6 Maintainability

**NFR-034:** Reusable interface components should be used for navigation, property cards, form fields, buttons, and status messages.

**NFR-035:** Property data must be separated from presentation logic.

**NFR-036:** Business contact information must be configurable without editing multiple components.

**NFR-037:** Naming conventions and project structure must remain consistent.

**NFR-038:** Type definitions or equivalent validation should be used where supported by the selected technology stack.

**NFR-039:** The project must include clear setup and deployment instructions.

### 10.7 Browser Compatibility

**NFR-040:** The website must work in current stable versions of major browsers, including Chrome, Safari, Firefox, and Edge.

**NFR-041:** Essential functionality must not depend on browser-specific hover behavior.

**NFR-042:** External WhatsApp links must degrade gracefully when the application is unavailable.

---

## 11. Roles and Permissions

### 11.1 Public Visitor

Permissions:

- View published properties.
- Browse featured properties.
- Search and filter the inventory.
- View property details.
- Open property photographs.
- Open WhatsApp inquiry links.
- Submit contact forms.
- Navigate public pages.

Restrictions:

- Cannot create or edit property listings.
- Cannot publish or unpublish properties.
- Cannot access private administrative data.
- Cannot access inquiry records unless explicitly authorized through another system.

### 11.2 Website Administrator

Proposed permissions for a future production administration system:

- Create property listings.
- Edit property details.
- Upload and manage property images.
- Publish and unpublish listings.
- Change availability status.
- Feature or unfeature properties.
- Archive listings.

Administrative access must require authentication if these capabilities are implemented.

### 11.3 System Operator

A production deployment may require a technical operator responsible for:

- Application configuration.
- Hosting and deployment.
- Monitoring application health.
- Managing environment variables and secrets.
- Configuring integrations.

System operator permissions should be separated from routine content management where practical.

### 11.4 MVP Authorization Model

For the portfolio MVP:

- Public visitors have read-only access to published demonstration content.
- Property data may be maintained directly in the project's data files.
- No administrator login is required.
- No public user account system is required.
- No private administrative routes are required.

The fixed-data approach is acceptable only for a demonstration website or a production website whose inventory is maintained through a controlled development workflow.

---

## 12. Data Requirements

### 12.1 Property Entity

Each property should support the following fields.

| Field          | Type      | Required    | Description                                                   |
| -------------- | --------- | ----------- | ------------------------------------------------------------- |
| `id`           | String    | Yes         | Unique property identifier                                    |
| `slug`         | String    | Yes         | Unique URL-friendly identifier                                |
| `title`        | String    | Yes         | Property title                                                |
| `description`  | String    | Yes         | Property description                                          |
| `purpose`      | Enum      | Yes         | `sale` or `rent`                                              |
| `propertyType` | Enum      | Yes         | Apartment, house, villa, or another approved residential type |
| `price`        | Number    | Yes         | Asking price or rental price                                  |
| `currency`     | String    | Yes         | Currency code, initially `ETB`                                |
| `pricePeriod`  | Enum      | Conditional | Rental period for rental properties                           |
| `location`     | Object    | Yes         | Structured location information                               |
| `bedrooms`     | Integer   | Optional    | Number of bedrooms                                            |
| `bathrooms`    | Number    | Optional    | Number of bathrooms                                           |
| `area`         | Number    | Optional    | Property floor area                                           |
| `areaUnit`     | Enum      | Optional    | Square meters or another explicitly supported unit            |
| `images`       | Array     | Yes         | Property image references                                     |
| `featured`     | Boolean   | Yes         | Whether the property is featured                              |
| `status`       | Enum      | Yes         | Publication status                                            |
| `availability` | Enum      | Yes         | Current property availability                                 |
| `createdAt`    | Date/time | Optional    | Record creation time                                          |
| `updatedAt`    | Date/time | Optional    | Most recent modification time                                 |

### 12.2 Location Object

The location object should support:

| Field       | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| `city`      | String | Yes      | City                     |
| `area`      | String | Optional | Neighborhood or district |
| `address`   | String | Optional | More specific address    |
| `latitude`  | Number | Optional | Geographic latitude      |
| `longitude` | Number | Optional | Geographic longitude     |

For the demonstration version, city and area are sufficient.

Exact street addresses and geographic coordinates should be included only when appropriate and supported by reliable property information.

Interactive maps are not required for the MVP.

### 12.3 Property Purpose

Supported values:

- `sale`
- `rent`

A property must have one primary transaction purpose.

If the business later needs a single property to support multiple transaction purposes, the data model may be revised.

### 12.4 Property Type

The initial approved types should include:

- Apartment.
- House.
- Villa.

Additional residential categories may be added when supported by the demonstration inventory or the requirements of a real client.

### 12.5 Price and Rental Period

Prices must be stored as numeric values rather than preformatted strings.

The interface should format prices for readability and identify the currency.

Rental listings must communicate the applicable rental period.

**Assumption A3:** ETB is the default display currency. Rental prices will initially be expressed monthly. This assumption requires confirmation before the final demonstration dataset is prepared.

The website must not imply that a price is a total purchase price if it represents a monthly rental amount.

### 12.6 Publication Status

Suggested values:

- `draft`
- `published`
- `archived`

Only published properties may appear in public property listings.

Draft properties must remain inaccessible through normal public listing queries.

Archived properties should not be shown as active inventory.

### 12.7 Availability Status

Suggested values:

- `available`
- `reserved`
- `sold`
- `rented`
- `unavailable`

Availability and publication status are separate concepts.

For example, a property may remain published while marked as reserved, provided the interface communicates its status accurately.

The final policy for showing reserved, sold, or rented properties requires approval.

### 12.8 Property Image Entity

Each property image should support:

| Field       | Type    | Required | Description                                  |
| ----------- | ------- | -------- | -------------------------------------------- |
| `id`        | String  | Yes      | Unique image identifier                      |
| `url`       | String  | Yes      | Image location                               |
| `alt`       | String  | Yes      | Alternative text                             |
| `isPrimary` | Boolean | Yes      | Whether the image is the main property image |
| `sortOrder` | Integer | Optional | Display order                                |

Image references must use stable, accessible URLs or an approved asset-storage mechanism.

The application must handle missing images without breaking the property card or detail page.

### 12.9 Contact Inquiry Entity

If contact form submissions are persisted through a backend, each inquiry should support:

| Field        | Type      | Required    | Description                 |
| ------------ | --------- | ----------- | --------------------------- |
| `id`         | String    | Yes         | Unique inquiry identifier   |
| `name`       | String    | Yes         | Visitor's name              |
| `email`      | String    | Conditional | Visitor's email address     |
| `phone`      | String    | Conditional | Visitor's phone number      |
| `message`    | String    | Yes         | Inquiry message             |
| `propertyId` | String    | Optional    | Related property identifier |
| `createdAt`  | Date/time | Yes         | Submission timestamp        |
| `status`     | Enum      | Optional    | Processing status           |

At least one contact method must be provided.

The MVP does not require a dedicated inquiry database if the approved form service delivers inquiries directly to the agency.

Inquiry retention, access, and deletion policies must be established before production use.

### 12.10 Demonstration Data

The initial dataset should contain approximately 8 to 12 fictional residential listings distributed across relevant areas of Addis Ababa.

This is a proposed content target, not a requirement for a particular database size.

The dataset should include:

- Properties for sale.
- Properties for rent.
- A mix of residential property types.
- Different price ranges.
- Different bedroom counts.
- Multiple neighborhoods.
- Several featured properties.
- Multiple images for selected properties.

All fictional listings must be labeled appropriately wherever there is a reasonable risk that visitors could mistake them for real market inventory.

Property photographs must be properly licensed, and any illustrative prices must be identified as demonstration data.

---

## 13. Integrations

### 13.1 WhatsApp

**Purpose:** Provide a direct communication channel for prospective clients.

**Integration type:** External click-to-chat URL.

**Required behavior:**

- Generate a WhatsApp link using the configured agency phone number.
- Prefill a message when the inquiry originates from a property detail page.
- Include the relevant property title or identifier.
- Encode the message correctly.
- Open the link using an appropriate browser navigation mechanism.
- Avoid claiming that the inquiry was delivered merely because WhatsApp opened.

**Configuration requirements:**

- Agency phone number in international format.
- Default inquiry message.
- Property-specific message template.

**External dependency:** WhatsApp availability and behavior on the visitor's device.

**MVP status:** Required.

### 13.2 Contact Form Processing

**Purpose:** Deliver contact inquiries to the agency.

**Required behavior:**

- Validate form input.
- Process the inquiry through an approved delivery mechanism.
- Return an explicit success or failure result.
- Prevent accidental duplicate submissions.
- Protect private credentials.
- Apply reasonable abuse prevention.

**Possible implementation approaches:**

- A lightweight server-side endpoint.
- A managed form-processing service.
- An existing agency backend, if one is available.

**Decision requiring approval:** Select the delivery mechanism before implementing production form submission.

The portfolio interface may demonstrate validation and submission states, but it must not claim successful delivery unless the submission has actually been processed.

### 13.3 Image Hosting

**Purpose:** Serve property photographs efficiently and reliably.

Possible approaches:

- Locally managed static assets.
- A managed image-hosting service.
- An existing client asset-storage system.

**MVP recommendation:** Use optimized, properly licensed static assets unless the project requires dynamic image uploads.

**Decision requiring approval:** Confirm the asset-hosting approach before implementing an administration interface.

### 13.4 Analytics

Analytics are not required for the initial implementation.

If approved later, analytics should measure:

- Property listing views.
- Property detail views.
- Search and filter usage.
- WhatsApp inquiry clicks.
- Contact form submissions.

Analytics must not record unnecessary personal information.

**MVP status:** Out of scope.

### 13.5 Mapping

Interactive mapping is not required.

Property locations should initially be presented as text.

A map provider may be introduced later if the client needs geographic discovery and approves the associated integration, cost, and data requirements.

**MVP status:** Out of scope.

---

## 14. Application States and Error Handling

### 14.1 Loading States

Loading states are required wherever content is loaded asynchronously.

Examples:

- Property listing retrieval.
- Property detail retrieval.
- Contact form submission.
- Image gallery loading where asynchronous behavior warrants it.

Requirements:

- Use a loading indicator or skeleton that reflects the expected content.
- Avoid blank screens during ordinary loading operations.
- Disable repeated form submissions while a submission is processing.
- Avoid displaying misleading success messages before processing completes.
- Ensure loading indicators are accessible.

For a static-data implementation, artificial loading delays are not required.

### 14.2 Empty States

**No Properties Available**

Display when the inventory contains no published properties.

The state should:

- Explain that no properties are currently available.
- Offer a route to contact the agency.
- Avoid presenting an empty grid as though content failed to load.

**No Search Results**

Display when filters return no matching properties.

The state should:

- Explain that no properties match the current filters.
- Provide a clear action to reset filters.
- Preserve the user's ability to change individual filters.

**No Featured Properties**

Display when no properties are marked as featured.

The state should use a deliberate fallback, such as a link to browse all properties.

**No Gallery Images**

If no images are available, show an appropriate placeholder or fallback image.

The page must not render broken image elements.

### 14.3 Error States

**Property Not Found**

When a property slug does not exist or is not publicly accessible:

- Display a not-found message.
- Provide links to the homepage and property listings.
- Do not expose internal data or debugging details.

**Property Data Error**

If the property dataset cannot be read:

- Display an appropriate error state.
- Avoid crashing the entire application.
- Provide a route back to the homepage or another useful page.

**Contact Form Validation Error**

When the input is invalid:

- Display field-specific messages.
- Preserve valid entered values.
- Prevent submission until required validation conditions are met.

**Contact Form Submission Error**

When the submission service fails:

- Explain that the message could not be submitted.
- Preserve the visitor's message where possible.
- Offer an alternative contact method if one is configured.
- Do not claim that the inquiry was delivered.

**External WhatsApp Failure**

The website cannot guarantee that WhatsApp will open or deliver the message.

The interface should provide alternative contact information where available.

**Image Loading Error**

When a photograph cannot be loaded:

- Display a fallback image.
- Preserve the card's layout.
- Keep property information accessible.

### 14.4 Network and Service Errors

For production implementations using remote services:

- Handle request timeouts.
- Handle server errors.
- Avoid indefinite loading states.
- Display actionable user-facing messages.
- Avoid exposing credentials, internal endpoints, or stack traces.
- Log relevant technical failures through an approved mechanism without unnecessarily collecting personal information.

---

## 15. Search and Filtering Rules

### 15.1 Filter Behavior

Filters must combine using AND semantics.

For example, a visitor selecting:

- Purpose: Rent.
- Location: Bole.
- Maximum price: 40,000 ETB.
- Bedrooms: 2.

Should see properties that satisfy all four conditions.

### 15.2 Price Filtering

- The minimum price must not exceed the maximum price.
- Empty minimum and maximum fields should be treated as unspecified bounds.
- Invalid numeric input must not break the search.
- Prices must be compared numerically rather than as formatted strings.
- The displayed currency must remain consistent with the property's stored currency.

### 15.3 Location Filtering

Location filtering should initially use structured city and neighborhood data.

The implementation should define whether neighborhood matching is exact or case-insensitive.

For the MVP, case-insensitive matching is recommended.

Free-text location search may be added if it can be implemented without introducing unnecessary complexity.

### 15.4 Bedroom Filtering

Bedroom filtering should apply only when the property has a valid bedroom count.

Properties with missing bedroom data should not falsely match an explicit bedroom-count filter.

### 15.5 Filter Persistence

Where practical, filter values should be represented in URL query parameters.

Example:

`/properties?purpose=rent&location=Bole&maxPrice=40000&bedrooms=2`

The URL must use a consistent, documented parameter convention.

Invalid or unsupported query parameters should be ignored safely.

---

## 16. Content and Editorial Requirements

### 16.1 Brand Voice

The website's copy should be:

- Professional.
- Clear.
- Trustworthy.
- Concise.
- Service-oriented.

Avoid exaggerated promises, unsupported investment claims, and misleading property descriptions.

### 16.2 Property Descriptions

Descriptions should focus on relevant characteristics such as:

- Property type.
- Neighborhood.
- Layout.
- Number of bedrooms and bathrooms.
- Floor area when known.
- Amenities.
- Intended transaction type.
- Relevant location context.

Unverified claims about construction quality, ownership, legal status, rental returns, or investment performance must not be presented as facts.

### 16.3 Photography

Photography should support the premium positioning.

Requirements:

- Use appropriately licensed photographs.
- Maintain consistent visual quality.
- Prefer high-resolution images with appropriate compression.
- Avoid stretched or distorted images.
- Provide meaningful alternative text.
- Avoid images that materially misrepresent a listed property.

For the portfolio version, demonstration images must not imply that fictional properties are verified listings.

### 16.4 Contact Information

The agency's contact details must be centralized.

If the project uses fictional contact information:

- Clearly distinguish demonstration information from real contact details.
- Do not use an unrelated person's phone number or email address.
- Do not imply that a fictional office exists at a real address.

---

## 17. Suggested Technical Architecture

This section defines implementation principles rather than requiring a specific framework.

### 17.1 Architecture Goals

The architecture should prioritize:

- Fast delivery.
- Maintainability.
- Responsive performance.
- Clear separation between data and presentation.
- Reliable inquiry handling.
- A straightforward path to future client customization.

### 17.2 Frontend

The frontend must support:

- Reusable page layouts.
- Reusable property cards.
- Shared navigation and footer components.
- Search and filtering.
- Property detail routes.
- Responsive image handling.
- Accessible forms.
- Clear loading, empty, and error states.

### 17.3 Property Data

For the portfolio MVP, a static structured dataset is acceptable.

The data source should support:

- Consistent property records.
- Unique identifiers and slugs.
- Shared filtering logic.
- Featured-property selection.
- Property detail lookup.

Property data must not be duplicated separately across homepage cards and detail pages.

### 17.4 Backend

A backend is not required for static property browsing.

A backend or managed service is required if production contact form submissions must be delivered through a server-side process.

If administrative editing, authentication, or persistent inquiry storage is approved, the architecture must be updated to include the necessary services and security controls.

### 17.5 Content Management

The MVP does not require a full content management system.

For the demonstration version, the property dataset can be maintained through a controlled code or content update process.

For a real agency client, the need for self-service listing management should be evaluated before finalizing the architecture.

### 17.6 Environment Configuration

Environment-specific settings must be managed separately from application presentation.

These may include:

- Agency contact information.
- WhatsApp number.
- Contact form endpoint.
- Public asset configuration.
- Analytics configuration, if approved.

Private credentials must never be committed to public source control or exposed through frontend bundles.

### 17.7 Deployment

The implementation must support deployment to an appropriate hosting platform.

Deployment requirements:

- Production build succeeds.
- Public routes work correctly.
- HTTPS is enabled.
- Environment configuration is valid.
- Contact integrations are configured where required.
- Error pages behave appropriately.
- Public metadata is correct.
- The website can be tested using its deployed URL.

The final hosting provider should be selected according to the chosen stack, expected traffic, budget, and client requirements.

---

## 18. Testing Requirements

### 18.1 Functional Testing

Verify that:

- All primary navigation links work.
- Featured property cards link to the correct property.
- Property detail pages display the correct data.
- Search filters return matching properties.
- Multiple filters combine correctly.
- Clearing filters restores the expected results.
- Invalid property routes display a not-found state.
- WhatsApp links contain correctly encoded messages.
- Contact form validation works.
- Contact form submission feedback reflects the actual processing result.
- Missing optional fields do not break the interface.
- Unpublished properties do not appear in public results.

### 18.2 Responsive Testing

Test at representative viewport widths:

- 320 px.
- 375 px.
- 768 px.
- 1024 px.
- 1440 px.

Verify:

- Navigation behavior.
- Property grid layout.
- Filter usability.
- Image sizing.
- Form layout.
- Button visibility.
- Text wrapping.
- Absence of unintended horizontal scrolling.

### 18.3 Accessibility Testing

Verify:

- Keyboard navigation.
- Visible focus indicators.
- Form labels.
- Validation messages.
- Image alternative text.
- Heading hierarchy.
- Color contrast.
- Gallery keyboard behavior.
- Mobile menu accessibility.
- Reduced-motion behavior where applicable.

Automated accessibility checks should be supplemented with manual keyboard testing.

### 18.4 Integration Testing

Verify:

- WhatsApp URL construction.
- Correct property references in inquiry messages.
- Contact form delivery to the configured destination.
- Correct handling of integration failures.
- Absence of private credentials in frontend code.

### 18.5 Content Testing

Verify:

- Fictional property information is labeled appropriately.
- Property prices use the correct currency and period.
- Image licensing requirements are met.
- Property descriptions do not contain unsupported factual claims.
- Contact information is correct for the deployment environment.
- No placeholder text remains unintentionally.

### 18.6 Production Readiness

Before a production deployment:

- Run a production build.
- Resolve critical errors.
- Test all public routes.
- Test the deployed contact form.
- Confirm HTTPS.
- Verify environment variables.
- Review page metadata.
- Confirm mobile usability.
- Review privacy and data handling.
- Validate performance using appropriate tools.

---

## 19. Success Metrics

The project has two categories of success: portfolio delivery and business conversion.

### 19.1 Portfolio Success

The MVP is successful when:

- All required public pages are implemented.
- Property listings and detail pages use a consistent data source.
- Search and filtering work correctly.
- WhatsApp links generate property-specific inquiries.
- The contact form accurately reports submission outcomes.
- The interface works across the specified viewport widths.
- The website meets the agreed accessibility target to a reasonable, tested extent.
- The website builds and deploys successfully.
- The demonstration data and imagery are appropriately licensed and labeled.
- The project can be presented to prospective real estate clients.

### 19.2 Business Success

After launch to a real agency, success can be evaluated through:

- Property detail page visits.
- WhatsApp inquiry clicks.
- Contact form submissions.
- Inquiry conversion rate.
- Number of qualified property inquiries.
- Mobile inquiry conversion rate.

### 19.3 Metric Definitions

**Inquiry click-through rate**

Number of WhatsApp inquiry clicks divided by the number of property detail page views, multiplied by 100.

**Contact form conversion rate**

Number of successfully processed contact form submissions divided by the number of contact form page views, multiplied by 100.

**Property discovery engagement**

Number of property detail views divided by the number of property listing page visits.

These metrics require analytics or another reliable measurement mechanism. They are not automatically available merely because the website has been deployed.

### 19.4 Initial Targets

The following are proposed targets, not evidence-based forecasts.

| Metric                                      | Proposed Target                             | Measurement Period               |
| ------------------------------------------- | ------------------------------------------- | -------------------------------- |
| Required pages implemented                  | 100%                                        | Before delivery                  |
| Critical functional acceptance tests passed | 100%                                        | Before delivery                  |
| Broken primary navigation links             | 0                                           | Before delivery                  |
| Critical mobile layout defects              | 0                                           | Before delivery                  |
| WhatsApp inquiry links functioning          | 100% of tested links                        | Before delivery                  |
| Contact form delivery tests passed          | 100% of required test cases                 | Before production launch         |
| Core Web Vitals                             | Meet targets in Section 10 where measurable | After sufficient real-user data  |
| Property inquiry conversion rate            | Establish a baseline, then improve          | First 30 to 90 days after launch |

Business conversion targets should be revised after sufficient traffic and inquiry data become available.

---

## 20. MVP Acceptance Criteria

The MVP is considered ready for portfolio presentation when all of the following are true.

### Homepage

- A professional hero section communicates the product's purpose.
- Featured properties are displayed.
- Navigation works.
- Contact actions are visible.
- The page is responsive.

### Property Listings

- Published demonstration properties are displayed.
- Property cards contain the required information.
- Search and filtering work correctly.
- Empty states are implemented.
- Property cards link to the correct detail pages.

### Property Details

- Each published property has a valid detail route.
- Property information is displayed correctly.
- Images are presented appropriately.
- WhatsApp inquiry links reference the correct property.
- Invalid routes are handled gracefully.

### Contact

- Contact information is displayed consistently.
- The contact form validates input.
- Submission progress is communicated.
- Success and error states are implemented.
- Production delivery is verified before the website is presented as ready to accept real inquiries.

### Responsive Design

- The website is usable at all specified viewport widths.
- Mobile navigation works.
- Forms and filters remain accessible.
- No critical content is clipped or inaccessible.

### Technical Quality

- The production build succeeds.
- There are no known critical functional defects.
- Public routes behave correctly after deployment.
- Images are appropriately optimized and licensed.
- Configuration values are centralized.
- Setup and deployment instructions are available.

---

## 21. Risks and Mitigations

| Risk                                                | Impact                                      | Mitigation                                                          |
| --------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Fictional properties are mistaken for real listings | Loss of credibility and potential confusion | Clearly label demonstration inventory                               |
| Unlicensed property photography is used             | Legal and reputational risk                 | Use properly licensed or authorized images                          |
| WhatsApp number is incorrect                        | Lost inquiries                              | Centralize configuration and test the contact link                  |
| Contact form does not deliver messages              | Lost leads                                  | Verify the actual delivery mechanism before production              |
| Property information is inconsistent                | Reduced trust                               | Maintain one authoritative dataset                                  |
| Mobile filters are difficult to use                 | Reduced conversion                          | Test filters on representative mobile devices                       |
| Large image files slow the website                  | Poor performance                            | Optimize images and use responsive image delivery                   |
| Inventory becomes difficult to maintain             | Higher operational cost                     | Evaluate a CMS or administration interface when justified           |
| Property availability changes                       | Misleading listings                         | Establish a content update process and display availability clearly |
| Analytics are unavailable                           | Inability to measure conversion             | Add an approved measurement mechanism when needed                   |
| External integrations fail                          | Interrupted inquiry journey                 | Provide clear errors and alternative contact information            |

---

## 22. Assumptions and Decisions Requiring Approval

The following items must be confirmed before implementation decisions become binding.

### 22.1 Current Assumptions

**A1. Property administration**

The initial portfolio version will use a fixed dataset rather than an administrative dashboard.

**A2. Contact form delivery**

The form will require a backend endpoint or approved managed service for actual inquiry delivery.

**A3. Currency and rental pricing**

ETB is the default currency, and rental prices are initially assumed to be monthly.

**A4. Inventory size**

The initial demonstration dataset will contain approximately 8 to 12 fictional properties.

**A5. Market focus**

The website will focus on residential properties in Addis Ababa.

**A6. Language**

The initial website will be written in English.

**A7. User accounts**

Property seekers will not need to create accounts.

**A8. Property browsing**

The initial dataset is small enough for client-side filtering.

**A9. Maps**

Property locations will initially be presented as text rather than interactive maps.

**A10. Agency identity**

HAVEN Estates Addis is a fictional demonstration brand created for the ChazonLabs portfolio.

### 22.2 Decisions Requiring Approval

| Decision                      | Recommended Default                                                                                                              | Why It Matters                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Frontend framework            | Use the existing project stack if one exists; otherwise choose a framework suited to the developer's skills and deployment needs | Determines routing, component structure, and deployment          |
| Property data source          | Static structured dataset for the portfolio MVP                                                                                  | Minimizes complexity and delivery time                           |
| Administration interface      | Exclude from MVP                                                                                                                 | Avoids unnecessary backend and authentication work               |
| Contact form delivery         | Lightweight backend endpoint or approved managed form service                                                                    | Determines whether inquiries can actually reach the agency       |
| Image hosting                 | Optimized static assets for the portfolio MVP                                                                                    | Keeps implementation simple                                      |
| Currency                      | ETB                                                                                                                              | Affects pricing presentation and filtering                       |
| Rental price period           | Monthly                                                                                                                          | Prevents ambiguous rental pricing                                |
| Property availability display | Show clear status labels and do not imply unavailable properties are available                                                   | Protects accuracy and trust                                      |
| Analytics                     | Exclude from initial MVP                                                                                                         | Avoids unnecessary integration work                              |
| Mapping                       | Exclude from initial MVP                                                                                                         | Reduces external dependencies                                    |
| Languages                     | English only                                                                                                                     | Keeps the initial content and interface scope focused            |
| Property inventory            | 8 to 12 fictional listings                                                                                                       | Provides enough variety for a convincing portfolio demonstration |
| Deployment platform           | Select based on the chosen stack and budget                                                                                      | Affects hosting, configuration, and release process              |

### 22.3 Approval Policy

The coding agent should not expand the MVP scope based on speculative future requirements.

Where a decision remains unresolved:

1. Follow the recommended default when it is safe and reversible.
2. Record the assumption in the implementation documentation.
3. Avoid introducing paid services or irreversible architectural decisions without approval.
4. Ask for clarification when the decision affects privacy, security, real inquiry delivery, deployment cost, or a core user journey.

---

## 23. Implementation Priorities

The coding agent should implement the product in the following order.

### Priority 1: Foundation

- Establish the project structure.
- Configure the visual design system.
- Define the property data model.
- Create the shared layout and navigation.
- Prepare the demonstration dataset.

### Priority 2: Core Property Experience

- Build the homepage.
- Build reusable property cards.
- Build the property listing page.
- Implement search and filtering.
- Build property detail pages.
- Implement the image gallery.

### Priority 3: Inquiry Conversion

- Implement WhatsApp inquiry links.
- Build the contact page.
- Implement form validation.
- Integrate the approved form delivery mechanism when configured.
- Add success and error states.

### Priority 4: Polish

- Implement responsive behavior.
- Refine typography and spacing.
- Optimize images.
- Add accessibility improvements.
- Add page metadata.
- Implement loading, empty, and error states.

### Priority 5: Verification and Deployment

- Test primary user journeys.
- Test filters and property routing.
- Verify WhatsApp links.
- Verify contact form delivery.
- Test mobile layouts.
- Run the production build.
- Deploy and verify the public website.

---

## 24. Definition of Done

A feature is complete only when:

1. It satisfies its documented functional requirements.
2. Its primary user journey works as intended.
3. It handles relevant loading, empty, and error states.
4. It works across the required viewport sizes.
5. It follows the established design system.
6. It meets applicable accessibility requirements.
7. It does not introduce critical regressions.
8. It has been tested in the deployed environment when deployment affects its behavior.
9. It does not expose private credentials or sensitive information.
10. Its implementation does not introduce unapproved scope.

The overall MVP is complete when the acceptance criteria in Section 20 are satisfied and all required integrations have been tested to the extent applicable to the portfolio or production deployment.

---

## 25. Final Product Principle

HAVEN Estates Addis should demonstrate one capability exceptionally well: **turning a property website visitor into a qualified inquiry.**

The design, data model, page structure, and integrations must support that objective.

The MVP should prioritize excellent property presentation, useful search and filtering, trustworthy information, fast mobile browsing, and direct contact options.

Additional functionality should be introduced only when it addresses a demonstrated business need and justifies its implementation and maintenance cost.
