export type Token =
  | { type: "text"; value: string }
  | { type: "animation"; name: string };

const INLINE_ANIMATION_REGEX = /\[anim:([a-z-]+)\]/g;

export function parseInlineAnimations(content: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(INLINE_ANIMATION_REGEX)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      tokens.push({ type: "text", value: content.slice(lastIndex, matchIndex) });
    }

    tokens.push({ type: "animation", name: match[1] });
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < content.length) {
    tokens.push({ type: "text", value: content.slice(lastIndex) });
  }

  return tokens;
}
