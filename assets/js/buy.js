document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.back-button')?.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.referrer) {
            window.location.href = document.referrer;
        } else {
            window.location.href = '/';
        }
    });
    
    const checkoutBtn = document.getElementById('checkout-button');
    const errorMsg = document.getElementById('checkout-error');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault(); 

            fetch('/wp-json/wc/store/v1/cart', {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(cart => {
                const isEmpty = !cart.items || cart.items.length === 0;

                if (isEmpty) {
                    errorMsg.style.display = 'block';
                } else {
                    errorMsg.style.display = 'none';
                    window.location.href = '/checkout/'; 
                }
            })
            .catch(err => {
                console.error('Cart check failed:', err);
                errorMsg.textContent = 'Something went wrong checking your cart. Please try again.';
                errorMsg.style.display = 'block';
            });
        });
    }

});