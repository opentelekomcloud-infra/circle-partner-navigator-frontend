export const SUPPORTED_LOCALES = ["de", "en"];
export const DEFAULT_LOCALE = "en";

// The first path segment is attacker-controlled and used to build the
// OpenSearch index name. Only ever return a known locale.
export function normaliseLocale(value) {
    return SUPPORTED_LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}
