/* Javascript for QiniuXBlock. */
function QiniuXBlockInitEdit(runtime,element){
    var elemContainer = $(element);
    elemContainer.find('.action-cancel').click(function(){
        runtime.notify('cancel',{});
    });
    //传递值
    elemContainer.find('.action-save').click(function(){
        var data={
            'display_name':$('#qiniu_edit_display_name').val(),
            'domain_url':$('#qiniu_edit_domain_url').val(),
            'video_name':$('#qiniu_edit_video_name').val(),
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
    elemContainer.find('.action-upload').click(function(){
        $.qiniu_edit_video_id=$('#qiniu_edit_video_id').uploadify({
            'auto':false,
            'formData':{
                'fcharset':'ISO-8859-1',
                'writetoken':'6fb7b901-103c-4d58-b8a8-d5af9bc9bf4f',
                'cataid':'1',
                'JSONRPC':'{"title": "这里是标题", "tag": "标签", "desc": "视频文档描述"}',

            },
            'fileSizeLimit':'3000MB',
            'fileTypeDesc':'视频文件',
            'fileTypeExts' : '*.avi; *.wmv; *.mp4;*.mp3; *.mov; *.flv; *.mkv; *.rmvb',//文件类型过滤
            'swf':'uploadify.swf',
            'multi':true,
            'successTimeout':1800,
            'queueSizeLimit':100,
            'uploader':'http://v.polyv.net/uc/services/rest?method=uploadfile',
            'onUploadSuccess':function(file,data,response){
                var jsonobj = eval('('+data+')');
                $('#qiniu_edit_domain_url').val(jsonobj.data[0].vid);
            }
     });

    });
}
