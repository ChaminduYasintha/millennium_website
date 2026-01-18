// Light Theme Conversion Script
// This script helps convert pages from dark to light theme

const conversions = {
    backgrounds: {
        'bg-brand-black': 'bg-white',
        'bg-gray-900': 'bg-brand-light-gray',
        'from-brand-black': 'from-white',
        'to-gray-900': 'to-brand-light-gray',
        'from-gray-900': 'from-brand-light-gray',
        'to-brand-black': 'to-white',
    },
    text: {
        'text-white': 'text-brand-text',
        'text-gray-300': 'text-brand-text-light',
        'text-gray-400': 'text-brand-dark-gray',
    },
    borders: {
        'border-brand-cyan/20': 'border-gray-200',
        'border-brand-cyan/50': 'border-brand-cyan',
    }
};

console.log('Light Theme Color Mappings:');
console.log('===========================');
console.log('Backgrounds:');
Object.entries(conversions.backgrounds).forEach(([old, new_]) => {
    console.log(`  ${old} → ${new_}`);
});
console.log('\nText:');
Object.entries(conversions.text).forEach(([old, new_]) => {
    console.log(`  ${old} → ${new_}`);
});
console.log('\nBorders:');
Object.entries(conversions.borders).forEach(([old, new_]) => {
    console.log(`  ${old} → ${new_}`);
});
