# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Kiệt and close friends. They open a link someone shared (Zalo, Messenger), enter a birth date and hour, and look at the chart together or on their own. Used on both phones and computers; phones come first (confirmed 22/11/2026).

## Product Purpose
Lập lá số Tử Vi Đẩu Số from a solar birth date and birth hour, show the 12 palaces with their stars, the decade (đại hạn) and year (tiểu hạn) cycles, a short reading, and let the person ask follow-up questions to an AI that reads only that chart. Success: a friend gets a chart they can read without help, and someone who knows Tử Vi finds the chart complete and correct.

## Positioning
A personal, free, private chart made inside the Kelvin family: everything is computed in the browser (nothing is stored), star placement follows the book "Tử Vi Chính Biện", and the AI answers only from the chart already drawn.

## Operating Context
- Shared by link among friends; often opened on a phone from a chat app.
- Two kinds of reader at once: newcomers who want a plain-language reading, and people who know Tử Vi and want the full chart (all palaces, main and minor stars, cycles).
- Printing the chart is a supported use.

## Capabilities and Constraints
- Static site (plain HTML/CSS/JS) on GitHub Pages: https://nguyenkiet-study.github.io/tu-vi/ (repo nguyenkiet-study/tu-vi).
- engine.js computes the chart (lunar conversion, 12 palaces, stars, đại hạn, tiểu hạn). Its rules are product truth; a redesign does not change them.
- content.js holds reading text; index.html holds the UI.
- AI Q&A goes through an Apps Script web app (apps_script/Code.gs, Gemini, key in Script Properties, 150 questions a day for the whole site). config.js holds its URL.
- Birth year 1900 to 2100; 12 two-hour birth periods (Tý from 23h to 1h); leap months use the same month number.
- Requested, not built yet: compatibility of two people (xem hai người có hợp tuổi không); a wedding invitation maker (làm thiệp cưới), scope being confirmed.
- The chart must read as a standard Tử Vi chart (4x4 ring of 12 palaces, centre block with the person's data, fixed positions for palace name, main stars, minor stars, đại hạn, Tràng Sinh, tiểu hạn). Text must never overlap, at any screen size, even for the most crowded palace.

## Brand Commitments
- Part of the Kelvin family. The mascot is Kel (Kelvin's mascot); Kel stickers live in the Kelvin repo (stickers/kel-*.webp). A "Kel as Tử Vi master" sticker is wanted and may be made for this product.
- Vietnamese UI, warm and plain-spoken ("mình / bạn").
- Readings stay advisory: no frightening certainties, no medical, legal or investment advice; the chart is "for reference".

## Evidence on Hand
- Working chart engine and reading content in this repo.
- Kel sticker set in the Kelvin repo (D:\kelvin-work\nguyenkiet-study.github.io\source\web\stickers\kel-*.webp).
- No testimonials, user counts or accuracy claims exist; do not invent them.

## Product Principles
1. Private by default: birth data stays in the browser.
2. Two depths on one chart: plain reading first for newcomers, full detail always reachable for people who know Tử Vi.
3. Faithful to the book: the UI never simplifies the chart in a way that hides or changes what the engine computed.
4. Advisory, never fatalistic.
