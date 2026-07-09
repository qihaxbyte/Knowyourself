const fs = require('fs');

const path = "src/app/components/guide-select.tsx";
let content = fs.readFileSync(path, "utf-8");

// Change default state
content = content.replace(
  'const [sel, setSel] = useState<string | null>(initial);',
  'const [sel, setSel] = useState<string | null>(initial || "vampire");'
);

// Find the grid block
const gridStartStr = '<div className="mt-10 grid grid-cols-5 gap-3">';
const gridStart = content.indexOf(gridStartStr);
const gridEndStr = '</div>\n\n        {selGuide && (';
const gridEnd = content.indexOf(gridEndStr) + '</div>'.length;

const gridBlock = content.substring(gridStart, gridEnd);

// Find the profile block
const profileStartStr = '{selGuide && (';
const profileStart = content.indexOf(profileStartStr);
const profileEndStr = '        )}\n      </div>';
const profileEnd = content.indexOf(profileEndStr) + '        )}'.length;

const profileBlock = content.substring(profileStart, profileEnd);

// Swap them
const prefix = content.substring(0, gridStart);
const suffix = content.substring(profileEnd);

const newContent = prefix + profileBlock + '\n\n        ' + gridBlock + suffix;
fs.writeFileSync(path, newContent, "utf-8");
console.log("Reordered guide-select.tsx");
