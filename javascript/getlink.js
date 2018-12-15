// =================== Hàm tìm kiếm nền(cấu tạo nên những hàm khác) ===================
function searchSC(type, dataSearch, func) {
    SC.get(type, dataSearch).then(function (data) {
        func(data);

    }).catch(function (error) {
        alert('Error: ' + error.message);
    });
}

function searchSC_url(url, func) {
    SC.resolve(url).then(function (data) {
            func(data);
        })
        .catch(function (error) {
            alert('Error: ' + error.message);
        });
}

// Hàm tìm kiếm cho phần tìm kiếm nhạc soundcloud
function searchBtn(btn, type, pageIndex, clear) {
    var value = btn.previousElementSibling.value;
    var collapsible_content = btn.parentElement.parentElement;
    var resultDiv = collapsible_content.getElementsByClassName('result-search')[0];
    
    collapsible_content.getElementsByClassName('loader')[0].style.display = 'block';

    openCollapse(resultDiv);

    searchSC(type, {
        q: value,
        limit: 20,
        linked_partitioning: 1,
        offset: Number(pageIndex||1)*20
    }, function (data) {
        console.log(data);

        if(clear) resultDiv.innerHTML = ``;
        for (var i = 0; i < data.collection.length; i++) {
            resultDiv.innerHTML += cartSCMusic(data.collection[i], i+1);
        }
        collapsible_content.getElementsByClassName('loader')[0].style.display = 'none';
        openCollapse(resultDiv);

        var more = collapsible_content.getElementsByClassName('more')[0].getElementsByTagName('button')[0];
        if(data.next_href) {
            more.style.visibility = "visible";
            more.dataset.page = (pageIndex?Number(pageIndex)+1:2);
        } else {
            more.style.visibility = "hidden";
            more.dataset.page = null;
        }
    });
}

function getMore(btnMore, type) {
    var pages = btnMore.dataset.page;
    if(pages) {
        var btn = btnMore.parentElement.parentElement.getElementsByClassName('search-container')[0].getElementsByTagName('button')[0];
        searchBtn(btn, type, pages);
    }
}


// ======================== Zing Mp3 ================================
function getLink_ZingMp3(idSong) {

}