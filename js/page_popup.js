    
chrome.tabs.getSelected(function(tab){

    $('#addTitle').val(tab.title)

    if(tab.favIconUrl){
        $('#icon').html('<img src="'+tab.favIconUrl+'"/>')
    }
    $('#icon').data('url',tab.url)

    var setdata = {
        "type":"ico",
        "name":tab.title,
        "ico":tab.favIconUrl,
        "bgColor":"#EAEAEA",
        "url":tab.url
    }

    if( tab.url==='chrome://newtab/'){
        $('#addItem').attr('disabled','disabled')
    }

    // 是否存在于列表里面
    if(isIndexItem(tab.url)){
        $('#addItem').addClass('disabled').attr('disabled','disabled')
    }

    // 点击添加 导航
    $('#addItem').click(function(){

        if(!isIndexItem(tab.url)){
            var maindata = store('maindata')
            maindata.push(setdata);
            store('maindata',maindata);
            $(this).addClass('disabled').attr('disabled','disabled')
        }

    })

})


function isIndexItem(url){

    var maindata = store('maindata'),isIndex = false;
    maindata.forEach(function(item){
        if(item.url === url) isIndex = true;
    })

    return isIndex

}