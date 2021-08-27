chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var myPurchaseOrdersJson = [];
    var mySellOrdersJson = [];
    var currentTickers = [];
    if (request.message === 'getData') {
        document.getElementsByClassName('completed-orders sc-bwzfXH hlhjes')[0].click();
        setTimeout(function () {

            var ordersTable = document.querySelector('#root > div > div.sc-feJyhm.gpAVGT > div > div.sc-bdVaJa.sc-fONwsr.dnaAjx > div.sc-krvtoX.dNmKFY.sc-bdVaJa.gUKorA > div.sc-dUjcNx.llrggu > div > div > div.sc-bdVaJa.sc-cbkKFq.cvHzFv > div');
            var orders = ordersTable.getElementsByClassName('sc-bdVaJa sc-bMVAic bXvFFv');
            for (i = 0; i < orders.length; i++) {
                myPurchaseOrdersJson.push(
                    {
                        currency: orders[i].getElementsByClassName('cur-ptr sc-bwzfXH foOypC')[0].getElementsByClassName('underline')[0].innerHTML,
                        amount: orders[i].getElementsByClassName('sc-bdVaJa sc-bAeIUo lmlDNb')[0].getElementsByClassName('underline')[0].innerHTML,
                        price: orders[i].getElementsByClassName('sc-bwzfXH cZVRKS')[0].innerHTML,
                        total: orders[i].getElementsByClassName('sc-bwzfXH bKFhPM')[1].innerHTML
                    });
            }
            var orders = ordersTable.getElementsByClassName('sc-bdVaJa sc-bMVAic fAyjUm');
            for (i = 0; i < orders.length; i++) {
                mySellOrdersJson.push(
                    {
                        currency: orders[i].getElementsByClassName('cur-ptr sc-bwzfXH foOypC')[0].getElementsByClassName('underline')[0].innerHTML,
                        amount: orders[i].getElementsByClassName('sc-bdVaJa sc-bAeIUo lmlDNb')[0].getElementsByClassName('underline')[0].innerHTML,
                        price: orders[i].getElementsByClassName('sc-bwzfXH cZVRKS')[0].innerHTML,
                        total: orders[i].getElementsByClassName('sc-bwzfXH bKFhPM')[1].innerHTML
                    });
            }
            console.log(mySellOrdersJson)
            //Wazirx API call
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.wazirx.com/api/v2/tickers');
            request.send();
            request.onload = () => {
                if (request.status === 200) {
                    currentTickers = JSON.parse(request.response)
                } else {
                    console.log(`error ${request.status} ${request.statusText}`)
                }
            }
            //Wazirx API call end
            setTimeout(function () {
                sendResponse({
                    message: "dataPulled",
                    purchaseOrders: myPurchaseOrdersJson,
                    currentTicker: currentTickers,
                    sellOrders: mySellOrdersJson
                });
            }, 1000);
        }, 200);



    //     document.querySelector("#root > div > nav > div > div.navbar-collapse.collapse > ul:nth-child(1) > li:nth-child(5) > a > div > span").click();
    //     setTimeout(function () {
    //     document.querySelector("#root > div > div.sc-feJyhm.gpAVGT > div > div > div > div.funds-tabs.sc-bdVaJa.gUKorA > div.funds-tablist > div.funds-tablist-item.tab-history").click();
    //     let oTable = document.getElementsByTagName('table');
    //     let data = [...oTable.rows].map(t => [...t.children].map(u => u.innerText))
    //     console.log(data);
    // }, 1000);
        //Send response

        return true;
    }
});