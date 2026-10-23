# DESIGN.md

## HAVEN Estates Addis: Visual Design and UX Specification

**Document status:** Design specification  
**Version:** 1.0  
**Product:** HAVEN Estates Addis  
**Design type:** Premium real estate website  
**Primary market:** Addis Ababa, Ethiopia  
**Primary objective:** Convert property discovery into qualified inquiries  
**Source of truth:** PRD.md

---

## 1. Design Vision

### 1.1 Product Experience

HAVEN Estates Addis should feel like a premium residential property agency with a carefully curated portfolio, strong architectural imagery, and a professional approach to property discovery.

The website must establish trust before asking visitors to make contact. Property photographs, pricing, location information, and property specifications should be presented clearly, allowing visitors to evaluate a property without unnecessary friction.

The visual experience should be sophisticated but restrained. It should not resemble a generic SaaS dashboard, a property marketplace crowded with competing elements, or a luxury brand website that sacrifices usability for visual effects.

The desired experience combines:

- The editorial quality of an architecture magazine.
- The clarity of a professional real estate agency.
- The usability of a well-designed property search platform.
- The directness of a conversion-focused business website.

**Core design principle: Let the properties command attention. Let the interface make every decision easier.**

### 1.2 Brand Personality

The interface should communicate five characteristics.

| Characteristic | Design Expression                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Premium        | Refined typography, generous spacing, carefully selected photography                           |
| Trustworthy    | Clear prices, honest descriptions, consistent information hierarchy                            |
| Contemporary   | Clean layouts, architectural imagery, restrained visual details                                |
| Approachable   | Plain language, visible contact options, familiar interaction patterns                         |
| Local          | Recognizable Addis Ababa locations, appropriate currency formatting, relevant property context |

The design must not confuse premium presentation with unnecessary complexity.

### 1.3 Visual Direction

The visual direction is **Contemporary Ethiopian Urban Living**.

The brand should feel appropriate for residential property buyers, renters, and investors in Addis Ababa.

The visual language combines warm neutral backgrounds, dark typography, muted gold accents, and photography that emphasizes architecture, natural light, interior materials, and the surrounding environment.

Use visual restraint rather than decorative excess.

Preferred characteristics:

- Warm ivory backgrounds instead of pure white across large sections.
- Charcoal typography instead of uniformly black text.
- Muted gold accents used sparingly.
- Large, high-quality property photographs.
- Clear rectangular layouts with consistent alignment.
- Subtle borders instead of excessive shadows.
- Strong editorial headlines paired with readable body text.
- Deliberate whitespace.
- Small, consistent interaction details.

Avoid:

- Excessive gradients.
- Glassmorphism.
- Glowing buttons.
- Decorative blobs and abstract shapes.
- Unnecessary floating cards.
- Excessive rounded corners.
- Oversized icons used as decoration.
- Constant animation.
- Generic dashboard-style layouts.
- Artificial luxury cues that reduce readability.
- Claims of exclusivity or prestige unsupported by the property information.

---

## 2. Design Principles

### 2.1 Property First

Property photography and property information are the primary content.

The interface should never compete with the property it presents.

Apply this principle by:

- Giving property photographs substantial visual space.
- Keeping card information concise.
- Using consistent image proportions.
- Avoiding decorative overlays that obscure photographs.
- Keeping prices and locations easy to scan.
- Making the property detail page the visual centerpiece of the discovery journey.

### 2.2 Clarity Before Decoration

Visitors must understand what a page offers and what they can do next.

Every major section should have a clear purpose.

Calls to action must use descriptive labels. Search filters must be understandable without instructions. Property details must use recognizable labels rather than ambiguous icons.

### 2.3 Trust Through Consistency

Trust should emerge from accurate information and predictable interactions.

Use consistent conventions for:

- Currency and price periods.
- Property types.
- Location names.
- Availability labels.
- Image proportions.
- Buttons.
- Form validation.
- Contact information.
- Page navigation.

Do not display fabricated testimonials, awards, agent credentials, or property claims as real.

### 2.4 Conversion Without Pressure

The website should make inquiries convenient without making visitors feel pressured.

Use one clear primary action in each major context.

Examples:

- Homepage: Explore Properties.
- Property listing: View Property.
- Property detail: Inquire on WhatsApp.
- Contact page: Send Inquiry.

Secondary actions should remain available without visually competing with the primary action.

### 2.5 Mobile Usability Is a Core Requirement

Mobile is not a reduced desktop experience.

The layout, navigation, search controls, image gallery, and inquiry actions must be designed for touch interaction.

Important information must remain visible and understandable without hover effects or precise pointer control.

### 2.6 Reusable Design Over One-Off Styling

Repeated elements must share the same design rules.

Buttons, property cards, form fields, status indicators, spacing, typography, and navigation must be implemented from reusable patterns.

Page-specific compositions may vary when the content requires it, but the underlying visual language must remain consistent.

---

## 3. Color System

### 3.1 Palette Overview

The palette uses warm architectural neutrals, deep charcoal, and a restrained gold accent.

| Token                      | Hex Value | Intended Use                                    |
| -------------------------- | --------- | ----------------------------------------------- |
| `color-background`         | `#F7F5F0` | Primary page background                         |
| `color-surface`            | `#FFFFFF` | Cards, form controls, gallery surfaces          |
| `color-surface-muted`      | `#EFEBE3` | Secondary sections and muted backgrounds        |
| `color-text-primary`       | `#252723` | Headlines and primary text                      |
| `color-text-secondary`     | `#686962` | Supporting text and metadata                    |
| `color-text-inverse`       | `#FFFFFF` | Text on sufficiently dark backgrounds           |
| `color-brand-primary`      | `#252723` | Primary buttons, navigation emphasis            |
| `color-brand-accent`       | `#A88752` | Restrained gold accents                         |
| `color-brand-accent-hover` | `#8F7040` | Hover state for suitable gold-accented elements |
| `color-border`             | `#DEDAD1` | Card borders, separators, input outlines        |
| `color-border-strong`      | `#B9B5AC` | Stronger outlines and structural boundaries     |
| `color-focus`              | `#356C9A` | Keyboard focus indicators                       |
| `color-success`            | `#286746` | Successful form submissions and confirmations   |
| `color-error`              | `#B42318` | Validation errors and failed operations         |
| `color-warning`            | `#855A12` | Cautionary states                               |
| `color-info`               | `#315F83` | Informational feedback                          |

These tokens define the initial palette. Their contrast must be verified in the final implementation, especially for smaller text and interactive controls.

### 3.2 Color Usage Rules

#### Primary Background

Use warm ivory as the default page background.

This creates a softer architectural editorial feel than using pure white across the entire interface.

White surfaces should distinguish property cards, form controls, galleries, and other content containers when separation improves readability.

#### Charcoal

Charcoal is the primary structural color.

Use it for:

