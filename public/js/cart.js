const addProdCartForm = document.querySelectorAll(".addToCartForm");
const pidElement = document.querySelectorAll(".pid")
const cid = getCookie("cidId");
addProdCartForm.forEach((form, index) =>{
const pid = pidElement[index].getAttribute("data-id")
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const actionUrl = `/api/cart/add/${cid}/${pid}`;

        fetch(actionUrl, {
            method: "POST",
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data); 
        })
        .catch(error => {
        console.error(error);
        });
    });
})

const removeFromCartForms = document.querySelectorAll(".removeFromCartForm");
const idCid = getCookie("cidId");
removeFromCartForms.forEach((form, index) => {
    const pid = pidElement[index].getAttribute("data-id")
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const actionUrl = `/api/cart/${idCid}/products/${pid}`;

        fetch(actionUrl, {
            method: "DELETE",
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data); 
        })
        .catch(error => {
        console.error(error);
        });
    });
});

