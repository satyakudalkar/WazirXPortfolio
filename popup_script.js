chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
        message: "getData"
    }, response => {
        console.log(response.sellOrders)
        let purchaseOrders = response.purchaseOrders;
        let tickers = response.currentTicker;
        let sellOrders = response.sellOrders;
        var items = [];
        purchaseOrders.forEach(purchaseOrder => {
            var currentAmount = parseFloat(purchaseOrder.amount);
            sellOrders.forEach(sellOrder =>{
                if(purchaseOrder.currency == sellOrder.currency){
                    currentAmount = parseFloat(purchaseOrder.amount)-parseFloat(sellOrder.amount);
                }
            });
            var currency = purchaseOrder.currency += 'inr';
            var profitLoss = (parseFloat(tickers[currency].last) - parseFloat(purchaseOrder.price)) * parseFloat(currentAmount);
            items.push(
                {
                    currency: currency,
                    amount: currentAmount,
                    purchasePrice: purchaseOrder.price,
                    currentPrice: tickers[currency].last,
                    profit: profitLoss
                });
        });
        loadTableData(items);
    });
});

function loadTableData(items) {
    const table = document.getElementById("tableBody");
    var counter = 1;
    var purchaseTotal = 0.0;
    var currentTotal = 0.0;
    var netProfit = 0.0;
    items.forEach(item => {
        let row = table.insertRow();
        let serial = row.insertCell(0);
        serial.innerHTML = counter++;
        let currency = row.insertCell(1);
        currency.innerHTML = item.currency;
        let amount = row.insertCell(2);
        amount.innerHTML = item.amount;
        let purchasePrice = row.insertCell(3);
        purchasePrice.innerHTML = item.purchasePrice;
        let currentPrice = row.insertCell(4);
        currentPrice.innerHTML = item.currentPrice;
        let profit = row.insertCell(5);
        profit.innerHTML = item.profit;
        purchaseTotal += parseFloat(item.purchasePrice)*item.amount;
        currentTotal += parseFloat(item.currentPrice)*item.amount;
        netProfit += parseFloat(item.profit);
    });
    const foot = document.getElementById("tableFoot");
    var row = foot.insertRow();
    row.insertCell(0).outerHTML = "<th colspan=3 style=\"text-align:right\">Total</th>";
    row.insertCell(1).innerHTML = purchaseTotal;
    row.insertCell(2).innerHTML = currentTotal;
    row.insertCell(3).innerHTML = netProfit;
}