- Main headlines.
- Body text.
- Navigation text where appropriate.
- Primary buttons.
- Important interface elements.
- Dark footer backgrounds.

#### Muted Gold

Gold is an accent, not a dominant color.

Appropriate uses include:

- Small brand details.
- Subtle decorative separators.
- Selected metadata accents.
- Restrained highlights.
- Small featured-property indicators.

Do not use muted gold as the default background for large amounts of small text. Its contrast against ivory or white may be insufficient.

Do not use gold for every button, link, icon, and border. The accent loses meaning when applied everywhere.

#### Secondary Text

Secondary text should remain readable.

Use it for:

- Property metadata.
- Supporting descriptions.
- Form hints.
- Secondary labels.
- Less prominent informational content.

Do not use low-contrast gray for essential property information merely to achieve a minimalist appearance.

### 3.3 Color Hierarchy

Each interface element should have a clear visual role.

1. Primary text communicates the main information.
2. Primary buttons indicate the main action.
3. Secondary text provides supporting details.
4. Borders and muted surfaces organize content.
5. Gold accents reinforce the brand selectively.
6. Status colors communicate success, error, warning, or information.

Status must never be communicated through color alone.

### 3.4 Interactive Color States

Interactive components must have distinct visual states.

**Default:** Use the component's normal brand or neutral color.

**Hover:** Adjust the background, border, or text color subtly.

**Focus:** Display a visible focus indicator that meets the accessibility requirements.

**Active:** Communicate the pressed or selected state.

**Disabled:** Reduce visual emphasis while preserving sufficient legibility.

**Error:** Use an error border or message with a textual explanation.

**Success:** Use a confirmation message with a textual explanation.

Hover styles must not be the only way to discover or use an action.

---

## 4. Typography System

### 4.1 Typography Direction

Typography should combine editorial character with practical readability.

Use a refined serif typeface for prominent marketing headlines and a clean sans-serif typeface for navigation, body text, forms, metadata, and property specifications.

Recommended pairing:

- **Headlines:** DM Serif Display.
- **Interface and body:** Inter.

Both fonts must be loaded efficiently and used consistently.

If the preferred fonts are unavailable, use appropriate system fallbacks rather than blocking page rendering.

### 4.2 Font Roles

| Role      | Typeface                  | Usage                                               |
| --------- | ------------------------- | --------------------------------------------------- |
| Display   | DM Serif Display          | Main homepage headline and major editorial headings |
| Heading   | DM Serif Display or Inter | Section headings, depending on hierarchy            |
| Body      | Inter                     | Paragraphs and descriptive content                  |
| Interface | Inter                     | Navigation, buttons, forms, filters                 |
| Metadata  | Inter                     | Prices, locations, specifications, labels           |

Use serif typography selectively. Repeating large serif headlines throughout every section would make the interface feel unnecessarily theatrical.

### 4.3 Type Scale

Use a consistent type scale with responsive adjustments.

| Token          | Desktop Size | Mobile Size | Typical Usage                           |
| -------------- | -----------: | ----------: | --------------------------------------- |
| `text-display` |        64 px |       42 px | Homepage hero headline                  |
| `text-h1`      |        48 px |       36 px | Main page headings                      |
| `text-h2`      |        36 px |       30 px | Major section headings                  |
| `text-h3`      |        26 px |       23 px | Subsections and prominent card headings |
| `text-h4`      |        20 px |       19 px | Smaller headings                        |
| `text-body-lg` |        18 px |       17 px | Hero supporting text and introductions  |
| `text-body`    |        16 px |       16 px | Standard body text                      |
| `text-body-sm` |        14 px |       14 px | Supporting descriptions                 |
| `text-label`   |        13 px |       13 px | Form labels and compact metadata        |
| `text-caption` |        12 px |       12 px | Secondary information when appropriate  |

The type scale defines starting values, not permission to create unnecessarily small text.

Essential property information should generally remain at least 14 px.

### 4.4 Font Weights

Use a restrained weight system.

- Regular: 400.
- Medium: 500.
- Semibold: 600.
- Bold: 700, used sparingly.

Use medium or semibold for navigation and buttons.

Use regular weight for body copy.

Use a strong headline through size, typeface, and spacing rather than making every heading excessively bold.

### 4.5 Line Height

Recommended line-height ranges:

| Content Type                 | Line Height |
| ---------------------------- | ----------- |
| Display headings             | 1.05–1.15   |
| Page headings                | 1.1–1.2     |
| Section headings             | 1.2–1.3     |
| Body paragraphs              | 1.5–1.7     |
| Buttons and compact controls | 1.2–1.4     |
| Form labels                  | 1.3–1.5     |

Long descriptions should use comfortable line lengths.

Aim for approximately 60–75 characters per line in long-form content where practical.

### 4.6 Headline Rules

Homepage headlines may use editorial line breaks on large screens, but the text must remain responsive.

Do not hard-code line breaks that create awkward wrapping on mobile.

Headlines must:

- Communicate a clear message.
- Avoid exaggerated marketing claims.
- Use concise language.
- Remain readable against the background.
- Avoid overlapping photography or interface elements.

### 4.7 Property Pricing Typography

Price is a high-priority property attribute.

Display the price prominently on property cards and detail pages.

Use a clear distinction between:

- Numeric amount.
- Currency.
- Rental period, where applicable.

For example:

**ETB 35,000 / month**

The price period must be explicit for rental properties.

Do not rely on a currency symbol or visual styling alone to communicate the unit.

---

## 5. Spacing and Layout System

### 5.1 Spacing Scale

Use a base spacing system derived from multiples of four.

| Token      | Value | Typical Use                                |
| ---------- | ----: | ------------------------------------------ |
| `space-1`  |  4 px | Small icon gaps and tight internal spacing |
| `space-2`  |  8 px | Compact control spacing                    |
| `space-3`  | 12 px | Related labels and small content groups    |
| `space-4`  | 16 px | Standard component spacing                 |
| `space-5`  | 20 px | Card content and field groups              |
| `space-6`  | 24 px | Component separation                       |
| `space-8`  | 32 px | Content groups                             |
| `space-10` | 40 px | Section subgroups                          |
| `space-12` | 48 px | Section padding on smaller screens         |
| `space-16` | 64 px | Major desktop section spacing              |
| `space-20` | 80 px | Large editorial sections                   |
| `space-24` | 96 px | Hero and major section separation          |

The scale is a reusable reference. Smaller or intermediate values may be used when needed for optical alignment or specific component constraints.

Avoid arbitrary spacing values without a clear reason.

### 5.2 Page Width

The main content should remain centered within a consistent maximum width.

Recommended layout values:

- Maximum content width: 1280 px.
- Standard content width: 1120–1200 px where appropriate.
- Wide editorial sections: up to 1440 px.
- Long-form text: narrower than the main page container.

On wide screens, property imagery may extend beyond the standard content width when the composition benefits from it.

The navigation, primary content, and footer should share consistent alignment.

### 5.3 Horizontal Gutters

