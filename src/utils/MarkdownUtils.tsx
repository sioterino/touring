import { type ReactNode, } from "react";

/* ─────────────────────────────────────────────
   Simple markdown-ish parser
   Supports: **bold**, *italic*, `code`, and
   unordered lists via lines starting with "- "
  ───────────────────────────────────────────── */

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Regex order matters: bold (**) before italic (*)
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      nodes.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[4]) {
      // *italic*
      nodes.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[6]) {
      // `code`
      nodes.push(<code key={match.index}>{match[6]}</code>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function parseMarkdown(text: string): ReactNode {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={key++}>{listItems}</ul>);
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Unordered list item
    if (/^\s*[-*]\s+/.test(line)) {
      const content = line.replace(/^\s*[-*]\s+/, "");
      listItems.push(<li key={key++}>{parseInline(content)}</li>);
      continue;
    }

    // Blank line — flush list, skip
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // Normal paragraph
    flushList();
    elements.push(<p key={key++}>{parseInline(line)}</p>);
  }

  flushList();
  return <>{elements}</>;
}

export { parseInline, parseMarkdown }