#coding:utf-8
import sys
import pkg_resources
from django.template import Context,Template
from xblock.core import XBlock
from xblock.fields import Scope, Integer,String
from xblock.fragment import Fragment
reload(sys)
sys.setdefaultencoding("utf-8")

class QiniuXBlock(XBlock):
    icon_class = "video"
    display_name = String(display_name="Display_name",
                   default = "qiuniu-player",
                   scope = Scope.settings,
                   help ="This name appears in the top of the page")
    domain_url = String(display_name="domain_url",
                     default = "qiniu",
                     scope = Scope.content,
                     help="example:http://7u2n16.com1.z0.glb.clouddn.com/1.mp4")
    video_name= String(display_name="video_name",
                       default="example.mp4",
                       scope=Scope.content,
                       help="example.mp4")

    width = Integer(display_name="width",default="800",
                   scope = Scope.content,
                   help = "the width of the video")
    height = Integer(display_name="height",default="450",
                     scope = Scope.content,
                     help = "the height of the video")
    

    def load_resource(self,resource_path):
        resource_content = pkg_resources.resource_string(__name__,resource_path)
        return unicode(resource_content)
    def render_template(self,template_path,context={}):
        template_str = self.load_resource(template_path)
        return Template(template_str).render(Context(context))
    def student_view(self, context=None):
        context = {
          'display_name':self.display_name,
          'domain_url':self.domain_url,
          'video_name':self.video_name,
          'width':self.width,
          'height':self.height,
        }
        html = self.render_template('static/html/qiniuxblock_view.html', )
        frag = Fragment(html)
        frag.add_javascript(self.load_resource("static/js/src/qiniuxblock_view.js"))
        frag.initialize_js('QiniuXBlockInitView')
        return frag
    def studio_view(self,context=None):
        context ={
           'display_name':self.display_name,
           'domain_url':self.domain_url,
           'video_name':self.video_name,
           'width':self.width,
           'height':self.height,
        }
        html = self.render_template('static/html/qiniuxblock_edit.html')
        frag = Fragment(html)
        frag.add_javascript(self.load_resource("static/js/src/qiniuxblock_edit.js"))
        frag.initialize_js('QiniuXBlockInitEdit')
        return frag
    @XBlock.json_handler
    def save_qiniu(self,data,suffix=''):
        self.display_name = data['display_name']
        self.domain_url = data['domain_url']
        self.video_name = data['video_name']
        self.width = data['width']
        self.height = data['height']
        return {
             'result':'success',
        }

    @XBlock.json_handler
    def get_params(self,data,suffix=''):
        return {
                 "domain_url":self.domain_url,
                 "video_name":self.video_name,
                 "width":self.width,
                 "height":self.height,
                }
     

    @staticmethod
    def workbench_scenarios():
        return [
           ("qiniuxblock","<qiniuxblock />")
        ]