Use responsive horizontal page padding.

| Viewport     | Recommended Side Padding |
| ------------ | -----------------------: |
| Small mobile |                    16 px |
| Large mobile |                    20 px |
| Tablet       |                    32 px |
| Desktop      |                    40 px |
| Wide desktop |                    48 px |

The content container must not exceed the available viewport width.

### 5.4 Section Spacing

Use consistent vertical separation between major sections.

Recommended starting points:

- Mobile sections: 48–64 px.
- Tablet sections: 64–80 px.
- Desktop sections: 80–96 px.

Compact sections may use less space when their content is closely related.

The homepage hero may use a larger vertical composition, but the main property discovery action should remain easy to find.

### 5.5 Grid System

Use a responsive 12-column conceptual grid for wide layouts.

The implementation does not need a literal 12-column grid for every component. The purpose is to maintain consistent alignment and proportions.

Suggested property listing layouts:

| Viewport          |                              Columns |
| ----------------- | -----------------------------------: |
| 320–599 px        |                                    1 |
| 600–767 px        |         2 when cards remain readable |
| 768–1023 px       |                                    2 |
| 1024–1279 px      |                                    3 |
| 1280 px and above | 3 or 4, depending on available width |

Use three columns as the default desktop layout for a premium, photography-led property grid.

Four columns are acceptable on wide screens if prices, locations, and specifications remain readable.

### 5.6 Grid Gaps

Recommended spacing:

- Mobile property grid: 16 px.
- Tablet property grid: 20 px.
- Desktop property grid: 24 px.
- Large editorial compositions: 24–32 px.

Card gaps should remain consistent within the same grid.

### 5.7 Vertical Rhythm

Content within a section should follow a predictable rhythm.

For example:

- Section heading to supporting text: 12–16 px.
- Supporting text to primary action: 20–24 px.
- Property image to card title: 16–20 px.
- Property title to location: 6–8 px.
- Property metadata groups: 12–16 px.
- Form label to input: 8 px.
- Form field to next field: 20–24 px.

These values should be adjusted when the typography scale or content density requires it.

---

## 6. Shape, Borders, and Elevation

### 6.1 Border Radius

The interface should favor restrained, consistent corner radii.

| Token         |  Value | Usage                                           |
| ------------- | -----: | ----------------------------------------------- |
| `radius-sm`   |   4 px | Small tags and compact elements                 |
| `radius-md`   |   8 px | Buttons, form controls, cards where appropriate |
| `radius-lg`   |  12 px | Image galleries and larger content surfaces     |
| `radius-pill` | 999 px | Small pill-shaped labels when appropriate       |

Property cards should generally use small or moderate corner radii.

Avoid rounding every element into a pill.

### 6.2 Borders

Use thin, neutral borders to establish structure.

Recommended default:

- 1 px solid neutral border.
- Stronger border for focused or selected controls.
- Error-colored border for invalid fields.

Do not place borders around every section.

Borders should be used where they improve grouping, scanning, or interaction feedback.

### 6.3 Shadows

The visual system should rely primarily on spacing, contrast, and borders.

Use subtle shadows only when elevation improves clarity.

Appropriate uses:

- Mobile navigation overlays.
- Image gallery dialogs.
- Dropdown menus.
- Floating filter panels when applicable.

Property cards should not depend on heavy shadows to appear interactive.

### 6.4 Decorative Elements

Use decoration sparingly.

A thin divider, a small gold accent, or a carefully chosen architectural photograph is sufficient.

Avoid ornamental lines, floating symbols, and repeated decorative elements that compete with property content.

---

## 7. Iconography

### 7.1 Icon Style

Use one consistent icon library or a small set of custom SVG icons.

Icons should be:

- Simple.
- Recognizable.
- Consistent in stroke weight.
- Appropriately sized.
- Used to support text rather than replace it.

### 7.2 Common Icons

Appropriate icons include:

- Location.
- Bedrooms.
- Bathrooms.
- Floor area.
- Search.
- Filter.
- Close.
- Menu.
- Phone.
- WhatsApp.
- Arrow.
- Gallery navigation.

### 7.3 Icon Rules

- Standard inline icons should generally be 16–20 px.
- Prominent interface icons may be 20–24 px.
- Icon-only buttons must have accessible names.
- Decorative icons should be hidden from assistive technologies where appropriate.
- Do not use icons with ambiguous meanings when a text label would be clearer.

The location, price, and bedroom count should remain understandable without interpreting icons.

---

## 8. Reusable Component System

### 8.1 Component Principles

Every reusable component must have:

- A clear purpose.
- Consistent spacing.
- Defined interaction states.
- Appropriate semantic markup.
- Responsive behavior where applicable.
- Accessibility requirements.
- Reusable design tokens.

Avoid implementing visually identical components differently across pages.

### 8.2 Buttons

Three primary button variants are required.

#### Primary Button

**Purpose:** The most important action in a given context.

Appearance:

- Charcoal background.
- White text.
- Moderate corner radius.
- Medium or semibold label.
- Comfortable horizontal padding.
- Clear hover, focus, active, and disabled states.

Use for:

- Explore Properties.
- Apply Filters, when an explicit filter action is required.
- Send Inquiry.
- Other primary page actions.

#### Secondary Button

**Purpose:** A useful action that should not compete with the primary action.

Appearance:

- Transparent or white background.
- Charcoal text.
- Neutral border.
- Same height and typography conventions as the primary button.

Use for:

- Clear Filters.
- Back to Properties.
- Secondary contact actions.

#### Text Button or Link

**Purpose:** Navigation or a low-emphasis action.

Appearance:

- No unnecessary container.
- Clear text label.
- Visible hover and focus states.
- Consistent underline behavior where applicable.

### 8.3 Button Dimensions

Recommended starting dimensions:

- Standard height: 48 px.
- Compact height: 40 px.
- Large call-to-action height: 52–56 px.
- Minimum practical touch target: 44 × 44 CSS pixels.

Buttons must not become too small on mobile.

Long labels should wrap only when intentional. Otherwise, adjust padding or allow the button to use the available width.

### 8.4 Button States

Every button must support:

- Default.
- Hover.
- Focus-visible.
- Active.
- Disabled.
- Loading, when an asynchronous action is involved.

A loading button should communicate that an operation is in progress.

Do not replace its label with an unexplained spinner.

### 8.5 Property Card

The property card is the most important reusable component in the application.

#### Structure

1. Main property image.
2. Optional featured or availability label.
3. Property title.
4. Location.
5. Price and applicable rental period.
6. Relevant specifications.
7. Navigation to property details.

#### Visual Rules

- Use a consistent image aspect ratio.
- Use a neutral card surface.
- Keep internal padding consistent.
- Display price prominently.
- Maintain clear separation between title and location.
- Avoid excessive card decoration.
- Make the property title or primary card region a clear navigation target.
- Avoid nesting interactive elements in ways that create conflicting click behavior.

