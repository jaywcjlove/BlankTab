
var storedata = store("maindata");


//删除数组中的元素
Array.prototype.remove=function(dx){ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) { 
        if(this[i]!=this[dx]) { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
    return this
} 

if(storedata&&storedata.length>0){
    creatElement(storedata)
}else{
    storageSave(maindata)
}

// 屏蔽右键菜单 动画
$('body').on('click',function(){
    $('#iconList li a').removeClass('animated shakeSlow');
    // $('#iconList li a').addClass('animated flipOutX');
    $('#iconList li div.close').css({
        "visibility": 'hidden'
    });
}).on('contextmenu',function(){
    $('#iconList li a').addClass('animated shakeSlow');
    $('#iconList li div.close').css({
        "visibility": 'inherit'
    }).on('click',function(){
        
        var url = $(this).next().attr('href');
        if(url){
            $(this).parent().remove();
            removeItem(url)
        }
        
    })
    return false;
})

function removeItem(url,cb){

    var storedata = store("maindata"),idx = '';

    for (var i = 0; i < storedata.length; i++) {
        if(storedata[i].url === url) idx = i;
    };

    if(idx !== ''){
        storedata.remove(idx)
        store("maindata",storedata)
    }

}

// 默认展示十条数据
function storageSave(_data){

    var _maindata=[];
    if(_data&&_data.length&&_data.length>10){
        for (var i = 0; i < 10; i++) {
            _maindata.push(_data[i])
        };
    }else{
        _maindata.push(_data)
    }
    store("maindata", _maindata);
    creatElement(_maindata)
}

// 根据本地存储的数据生成节点信息
function creatElement(_maindata){
    
    var html = '';

    for (var i = 0; i < _maindata.length; i++) {

        html += temp('<li class="zoomInDown animated"><div class="close"></div><a href="$_URL$" title="$_name$"><span style="background:$_bgColor$;">$_content$</span><i class="name">$_name$</i></a></li>',{
            _URL:_maindata[i].url?_maindata[i].url:'',
            _name:_maindata[i].name,
            _bgColor:_maindata[i].bgColor?_maindata[i].bgColor:'#EAEAEA',
            _content:_maindata[i].ico?'<img src="'+_maindata[i].ico+'" />':(_maindata[i].name[0]?_maindata[i].name[0]:"")
        })
    };
    $('#iconList').append(html);

}