---
name: Tử Vi
description: A standard Tử Vi chart inked like a Đông Hồ woodblock print, inside the Kelvin family.
colors:
  vang-hoe: "#E8B23A"
  giay-diep: "#FBF0CE"
  giay-nhuom: "#F5DF9A"
  muc-tau: "#1C1611"
  muc-nhat: "#4F3F2B"
  cham: "#22386B"
  do-son: "#B3301B"
  son-nhat: "#F3CDB8"
  on-son: "#FFF4DE"
  la: "#2C6630"
  do-vang: "#8E1C17"
  on-band: "#FBE9B7"
  field: "#FFFBEE"
  hover: "#FFF7DD"
  dark-ground: "#16100B"
  dark-paper: "#241A12"
  dark-paper-2: "#332414"
  dark-ink: "#F3E3C3"
  dark-ink-2: "#CDB68F"
  dark-cham: "#AFB9DA"
  dark-son: "#EA6146"
  dark-la: "#8FC98A"
  dark-band: "#6B1712"
  dark-rule: "#E9D7AE"
typography:
  display:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.15
  title:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  reading:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  star-main:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 800
    lineHeight: 1.25
  chart-cell:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  seal: "2px"
  control: "4px"
  sheet: "10px"
spacing:
  hairline: "4px"
  gutter-phone: "12px"
  form-gap: "12px"
  panel: "16px"
  stack: "16px"
  panel-desktop: "20px 22px"
  gutter-desktop: "24px"
components:
  button-primary:
    backgroundColor: "{colors.do-son}"
    textColor: "{colors.on-son}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
    height: "46px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muc-tau}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
    height: "46px"
  tool-tab:
    backgroundColor: "transparent"
    textColor: "{colors.on-band}"
    rounded: "{rounded.seal}"
    padding: "6px 12px"
    height: "36px"
  tool-tab-current:
    backgroundColor: "{colors.on-band}"
    textColor: "{colors.do-vang}"
    rounded: "{rounded.seal}"
    padding: "6px 12px"
    height: "36px"
  input-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.muc-tau}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "46px"
  segment-selected:
    backgroundColor: "{colors.cham}"
    textColor: "{colors.giay-diep}"
    rounded: "{rounded.control}"
    height: "46px"
  paper-panel:
    backgroundColor: "{colors.giay-diep}"
    textColor: "{colors.muc-tau}"
    rounded: "{rounded.seal}"
    padding: "{spacing.panel}"
  palace-cell:
    backgroundColor: "{colors.giay-diep}"
    textColor: "{colors.muc-tau}"
    typography: "{typography.chart-cell}"
    padding: "5px 5px 4px"
  palace-cell-menh:
    backgroundColor: "{colors.giay-nhuom}"
  palace-cell-related:
    backgroundColor: "{colors.son-nhat}"
  chi-seal:
    backgroundColor: "{colors.do-son}"
    textColor: "{colors.on-son}"
    rounded: "{rounded.seal}"
    height: "20px"
  top-band:
    backgroundColor: "{colors.do-vang}"
    textColor: "{colors.on-band}"
---

# Design System: Tử Vi

## Overview

**Creative North Star: "The Đông Hồ Chart"**

The page is a woodblock print laid over the canonical Tử Vi chart. A vàng hoè yellow ground carries sheets of giấy điệp paper (a tiled fibre-and-glint texture, `assets/giay-diep.webp`, over the paper colour), and every structure on them is cut in mực tàu black: a heavy outer frame, thin inner rules, solid-ruled controls. Colour is applied the way a Đông Hồ printer applies it, as a few flat inks with fixed jobs: đỏ son for seals, bad stars and the one action, chàm indigo for names and headings, leaf green for good stars. A deep đỏ vang band crowns the page and carries Kel, the Kelvin mascot dressed as the Tử Vi master.

The chart itself is never re-imagined. It stays the standard 4x4 ring of twelve palaces around a two-by-two centre block, with fixed slots in each palace (chi seal, can, đại hạn age, palace name, main stars, minor stars, Tràng Sinh, tiểu hạn). Density is high and deliberate: a phone shows all twelve palaces at once, so cells use small but legible type that steps up at 560px and 900px, and no line is ever absolutely positioned. The signature moment is ink being drawn: tapping a palace strokes đỏ son lines across the centre block to its tam hợp pair and a dashed line to its xung chiếu palace.

