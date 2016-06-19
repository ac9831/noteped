$(function(){
    var angularjs = angular.element('#indexController').scope();
    var height = $(window).height();
    $(window).resize(function() {
        $('ul.lab').css('max-height', height - 190);
        $('ul.memo').css('max-height', height - 150);
    })
    $('ul.lab').css('max-height', height - 190);
    $('ul.memo').css('max-height', height - 150);

    $(document).on("click",'#ex_chk',function(){
        if($('#ex_chk').prop('checked')){
            $('input[type=checkbox]').prop("checked", true);
            $('#selectDel').removeClass('hidden');
        }else{
            $('input[type=checkbox]').prop("checked", false);
            $('#selectDel').addClass('hidden');
        }
    });

       
});