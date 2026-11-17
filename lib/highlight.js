// OpenSearch highlight fragments are stored text plus the pre/post tags from
// the query. The query wraps matches in control characters instead of HTML,
// so the fragments can be rendered as React text nodes. Nothing returned by
// the index is ever parsed as HTML.
export const HIGHLIGHT_START = "\u0001";
export const HIGHLIGHT_END = "\u0002";

export function splitHighlight(text) {
    if (typeof text !== "string" || text.length === 0) {
        return [];
    }

    const segments = [];
    let rest = text;

    while (rest.length > 0) {
        const start = rest.indexOf(HIGHLIGHT_START);
        if (start === -1) {
            segments.push({ text: rest, highlighted: false });
            break;
        }
        if (start > 0) {
            segments.push({ text: rest.slice(0, start), highlighted: false });
        }
        const end = rest.indexOf(HIGHLIGHT_END, start + 1);
        if (end === -1) {
            segments.push({ text: rest.slice(start + 1), highlighted: false });
            break;
        }
        segments.push({ text: rest.slice(start + 1, end), highlighted: true });
        rest = rest.slice(end + 1);
    }

    return segments;
}
