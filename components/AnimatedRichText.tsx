"use client";

import { parseInlineAnimations } from "@/lib/inlineAnimations";
import { InlineAnimation } from "@/components/InlineAnimation";

type AnimatedRichTextProps = {
  content: string;
};

export function AnimatedRichText({ content }: AnimatedRichTextProps) {
  const tokens = parseInlineAnimations(content);

  return (
    <p className="leading-8 text-slate-100 whitespace-pre-wrap">
      {tokens.map((token, index) => {
        if (token.type === "text") {
          return <span key={`text-${index}`}>{token.value}</span>;
        }

        return <InlineAnimation key={`anim-${index}`} name={token.name} />;
      })}
    </p>
  );
}
