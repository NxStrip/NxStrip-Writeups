const fs = require('fs');

// 1. YOUR CONFIGURATION
const BASE_URL = 'https://nxstrip-writeups.vercel.app';
const LAST_MOD = new Date().toISOString().split('T')[0]; // Today's date (YYYY-MM-DD)

// 2. IMPORT YOUR DATA
// Since db.js is client-side, we'll just require it here. 
// Note: Ensure db.js is formatted as a simple array or copy it here.
const writeups = [
    { link: "post.html?file=rootme-sqli-file-read.md" },
    { link: "post.html?file=rootme-sql-injection-auth.md" },
    { link: "post.html?file=rootme-xss-reflected.md" },
    { link: "post.html?file=rootme-xss-server-side.md" },
    { link: "post.html?file=rootme-xss-stored-1.md" }
];

// 3. GENERATE THE XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/index.html</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/writeups.html</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <priority>0.8</priority>
  </url>`;

// Add dynamic writeups from your DB
writeups.forEach(post => {
    xml += `
  <url>
    <loc>${BASE_URL}/${post.link}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <priority>0.7</priority>
  </url>`;
});

xml += `\n</urlset>`;

// 4. WRITE TO FILE
fs.writeFileSync('sitemap.xml', xml);
console.log('✅ sitemap.xml generated successfully!');