#### Image Ratio

Use a default landscape ratio of approximately 4:3 for property listing cards.

A wider ratio may be used when the chosen image and grid composition benefit from it.

The same ratio must be applied consistently within a single property grid.

#### Hover and Focus

On pointer devices, a subtle image treatment or border change may indicate interactivity.

Avoid exaggerated zooming, image tilting, or floating-card effects.

Keyboard users must receive a clear focus indicator on the interactive card link.

#### Missing Information

If optional specifications are unavailable, omit those specifications rather than displaying fabricated values.

Missing images must use a consistent fallback asset.

### 8.6 Property Price

Prices must be visually distinct from supporting metadata.

Rules:

- Use a consistent price format.
- Display the currency.
- Display the rental period for rental listings.
- Avoid inconsistent abbreviations.
- Ensure prices remain readable on narrow cards.

Do not use color alone to distinguish sale prices from rental prices.

### 8.7 Property Status Label

Status labels may communicate:

- Featured.
- Reserved.
- Sold.
- Rented.
- Unavailable.

Use restrained backgrounds and concise labels.

Featured is a promotional designation, while reserved, sold, rented, and unavailable communicate property status.

Do not style every status identically if doing so would make important differences unclear.

Never imply availability solely because a property card is displayed.

### 8.8 Form Fields

Form controls must use a consistent pattern.

Required elements:

- Visible label.
- Input or control.
- Optional supporting text.
- Validation message when applicable.

Visual rules:

- White or clearly differentiated surface.
- Neutral border.
- Readable text.
- Consistent height.
- Adequate horizontal padding.
- Clear focus state.
- Clear invalid state.

Suggested standard input height: 48 px.

Textarea controls should provide enough space for a meaningful inquiry message.

Do not use placeholder text as the only label.

### 8.9 Search Input

The search input should:

- Have a visible label or accessible name.
- Support keyboard input.
- Preserve entered values when appropriate.
- Display a clear action to remove the search term when useful.
- Avoid submitting unexpected queries on every keystroke if this creates unnecessary work.

If location search is implemented as free text, its matching behavior must be predictable.

### 8.10 Filter Control

Filters should be visually grouped by purpose.

Required filter types:

- Transaction purpose.
- Property type.
- Location.
- Minimum price.
- Maximum price.
- Bedroom count.

Use familiar form controls appropriate to the data.

Prefer native select elements when they provide the best balance of accessibility, speed, and usability.

Custom dropdowns should be introduced only when the required behavior justifies their complexity.

### 8.11 Property Image Gallery

The gallery must provide:

- A prominent main photograph.
- Optional thumbnail navigation.
- A larger viewing mode when appropriate.
- Previous and next controls when multiple images exist.
- An accessible close action.
- A visible focus indicator.
- Alternative text for meaningful images.

In a modal gallery:

- Escape should close the gallery.
- Focus should remain managed within the dialog while it is open.
- Focus should return to the triggering control when the dialog closes.
- Background interaction should be prevented while the modal is active.
- Controls must remain usable on mobile.

A gallery is not required to use elaborate transitions.

### 8.12 WhatsApp Inquiry Button

The WhatsApp action should be visually prominent on property detail pages.

Requirements:

- Clearly communicate the destination.
- Use an appropriate label, such as Inquire on WhatsApp.
- Include the property reference in the generated message.
- Maintain the standard button dimensions.
- Use an accessible name.
- Remain usable on mobile and desktop.

A WhatsApp brand color may be used selectively for a recognizable contact action, but it must not replace the website's primary visual identity.

Opening WhatsApp must not be represented as successful message delivery.

### 8.13 Contact Form

The contact form must support:

- Name.
- At least one contact method.
- Message.
- Submission action.
- Validation messages.
- Submission progress.
- Success feedback.
- Error feedback.

Use visible field labels.

Do not clear the form before a submission has been confirmed successful.

If submission fails, preserve the user's input whenever possible.

### 8.14 Section Heading

A reusable section heading may contain:

- Optional eyebrow label.
- Main heading.
- Supporting description.
- Optional action link.

Use the same typographic hierarchy across homepage sections and content pages.

Avoid adding an eyebrow label to every heading by default.

### 8.15 Container

The shared container must:

- Maintain consistent horizontal alignment.
- Respect responsive page gutters.
- Prevent content from exceeding the viewport.
- Support standard and wide layout variants.

### 8.16 Header

The header must provide:

- Brand logo or wordmark.
- Primary navigation.
- A contact action.
- Responsive mobile navigation.

The header should remain visually quiet so that the homepage hero and property imagery receive appropriate attention.

A sticky header is optional. If used, it must not consume excessive vertical space or obscure focused content.

### 8.17 Footer

The footer must provide:

- Brand identification.
- Primary navigation.
- Property browsing links.
- Contact information.
- WhatsApp contact link.
- Copyright information.

The footer should use a darker background when this improves visual closure, but the contrast must remain accessible.

Avoid adding decorative columns or links that have no real destination.

---

## 9. Navigation and Information Architecture

### 9.1 Primary Navigation

Desktop navigation should include:

- Home.
- Properties.
- Buy.
- Rent.
- About.
- Contact.

A prominent contact action may appear at the right side of the header.

The navigation must make the property's discovery journey obvious.

### 9.2 Navigation Hierarchy

The intended hierarchy is:

1. Homepage.
2. Property listings.
3. Individual property details.
4. Contact or inquiry.

The About page provides supporting credibility but must not compete with the main property discovery journey.

### 9.3 Active Navigation

The current page may be indicated through:

- A subtle underline.
- A text color change.
- A restrained background treatment.

Use one consistent active-state pattern.

Do not rely exclusively on color.

### 9.4 Mobile Navigation

On mobile:

- Collapse the desktop navigation into a menu button.
- Keep the logo visible.
- Ensure the menu button has an accessible name.
- Communicate the expanded or collapsed state.
- Support keyboard interaction.
- Allow the menu to close through a clearly visible action.
- Avoid menus that cover essential content without an obvious way to dismiss them.

A full-screen menu is acceptable if it remains simple and easy to navigate.

### 9.5 Breadcrumbs

Breadcrumbs may be used on property detail pages when they improve orientation.

Example:

Home / Properties / Property Title

They are optional on the homepage and unnecessary for simple pages with obvious navigation.

### 9.6 URL and Navigation Consistency

Navigation labels and route names must remain consistent.

The Buy link should lead to properties filtered for sale.

The Rent link should lead to properties filtered for rent.

Property detail links must open the correct property.

A visitor should be able to return to listings without losing context unnecessarily.

---

## 10. Form UX

### 10.1 Form Design Principles

Forms should be short, predictable, and easy to complete.

The contact form should ask only for information needed to respond to an inquiry.

Avoid unnecessary fields, multi-step forms, or intrusive interactions.

### 10.2 Labels and Instructions

Every input must have a visible label.

Labels should use familiar language.

