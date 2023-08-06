const purchaseForm = document.getElementById("purchaseForm");
const homeButton = document.getElementById("homeButton");

purchaseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const idCart = getCookie("cidId");
    if (idCart !== undefined && idCart !== "") {
        const actionUrl = `/api/cart/purchase/${idCart}`;

        fetch(actionUrl, {
            method: "POST" 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            deleteCookie("cidId");
            window.location.href = "/";
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        window.location.href = "/";
    }
});
    homeButton.addEventListener("click", function() {
    window.location.href = "/";
});



