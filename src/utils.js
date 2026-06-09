export function formatDateToKey(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export function getMondayOfDate(date) {
    const tempDate = new Date(date);
    const day = tempDate.getDay(); 
    const difference = tempDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(tempDate.setDate(difference));
}
