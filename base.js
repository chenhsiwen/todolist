function main(){
	$( function() {
    $( "#main, #done, #delete" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  } );
  tashcan_hover();
  check_hover();
  li_hover();
  add();
  num_items();
  drag();

};
  	
function add(){
	$("#add").click(function(){
    var tmpl = '<li class="editing"><input type="text"><span></span><img src="check_2.png" class="check_2"></li>';
    var main=$("#main");
  	$(tmpl).prependTo(main).find('input').focus();
      main.on('keyup', 'input', function(e){
        var input = $(this), li = input.parents('li');
        if(e.which === 13){
          if(input.val()!=='')
          {
              li.find('span').text( input.val() );
              li.switchClass('editing','holding');
              li_hover();
              revise(); 
              num_items();
          }
          
        } 
      });
      main.find('input').blur(function(){     
        if(main.find('li').hasClass('editing'))
          {
            $(this).parents('li').remove();
          }
        });
      });
   
};
function drag(){
  $( "#main" ).sortable({
    items: "li:not(.editing)",
    scroll: false,
    tolerance: "pointer",
    start:  function( event, ui ) {
        $("#toolbar").animate({opacity:1},700,"swing"); 
        $(ui.item[0]).css({width:"100px",height:"100px",fontSize:"12px",backgroundColor:"#CCC"});
    },
    stop:  function( event, ui ) {
      $("#toolbar").animate({opacity:0},700,"swing"); 
      deleted();
      done();
      $(ui.item[0]).css({fontSize:"18px",backgroundColor:"#f9f9f9"});
      li_hover();
      num_items();
     
    }
  });
};
function revise(){
  $( "#main li" ).dblclick(function(){
    $(this).switchClass('holding',"editing");
    $(this).find('span').text('');
  });
};
function deleted(){
    $("#delete").empty();
};
function done(){
    $("#done li img").css('display',"block");
    $("#done li").appendTo("#main");
    $("#done").empty();
};
function tashcan_hover(){
  $('#delete').mouseover(function(){
    $(this).css('backgroundColor','#D99');
  }); 
  $('#delete').mouseleave(function(){
    $(this).css('backgroundColor','#BBB');
  });
}
function check_hover(){
  $('#done').mouseover(function(){
    $(this).css('backgroundColor','#9D9');
  }); 
  $('#done').mouseleave(function(){
    $(this).css('backgroundColor','#BBB');
  }); 
}
function li_hover(){
  $('#main li').mouseover(function(){
    $(this).css('backgroundColor','#CCC');
  }); 
  $('#main li').mouseleave(function(){
    $(this).css('backgroundColor','#f9f9f9');
  });
}

function num_items(){
  var num= $('#main > li').length;
  var newitems='item '+num;
  $('#num_item').text(newitems);
  
}