const displayTNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-TN', {
        style: 'currency',
        currency: 'TND',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
};

export default displayTNDCurrency;

