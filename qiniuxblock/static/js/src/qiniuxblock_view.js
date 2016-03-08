function QiniuXBlockInitView(runtime,element){
    get_params(runtime,element);
    console.log("mytest");
}
function get_params(runtime,element){
    $.ajax({
        type:"POST",
        url:runtime.handlerUrl(element,'get_params'),//
        data:JSON.stringify({a:'a'}),
        success:function(result){
            console.log(result);
            domain_url=result.domain_url;
            video_name = result.video_name;
            width = result.width;
            height = result.height;
            get_url(domain_url,video_name);
        }
      
    });
}
function get_url(domain_url,video_name){
    video_url = encodeURI(domain_url+video_name);
    document.getElementById("myvideo").src = video_url;
    console.log(video_url);
}