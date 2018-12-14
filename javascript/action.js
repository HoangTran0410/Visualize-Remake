// ================== Sort ====================
// https://github.com/HoangTran0410/First_html_css_js/blob/master/sketch.js
var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
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
    var pivotValue =  func(arr[pivot], loai),
        partitionIndex = left;
    
    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue
        || !decrease && func(arr[i], loai) < pivotValue) {
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

// ============== Sort Func ===================
function getValueOfTypeInListCartMusic(cart, type) {
    switch(type) {
        case 'title': return cart.getElementsByClassName('sc-trackname')[0].getElementsByTagName('a')[0].innerHTML;
        case 'like': return cart.getElementsByClassName('fa fa-heart')[0].title;
        case 'plays': return parseInt(cart.getElementsByClassName('fa fa-heart')[0].nextElementSibling.title.split(',').join(''));
        case 'comments': return parseInt(cart.getElementsByClassName('fa fa-comments')[0].title.split(',').join(''));
    }
}

function sortListMusic(container, loai) {
	var carts = container.getElementsByClassName('sc-list-item');
    quickSort(carts, 0, carts.length-1, loai, getValueOfTypeInListCartMusic);
    
    decrease = !decrease;
}