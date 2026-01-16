const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components');

fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const lines = content.split('\n');
        let codeStarted = false;
        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('import ')) {
                if (codeStarted) {
                    console.log(`Error in ${file} at line ${index + 1}: Import after code`);
                }
            } else if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
                // If it's not an import and not a comment, code has started.
                // But wait, indentation?
                // Also, "export" or "const" or "function".
                if (trimmed !== '') codeStarted = true;
            }
        });
    });
});
