# PulseCare — Final Design Plan

---

## Problem Statement

Patients in the US struggle to book doctor appointments efficiently. The existing process involves calling clinics, navigating phone trees, waiting on hold, and having no visibility into doctor availability until they speak to a receptionist. This leads to:

- **Long booking friction** — average 8+ minutes to book a single appointment by phone
- **No real-time availability** — patients cannot see open slots without calling
- **Zero pre-visit communication** — patients cannot message their doctor before an appointment
- **Poor post-visit continuity** — no easy way to follow up, re-book, or rate the experience
- **Usability gaps** — filter labels are unclear, payment totals are hidden, multi-step flows have no progress indicators

**PulseCare** solves this by giving patients a single app to find, book, manage, and follow up on doctor appointments — with clear UI, real-time availability, and transparent pricing.

---

## Usability Fixes Being Addressed (from research findings)

| # | Finding | Fix Applied In |
|---|---------|----------------|
| 1 | Users didn't know what the filter chips were filtering | Added explicit "Filter by" label with dimension chips (Specialty / Insurance / Availability / Distance) | S06 |
| 2 | Users lost track of where they were in the booking flow | Added 2-step progress indicator (Pick Slot → Confirm) | S08 |
| 3 | Users felt surprised by the total cost at checkout | Total ($120) shown at the top of payment screen, not buried at bottom | S10 |
| 4 | Home screen's quick actions row (icon + label, horizontal) had identical visual grammar to the bottom tab bar — users experienced dual navigation confusion | Replaced with two wide content cards (My Records / Messages) with enough height, color, and subtitle text to read as feature shortcuts, not navigation | S04 |
| 5 | No consideration for new users with zero booked appointments — the appointment hero card had no fallback, leaving a broken-looking empty space | Added an explicit empty state (S04b): dashed-border card, calendar icon, clear "Find a Doctor & Book" CTA so the home screen is always purposeful regardless of booking status | S04b |
| 6 | S17 was originally planned as "Visit History" — a direct duplicate of the Past tab already present in S12 (My Appointments), making it redundant and wasting a navigation slot | Redesigned S17 as the Profile screen (the actual 4th tab destination): personal info, health stats, settings, and sign out | S17 |

---

## Screen Flow Plan — 17 Screens across 6 Phases

---

### Phase 1 — Auth (Screens 1–3)
*Background: dark auth gradient. No navigation bar.*

**S01 — Splash**
- PulseCare logo with pulse line icon
- Tagline: "Your health, on time."
- Trust badges: 4.9 rated, HIPAA secure, 50K+ patients
- CTAs: Get Started / Continue with Google / Sign in

**S02 — Sign Up**
- Form: Full Name, Email, Password, Date of Birth
- Checkbox: Terms & Privacy
- CTA: Create Account
- Alternative: Continue with Google
- Link: Already have an account? Sign in

**S03 — Login**
- Back link (to splash)
- Form: Email, Password
- Forgot password link
- CTA: Sign In
- Alternative: Continue with Google / Face ID / Touch ID
- Link: New here? Create account

---

### Phase 2 — Home (Screens 4 & 4b)
*Background: #0d0d1f. Bottom nav — Home tab active.*

**S04 — Home Dashboard (Appointment booked)**
- Greeting: "Good morning, Emily" + date
- Notification bell (with red dot) + user avatar
- Hero appointment card: Dr. James Mitchell · Today · 4h away · View Details / Get Directions
- Pre-visit checklist shortcut inside the card (amber strip, "3/4 done") — links to S14
- Two wide feature cards side by side: My Records (purple) / Messages (blue, unread badge + "Dr. Mitchell replied")
- Top Rated Near You: Dr. Mitchell (4.9) · Dr. Sophia Reyes (4.8) — each with Book CTA

**S04b — Home Dashboard (No appointment booked — empty state)**
- Same greeting + avatar
- Empty state card: dashed border, calendar icon, "No upcoming appointments", "Find a Doctor & Book" CTA
- Same two feature cards (Messages shows "No new messages", no badge)
- Same Top Rated Near You section — primary discovery path when no appointment exists

---

### Phase 3 — Discover (Screens 5–7)
*Background: #0d0d1f. Bottom nav — Search tab active on S05/S06. Back button only on S07.*

**S05 — Find a Doctor (Discover)**
- Search bar with mic icon
- Recent searches list
- "Filter by" with 4 dimension chips: Specialty (active) / Insurance / Availability / Distance
- Browse Specialties grid (3×2): Cardiology, Neurology, Dermatology, General GP, Pediatrics, Eye Care — each with See all
- Nearby Doctors: Dr. Mitchell card with Book CTA — with See all

**S06 — Search Results**
- Back button + "Cardiologists · 12 results"
- Sort: Recommended dropdown
- Active filters shown as removable chips
- 3 doctor cards: Dr. Mitchell ($120, 4.9), Dr. Sophia Reyes ($110, 4.8), Dr. Kevin Park ($95, 4.7)
- Each card: photo, name, specialty, rating, distance, fee, Book button
- Bottom nav: Search active

