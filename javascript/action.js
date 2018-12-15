//============= Menu Icon ===========
function menuicon_click(x) {
    x.classList.toggle("active");

    if (x.classList.contains('active')) {
        openNav();
    } else {
        closeNav();
    }
}

//============= Off canvas menu ===============
function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//====================== Snack bar =======================
function snackBar(mes, color, bgColor) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = mes;
    x.style.color = color || "#fff";
    x.style.backgroundColor = bgColor;
    console.log(x.style.backgroundColor)

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds  , remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

//===================== Collapsible ======================
function addEventCollapsible() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                // mở content
                content.style.maxHeight = content.scrollHeight + "px";

                // mở rộng tất cả parents của content
                while(content.parentElement.classList.contains('collapsible-content')) {
                    var childScroll = content.scrollHeight;
                    content = content.parentElement;
                    content.style.maxHeight = content.scrollHeight + childScroll + "px";
                }
            }
        });
    }
}

// ================== Sort ====================
var decrease = true; // Sắp xếp giảm dần

// quick sort
function quickSort(arr, left, right, loai, func) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai, func);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai, func);
        quickSort(arr, partitionIndex + 1, right, loai, func);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai, func) {
    var pivotValue = func(arr[pivot], loai),
        partitionIndex = left;

    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue ||
            !decrease && func(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}

// function dùng quicksort
function getValueOfTypeInListCartMusic(cart, type) {
    switch (type) {
        case 'title':
            return cart.getElementsByClassName('sc-trackname')[0].getElementsByTagName('a')[0].innerHTML;
        case 'like':
            return cart.getElementsByClassName('fa fa-heart')[0].title;
        case 'plays':
            return parseInt(cart.getElementsByClassName('fa fa-heart')[0].nextElementSibling.title.split(',').join(''));
        case 'comments':
            return parseInt(cart.getElementsByClassName('fa fa-comments')[0].title.split(',').join(''));
    }
}

function sortListMusic(container, loai) {
    var carts = container.getElementsByClassName('sc-list-item');
    quickSort(carts, 0, carts.length - 1, loai, getValueOfTypeInListCartMusic);

    decrease = !decrease;
}