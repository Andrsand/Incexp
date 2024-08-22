export const processWeeklyData = (
    data: { day_of_week: number; total: number; }[],
    transactionType: "Income" | "Expense" = "Income"
) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const isIncome = transactionType === "Income";

    let barData = days.map((label) => ({
        label,
        value: 0,
        frontColor: "#d1d15db",
        gradientColor: "#d1d15db",
    }) as any)

    data.forEach((item) => {
        const dayIndex = item.day_of_week;
        if (dayIndex >= 0 && dayIndex < 7) {
            barData[dayIndex].value = item.total;

            if (item.total < 100) {
                barData[dayIndex].frontColor = "#d1d5db";
                barData[dayIndex].gradientColor = "#d1d5db";
            } else {
                barData[dayIndex].frontColor = isIncome ? "#d3ff00" : "#ffab00"; // default income/expense colors
                barData[dayIndex].gradientColor = isIncome ? "#12ff00" : "#ff0000"; // default income/expense gradients
            }
        }
    });

    return barData;
};