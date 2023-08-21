

let serialNumber = 1;
let total = 0;
const selectedItems = {};
let discountApplied = false;

function updateTotalAndDiscount() {
    const totalPriceElement = document.getElementById('totalPrice');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    const couponCodeApplyButton = document.getElementById('couponCodeApply');

    const totalPrice = parseFloat(totalPriceElement.innerText);

    if (totalPrice >= 200) {
        couponCodeApplyButton.disabled = false; 
    } else { // Disable the button
        discountApplied = false;
        discountElement.innerText = '00';
        totalElement.innerText = totalPrice.toFixed(2);
    }

    if (discountApplied) {
        const discountAmount = totalPrice * 0.2;
        discountElement.innerText = discountAmount.toFixed(2);
        totalElement.innerText = (totalPrice - discountAmount).toFixed(2);
    }
}

function applyDiscountCode() {
    const enteredCode = document.getElementById('couponCode').value;
    const correctCode = 'SELL200';

    if (enteredCode === correctCode) {
        discountApplied = true;
        updateTotalAndDiscount();
    } else {
        alert("Invalid discount code. Please enter the correct code.");
    }
}

function handleClick(target) {
    const selectedItemsContainer = document.getElementById('selected-items');
    const itemName = target.parentNode.querySelector('h3').innerText;

    if (Object.keys(selectedItems).length >= 5) {
        alert("You can only select up to five items.");
        return;
    }

    if (!selectedItems[itemName]) {
        const ol = document.createElement('ol');
        ol.innerText = `${serialNumber}. ${itemName}`;
        selectedItemsContainer.appendChild(ol);

        serialNumber++;
        selectedItems[itemName] = true;
    }

    const price = parseFloat(target.parentNode.querySelector('p').innerText.split(" ")[0]);
    total += price;

    document.getElementById('totalPrice').innerText = total;
    document.getElementById('total').innerText = total;

    updateTotalAndDiscount();
}

document.getElementById('couponCodeApply').addEventListener('click', applyDiscountCode);
document.getElementById('makePurchase').addEventListener('click', function() {
    if (!discountApplied && total >= 200) {
        applyDiscountCode(); 
    }
});