The system rejects the dark starry "mystic" fortune site and the navy SaaS card stack. Dark mode is not a night sky; it is the same print on lamp-lit brown paper.

**Key Characteristics:**
- Flat inks on textured paper, framed by black woodcut rules.
- The standard Tử Vi chart layout, unchanged, as the page's centre of gravity.
- Two typefaces: Alegreya for anything titled, Be Vietnam Pro for UI and star names.
- Near-square corners everywhere (2px to 4px); softness comes from paper and warm shadow, not radius.
- Motion is limited to ink drawing, a sheet rising, and fades; all of it stops under reduced motion.

## Colors

A woodblock palette: one warm yellow ground, two papers, black ink, and four flat inks that each mean one thing.

### Primary
- **Đỏ Son (Cinnabar Seal Red)** (#B3301B): chi seals in every palace and in the detail header, the Thân tag outline, hung (bad) stars, the tiểu hạn mark, the primary button fill, the focus ring, the selected-palace inset frame, the tam phương tứ chính ink lines, text caret and selection.
- **Son Nhạt (Washed Cinnabar)** (#F3CDB8): the fill of the selected palace and its three related palaces, and the error box. Never used for text.

### Secondary
- **Chàm (Indigo Dye)** (#22386B): all h1-h3 headings on paper, palace names in cells, links and jump links, and the selected gender segment.

### Tertiary
- **Lá (Leaf Green)** (#2C6630): cát (good) stars in cells, chips, meaning lists and the legend. Nothing else.
- **Đỏ Vang (Wine Red Band)** (#8E1C17): the top band only (also the browser theme colour), with **On Band** (#FBE9B7) for its text, tool-tab outlines and the current tab fill.

### Neutral
- **Vàng Hoè (Sophora Yellow)** (#E8B23A): the page ground behind all paper.
- **Giấy Điệp (Điệp Paper)** (#FBF0CE): every paper panel and palace cell, always under the fibre texture tile.
- **Giấy Nhuộm (Dyed Paper)** (#F5DF9A): the Mệnh palace and the centre block, so the person's own palace and data read as a deeper sheet.
- **Mực Tàu (Chinese Ink)** (#1C1611): body text, main star names, and every rule (frames, chart gaps, control borders).
- **Mực Nhạt (Thinned Ink)** (#4F3F2B): labels, ledes, notes, can, Tràng Sinh line, muted centre lines.
- **Field** (#FFFBEE): input, select, textarea and segment backgrounds. **Hover** (#FFF7DD): palace hover.
- **Hairline** (rgba(28,22,17,.22)): the dotted rule above each palace footer.

Dark scheme (prefers-color-scheme, opt-out via `data-theme="light"`): ground #16100B, papers #241A12 / #332414 with the texture blended soft-light, ink #F3E3C3 / #CDB68F, rules #E9D7AE, chàm lifts to #AFB9DA, son to #EA6146, lá to #8FC98A, band to #6B1712. Every role keeps its job; only lightness flips.

### Named Rules
**The One Ink, One Job Rule.** Lá is only good stars, son is only seals, bad stars, the action, focus and selection, chàm is only names, headings, links and the chosen segment. A new element borrows an ink only if it means the same thing.

**The Two Reds Rule.** Đỏ vang is the band and nothing else; đỏ son never fills the band. They sit next to each other only at the top of the page.

## Typography

**Display Font:** Alegreya (with Georgia, serif), weights 700 and 800
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif), weights 400, 500, 600, 700, 800 in use

**Character:** A bookish, calligraphic serif for titles, like the lettering on a print's cartouche, paired with a clean Vietnamese-first sans that keeps dense star lists sharp at 10px.

### Hierarchy
- **Display** (Alegreya 800, 30px, 1.15, -0.01em): "Tử Vi" in the band, in On Band colour.
- **Headline** (Alegreya 800, 24px, 1.15): panel titles. The centre block name is 17px / 22px / 26px across breakpoints; the palace detail title 22px.
- **Title** (Alegreya 700, 16px in detail, 18px in the reading, 1.15): subsections.
- **Body** (Be Vietnam Pro 400, 16px, 1.55): UI and inputs. **Reading** (15.5px) for the reading and AI answer, held to 72ch.
- **Label** (Be Vietnam Pro 600, 13px): field labels in Mực Nhạt; ledes and notes at 13-14px in regular weight.
- **Chart cell** (Be Vietnam Pro, 10-10.5px phone, 11px at 560px, 13px at 900px, line-height 1.25-1.3): minor stars, footers. **Main star** is 800 weight, 11.5px / 13px / 15.5px. Palace name 700, 11px / 12px / 14px in Chàm. Đại hạn age 700 with tabular numerals.

### Named Rules
**The No-Overlap Rule.** Every line in a palace sits in normal flow, each star name is `nowrap` on its own line (two columns of minor stars from 560px), and size steps only at the 380 / 560 / 900px breakpoints. Nothing in a cell is absolutely positioned. The test case is the most crowded palace (21 stars) at the narrowest phone.

**The Serif Titles Rule.** Alegreya appears only on titled things (band, panel and section headings, centre name). Star names, palace names and controls are always Be Vietnam Pro.

## Layout

A single centred column (max 1180px; gutters 12px on phone, 8px under 380px, 24px from 700px). Paper panels stack with 16px between them and 16px inner padding (20px 22px from 700px).

- **Band:** a two-column grid, title left and Kel (76px) right overlapping the band's bottom rule, with the tools row wrapping full width beneath.
- **Form:** one column on phones with 12px gaps and a full-width submit; from 760px a single row (1.1fr 1.1fr 1fr 1.3fr auto) aligned to the bottom.
- **Chart:** a 4x4 grid of equal columns with a 1px gap over the ink colour, so the gaps become the inner rules. The centre block spans rows 2-3 and columns 2-3. The chart always fills the panel width; it never scrolls sideways.
- **Result:** chart and palace detail stack below 1040px; from 1040px the detail becomes a 340px sticky side column beside the chart.
- **Palace detail on phones:** a bottom sheet capped at 30vh (78vh when expanded with "Xem đầy đủ"), and the page scrolls so the selected palace, its related palaces and the centre stay above the sheet.
- **Print:** band controls, form, AI panel, detail, links and footer hide; the 4x4 chart prints on white without panel chrome.

## Elevation & Depth

Depth is paper on a table: flat sheets with a warm, low, downward shadow, never glass, blur or glow. Hierarchy comes from paper tone (Giấy Nhuộm over Giấy Điệp) and from ink frames, not from stacked elevations.

### Shadow Vocabulary
- **Paper rest** (`box-shadow: 0 8px 22px -14px rgba(60,30,5,.55)`): every paper panel.
- **Button lift** (`box-shadow: 0 4px 10px -4px rgba(60,20,5,.45)`), pressing to (`0 1px 3px -1px rgba(60,20,5,.45)`) with a 1px drop.
- **Sheet** (`box-shadow: 0 -14px 40px -10px rgba(40,20,5,.55)`): the phone bottom sheet.
- **Mascot** (`filter: drop-shadow(0 4px 6px rgba(0,0,0,.25))`): Kel on the band.
- **Selection inset** (`box-shadow: inset 0 0 0 2.5px` Đỏ Son): the selected palace; a frame, not a lift.

Dark mode deepens each shadow to near-black.

### Named Rules
**The Paper, Not Glass Rule.** Shadows are warm brown, soft and below the sheet. Nothing is translucent or blurred.

## Shapes

Near-square, ruled forms. Panels, seals, tags and band tools use 2px corners; form controls, buttons and the close button use 4px; only the phone bottom sheet softens to 10px on its top corners. The chart has no radius at all. Lines carry the form: 2px ink frame on panels, the chart and the primary button, 1.5px on inputs, segments, tool tabs and secondary buttons, 1px between palaces and around the centre block's inset frame (4px in from its edge), dotted hairline above palace footers. Chi seals are compact red blocks (min 24 by 20px in cells, 34 by 28px in the detail header).

### Named Rules
**The Woodcut Rule.** Structure is drawn with mực tàu lines, never implied by spacing or tint alone: the outer frame is 2px, inner rules 1px.

## Components

### Buttons
- **Shape:** gently squared (4px), 46px minimum height, 2px ink border.
- **Primary:** Đỏ Son fill, On Son text, 700 weight 16px, padding 10px 20px, Button lift shadow. One per panel.
- **Hover / Active:** brightness 1.06 on hover; on press it drops 1px, darkens to 0.92 and the shadow tightens. Focus is the global 3px Đỏ Son outline, offset 2px. Disabled is 55% opacity.
- **Quiet:** same frame, transparent, ink text, no shadow (used for "In lá số").
- **Tool tabs (band):** 1.5px On Band outline, transparent, 2px corners, 36px tall; the current tab fills On Band with Đỏ Vang text.

### Inputs / Fields
- **Style:** Field background, 1.5px ink border, 4px corners, 46px tall, padding 10px 12px; placeholder in Mực Nhạt.
- **Segmented choice:** two equal halves inside one 1.5px ink frame with a 1.5px divider; the checked half fills Chàm with paper text; focus draws the son outline inset.
- **Error:** 1.5px Đỏ Son border on Son Nhạt, ink text, 4px corners.

### Cards / Containers (Paper panel)
- **Corner Style:** 2px.
- **Background:** Giấy Điệp under the 384px fibre tile.
- **Shadow Strategy:** Paper rest.
- **Border:** 2px ink.
- **Internal Padding:** 16px, 20px 22px from 700px; the chart panel tightens to 12-14px (6px under 380px).

### Chips
- **Style:** 1.3px border in currentColor, transparent fill, 600 weight 13px, padding 2px 7px; Lá for good stars, Đỏ Son for bad stars.

### Navigation
- **Top band:** Đỏ Vang with a 3px ink bottom rule, respecting the safe-area inset; holds the title, subtitle (13px, 90% opacity), Kel and the tool tabs.

### Palace Cell (signature)
A full-cell button on textured paper, column flow with 3px gaps: head row (chi seal, can from 560px, đại hạn age pushed right), palace name in Chàm with an optional outlined Thân tag, main stars bold in ink (or "Vô chính diệu" in Mực Nhạt), minor stars split into Lá and Đỏ Son lines, and a footer under a dotted hairline with Tràng Sinh and the tiểu hạn year in Đỏ Son. Mệnh sits on Giấy Nhuộm. Selected: Son Nhạt fill with a 2.5px Đỏ Son inset frame; related palaces take Son Nhạt; the centre block's content fades to 16% while picking.

### Tam Phương Ink Lines (signature)
An SVG layer over the chart, clipped to the centre block with a 12px inset so no stroke crosses palace text. Tam hợp lines are 2.5px Đỏ Son round-capped strokes that draw in over 0.55s (`cubic-bezier(.16,1,.3,1)`); the xung chiếu line is dashed (6 5) and fades in after 0.2s; dots mark each anchor (5px radius for the chosen palace, 3.5px for the others). Reduced motion shows the finished lines immediately.

### Palace Detail
A paper panel with a seal-and-title header. On phones it rises as a bottom sheet (0.32s, same ease) with a 40px close button and a "Xem đầy đủ" outline button; on desktop it is a sticky side column without the close button. Sections use Title headings, chips for stars, and indigo underlined jump links to related palaces.

### Toast
Ink pill on the paper colour, 600 weight 14px, bottom-centred above the safe area, fading in over 0.2s.

## Do's and Don'ts

### Do:
- **Do** keep the standard 4x4 palace ring with the centre block in rows 2-3 and columns 2-3, and the fixed slot order inside each palace.
- **Do** draw every panel and the chart with a 2px Mực Tàu frame and separate palaces with 1px ink gaps.
- **Do** put the giấy điệp texture tile (384px) under every paper surface, and blend it soft-light in dark mode.
- **Do** colour good stars Lá, bad stars Đỏ Son and main stars bold ink, and keep the legend that explains it next to the chart.
- **Do** step chart type only at the 380 / 560 / 900px breakpoints and check the 21-star palace at the narrowest phone before shipping a change.
- **Do** give every animation a reduced-motion state that shows the end result.

### Don't:
- **Don't** use a dark starry, zodiac-glow "mystic" look or a navy SaaS card stack; dark mode stays warm brown paper.
- **Don't** absolutely position text inside a palace or let star names wrap mid-name.
- **Don't** use Đỏ Vang anywhere but the band, or use Lá or Chàm for anything outside their one job.
- **Don't** round panels or controls past 4px; the bottom sheet's 10px top corners are the only exception.
- **Don't** add glass, blur or glow shadows; depth is warm paper shadow and ink frames.
- **Don't** set star names or controls in Alegreya.
