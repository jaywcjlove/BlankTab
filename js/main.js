
var storedata = store("maindata");

if(storedata&&storedata.length>0){
    creatElement(storedata)
}else{
    storageSave(maindata)
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

        html += temp('<li class="zoomInDown animated"><a href="$_URL$" title="$_name$"><span style="background:$_bgColor$;">$_content$</span><i>$_name$</i></a></li>',{
            _URL:_maindata[i].url?_maindata[i].url:'',
            _name:_maindata[i].name,
            _bgColor:_maindata[i].bgColor?_maindata[i].bgColor:'#EAEAEA',
            _content:_maindata[i].ico?'<img src="'+_maindata[i].ico+'" />':(_maindata[i].name[0]?_maindata[i].name[0]:"")
        })
    };
    $('#iconList').append(html);

}