Examples:

- Full Name.
- Email Address.
- Phone Number.
- Message.

Supporting text should explain a genuine requirement rather than repeat the label.

### 10.3 Validation Timing

Validate required fields when the visitor attempts to submit the form.

Field-level validation may occur after a field has been touched, provided the behavior does not interrupt typing or create excessive error messages.

Avoid displaying errors before visitors have had a reasonable opportunity to enter information.

### 10.4 Error Messages

Error messages must explain the problem and, where possible, how to fix it.

Good examples:

- Enter your name.
- Enter a valid email address.
- Provide a phone number or email address.
- Your message could not be sent. Please try again.

Avoid vague messages such as Invalid input.

### 10.5 Submission Progress

During submission:

- Display a clear progress state.
- Prevent duplicate submissions.
- Preserve the form values.
- Avoid making unrelated page content inaccessible.

The submit button should communicate the operation in progress.

### 10.6 Success Feedback

After confirmed successful submission:

- Display a clear confirmation.
- Explain that the inquiry was submitted.
- Do not promise a response time unless the business has committed to one.
- Provide an alternative next step when appropriate.

### 10.7 Privacy

The contact form must explain how submitted information will be used.

The privacy notice should be concise and consistent with the actual processing mechanism.

Do not collect unnecessary personal information.

---

## 11. Page-Level Design Guidance

### 11.1 Homepage

**Primary objective:** Establish trust and direct visitors toward property discovery.

#### Hero

The hero should be the most visually distinctive section of the website.

Recommended composition:

- Clear headline.
- Short supporting statement.
- Primary property discovery action.
- Secondary contact action.
- High-quality architectural or residential photography.

A split layout may place the text on one side and a large photograph on the other.

A full-width photographic hero is also acceptable if the text remains readable and the layout does not resemble a generic real estate landing page.

Choose one composition and use it deliberately rather than combining multiple competing hero patterns.

Recommended headline:

_Find a Place That Feels Like Home._

Supporting text:

_Explore thoughtfully selected residential properties across Addis Ababa, from contemporary apartments to exceptional family homes._

Primary action:

**Explore Properties**

Secondary action:

**Contact Our Team**

Do not place excessive text in the hero.

Avoid carousels that automatically rotate hero content.

#### Featured Properties

The featured section should contain a curated selection of properties.

Recommended composition:

- Section heading.
- Short supporting text, if useful.
- Three property cards on desktop.
- One column on narrow mobile screens.
- A link to view all properties.

Cards must use the same component rules as the main property listing page.

#### Brand Introduction

Use a concise section explaining the agency's focus and approach.

The section should communicate service and trust without inventing credentials or business history.

#### Property Discovery CTA

Provide another opportunity to browse properties or contact the agency.

Keep the action direct and avoid repeating large promotional statements.

#### Footer

Close the page with navigation and contact information.

### 11.2 Property Listings Page

**Primary objective:** Help visitors identify relevant properties.

#### Page Introduction

Use a clear page heading.

Example:

_Explore Properties in Addis Ababa._

The supporting text should explain the inventory without making unsupported claims about its size or market coverage.

#### Filter Area

The filter area must be clearly separated from the property results.

On desktop, filters may appear in a horizontal control row or a compact sidebar.

Choose the layout based on the available space and number of controls.

Recommended desktop arrangement:

- Transaction purpose.
- Location.
- Property type.
- Price range.
- Bedroom count.
- Clear filters action when filters are active.

On mobile, filters may use a collapsible panel or a dedicated filter dialog.

Do not force all filters into a cramped horizontal row.

If filters are presented in a dialog, include:

- A clear title.
- The available controls.
- A close action.
- A reset action.
- An apply action when required by the chosen interaction model.

The filter panel must remain usable with a keyboard and screen reader.

#### Results Header

Display:

- Result count.
- Optional sorting controls if approved and implemented.

Sorting is not a required MVP feature.

Do not display sorting controls that have no functional effect.

#### Property Grid

Use the reusable property card.

Maintain consistent image ratios, card gaps, and text alignment.

The first row of results should be visually balanced, but the grid must not sacrifice semantic reading order for visual symmetry.

#### Empty State

When no properties match:

- State that no properties match the selected filters.
- Offer a clear way to reset filters.
- Preserve the visitor's ability to modify individual filters.

### 11.3 Property Detail Page

**Primary objective:** Help the visitor evaluate a property and initiate contact.

#### Property Header

Display:

- Property title.
- Location.
- Price.
- Transaction purpose.
- Availability status when relevant.

The title and price must be easy to locate.

#### Image Gallery

Give the photographs substantial visual space.

Use a consistent image presentation.

If multiple photographs exist, provide a gallery interaction.

If only one photograph exists, do not display unnecessary thumbnail placeholders or inactive controls.

#### Property Specifications

Present the most useful specifications in a compact, readable group.

Examples:

- Bedrooms.
- Bathrooms.
- Floor area.
- Property type.

Only display values supported by the property's data.

#### Description

Use a readable text width.

Organize longer descriptions into short paragraphs.

Avoid large uninterrupted blocks of text.

#### Inquiry Area

Make the WhatsApp action prominent.

On desktop, a contextual inquiry panel may appear beside the property details when the layout supports it.

On mobile, the inquiry action should remain easy to find without obscuring content.

A sticky mobile inquiry bar is optional and must not cover important information or keyboard focus.

#### Related Properties

Related properties are not required for the MVP.

If introduced later, they must follow the same property card design and use real data relationships or a clearly defined selection rule.

### 11.4 About Page

**Primary objective:** Establish brand context and credibility.

Use:

- A clear headline.
- A concise introduction.
- A description of the agency's approach.
- Relevant visual material.
- A contact action.

Avoid unsupported claims about years of experience, market leadership, staff qualifications, or customer satisfaction.

The page should feel editorial and professional rather than like a corporate brochure.

### 11.5 Contact Page

**Primary objective:** Make contacting the agency easy.

Recommended composition:

- Page heading.
- Brief introductory text.
- Contact information.
- WhatsApp contact option.
- Contact form.

On desktop, a two-column layout may place contact information beside the form.

On mobile, stack the content vertically.

The form must remain the central interaction rather than being buried below unnecessary promotional content.

### 11.6 Not Found Page

The not-found page should be simple.

Include:

- A clear explanation.
- A link to the homepage.
- A link to property listings.

Maintain the brand typography and palette.

Avoid elaborate animations or decorative illustrations.

---

## 12. Loading, Empty, Success, and Error States

### 12.1 State Design Principles

Every important asynchronous interaction must communicate its state.

The interface must distinguish between:

- Loading.
- Successful completion.
- Empty results.
- Invalid input.
- Failed operations.
- Unavailable content.

Use text, structure, and appropriate visual treatment rather than relying on color alone.

### 12.2 Loading States

Use loading states only when a genuine asynchronous operation is in progress.

Suitable patterns include:

