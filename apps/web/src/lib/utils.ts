import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getLast12MonthsWithCount(data: any) {
    // Get the current date
    const currentDate = new Date();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getMonthName = (date: any) => monthNames[date.getMonth()];

    // Create an array to store the last 12 months, with count set to 0 initially
    let monthsArray = [];
    for (let i = 0; i < 12; i++) {
        const tempDate = new Date();
        tempDate.setMonth(currentDate.getMonth() - i);
        monthsArray.push({
            month: getMonthName(tempDate),
            year: tempDate.getFullYear(),
            count: 0  // Initialize count to 0 for all months
        });
    }

    data.forEach(item => {
        const monthIndex = monthsArray.findIndex(m => m.month === item.month && m.year === item.year);
        if (monthIndex !== -1) {
            monthsArray[monthIndex].count = item.count;  // Update the count if data exists
        }
    });

    return monthsArray;
}
