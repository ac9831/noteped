'use strict';
angular.module('notepadApp')
.controller('indexController', ['$scope','$http','$state','$stateParams',  function($scope, $http, $state, $stateParams) {

    $scope.labelData = {id:0, title:"전체보기"};
    $scope.labels = {};
    $scope.labelLength = 0;
    $scope.labelId = 0;
    $scope.addLabelF = false;
    $scope.labelEditF = false;

    $scope.memoTotalNum = 0;
    $scope.memoLength = new Array();
    $scope.memos = {};
    $scope.memoData = {};
    $scope.memoId = 0;
    $scope.memoTitleF = false;
    $scope.memoContentF = false;
    $scope.memoConf = "";
    $scope.memoArray = [];

    $scope.formDataLabel = {};
    $scope.formDataMemo = {};
    
    $scope.labelConf = false;
    $scope.memoF = false;

    // Label 부분
    $scope.callLabel = function(){
        $http.get('/label/all')
            .success(function(data){
                $scope.labels = data;
                $scope.labelLength = $scope.labels.length;
                $scope.memoNum(data);
            })
            .error(function(data){
                console.log('Error :' + data);
            })
    }


    $scope.memoNum = function(data){
        $scope.memoLength = new Array();
        for(var i=0;i<$scope.labelLength;i++){
            (function(i){
                $scope.labelMemoNum(data[i].id);
            })(i);
        }
    };

    $scope.labelEdit = function(){
        if($scope.labelConf){
            $scope.labelEditF = true;
            $('#labelTitleEdit').focus();
        }
    }

    $scope.allLabel = function(){
        $('ul.lab').find('li').removeClass('select');
        $http.get('/label/all')
            .success(function(data){
                $scope.labelData = {id:0, title:"전체보기"};
                $scope.labelLength = data.length;
                $scope.labelId = 0;
                $scope.allMemo();
                $scope.memoNum(data);
                $scope.labelConf = false;
            })
            .error(function(data){
                console.log('Error :' + data);
            })
    }
    
    $scope.oneLabel = function(id){
        $scope.labelEditF = false;
        $http.get('/label/' + id)
            .success(function(data){
                $scope.labelData = data;
                $scope.findLabelMemo(data.id);
                $scope.labelid = id;
            })
            .error(function(e){
                console.log(e);
            })
        $scope.labelConf = true;
    }

    $scope.createLabel = function(){
        if($('#labelForm').find("input:text[name=title]").val() == ''){
            $('#labelTitle').addClass("has-error");
            $('.control-label').removeClass("hidden");
        }else{
            $('#labelTitle').removeClass("has-error");
            $('.control-label').addClass("hidden");
            $http.post('/label/',$scope.formDataLabel)
                .success(function(data){
                    $scope.formDataLabel = {};
                    $scope.callLabel();
                    $scope.addLabelF = false;
                })
                .error(function(data){
                    console.log('Error :' + data);
                });

        }
    }

    $scope.updateLabel = function(){
        $http.post('/label/upd', $scope.labelData)
            .success(function(data){

            })
            .error(function(data){
                console.log('Error :' + data)
            })
    }

    $scope.deleteLabel = function(id){
        if(confirm("라벨을 삭제하겠습니까?")){
            $http.delete('/label/del/'+id)
                .success(function(data){
                    console.log(data);
                    $scope.callLabel();
                    $state.go("note");
                })
                .error(function(data){
                    console.log(data);
                })

        }else{
            return;
        }

    }


    $scope.addLabelFunction = function(){
        if($scope.addLabelF){
            $scope.formDataLabel.title = "";
            $scope.addLabelF = false;
        }else{
            $scope.addLabelF = true;
        }
    }

    $scope.editLabel = function(){
        if($('#labelTitleEdit').val() == ''){
            $('#labelError').addClass("has-error");
            $('#labelError').removeClass("hidden");
        }else {
            $scope.updateLabel();
            $scope.labelEditF = false;
            $scope.oneLabel($scope.labelData.id);
            $scope.callLabel();
        }
    };

    $scope.switchLabelTitle = function(){
        $scope.labelEditF = false;
    }



    // Memo 부분
    $scope.allMemo = function(){
        $http.get('/memo/all')
            .success(function(data){
                $scope.memos = data;
                $scope.memoTotalNum = data.length;

                $scope.checkEvent(0);
            })
            .error(function(data){
                console.log(data);
            })
    }



    $scope.findLabelMemo = function(labelid){
        $http.get('/labelToMemo/label/' + labelid)
            .success(function(data){
                $scope.memos = data;
                if(data == null || data.length == 0){
                    $scope.memoConf = "라벨에 등록된 메모가 없습니다.";
                }else{
                    $scope.memoConf = "메모를 선택해 주세요.";
                    $scope.checkEvent(1);
                }

            })
            .error(function(e){
                console.log(e);
            });
    };



    $scope.labelMemoNum = function(labelid){
        $http.get('/labelToMemo/label/' + labelid)
            .success(function(data){
                if(data != null){
                    $scope.memoLength[labelid] = data.length;
                }else{
                    $scope.memoLength[labelid] = 0;
                }


            })
            .error(function(e){
                console.log(e);
            });

    };

    $scope.oneMemo = function(id){
        $scope.memoId = id;
        $scope.memoF = true;
        $http.get('/memo/' + id)
            .success(function(data){
                $scope.memoData = data;
            })
            .error(function(e){
                console.log(e);
            });
    };

    $scope.createMemo = function(labelId){
        $scope.memoData = {title:"새 메모 추가",content:"새 메모를 추가합니다.",labelId : labelId};
        $http.post('/memo/',$scope.memoData)
            .success(function(data){
                var label_memo = {memoId : data.id, labelId : labelId};
                $http.post('/labelToMemo/add', label_memo)
                    .success(function(data){
                        $scope.callLabel();
                        $scope.oneLabel(data.labelId);
                        $scope.findLabelMemo(data.labelId);
                        $scope.callTotalMemoNum();
                    })
                    .error(function(e){
                        console.log(e);
                    })
            })
            .error(function(e){
                console.log(e);
            })

    }

    $scope.updateMemo = function(){
        $http.post('/memo/upd', $scope.memoData)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            })
    }

    $scope.callTotalMemoNum = function(){
        $http.get('/memo/all')
        .success(function(data){
            $scope.memoTotalNum = data.length;
        })
        .error(function(e){
            console.log(e);
        })
    }
    
    $scope.deleteMemo = function(id){
        if(confirm("메모를 삭제하겠습니까?")) {
            $http.delete('/memo/del/' + id)
                .success(function (data) {
                    $scope.callLabel();
                    if($scope.labelid > 0){
                        $scope.findLabelMemo($scope.labelid);
                        $scope.callTotalMemoNum()
                    }else{
                        $scope.allMemo();
                    }

                    $scope.memoId = 0;
                })
                .error(function (data) {
                    console.log(data);
                })
        }else{
            return;
        }
    }

    $scope.deleteMemos = function(){
        if(confirm("메모를 삭제하겠습니까?")) {
            $http.delete('/memo/del/' + id)
                .success(function (data) {
                    $scope.callLabel();
                    if($scope.labelid > 0){
                        $scope.findLabelMemo($scope.labelid);
                        $scope.callTotalMemoNum()
                    }else{
                        $scope.allMemo();
                    }

                    $scope.memoId = 0;
                })
                .error(function (data) {
                    console.log(data);
                })
        }else{
            return;
        }
    }

    $scope.memoTitleEdit = function(){

        $scope.memoTitleF = true;
        $('#memoTitle').focus();
    }
    $scope.memoContentEdit = function(){

        $scope.memoContentF = true;
        $('#memoContent').focus();
    }

    $scope.switchMemoTitle = function(){
        $scope.memoTitleF = false;
    }

    $scope.switchMemoContent = function(){
        $scope.memoContentF = false;
    }

    $scope.selectMemo = function(){
        
        $('li#memoList' + $stateParams.memoid).addClass('select');
    }
    
    $scope.selectLabel = function(){
        $('ul.lab').find('li').removeClass('select');
        $('li#label'+$scope.labelData.id).addClass('select');
    }

    $scope.editMemoTitle = function(){
        if($('#memoTitle').val() == ''){
            $('#memoError').addClass("has-error");
            $('.memoError').removeClass("hidden");
        }else {
            $scope.updateMemo();
            $scope.memoTitleF = false;
            $scope.findLabelMemo($scope.memoData.labelid);
        }
    }

    $scope.editMemoContent = function(){
        $scope.updateMemo();
        $scope.memoContentF = false;
        $scope.findLabelMemo($scope.memoData.labelid);
    }


    if(Object.keys($stateParams).length){
        $scope.callTotalMemoNum();
        if($stateParams.memoid){
            if($stateParams.labelid < 1){
                $scope.callLabel();
                $scope.allMemo();
                $scope.oneMemo($stateParams.memoid);
            }else{
                $scope.callLabel();
                $scope.oneLabel($stateParams.labelid);
                $scope.oneMemo($stateParams.memoid);
            }
        }else if($stateParams.labelid){
            $scope.callLabel();
            $scope.oneLabel($stateParams.labelid);
        }

    }else{
        $scope.callLabel();
        $scope.allMemo();
    }

    $('#labelTitleEdit').blur(function(){
        $scope.editLabel();
    });

    $scope.checkEvent = function(num){
        for(var i=0;i<$scope.memos.length;i++){
            var id;
            if(num == 1){
                id = "#check" + $scope.memos[i].memo.id;
                $scope.memos[i] = $scope.memos[i].memo;
            }else{
                id = "#check" + $scope.memos[i].id;
            }

            $(document).on("click",id,function(){
                if($('.memo-check:checked').length == $scope.memos.length){
                    $('#ex_chk').prop('checked', true);
                }else{
                    $('#ex_chk').prop('checked', false);
                }

                if($('.memo-check:checked').length > 0){
                    $('#selectDel').removeClass('hidden');
                }else{
                    $('#selectDel').addClass('hidden');
                }
            });
        }
    };


}]);

angular.module('notepadApp').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});