- Skeleton property cards.
- A restrained inline spinner.
- A loading label on a button.
- A brief status message.

Skeletons should resemble the content they replace.

Do not use large animated placeholders for static content.

Do not introduce artificial loading delays merely to make the website feel dynamic.

### 12.3 Empty Property Inventory

When no published properties are available:

- Display a clear message.
- Explain that no properties are currently available.
- Offer an appropriate contact option.
- Avoid showing empty card outlines.

### 12.4 Empty Search Results

When filters return no results:

- State that no properties match the current filters.
- Provide a Reset Filters action.
- Keep the active filter values visible or recoverable.
- Do not automatically clear filters without explaining why.

### 12.5 Missing Images

Use a consistent fallback image with the same aspect ratio as the expected photograph.

The fallback should preserve layout stability and must not imply that an image of a specific property exists.

### 12.6 Property Not Found

Display a simple not-found state when the requested property cannot be displayed.

Do not expose internal errors, identifiers, or implementation details.

### 12.7 Form Validation Error

Highlight the affected field and provide an adjacent explanation.

The error must remain understandable without color.

Where practical, move focus to the first invalid field after an unsuccessful submission, without disrupting the user's ability to correct other fields.

### 12.8 Form Submission Error

If the inquiry cannot be submitted:

- Display an error message.
- Preserve entered information.
- Offer a retry action.
- Provide an alternative contact option when available.

Do not display a success state until the processing mechanism confirms success.

### 12.9 Form Submission Success

Display a clear confirmation that the inquiry was submitted.

The confirmation should be visible near the form or submission action.

Do not use an unexplained toast that disappears before the visitor can read it.

### 12.10 Unavailable Property

If a property is no longer available:

- Display its status accurately.
- Avoid suggesting that the property can still be booked or purchased.
- Offer a route to browse other properties.
- Provide an inquiry action only when it remains appropriate.

### 12.11 Error Presentation

Error messages should be:

- Concise.
- Specific.
- Actionable where possible.
- Consistent across the application.
- Accessible to assistive technologies.

Avoid displaying technical stack traces or raw server responses.

---

## 13. Interactions and Animations

### 13.1 Interaction Philosophy

Interactions should make the interface feel responsive and understandable.

Animation is a supporting detail, not a feature in itself.

The website must remain useful with reduced motion enabled and must not require animation to communicate essential information.

### 13.2 Transition Timing

Recommended durations:

| Interaction            |   Duration |
| ---------------------- | ---------: |
| Hover color change     | 120–180 ms |
| Button press feedback  | 100–150 ms |
| Menu opening           | 160–220 ms |
| Dialog appearance      | 160–220 ms |
| Subtle image treatment | 180–250 ms |

Use simple easing curves.

Avoid prolonged transitions that delay navigation or form submission.

### 13.3 Hover Behavior

On devices with a pointer:

- Buttons may change background or border color.
- Links may change color or underline treatment.
- Property cards may receive a subtle border or image treatment.

Hover effects must not move essential text or cause layout shifts.

On touch devices, equivalent functionality must remain available without hover.

### 13.4 Button Interaction

Buttons should provide immediate visual feedback.

Use subtle changes in background, border, or pressed state.

Avoid excessive scaling, bouncing, or elastic motion.

### 13.5 Property Gallery

Gallery navigation should feel immediate.

When using a dialog:

- Provide clear opening and closing behavior.
- Support keyboard interaction.
- Prevent background interaction while open.
- Restore focus after closing.
- Respect reduced-motion preferences.

### 13.6 Filter Interaction

Filters should respond predictably.

If results update immediately, provide a clear indication that the result set changed when necessary.

If a filter dialog uses an Apply button, do not update results inconsistently before the user applies the selected changes unless that behavior is explicitly designed.

Do not reset unrelated filters when one filter changes.

### 13.7 Form Interaction

Form submission should provide clear feedback.

Do not use decorative animations that delay the submission response.

Validation feedback must remain visible long enough to be understood.

### 13.8 Sticky Elements

Sticky navigation and mobile inquiry bars are optional.

Use them only if they improve the user journey.

Sticky elements must:

- Avoid covering content.
- Avoid obscuring keyboard focus.
- Remain usable on small screens.
- Respect reduced-motion preferences if animated.

### 13.9 Reduced Motion

When the visitor prefers reduced motion:

- Remove nonessential animated transitions.
- Avoid animated scrolling.
- Disable decorative parallax.
- Preserve functional state changes.
- Keep interface feedback understandable without movement.

---

## 14. Responsive Design

### 14.1 Responsive Philosophy

The website must adapt its composition, not merely shrink its elements.

Desktop emphasizes broad property photography and efficient comparison.

Mobile emphasizes focused browsing, readable property cards, accessible filters, and direct inquiry actions.

The content hierarchy must remain consistent across devices.

### 14.2 Breakpoints

Use the following initial breakpoint system.

| Breakpoint    |             Width | Intended Layout                                                                      |
| ------------- | ----------------: | ------------------------------------------------------------------------------------ |
| Small mobile  |      Below 480 px | Single-column content and compact navigation                                         |
| Large mobile  |        480–599 px | Single-column property cards or carefully sized two-column layouts where appropriate |
| Tablet        |        600–767 px | Transitional layout with compact navigation                                          |
| Small desktop |       768–1023 px | Two-column property grids and wider content layouts                                  |
| Desktop       |      1024–1279 px | Full navigation and standard desktop compositions                                    |
| Wide desktop  | 1280 px and above | Full content width and larger editorial compositions                                 |

Breakpoints should respond to content needs rather than device labels alone.

A component may change layout at a different breakpoint if that is necessary to preserve usability.

### 14.3 Header Behavior

**Mobile:**

- Show the brand mark.
- Show a menu button.
- Keep the header compact.
- Avoid crowded navigation.
- Ensure the contact action remains discoverable.

**Desktop:**

- Display the main navigation horizontally.
- Align navigation with the main content container.
- Keep the contact action visually distinct.
- Avoid excessive header height.

### 14.4 Homepage Hero

**Mobile:**

- Stack the headline, supporting text, and actions.
- Use an appropriate image composition.
- Prevent the headline from overlapping essential image content.
- Keep the primary action easy to find.
- Avoid excessive vertical space before property discovery.

**Desktop:**

- Use a balanced split layout or full-width editorial composition.
- Keep the headline prominent.
- Align the hero with the overall content grid.
- Avoid placing important text over visually busy areas of a photograph.

### 14.5 Property Grid

**Mobile:**

- Use one column on narrow screens.
- Keep prices and locations readable.
- Maintain consistent image ratios.
- Avoid horizontal overflow.

**Tablet:**

- Use two columns when card content remains readable.
- Maintain sufficient separation between cards.

**Desktop:**

- Use three columns by default.
- Consider four columns on wide screens only when the cards remain legible.

### 14.6 Filter Layout

**Mobile:**