**S07 — Doctor Profile**
- Back button. No bottom nav.
- Hero: large doctor photo, name, specialty, hospital
- Stats row: Rating / Years Experience / Total Reviews
- Availability badge: "Available Today"
- About section: short bio
- "Book Appointment" sticky CTA button at bottom

---

### Phase 4 — Book (Screens 8–11)
*Background: #090d1f (booking flow). Back button on S08–S10. X close only on S11.*

**S08 — Slot Selection**
- Back button. No bottom nav.
- USABILITY FIX: 2-step progress indicator — ① Pick Slot → ② Confirm
- Doctor mini-card at top for context
- Date picker: horizontal date row, March 2026, Wed 20 selected
- Time slot grid: Morning / Afternoon / Evening tabs
- Selected slot: 2:00 PM (highlighted)
- CTA: Continue

**S09 — Booking Summary**
- Back button. No bottom nav.
- Step indicator: ① Pick Slot ✓ → ② Confirm (active)
- Summary card: Doctor, Date, Time, Visit type (In-Person), Location
- Fee breakdown: $120
- CTA: Confirm & Proceed to Payment

**S10 — Payment**
- Back button. No bottom nav.
- USABILITY FIX: Total "$120" shown prominently at top
- Payment method tabs: Card / Apple Pay / Google Pay
- Card form: Card number, Expiry, CVV
- Breakdown: Consultation $100 + Platform fee $20
- CTA: Pay $120 · Confirm Booking

**S11 — Confirmed (Success)**
- X close button (top right). No back button, no bottom nav.
- Green success background
- Animated checkmark circle
- "Appointment Confirmed!"
- Summary: Dr. Mitchell · Wed 20 March · 2:00 PM · NYU Langone
- CTAs: Add to Calendar / View Appointment / Back to Home

---

### Phase 5 — Pre-Visit (Screens 12–14)
*Background: #0d0d1f. Bottom nav on S12. Back button on S13/S14.*

**S12 — My Appointments**
- Bottom nav: Calendar tab active. No back button.
- Page title: "Appointments"
- Tabs: Upcoming (active) / Past
- Upcoming card: Dr. Mitchell · Wed 20 Mar · 2:00 PM · Confirmed badge
- Actions: View Details / Reschedule
- Past card: Dr. Sophia Reyes · Feb 10 · Completed badge · Rebook

**S13 — Appointment Detail**
- Back button. No bottom nav.
- Status badge: Confirmed (green)
- Doctor card with photo, name, specialty, rating
- Details: Date / Time / Location / Visit type
- Action row: Get Directions / Add to Calendar
- Danger zone: Reschedule / Cancel appointment

**S14 — Pre-Visit Checklist / Reminder**
- Back button. No bottom nav.
- Appointment reminder banner (tomorrow / countdown)
- Checklist: Bring insurance card ✓ / Fast 2 hrs before ✓ / Arrive 10 min early ✓ / Prepare questions ○
- "Message Dr. Mitchell" CTA for pre-visit questions

---

### Phase 6 — Post-Visit (Screens 15–17)
*Background: #0d0d1f. Back button on S15/S16. Bottom nav on S17.*

**S15 — Chat with Doctor**
- Back button. No bottom nav.
- Chat header: Dr. James Mitchell + online status
- Message thread: doctor reply + Emily's follow-up question
- Message input bar + send button

**S16 — Rate Your Visit**
- Back button. No bottom nav.
- Doctor photo + name
- "How was your visit?" heading
- 5-star rating (4 stars selected)
- Feedback text area: "Dr. Mitchell was very thorough..."
- CTA: Submit Review

**S17 — Profile**
- Bottom nav: Profile tab active (coral). No back button.
- Emily's avatar with edit badge, name, email
- HIPAA Protected badge
- Stats row: Total Visits (8) / Doctors (3) / Avg Rating (4.8)
- Personal Info section: Full Name, DOB, Email, Phone
- Settings section: Notifications toggle (ON), Insurance Card, Payment Methods
- Sign Out button (coral)
- *Note: Originally planned as "Visit History" but that was a direct duplicate of the Past tab in S12. Redesigned as Profile — the logical 4th tab destination.*

---

## Navigation Rules

| Screen | Bottom Nav | Back Button | Notes |
|--------|-----------|-------------|-------|
| S01–S03 | No | No (S03 has back to splash) | Auth screens |
| S04 | Yes — Home active (blue) | No | Tab screen — booked state |
| S04b | Yes — Home active (blue) | No | Tab screen — empty/new user state |
| S05, S06 | Yes — Search active (purple) | No | Tab screens |
| S07 | No | Yes | Flow screen |
| S08–S10 | No | Yes | Booking flow |
| S11 | No | No | Success — X close only |
| S12 | Yes — Calendar active (amber) | No | Tab screen |
| S13, S14 | No | Yes | Flow screens |
| S15, S16 | No | Yes | Flow screens |
| S17 | Yes — Profile active (coral) | No | Tab screen |

---

## Stitching Plan

Once all screens are approved individually, they will be combined into `section_11_finaldesign.html` with:
- Phase headers with color coding
- Flow arrows between phases
- Screen labels (S01–S17 + S04b)
- Usability fix callout annotations on S04, S04b, S06, S08, S10, S17
- 3 screens per row max layout
- 340×736px phone frames throughout
