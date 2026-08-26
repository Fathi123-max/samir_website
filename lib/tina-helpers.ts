// Helpers for wrapping codegen data in a Tina-compatible format
// so useTina works as a no-op fallback when Tina server is not running.

export function tinaField<T>(data: T, _query?: string, _variables?: Record<string, unknown>) {
  // In production (no Tina server), useTina returns data unchanged.
  // We construct a minimal response that matches Tina's shape.
  return data as T;
}

/**
 * Wrap a singleton document (personalInfo, siteSettings) for useTina.
 * Returns { data, query, variables } shape that useTina expects.
 */
export function wrapSingleton<T>(
  data: T,
  query: string,
  variables: Record<string, unknown> = {}
): { data: T; query: string; variables: Record<string, unknown> } {
  return { data, query, variables };
}

/**
 * Wrap a collection connection for useTina.
 * Transforms edges[].node.data → array of items, preserving Tina shape.
 */
export function wrapCollection<T>(
  items: T[],
  query: string,
  variables: Record<string, unknown> = {}
): { data: { edges: { node: { data: T; id?: string } }[] }; query: string; variables: Record<string, unknown> } {
  return {
    data: {
      edges: items.map((item) => ({
        node: {
          data: item,
          id: typeof item === "object" && item !== null && "id" in item
            ? (item as Record<string, unknown>).id as string
            : undefined,
        },
      })),
    },
    query,
    variables,
  };
}

/**
 * Transform Tina connection response back to a flat array.
 * Used to extract collection items from useTina output.
 */
export function extractCollection<T>(
  tinaData: { edges: { node: { data: T } }[] } | undefined
): T[] {
  if (!tinaData?.edges) return [];
  return tinaData.edges.map((edge) => edge.node.data);
}
