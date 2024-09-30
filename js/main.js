
// Mobile Navbar side 
let barIcon = document.querySelector('.nav-bar');
let mobileNav = document.querySelector(".navMobileLayer");
let closeIcon = document.querySelector(".fa-close");
//-------------------------------------------------------------- 
// increase and decrease items
let plusItem = document.querySelector(".plus");
let delItem = document.querySelector(".mines");
let itemNum = document.querySelector(".showNum");
let addBtn = document.querySelector(".addBtn");
// --------------------------------------------------------------
// slider arrow and img
let rightArrow = document.querySelector('.layerRightArrow');
let leftArrow = document.querySelector('.layerLeftArrow');
let currentRightArrow = document.querySelector('.currentRightArrow');
let currentLeftArrow = document.querySelector('.currentLeftArrow');
let currentImg = document.querySelector('.live img');
let thumbnailImg = document.querySelectorAll('.thumbnail img');
let reviewLayer = document.querySelector('.imageLayer');
let reviewImage = document.querySelector('.imageLayer img');
let activeThumbnail = document.querySelector('.thumbnail .active');
let thumbnailFig = document.querySelectorAll('.thumbnail figure');
let itemName = document.querySelector('.itemDetails h3');
let itemPrice = document.querySelector('.price');
// --------------------------------------------------------------------
// card content
let cardIcon = document.querySelector('.fa-cart-shopping');
let card = document.querySelector('.card');
let cardList = document.querySelector('.cardList');
// --------------------------------------------------------------------

let index = 0;
listOfImage = Array.from(thumbnailFig);
let allProduct = []


function displayMobileNav () {
    mobileNav.classList.toggle("hide");
}

function addItem () {
    let val = Number(itemNum.innerHTML);
    val++;
    itemNum.innerHTML = val;
}

function deleteItem () {
    let val = Number(itemNum.innerHTML);
    if (val != 0) {
        val--;
        itemNum.innerHTML = val;
    }
}

function getNextImg (element) {
    thumbnailFig[index].classList.toggle('active');
    index++;
    if(index >= thumbnailFig.length ) {
        index = 0
    }
    let nextSrc =  thumbnailImg[index].getAttribute("Src");
    element.src = nextSrc;
    thumbnailFig[index].classList.toggle('active');
}

function getPrevImg (element) {
    thumbnailFig[index].classList.toggle('active');
    index--;
    if(index < 0 ) {
        index = 3
    }
    let nextSrc =  thumbnailImg[index].getAttribute("Src");
    element.src = nextSrc;
    thumbnailFig[index].classList.toggle('active');
}

function showCurrent () {
    let newS = currentImg.getAttribute("Src");
    reviewImage.src = newS
    reviewLayer.classList.toggle("hide");
}

function displayCard() {
    card.classList.toggle("hide");
}

function addItemToCard() {
    
    let flag = false;
    item = {
        imageSrc: currentImg.getAttribute("Src"),
        head: itemName.innerHTML,
        price: itemPrice.innerHTML,
        num: itemNum.innerHTML,
        finalRes: Number(itemPrice.innerHTML.replace("$","")) * Number(itemNum.innerHTML),
    };

    for (let i = 0; i < allProduct.length; i++) {
        if (allProduct[i].head == item.head) {
            allProduct.splice(i,1);
            allProduct.push(item);
            flag = true;
        } if (allProduct[i].head == item.head && item.num == 0) {
            removeProduct(i);
        }
        
    }

    if (flag != true && item.num != "0") {
        allProduct.push(item);
    }
    displayProduct();
}

function displayProduct() {
    
    box = ""

    for (let i = 0; i < allProduct.length; i++) {
        box += `
        <figure class="d-flex align-items-center p-2">
            <img class="w-25" src="${allProduct[i].imageSrc}" alt="productImage"/>
            <figcaption class="d-flex ms-3 me-3 flex-column">
                <h3 class="fs-6 fw-bold">${allProduct[i].head}</h3>
                <p class="fs-6 opacity-75">
                    $${allProduct[i].price} x ${allProduct[i].num}
                    <span class="fw-bold opacity-100 text-black">$${allProduct[i].finalRes}</span>
                </p>
            </figcaption>
            <i onClick="removeProduct(${i})" class="fa fa-remove"></i>
        </figure>
        <button class = "btn btn-lg btn-warning text-white" >Checkout</button>
        `;
    }

    cardList.innerHTML = box;
}

function removeProduct(ind) {
    allProduct.splice(ind,1);
    displayProduct();
}


barIcon.addEventListener("click",displayMobileNav);
closeIcon.addEventListener("click",displayMobileNav);
plusItem.addEventListener("click", addItem);
delItem.addEventListener("click", deleteItem);
currentImg.addEventListener("click" , showCurrent);
cardIcon.addEventListener("click",displayCard);
addBtn.addEventListener("click",addItemToCard);

rightArrow.addEventListener("click" , function(){
    getNextImg(reviewImage);
});
leftArrow.addEventListener("click" , function() {
    getPrevImg(reviewImage);
});

currentRightArrow.addEventListener("click" , function(){
    getNextImg(currentImg);
});
currentLeftArrow.addEventListener("click" , function() {
    getPrevImg(currentImg);
});

for (let i = 0; i < thumbnailImg.length; i++) {
    thumbnailFig[i].addEventListener("click",function(e) {
        index =  listOfImage.indexOf(thumbnailFig[i]);
        let newSrc = thumbnailImg[index].getAttribute("Src");
        reviewImage.src = newSrc;
        currentImg.src = newSrc;
        reviewLayer.classList.toggle("hide");
    })
    
}
reviewLayer.addEventListener("click" ,function(e){
    if (e.target != reviewImage && e.target!= rightArrow && e.target != leftArrow) {
        reviewLayer.classList.toggle('hide');
    }
})


