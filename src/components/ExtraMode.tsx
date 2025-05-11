const pos = cursorPosition?.();
const line = Array.isArray(lines) && pos ? lines[pos.line] : undefined;
const char = line?.[pos?.column ?? 0] ?? ''; 