- Use a collapsible panel or filter dialog.
- Stack controls vertically.
- Make inputs and select controls touch-friendly.
- Provide clear reset and apply actions when applicable.
- Prevent the filter interface from becoming taller or more complicated than necessary.

**Desktop:**

- Use a horizontal filter row or sidebar.
- Keep the controls aligned.
- Prevent the filter section from dominating the property grid.

### 14.7 Property Detail Page

**Mobile:**

- Stack the gallery, summary, specifications, description, and inquiry section.
- Keep the price visible near the title.
- Avoid placing all specifications into tiny columns.
- Make the WhatsApp action easy to locate.

**Desktop:**

- Use a larger gallery.
- Consider a two-column layout for details and inquiry information.
- Maintain a readable text width.
- Avoid overly wide descriptions.

### 14.8 Contact Form

On mobile:

- Use a single-column form.
- Allow inputs to use the available width.
- Keep labels visible.
- Ensure the submit action is easy to reach.
- Avoid side-by-side fields when they become cramped.

On desktop, a two-column page layout is acceptable, but individual form fields should remain readable.

### 14.9 Responsive Typography

Typography must scale smoothly where practical.

Use the defined type scale as a reference.

Do not allow display headings to overflow or create awkward line breaks.

Check real text wrapping at the specified viewport widths.

### 14.10 Responsive Images

Images must:

- Preserve their intended aspect ratio.
- Avoid layout shifts.
- Use appropriate resolutions.
- Crop consistently within their assigned component.
- Avoid distorting architectural proportions.

Use `object-fit: cover` where intentional cropping is appropriate.

Use containment rather than cropping when the complete image is essential to understanding the content.

### 14.11 Touch Targets

Interactive controls should generally provide a minimum target of 44 × 44 CSS pixels.

Avoid placing small controls too close together.

Gallery navigation, filter actions, and mobile menu controls require particular attention.

---

## 15. Accessibility Requirements

The design must target **WCAG 2.2 Level AA**.

Accessibility must be part of component design and page implementation, not a final styling pass.

### 15.1 Color Contrast

Minimum contrast requirements:

- Normal text: 4.5:1.
- Large text: 3:1.
- Essential user interface components and visual indicators: 3:1 against adjacent colors where required.

Large text generally means at least 24 CSS pixels at regular weight or approximately 18.7 CSS pixels at bold weight.

The final color combinations must be checked rather than assumed accessible from their appearance.

Gold is an accent color and must not be used for small text unless the specific combination meets contrast requirements.

### 15.2 Keyboard Navigation

All essential functionality must be accessible by keyboard.

This includes:

- Navigation.
- Property cards.
- Search filters.
- Form controls.
- Gallery controls.
- Dialogs.
- Contact actions.
- Mobile menu controls.

Do not create keyboard traps outside intended modal interaction.

### 15.3 Focus Indicators

Every interactive element must have a visible focus state.

Use the defined focus color or another verified accessible treatment.

Focus indicators must not be clipped by overflow containers or hidden beneath sticky elements.

### 15.4 Semantic Structure

Use appropriate semantic HTML.

Requirements:

- One clear primary page heading.
- Logical heading hierarchy.
- Navigation landmarks.
- Main content landmark.
- Semantic links and buttons.
- Correct form labels.
- Appropriate dialog semantics.

Do not use a clickable generic container when a native link or button is appropriate.

### 15.5 Images

Meaningful property images must have useful alternative text.

Alternative text should describe relevant visible content rather than repeat generic phrases such as image of a house.

Decorative images should use empty alternative text when appropriate.

The image gallery must provide an understandable name for each meaningful image.

### 15.6 Forms

Every field must have an accessible name.

Validation errors must be associated with their fields.

Submission status must be communicated to assistive technologies.

Required fields must be indicated in a way that does not depend on color alone.

### 15.7 Motion

Respect the reduced-motion preference.

Avoid flashing content and unnecessary movement.

Animations must not prevent users from understanding the interface.

### 15.8 Mobile and Zoom

The layout should remain usable at increased browser zoom.

Essential content must not become inaccessible when text is enlarged.

Test at narrow viewport widths and common zoom levels.

### 15.9 Screen Reader Support

Important interface changes, such as form submission results, should be announced appropriately.

Do not announce every minor visual update.

Use accessible names for icon-only buttons.

Ensure decorative elements do not create unnecessary screen-reader output.

---

## 16. Content and Imagery Guidelines

### 16.1 Photography Direction

Photography is a central part of the brand.

Prefer images that communicate:

- Natural light.
- Architectural form.
- Material quality.
- Spaciousness.
- Residential comfort.
- Thoughtful interior design.
- The character of the surrounding environment.

Images should feel credible for the Addis Ababa residential market.

Avoid using photographs that suggest an entirely different location, climate, or property category without a clear reason.

### 16.2 Image Consistency

Within a single listing grid:

- Use consistent image proportions.
- Apply consistent cropping rules.
- Maintain reasonable visual quality.
- Avoid mixing highly compressed images with excessively large images.
- Avoid inconsistent image treatments.

Property detail galleries may use more varied compositions when the actual photographs warrant them.

### 16.3 Image Licensing

All images must be properly licensed or authorized for the intended use.

Do not assume that an image found through a search engine is free to use.

The portfolio version must not misrepresent demonstration photographs as verified photographs of actual properties.

### 16.4 Property Labels

Labels should be short and factual.

Examples:

- For Sale.
- For Rent.
- Featured.
- Reserved.
- Sold.
- Rented.

Do not use labels such as Best Investment or Guaranteed Return without substantiated and approved claims.

### 16.5 Copywriting

Use concise, informative copy.

Avoid:

- Generic marketing filler.
- Repeated claims of luxury.
- Unsupported promises.
- Artificial urgency.
- Unverified market statistics.
- Fabricated testimonials.

The interface should explain what is available and how to inquire.

### 16.6 Currency and Measurements

Display prices in a consistent format.

Rental listings must include the applicable payment period.

Property measurements must display the relevant unit.

Use the same formatting conventions throughout property cards, detail pages, and filters.

---

## 17. Performance and Visual Stability

### 17.1 Image Performance

Property photographs are likely to account for a significant portion of page weight.

Therefore:

- Compress images appropriately.
- Use responsive image sources.
- Prefer modern image formats where supported.
- Avoid loading full-resolution images when smaller variants are sufficient.
- Lazy-load below-the-fold images where appropriate.
- Prioritize the main above-the-fold image.
- Reserve image dimensions to prevent layout shifts.

### 17.2 Font Performance

- Limit the number of font families and weights.
- Load only required font files.
- Use appropriate font-display behavior.
- Provide system fallbacks.
- Avoid unnecessary font variants.

### 17.3 Layout Stability

Reserve space for images and asynchronous content.

Do not allow late-loading images to move buttons or text unexpectedly.

Do not inject large interface elements above the visitor's current position without an intentional and accessible reason.

