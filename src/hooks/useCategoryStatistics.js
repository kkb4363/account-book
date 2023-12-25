export default function useCategoryStatistics({ history }) {
  const processHistoryData = () => {
    const categoriesMap = new Map();

    history.forEach((entry) => {
      if (entry.type == "지출") {
        const categoryText = entry.category.text;
        const cost = parseFloat(entry.cost.replace(",", ""));

        if (categoriesMap.has(categoryText)) {
          categoriesMap.set(categoryText, categoriesMap.get(categoryText) + cost);
        } else {
          categoriesMap.set(categoryText, cost);
        }
      }
    });

    const labels = Array.from(categoriesMap.keys());
    const series = Array.from(categoriesMap.values());

    return { labels, series };
  };

  const { labels, series } = processHistoryData();

  return { labels, series };
}
