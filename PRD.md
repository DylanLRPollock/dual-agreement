# Planning Guide

A sequential user agreement application that guides users through accepting two separate agreements before completion.

**Experience Qualities**:
1. **Formal** - Professional legal presentation that establishes trust and credibility through clear, structured content
2. **Progressive** - Step-by-step flow that guides users forward through each required action without confusion
3. **Reassuring** - Clear feedback and confirmation at each stage so users feel confident in their progress

**Complexity Level**: Micro Tool (single-purpose application)
This is a focused, linear flow with a single purpose: capture user acceptance of two agreements sequentially and provide confirmation.

## Essential Features

### Agreement Display & Acceptance (Step 1)
- **Functionality**: Display the original user agreement in a scrollable container with an acceptance checkbox and continue button
- **Purpose**: Present legal terms that users must review and accept before proceeding
- **Trigger**: Application loads
- **Progression**: User lands on page → Reads agreement → Checks acceptance box → "Continue" button becomes enabled → Clicks continue → Advances to step 2
- **Success criteria**: User cannot proceed without checking the acceptance box; smooth transition to next step

### Second Agreement Display & Acceptance (Step 2)
- **Functionality**: Display "our agreement" with similar scrollable container, acceptance checkbox, and continue button
- **Purpose**: Present second set of terms for user acceptance
- **Trigger**: User completes first agreement acceptance
- **Progression**: Step 2 loads → User reads second agreement → Checks acceptance box → "Continue" button becomes enabled → Clicks continue → Advances to completion
- **Success criteria**: Independent acceptance required; cannot skip or go back; smooth transition to thank you

### Completion Confirmation (Step 3)
- **Functionality**: Display thank you message with auto-close timer
- **Purpose**: Confirm successful completion and provide closure
- **Trigger**: User accepts second agreement
- **Progression**: Thank you screen appears → Countdown timer displays (5 seconds) → Window closes automatically (or shows completion message in web context)
- **Success criteria**: Clear confirmation message; visible countdown; graceful completion

## Edge Case Handling

- **Unchecked Acceptance**: Continue button remains disabled and visually muted until checkbox is checked
- **Rapid Clicking**: Button disabled state prevents accidental double-submissions during transitions
- **Small Screens**: Scrollable agreement containers maintain readability on mobile devices
- **Agreement Content Length**: Scroll areas adapt to varying content lengths while maintaining layout integrity
- **Browser Context**: Auto-close gracefully handles web environment where window.close() may be restricted

## Design Direction

The design should evoke modern professionalism with energetic confidence - combining deep purple's tech-savvy authority with vibrant green accents for an interface that feels both trustworthy and forward-thinking. The color contrast creates visual interest while maintaining clarity and readability for legal content.

## Color Selection

A sophisticated deep purple and vibrant green color palette that balances professional authority with modern energy.

- **Primary Color**: Deep purple (oklch(0.35 0.12 285)) - Conveys trust, sophistication, and professionalism with a modern tech-forward edge
- **Secondary Colors**: Rich dark purple (oklch(0.28 0.08 285)) for supporting elements - Creates depth and hierarchy while maintaining the professional aesthetic
- **Accent Color**: Vibrant green (oklch(0.58 0.18 155)) - Energizing highlight color for CTAs, progress, and positive actions that creates striking visual contrast
- **Foreground/Background Pairings**:
  - Background (Deep Purple oklch(0.15 0.05 285)): Foreground text (oklch(0.95 0.01 285)) - Ratio 11.8:1 ✓
  - Card (Rich Purple oklch(0.22 0.06 285)): Card text (oklch(0.95 0.01 285)) - Ratio 9.2:1 ✓
  - Accent (Vibrant Green oklch(0.58 0.18 155)): White text (oklch(0.98 0.01 155)) - Ratio 5.1:1 ✓
  - Primary (Medium Purple oklch(0.35 0.12 285)): White text (oklch(0.98 0.01 285)) - Ratio 6.3:1 ✓

## Font Selection

Typefaces should balance legal formality with digital readability, using a clean sans-serif for UI elements and a traditional serif for agreement body text.

- **Typographic Hierarchy**:
  - H1 (Step Title): Crimson Pro SemiBold/32px/tight letter spacing/-0.02em - Classical authority
  - H2 (Agreement Heading): Crimson Pro SemiBold/24px/normal/0em - Section distinction
  - Body (Agreement Text): Crimson Pro Regular/16px/relaxed leading/1.7 line height - Extended readability for legal content
  - UI Elements: Space Grotesk Medium/14px/normal/0em - Modern, clear interface text
  - Button Text: Space Grotesk SemiBold/16px/wide letter spacing/0.02em - Confident call-to-action

## Animations

Animations should emphasize forward progress and provide subtle confirmation feedback without delaying the user's workflow. Step transitions use smooth fade-and-slide effects (300ms) to maintain spatial context. Checkbox interactions include a satisfying scale-bounce (200ms) for positive reinforcement. The countdown timer pulses gently to draw attention without distraction.

## Component Selection

- **Components**:
  - Card: Main container for each agreement step with subtle shadow for depth
  - ScrollArea: For agreement text display, ensuring long content is accessible
  - Checkbox: For acceptance confirmation with clear checked/unchecked states
  - Button: Primary action button with disabled state for "Continue" actions
  - Progress: Subtle step indicator showing position in three-step flow
  - Badge: Step counter badges (1/3, 2/3, 3/3) for orientation
  
- **Customizations**:
  - Custom agreement container with max-height constraint and gradient fade at bottom to indicate more content
  - Custom countdown component with circular progress indicator
  - Animated step transition wrapper using framer-motion for slide effects
  
- **States**:
  - Buttons: Disabled (muted/reduced opacity) until checkbox checked, Hover (slight scale/shadow lift), Active (pressed state with reduced scale)
  - Checkbox: Unchecked (outlined), Checked (filled with check mark and subtle bounce), Focus (ring indicator)
  - Agreement container: Scrollable with shadow hint at bottom when content overflows
  
- **Icon Selection**:
  - Check (for checkbox and confirmation)
  - FileText (for agreement documents)
  - ArrowRight (for continue/next actions)
  - CheckCircle (for completion/success)
  
- **Spacing**:
  - Container padding: p-8 (32px) for generous breathing room
  - Content gaps: gap-6 (24px) between major sections
  - Element spacing: gap-3 (12px) between related elements
  - Card margins: my-8 (32px vertical) for centered focus
  
- **Mobile**:
  - Reduce container padding to p-4 (16px) on small screens
  - Stack step indicator vertically instead of horizontally
  - Agreement text reduces to 15px on mobile while maintaining line-height
  - Full-width buttons on mobile for easier touch targets
  - Adjust card max-width to allow more screen utilization on narrow viewports