### 17.4 Third-Party Dependencies

Load third-party scripts only when required.

The WhatsApp inquiry link should not require a complex client library.

Avoid introducing unnecessary external services that increase page weight or create additional failure points.

### 17.5 Performance Targets

The implementation should target the following Core Web Vitals:

| Metric                    |             Target |
| ------------------------- | -----------------: |
| Largest Contentful Paint  |      ≤ 2.5 seconds |
| Interaction to Next Paint | ≤ 200 milliseconds |
| Cumulative Layout Shift   |              ≤ 0.1 |

These targets should be evaluated in realistic conditions.

Passing a local development test does not guarantee equivalent production performance.

---

## 18. Design Tokens and Implementation Consistency

The implementation must maintain one authoritative set of design tokens.

### 18.1 Token Categories

The token system should cover:

- Colors.
- Typography.
- Spacing.
- Container widths.
- Breakpoints.
- Border radii.
- Borders.
- Shadows.
- Control heights.
- Transition durations.
- Focus treatments.

### 18.2 Token Usage Rules

1. Prefer existing tokens over arbitrary values.
2. Reuse component styles rather than duplicating them.
3. Introduce new tokens only when a repeated design need justifies them.
4. Keep color meanings consistent.
5. Avoid page-specific exceptions unless the content genuinely requires them.
6. Keep responsive rules predictable.
7. Update shared components centrally when design conventions change.

### 18.3 Component Variants

Component variants must represent meaningful differences.

Examples:

- Primary, secondary, and text buttons.
- Standard and wide containers.
- Default, featured, and unavailable property cards.
- Standard and error form fields.
- Desktop and mobile navigation.

Do not create a new component variant solely to accommodate a one-off decorative preference.

### 18.4 Avoiding Visual Drift

The homepage, property listings, property details, About page, and Contact page must share the same visual system.

Specifically:

- Use consistent button dimensions.
- Use consistent property metadata styling.
- Use consistent content alignment.
- Use consistent form fields.
- Use consistent spacing.
- Use consistent navigation behavior.
- Use consistent interaction states.

The website should feel like one product rather than a collection of separately designed pages.

---

## 19. Design Quality Checklist

### 19.1 Brand and Visual Design

- [ ] The website communicates a premium residential property brand.
- [ ] Property photography is visually prominent.
- [ ] The ivory, charcoal, and gold palette is applied consistently.
- [ ] Typography follows the defined hierarchy.
- [ ] Decorative elements remain restrained.
- [ ] Text and interface components meet contrast requirements.

### 19.2 Homepage

- [ ] The hero communicates the product's purpose.
- [ ] The primary CTA is easy to identify.
- [ ] Featured property cards use the shared component.
- [ ] The agency introduction is concise.
- [ ] Contact options are visible.
- [ ] The footer follows the shared design system.

### 19.3 Property Listings

- [ ] Filters are easy to understand.
- [ ] The results count is visible.
- [ ] Property cards display consistent information.
- [ ] Prices and locations are readable.
- [ ] Empty search results have a useful recovery action.
- [ ] Mobile filters remain accessible.

### 19.4 Property Details

- [ ] The title, price, and location are prominent.
- [ ] The image gallery is usable.
- [ ] Specifications are clearly grouped.
- [ ] Missing data is handled gracefully.
- [ ] Availability is communicated accurately.
- [ ] The WhatsApp inquiry action is easy to find.

### 19.5 Contact

- [ ] Contact information is clear.
- [ ] Form fields have visible labels.
- [ ] Validation errors are understandable.
- [ ] Submission progress is communicated.
- [ ] Success and error states are distinct.
- [ ] Failed submissions preserve input where possible.

### 19.6 Responsive Behavior

- [ ] The layout works at 320 px width.
- [ ] The navigation adapts correctly.
- [ ] Property cards remain readable.
- [ ] Forms do not overflow.
- [ ] Filters work on touch devices.
- [ ] Essential actions do not depend on hover.
- [ ] Sticky elements do not obscure content.

### 19.7 Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus indicators are visible.
- [ ] Heading hierarchy is logical.
- [ ] Images have appropriate alternative text.
- [ ] Interactive elements have accessible names.
- [ ] Form errors are associated with fields.
- [ ] Reduced-motion preferences are respected.
- [ ] Dialog focus management works correctly.

### 19.8 Performance

- [ ] Images are appropriately optimized.
- [ ] Image dimensions prevent layout shifts.
- [ ] Fonts load efficiently.
- [ ] Unnecessary animations are absent.
- [ ] Third-party dependencies are minimized.
- [ ] Performance targets are evaluated in the deployed environment.

---

## 20. Final Design Decision Rules

When the coding agent encounters an unspecified design decision, apply these rules in order.

### Rule 1: Preserve the User Journey

Choose the solution that helps visitors discover properties, understand them, and make inquiries.

### Rule 2: Follow Existing Tokens

Use the defined colors, typography, spacing, radii, and component conventions.

### Rule 3: Prefer Familiar Interactions

Use recognizable navigation, form controls, filters, buttons, and gallery behavior.

Do not introduce novel interaction patterns without a clear usability benefit.

### Rule 4: Keep Properties Visually Dominant

When choosing between a decorative interface treatment and clearer property presentation, prioritize the property presentation.

### Rule 5: Optimize for Mobile Usability

If a desktop composition becomes cramped on mobile, restructure it rather than shrinking everything.

### Rule 6: Prefer the Simplest Accessible Solution

Do not build custom controls when native controls satisfy the requirement.

Do not add animation when a state change communicates the same information more clearly.

### Rule 7: Never Invent Content to Fill Space

Do not fabricate property information, business credentials, testimonials, or contact details.

If information is unavailable, omit it or use an explicitly identified demonstration value.

### Rule 8: Do Not Simulate Real Functionality

A contact form must not report successful delivery unless the inquiry has actually been processed.

A property must not appear available unless its data supports that status.

### Rule 9: Make Exceptional States as Deliberate as Normal States

Loading, empty, error, and unavailable states must use the same typography, spacing, and component rules as the rest of the product.

### Rule 10: Avoid Unnecessary Scope

Do not introduce maps, dashboards, saved properties, account systems, advanced animations, or other features excluded from the PRD.

### Rule 11: Validate Accessibility and Performance

Do not assume that a visually attractive component is usable.

Check contrast, keyboard behavior, responsive layouts, image performance, and focus visibility.

### Rule 12: Treat This Document as the Visual Source of Truth

When implementation choices conflict with this specification, follow the specification unless a requirement in PRD.md or an explicit product decision requires a change.

If a significant design decision cannot be resolved using these rules, document the decision and request approval rather than inventing a new design direction.

---

## Final Design Principle

**HAVEN Estates Addis should feel premium because it is clear, composed, and trustworthy, not because it is decorated.**

Every design decision should make property information easier to understand, the browsing experience easier to navigate, and the path to contacting the agency more direct.
