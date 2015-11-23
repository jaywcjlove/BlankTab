// 菜单切换

$(function(){
    $(".sidenav li:first").addClass("active");
    $(".popup .hidden").not(":first").hide(); 
    $(".sidenav li").click(function(){
          $(this).addClass("active").siblings().removeClass("active"); 
          var index = $(".sidenav li").index(this);
          $(".popup .hidden").eq(index).show().siblings().hide();
     })
})

