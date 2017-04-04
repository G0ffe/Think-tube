var state = {
    data: null
    }
;

function getDataFromApi(searchTerm, callback) {
    var query = {
        part: 'snippet',
        key: 'AIzaSyCF8VGQuNU6L2_3PcZmB3JrzZ763Qn0GWg',
        q: searchTerm,
        maxResults: 15,
        type: 'video'

    }
    var url =  'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, query, callback);
}

function getResults (data) {
    state.data = data;
    renderResult(state);
}

$(function () {
    $('#search').submit(function (event) {
        event.preventDefault();
        var search = $('#search-query').val();
        getDataFromApi(search, getResults);
        })
});

function renderResult(state) {
    state.data.items.forEach(function (item) {
        var container = $('.itemContainer.hidden').clone();
        container.find('a').attr('href', `https://www.youtube.com/watch?v=${item.id.videoId}`)
        container.find('h2').html(item.snippet.title);
        container.find('img').attr('src', item.snippet.thumbnails.high.url);
        container.removeClass('hidden');
        $('.data').append(container);
    })
}
