
var storedata = store("maindata");

if(storedata&&storedata.length>0){
    creatElement(storedata)
}else{
    storageSave(maindata)
}

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

function creatElement(_maindata){
    
    var html = '';

    for (var i = 0; i < _maindata.length; i++) {
        
        html += '<li class="zoomInDown animated"><a href="';
        html += _maindata[i].url?_maindata[i].url:'';
        html += '" title="'+_maindata[i].name+'">'
        if(_maindata[i].bgColor){
            html += '<span style="background:'+_maindata[i].bgColor+';">';
        }else{
            html += '<span style="background:#EAEAEA;">';
        }
        if(_maindata[i].ico){
            html += '<img src="'+_maindata[i].ico+'" />';
        }else{
            html += _maindata[i].name[0]?_maindata[i].name[0]:"";
        }
        html += '</span><i>'+_maindata[i].name+'</i></a></li>';
    };
    $('#iconList').append(html);

}