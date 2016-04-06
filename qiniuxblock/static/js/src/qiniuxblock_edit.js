/* Javascript for QiniuXBlock. */
function QiniuXBlockInitEdit(runtime,element){

    var elemContainer = $(element),
        $fileUpload = $('#file_upload');
    
    function upload(url, onComplete) {

        if( !onComplete) {
            var onComplete = function(file,data,response){
                var jsonobj = eval('('+data+')');
                // alert(jsonobj.data[0].vid + " - " + jsonobj.data[0].playerwidth + " - " + jsonobj.data[0].duration);
                $("#qiniu_edit_domain_url").val(jsonobj.data[0].vid);
            };
        }

     $fileUpload.uploadifive({
        'auto':false,
        //'uploadScript':'static/lib/uploadify/uploadify.php',
        'formData':{
        'fcharset':'ISO-8859-1',
        'writetoken':'6fb7b901-103c-4d58-b8a8-d5af9bc9bf4f',
        'cataid':'1',
        'JSONRPC':'{"title": "这里是标题", "tag": "标签", "desc": "视频文档描述"}',
        },
        'buttonText':'选择上传文件',
        'fileSizeLimit':'3000MB',
        //'fileType':'视频文件',
        'fileType' : 'video/*',//文件类型过滤
        //'swf'      : '/static/lib/uploadify/uploadify.swf',
        'uploadScript' : url,
        'multi':true,
        //'successTimeout':1800,
        'queueSizeLimit':100,

        'onUploadComplete':onComplete,
       });       
    }
   elemContainer.find('select').change(function(){
      var value = $(this).val();
      if(value === "polyv")
      {

        upload('http://v.polyv.net/uc/services/rest?method=uploadfile');

        elemContainer.find('.action-upload').click(function(){
        $fileUpload.uploadifive('upload');
         });
      }
      else{
        //console.log(value);
        eleContainer.find('.action-upload').click(function(){
             var ErrorCode = qcVideo.get('ErrorCode'), 
                   JSON = qcVideo.get('JSON'), 
                   Log = qcVideo.get('Log');
                ErrorCode.UN_SUPPORT_BROWSE !== qcVideo.uploader.init(
                {
                    web_upload_url:'http://vod.qcloud.com/v2/index.php',
                    upBtnId:'upBtnId',
                    secretId: "AKID7jpjBBa3uOUqSnHavard0jCwHh3xhMZI", // 云api secretId
                    secretKey: "dX3t53tDoqYnmzzOE6yIlZ0ljkLsvTOL",
                    after_sha_start_upload: true,//sha计算完成后，开始上传 (默认非立即上传)
                    sha1js_path: 'http://video.qcloud.com/calculator_worker_sha1.js', //计算sha1的位置  ，默认为 'http://你的域名/calculator_worker_sha1.js'
                    disable_multi_selection: false, //禁用文件多选 ，默认不禁用
                    transcodeNotifyUrl: 'http://test.domain.com/on_transcode_done.serverfile',//(转码成功后的回调地址)isTranscode==true,时开启； 回调url的返回数据格式参考  http://www.qcloud.com/wiki/v2/MultipartUploadVodFile
                   classId: null, //视频分类的ID
                },
                //回调函数
                {
            
                      onFileUpdate: function (args) {
                             Log.debug(args);
                        },
           
                     onFileStatus: function (info) {
                          Log.debug('各状态总数-->' , JSON.stringify(info));
                        },
            
                     onFilterError: function (args) {
                        Log.debug('message:' + args.message + (args.solution ? (';solution==' + args.solution) : ''));
                       }
                   }
                 );

         });
             
      


   });

    
    //elemContainer.find('select').val('polyv');

    elemContainer.find('.action-cancel').click(function(){
        runtime.notify('cancel',{});
    });
    //传递值
    elemContainer.find('.action-save').click(function(){
        var data={
            'display_name':$('#qiniu_edit_display_name').val(),
            'domain_url':$('#qiniu_edit_domain_url').val(),
            'video_name':$('#file_upload').val(),
            'width':$('#qiniu_edit_width').val(),
            'height':$('#qiniu_edit_height').val()
        };
        runtime.notify('save',{state:'start'});//开始调用save
        var handlerUrl = runtime.handlerUrl(element,'save_qiniu');
        $.post(handlerUrl,JSON.stringify(data)).done(function(response){
            if(response.result === 'success')
            {
                runtime.notify('save',{state:'end'});
            }
            else{
                runtime.notify('error',{msg:response.message});
            }
        });
    });
  /*  elemContainer.find('.action-upload').click(function(){
        $.file_upload=$('#qiniu_edit_video_id').uploadify({
            'auto':false,
            'formData':{
                'fcharset':'ISO-8859-1',
                'writetoken':'6fb7b901-103c-4d58-b8a8-d5af9bc9bf4f',
                'cataid':'1',
                'JSONRPC':'{"title": "这里是标题", "tag": "标签", "desc": "视频文档描述"}',

            },
            'buttonText':'选择上传文件',
            'fileSizeLimit':'3000MB',
            //'fileTypeDesc':'视频文件',
            //'fileTypeExts' : '*.avi; *.wmv; *.mp4;*.mp3; *.mov; *.flv; *.mkv; *.rmvb',//文件类型过滤
           // 'swf':'uploadify.swf',
            'fileType':'video/*',
            'multi':true,
            //'successTimeout':1800,
            'queueSizeLimit':100,
            'uploadScript':'http://v.polyv.net/uc/services/rest?method=uploadfile',
            'onUploadComplete':function(file,data,response){
                var jsonobj = eval('('+data+')');
                $('#qiniu_edit_domain_url').val(jsonobj.data[0].vid);
            }
     });

    });*/
    //* Javascript for QiniuXBlock. */
function QiniuXBlockInitEdit(runtime,element){

    var elemContainer = $(element),
        $fileUpload = $('#file_upload');

    // $fileUpload.uploadifive({
    //     'auto':false,
    //     //'uploadScript':'static/lib/uploadify/uploadify.php',
    //     'formData':{
    //     'fcharset':'ISO-8859-1',
    //     'writetoken':'6fb7b901-103c-4d58-b8a8-d5af9bc9bf4f',
    //     'cataid':'1',
    //     'JSONRPC':'{"title": "这里是标题", "tag": "标签", "desc": "视频文档描述"}',
    //     },
    //     'buttonText':'选择上传文件',
    //     'fileSizeLimit':'3000MB',
    //     //'fileType':'视频文件',
    //     'fileType' : 'video/*',//文件类型过滤
    //     //'swf'      : '/static/lib/uploadify/uploadify.swf',
    //     'uploadScript' : 'http://v.polyv.net/uc/services/rest?method=uploadfile',
    //     'multi':true,
    //     //'successTimeout':1800,
    //     'queueSizeLimit':100,

    //     'onUploadComplete':function(file,data,response){
    //         var jsonobj = eval('('+data+')');
    //         // alert(jsonobj.data[0].vid + " - " + jsonobj.data[0].playerwidth + " - " + jsonobj.data[0].duration);
    //         $("#qiniu_edit_domain_url").val(jsonobj.data[0].vid);
    //     }
    // });
    function upload(url, onComplete) {

        if( !onComplete) {
            var onComplete = function(file,data,response){
                var jsonobj = eval('('+data+')');
                // alert(jsonobj.data[0].vid + " - " + jsonobj.data[0].playerwidth + " - " + jsonobj.data[0].duration);
                $("#qiniu_edit_domain_url").val(jsonobj.data[0].vid);
            };
        }

     $fileUpload.uploadifive({
        'auto':false,
        //'uploadScript':'static/lib/uploadify/uploadify.php',
        'formData':{
        'fcharset':'ISO-8859-1',
        'writetoken':'6fb7b901-103c-4d58-b8a8-d5af9bc9bf4f',
        'cataid':'1',
        'JSONRPC':'{"title": "这里是标题", "tag": "标签", "desc": "视频文档描述"}',
        },
        'buttonText':'选择上传文件',
        'fileSizeLimit':'3000MB',
        //'fileType':'视频文件',
        'fileType' : 'video/*',//文件类型过滤
        //'swf'      : '/static/lib/uploadify/uploadify.swf',
        'uploadScript' : url,
        'multi':true,
        //'successTimeout':1800,
        'queueSizeLimit':100,

        'onUploadComplete':onComplete,
       });       
    }

   elemContainer.find('select').change(function(){
      var value = $(this).val();
      if(value === "polyv")
      {
        upload('http://v.polyv.net/uc/services/rest?method=uploadfile');
      }
      else{
        console.log(value);
      }
   });

   // upload('http://v.polyv.net/uc/services/rest?method=uploadfile');


    // elemContainer.find('select').val('polyv');


    elemContainer.find('.action-upload').click(function(){
        $fileUpload.uploadifive('upload');
    });

    //elemContainer.find('select').val('polyv');

    elemContainer.find('.action-cancel').click(function(){
        runtime.notify('cancel',{});
    });
    //传递值
    elemContainer.find('.action-save').click(function(){
        var data={
            'display_name':$('#qiniu_edit_display_name').val(),
            'domain_url':$('#qiniu_edit_domain_url').val(),
            'video_name':$('#file_upload').val(),
            'width':$('#qiniu_edit_width').val(),
            'height':$('#qiniu_edit_height').val()
        };
        runtime.notify('save',{state:'start'});//开始调用save
        var handlerUrl = runtime.handlerUrl(element,'save_qiniu');
        $.post(handlerUrl,JSON.stringify(data)).done(function(response){
            if(response.result === 'success')
            {
                runtime.notify('save',{state:'end'});
            }
            else{
                runtime.notify('error',{msg:response.message});
            }
        });
    });
  
    // });

});





