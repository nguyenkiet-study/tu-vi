---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface: Lá số (index.html)

Scope: the whole single page (form, chart, palace detail, reading, AI Q&A, print), plus entry points for "Xem hợp tuổi" (two people, to be built for real) and "Làm thiệp cưới" (shows "Đang phát triển"). Mode: operate. Phones first, desktop second.

Audience and job: Kiệt and close friends open a shared link, enter birth date and hour, read the chart; newcomers want the plain reading, Tử Vi readers want the full standard chart.

Constraints: engine.js rules untouched; text never overlaps at any width, tested with the most crowded palace found (19/04/2015, giờ Mão, nam: Tật Ách, 21 stars); print keeps the 4x4 chart.

## Direction contract
THESIS: The standard Tử Vi chart (4x4 ring, centre block, fixed slots per palace) inked like a Đông Hồ print; refuses the dark-starry "mystic" site and the navy SaaS card stack the old page copied from Kelvin.
OWN-WORLD: vàng hoè yellow ground for the shell, giấy điệp pale-yellow chart paper, mực tàu black woodcut rules (2px outer frame, 1px inner), đỏ son for Mệnh/Thân seals and hung stars, chàm indigo for palace names and headings, leaf green for cát stars. Alegreya for headings, Be Vietnam Pro for UI and star names. Red square chi seals in each palace.
STORY: Enter date and hour, see the whole chart at once, tap a palace to read it closely in plain words, then the overall reading, then ask AI.
FIRST VIEWPORT: Phone: deep-red top band with "Tử Vi" and Kel the master; one compact form card (date, hour, gender, name optional) with a full-width primary button; tools row (Xem hợp tuổi, Làm thiệp cưới). After submit, the 4x4 chart fills the width, centre block holds the person's data and Kel.
FORM: Tranh Đông Hồ world on the standard chart layout (user fused direction B with the canon C). seed:ef318021b241d33a (user chose pick + canon).
SIGNATURE: tapping a palace inks lines from it to its tam hợp pair and xung chiếu palace across the centre block, highlights those three, and opens the palace detail (bottom sheet on phone, side panel on desktop).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
