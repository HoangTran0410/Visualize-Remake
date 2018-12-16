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

var list_searched = [];
// Hàm tìm kiếm cho phần tìm kiếm nhạc soundcloud
function searchBtn(type, pageIndex, clear) {
    var value = document.getElementsByName('search')[0].value;
    var resultDiv = document.getElementsByClassName('result-search')[0];
    var genres_type = document.getElementById('genres-type').value;

    loading(true);
    openCollapse(resultDiv);
    var dataSearch = {
        q: value,
        limit: 20,
        linked_partitioning: 1,
        offset: Number(pageIndex || 1) * 20
    }
    if(genres_type != 'all') {
        dataSearch.genres = genres_type;
    }
    console.log(dataSearch);

    searchSC(type, dataSearch,
        function (data) {
            console.log(data);

            if (clear) {
                resultDiv.innerHTML = ``;
                list_searched = [];
            } 

            if(data.collection.length) {
                for (var i = 0; i < data.collection.length; i++) {
                    var cart = cartSCMusic(data.collection[i], list_searched.length+1);
                    list_searched.push(cart);
                    resultDiv.appendChild(cart);
                }

            } else {
                resultDiv.innerHTML = `<h2 style="color: red; text-align: center"> No Result </h2>`;
            }
            

            loading(false);
            openCollapse(resultDiv);
            checkNextPages(data, pageIndex);
        });
}

function loading(on) {
    document.getElementById('loader-search').style.display = (on ? 'block' : 'none');
}

function checkNextPages(data, pageIndex) {
    var more = document.getElementById('more-search');
    if (data.next_href) {
        more.style.visibility = "visible";
        more.dataset.page = (pageIndex ? Number(pageIndex) + 1 : 2);
    } else {
        more.style.visibility = "hidden";
        more.dataset.page = null;
    }
}

function getMore(btnMore, type) {
    var pages = btnMore.dataset.page;
    if (pages) {
        searchBtn(type, pages);
    }
}

// ======================== Zing Mp3 ================================
// https://mp3.zing.vn/xhr/chart-realtime?chart=song&time=-1&count=10
// https://mp3.zing.vn/xhr/recommend?target=%23block-recommend&count=10&start=0&artistid=IWZ96FZE&type=audio&id=ZW9DFW9A
// https://mp3.zing.vn/xhr/log/get-info?id=ZW9DFW8O&type=bai-hat

function topZingBtn() {
    var resultDiv = document.getElementsByClassName('result-search')[0];
    openCollapse(resultDiv);
    loading(true);

    resultDiv.innerHTML = '';
    list_searched = [];

    getChartsZing(100, function(charts){
        for(var i = 0; i < charts.data.song.length; i++) {

            getTrackZing(charts.data.song[i].code, function(t) {
                var cart = cartZingMusic(t, list_searched.length+1);
                list_searched.push(cart);
                resultDiv.appendChild(cart);

                openCollapse(resultDiv);
            })
        }

        loading(false);
    })
}

function getTrackZing(codeId, func) {
    loadJSON("https://mp3.zing.vn/xhr/media/get-source?type=audio&key="+codeId, function(data){
        func(data);
    }, function(error) {
        console.log(error);
    });
}

function getChartsZing(count, func) {
    var xhr = 'https://mp3.zing.vn/xhr/chart-realtime?chart=song&time=-1&count=';
    loadJSON(xhr+count, function(data){
        func(data);
    }, function(error) {
        alert(error);
    })
}

function getPageId(page) {
    var t = page.split("/");
    return t.length >= 6 ? t[5].substring(0, 8) : "";
}

function testZingMp3() {
    getChartsZing(20, function(charts){
        for(var track of charts.data.song) {
            getTrackZing(track.code, function(t) {
                console.log(t);
            })
        }
    })
}