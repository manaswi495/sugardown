const fs = require('fs');
let svg = fs.readFileSync('d:/SG/svglogo.svg', 'utf8');

// Remove white background rect elements
const start = svg.indexOf('<g clip-path="url(#15785e3bd0)">');
const end = svg.indexOf('</g>', start) + 4;
if (start > -1) {
    svg = svg.substring(0, start) + svg.substring(end);
}

// Remove the green rounded rectangle background
// It starts with <path fill="#2c5926"
const greenStart = svg.indexOf('<path fill="#2c5926"');
const greenEnd = svg.indexOf('/>', greenStart) + 2;
if (greenStart > -1) {
    svg = svg.substring(0, greenStart) + svg.substring(greenEnd);
}


// Fix the viewBox to zoom into just the actual logo badge area
// The badge content is at transform(155, 276) and is 500x108 in size
svg = svg.replace(
    'viewBox="0 0 810 1012.49997"',
    'viewBox="155 276 500 108"'
);

// Remove fixed width/height so it scales freely via CSS
svg = svg.replace(/width="1080"/, '');
svg = svg.replace(/height="1350"/, '');

// Change gold text color to dark green for visibility on light backgrounds
svg = svg.split('fill="#ffd398"').join('fill="#1b4d2e"');
svg = svg.split('fill-opacity="1"').join('fill-opacity="1"');

fs.writeFileSync('apps/frontend/public/logo.svg', svg);
fs.writeFileSync('apps/admin/public/logo.svg', svg);
console.log('Done!');

