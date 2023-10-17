/**
 * util function to format the search response to
 * have arrays where lists can occur
 */

export function formatSearchResult(result) {
  if (result.length === 0) return result;

  return result.map((res) => {
    return {
      ...res,
      actors: res.actors.split(", "),
      categories: res.categories.split(", "),
    };
  });
}
