// ====================== Tạo giao diện cho thẻ của bài nhạc =====================
function cartSCMusic(data, index) {
    var artwork = data.artwork_url || 'img/avatar.svg';
    var username = data.user.username;
    var title = data.title;
    var heart = abbreviateNumber(data.likes_count);
    var comment = abbreviateNumber(data.comment_count);
    var repost = abbreviateNumber(data.reposts_count);

    return `<div class="track">
                <div class="track-position">`+index+`</div>
                <div class="track-artwork">
                    <img src="`+artwork+`" alt="">
                    <button class="track-play" onclick="playUrl('`+data.stream_url+`?client_id=587aa2d384f7333a886010d5f52f302a')"><i class="fa fa-play"></i></button>
                </div>
                <div class="track-detail">
                    <div class="track-username">
                        <a target="_blank" href="">`+username+`</a>
                    </div>
                    <div class="track-title">
                        <a target="_blank" href="" title="`+title+`">`+title+`</a>
                    </div>
                </div>
                <div class="track-stats">
                    <i class="fa fa-heart" title="`+data.likes_count.toLocaleString()+` likes"> `+heart+`</i> 
                    <i class="fa fa-comment" title="`+data.comment_count.toLocaleString()+` comments"> `+comment+`</i>
                    <i class="fa fa-refresh" title="`+data.reposts_count.toLocaleString()+` reposts"> `+repost+`</i>
                </div>
                <div class="track-action">
                    <button><i class="fa fa-plus"></i> Add to Playlist</button>
                </div>
            </div>`
}

function abbreviateNumber(num, fixed) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
    return e;
}