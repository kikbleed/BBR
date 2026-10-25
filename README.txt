BONTLE BA RONA — FULLY UPDATED HTML WEBSITE

This version keeps the latest logo, restrained colours, dropdown navigation,
fonts, animations, all 18 pages and confirmed monthly premiums.

OPEN THE WEBSITE
Extract the ZIP, then open index.html in your web browser.
No React, Node.js, installation or build command is needed.

UPLOAD THE WEBSITE
Upload the contents of this folder to your web host, keeping the folder structure.
The root index.html must be at the top level. These files can also be uploaded
directly to a GitHub repository for static hosting.

EDIT THE WEBSITE
- index.html: homepage
- Other folders: individual pages
- styles.css: all website styling
- app.js: dropdowns, mobile navigation, plan tabs, quote dialog and image viewer
- assets/: original flyers and locally bundled fonts
- gallery-data.js: photograph list

JavaScript supports interactive controls; the page content and layout use plain
HTML and CSS. There are no external JavaScript libraries or build dependencies.

ADD YOUR PHOTOGRAPHS
Copy photographs into assets/gallery/ and add them to gallery-data.js, for example:
window.sitePhotos = [
  { file: 'assets/gallery/team.jpg', alt: 'Our team', caption: 'Our team', hero: true }
];
Use the exact file names, including upper/lower case. The gallery is empty because
your gallery photographs have not yet been supplied. The first three images also
fill homepage/about photo areas, and up to four hero images form the slideshow.

The original flyer logo is preserved as artwork; its resolution is limited by
the supplied flyer. Font licenses are included in licenses/.

Quote buttons prepare a WhatsApp message for visitors to review and send.
The website does not process payments, create policies or store enquiry forms.
