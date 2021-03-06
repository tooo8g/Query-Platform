<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>国家铁路局认证目录查询</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/common.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryCertCopy.js"></script>
    <script type="text/javascript" src="${ctx}/js/scrollJs.js"></script>
    <script type="text/javascript" src="${ctx}/js/pagination.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryCertCopy.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/common.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/pagination.css">
</head>
<body>
<div class="in_header">
  <div id="toptb" class="cl">
    <div class="wp">
      <div class="z">
        <script type="text/javascript">var _speedMark = new Date();</script>
        <!-- 页面顶部33 TOP -->
        <div class="title">
          <div class="headt_con">
            <div class="collect">
              <a href="#">收藏中铁鲁班商务网 </a>
              <span>客服热线：4006-010100（人工客服工作时间为:周一~周五8:00-12:00;13:30~17:30）</span>
            </div>
            <div class="user">
              <form method="post" autocomplete="off" id="lsform" action="member.php?mod=logging&amp;action=login&amp;loginsubmit=yes&amp;infloat=yes&amp;lssubmit=yes">
                <div class="fastlg cl">
                  <span id="return_ls" style="display:none"></span>
                  <div class="y pns" id="login_msg">
                    <a href="http://yingyong.crecgec.com">应用列表</a><span class="pipe">|</span>
                    <a href="/misc.php?mod=faq&amp;action=faq&amp;id=3&amp;messageid=6">客户服务</a><span class="pipe">|</span>
                    <a href="http://i.crecgec.com/user/users">会员中心</a>
                    <span class="pipe"><a href="cascallback.php">登录</a></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- 页面顶部 BTM -->
      </div>
      <div class="y">
      </div>
    </div>
  </div>
  <div id="qmenu_menu" class="p_pop blk" style="display: none;">
    <div class="ptm pbw hm">
      请 <a href="javascript:;" class="xi2" onclick="lsSubmit()"><strong>登录</strong></a> 后使用快捷导航<br>没有帐号？<a href="member.php?mod=register" class="xi2 xw1">立即注册</a>
    </div>
  </div>
  <div id="hd">
    <div class="wp">
      <div class="hdc cl">
        <!-- 搜索部分 TOP -->
        <div class="in_search">
          <div class="search_con">
            <div class="logo">
              <h2>
                <a href="./" title="中铁鲁班商务网">
                  <img src="http://static.crecgec.com/crecgec/image/logo.png" alt="中铁鲁班商务网论坛" border="0">
                </a>
              </h2>
            </div>
          </div>
          <div class="search_in">
            <style>
              #scbar { overflow: visible; position: relative; }
              #sg{ background: #FFF; width:456px; border: 1px solid #B2C7DA; }
              .scbar_narrow #sg { width: 316px; }
              #sg li { padding:0 8px; line-height:30px; font-size:14px; }
              #sg li span { color:#999; }
              .sml { background:#FFF; cursor:default; }
              .smo { background:#E5EDF2; cursor:default; }
            </style>
            <div id="light_scbar">
              <div id="scbar" class="cl">
                <form id="light_form" method="post" autocomplete="off" onsubmit="searchFocus($('scbar_txt'))" action="search.php?searchsubmit=yes" target="_blank">
                  <input type="hidden" name="mod" id="scbar_mod" value="forum">
                  <input type="hidden" name="formhash" value="e6030850">
                  <input type="hidden" name="srchtype" value="title">
                  <input type="hidden" name="srhfid" value="0">
                  <input type="hidden" name="srhlocality" value="portal::index">
                  <div class="sch_put">
                    <div class="select_js">
                      <a href="javascript:;" id="scbar_type" class="xg1" onclick="showMenu(this.id)" hidefocus="true">帖子</a>
                      <input type="hidden" name="act" value="index">
                    </div>
                    <span>|</span>
                    <input type="text" name="srchtxt" class="sch_input xg1" id="scbar_txt" value="请输入搜索内容" autocomplete="off" x-webkit-speech="" speech="" placeholder="请输入搜索内容">
                  </div>
                  <div class="sch_btn">
                    <input type="hidden" name="app" value="search">
                    <input type="submit" name="Submit" value="" class="btn">
                  </div>
                </form>
              </div>
            </div>
            <ul id="scbar_type_menu" class="sumer_p_pop" style="display: none;">
              <li><a href="javascript:;" rel="article">文章</a></li>
              <li><a href="javascript:;" rel="forum" class="curtype">帖子</a></li>
              <li><a href="javascript:;" rel="user">用户</a></li>
            </ul>
            <script type="text/javascript">
              initSearchmenu('scbar', '');
            </script>
          </div>
        </div>
        <!-- 搜索部分 BTM -->
      </div>
    </div>
    <div id="nv">
      <!-- 列表部分 TOP -->
      <div class="in-word-top">
        <div class="in-wpcon">
          <div class="inter_fast">
            <span class="huiyuan_in">应用快速入口</span>
            <div class="inter_list">

              <ul class="login_l" style="display: block;">
                <li class="">
                  <a href="http://i.crecgwm.com/Services/Subscribe">
					    			    		<span>
					    			    			<img src="http://static.crecgec.com/crecgec/image/ic_dashboard_black_18dp.png">
					    			    		</span>
                    <em>
                      增值服务
                    </em>
                  </a>
                </li>
                <li class="">
                  <a href="http://yingyong.crecgwm.com">
					    			    		<span>
					    			    			<img src="http://static.crecgec.com/crecgec/image/ic_list_black_18dp.png">
					    			    		</span>
                    <em>
                      应用列表
                    </em>
                  </a>
                </li>
              </ul>
              <ul class="logout_l">
              </ul>

            </div>
          </div>
          <ul class="daohang">
            <li id="mn_N521a"><a href="http://www.crecgec.com/" hidefocus="true" title="首页">首页<span>首页</span></a></li>
            <li class="select"><a>企业资质</a></li>
            <li id="mn_F80" onmouseover="showMenu({'ctrlid':this.id,'ctrlclass':'hover','duration':2})"><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=12" hidefocus="true">招标询价</a></li>
            <li id="mn_F54"><a href="http://shebei.crecgec.com/forum-54-1.html" hidefocus="true">机械设备租赁</a></li>
            <li id="mn_P7" onmouseover="showMenu({'ctrlid':this.id,'ctrlclass':'hover','duration':2})"><a href="http://www.crecgec.com/news/" hidefocus="true">新闻公告</a></li>
            <li id="mn_P4" onmouseover="showMenu({'ctrlid':this.id,'ctrlclass':'hover','duration':2})"><a href="http://www.crecgec.com/regulations/" hidefocus="true">政策法规</a></li>
            <li id="mn_P11" onmouseover="showMenu({'ctrlid':this.id,'ctrlclass':'hover','duration':2})"><a href="http://www.crecgec.com/gys/" hidefocus="true">供应商园地</a></li>
            <li id="mn_Nfeca"><a href="http://mall.crecgec.com" hidefocus="true">网上商城</a></li>
            <li id="mn_N762c" onmouseover="showMenu({'ctrlid':this.id,'ctrlclass':'hover','duration':2})"><a href="http://bbs.crecgec.com/forum.php" hidefocus="true">官方论坛</a></li>
          </ul>
        </div>
      </div>
      <!--列表部分 BTM -->

      <ul class="p_pop h_pop" id="mn_F80_menu" style="display: none">
        <li><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=12" hidefocus="true">招标公告</a></li>
        <li><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=14" hidefocus="true">竞争性谈判</a></li>
        <li><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=15" hidefocus="true">询价采购</a></li>
        <li><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=16" hidefocus="true">澄清补遗</a></li>
        <li><a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=13" hidefocus="true">中标公示</a></li>
      </ul>
      <ul class="p_pop h_pop" id="mn_P7_menu" style="display: none">
        <li><a href="http://www.crecgec.com/news/notice/" hidefocus="true">通知公告</a></li>
        <li><a href="http://www.crecgec.com/news/company/" hidefocus="true">公司新闻</a></li>
        <li><a href="http://www.crecgec.com/news/information/" hidefocus="true">行业资讯</a></li>
      </ul>
      <ul class="p_pop h_pop" id="mn_P4_menu" style="display: none">
        <li><a href="http://www.crecgec.com/regulations/laws/" hidefocus="true">招标法规</a></li>
        <li><a href="http://www.crecgec.com/regulations/policy/" hidefocus="true">采购政策</a></li>
      </ul>
      <ul class="p_pop h_pop" id="mn_P11_menu" style="display: none">
        <li><a href="http://www.crecgec.com/gys/supplier/" hidefocus="true">供应商常见问题</a></li>
        <li><a href="http://www.crecgec.com/gys/download/" hidefocus="true">下载中心</a></li>
        <li><a href="http://www.crecgec.com/portal.php?mod=list&amp;catid=16" hidefocus="true">精彩会员</a></li>
      </ul><div class="p_pop h_pop" id="mn_userapp_menu" style="display: none"></div>
      <ul class="p_pop h_pop" id="mn_N762c_menu" style="display: none">
        <li><a href="forum-1-1.html" hidefocus="true">供应商</a></li>
        <li><a href="forum-36-1.html" hidefocus="true">内部用户</a></li>
      </ul>
      <div id="mu" class="cl">
      </div>
    </div>
  </div>
</div>
<div class="as">
  <input type="hidden" class="pageNo" value="">
  <input type="hidden" class="itemShowValue" value="">
  <input type="hidden" class="demoCount" value="">
  <div class="as_title">
    <a href="http://www.crecgec.com/" class="nvhm" title="首页">中铁鲁班商务网</a>
    <em>></em>
    <a href="#">企业资质</a>
    <em>></em>
    <a href="javascript:;">资质信息</a>
  </div>
  <div class="as_left">
    <div class="as_content">
      <div class="left_title_p">
        资质信息查询
      </div>
      <div class="asLeft_ul">
        <ul>
          <li class="xwl item colorClick" onclick="searchCatalogList('铁路总公司认证采信目录')">
            铁路总公司认证采信目录
             <p></p>
          </li>
          <li class="itemShow displayNo" id="itemShow">
            <div class="itemShowList showItem" class_num="0" id="showItem0">
              <div class="mulluShow" name="mulluShowSh" id="mulluShow"></div>
              <div id="scrollShow" class="scrollShow">
                <div id="scrollSh" class="scrollSh"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="guanggao">
      <li>
        <a href="http://afptrack.alimama.com/clk?bid=0a67349c000057903c8f2ae90128b626&pid=mm_115406913_14064002_56262063&cid=33441&mid=24357&oid=4576&productType=1&qytInfoMTime=1469023239&e=%2F3ddwC5K08%2BMpq0A4M5XOy9Fsvytu%2FqkWoLMnPAid4V%2FZBmiq2R6r%2Bns6OhmyIS9a43cMk95sPpizN7VDJM0OyK2NSo8GYzExbXcnRefajgDi0c4S9HffA%3D%3D&k=121" target="_blank"><img src="${ctx}/images/as_gg_1.png"></a>
      </li>
      <li>
        <a href="http://afptrack.alimama.com/clk?bid=0a67349c000057903c8f2af701141cfe&pid=mm_115406913_14064002_56252269&cid=33444&mid=24359&oid=4576&productType=1&qytInfoMTime=1469023239&e=Pr5wNt2WcoKMpq0A4M5XOy9Fsvytu%2FqkWoLMnPAid4U5djxk120UnCUfI%2FOmmZ5Va43cMk95sPpizN7VDJM0OyK2NSo8GYzE10j2Pxr66vsDi0c4S9HffA%3D%3D&k=121" target="_blank"><img src="${ctx}/images/as_gg_2.png"></a>
      </li>
    </div>
  </div>
  <div class="as_right">
    <div action="queryCert" class="a_search">
      <input type="text" name="search_a_text" value="" class="serAInput">
      <a type="button" name="search_a"  class="search_a_btn" onclick="search_a_button()">搜索</a>
    </div>
    <div class="asTable">
      <table class="as_table">
        <thead class="as_thead">
        <tr>
          <td width="70">序号</td>
          <td>企业名称</td>
          <td>采信目录产品范围</td>
          <td>证书编号</td>
          <td width="73">查看</td>
        </tr>
        </thead>
        <tbody class="as_tbody">

        </tbody>
      </table>
    </div>
    <div class="listperAuth_button">

    </div>
  </div>
</div>
<div class="productInformation displayNo" id="productInformation">
  <div class="product_infor_show">
    <div class="product_show_infor">
      <div class="product_infor_title">
        <p>产品详情</p>
        <a onclick="pis_close()"><img src="${ctx}/images/as_1.png"></a>
      </div>
      <div class="product_infor_show1">
      </div>
      <div class="product_infor_show2">
        <table class="show2_table">
          <thead class="show2_thead">
          <tr>
            <td>产品标识代码</td>
            <td>规格型号</td>
            <td>规格型号状态</td>
          </tr>
          </thead>
          <tbody class="show2_tbody">

          </tbody>
        </table>
      </div>
      <div class="pis_button_div">
        <a type="button" class="pis_button" onclick="pis_close()">关闭</a>
      </div>
    </div>
  </div>
</div>
<div id="light_ft">
  <div class="wp">
    <div id="flk">
      <!-- 底部 TOP -->

      <div class="foot_bt">
        <div class="foot_cont">
          <div class="bt_bk">
            <h2>
              <a href="./" title="中铁鲁班商务网">
                <img src="http://static.crecgec.com/crecgec/image/footer_log.png" alt="中铁鲁班商务网论坛" border="0">
              </a>
            </h2>
          </div>
          <div class="lianjie_list1 line1">
            <div class="lj_title">新闻公告</div>
            <ul>
              <li>
                <a href="http://www.crecgec.com/news/company/">公司新闻</a>

              </li>
              <li>
                <a href="http://www.crecgec.com/news/notice/">通知公告</a>

              </li>
              <li>
                <a href="http://www.crecgec.com/news/information/">行业资讯</a>

              </li>
            </ul>
          </div>
          <div class="lianjie_list2 line2">
            <div class="lj_title">采购信息</div>

            <ul>
              <li>
                <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=12">招标公告</a>

              </li>
              <li>
                <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=14">竞争性谈判</a>

              </li>
              <li>
                <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=15">询价采购</a>

              </li>
              <!--<li>
              <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=13">竞价采购</a>

              </li>-->
              <li>
                <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=16">澄清补遗</a>

              </li>

              <li>
                <a href="http://zhaobiao.crecgec.com/forum.php?mod=forumdisplay&amp;fid=80&amp;filter=sortid&amp;sortid=13">中标公示</a>

              </li>
            </ul>
          </div>
          <div class="lianjie_list1 line3">
            <div class="lj_title">供应商园地</div>

            <ul>
              <li>
                <a href="http://www.crecgec.com/gys/download/">下载中心</a>

              </li>
              <li>
                <a href="http://www.crecgec.com/article-98-1.html">交易须知</a>

              </li>
              <li>
                <a href="http://static.crecgec.com/doc/%E7%94%B5%E5%AD%90%E5%95%86%E5%8A%A1%E7%B3%BB%E7%BB%9F%E4%BE%9B%E5%BA%94%E5%95%86%E6%B3%A8%E5%86%8C%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf">操作手册</a>

              </li>
            </ul>
          </div>
          <div class="lianjie_list1 line4">
            <div class="lj_title">快速入口</div>

            <ul>
              <li>
                <a href="http://www.crecgec.com/regulations/">政策法规</a>

              </li>
              <li>
                <a href="http://mall.crecgec.com">网上专卖店</a>

              </li>
              <li>
                <a href="http://bbs.crecgec.com">官方论坛</a>

              </li>
              <li>
                <a href="http://static.crecgec.com/zulin/php/FAQ1.php">常见问题</a>

              </li>
            </ul>
          </div>
          <div class="ewm_weixin">
            <div class="weixin_title">中铁鲁班微信号</div>
            <img src="http://static.crecgec.com/crecgec/image/weixin_erwei.png">
          </div>
        </div>
      </div>

      <div class="syq_sm">
        <div class="syq_cont">
          <div class="syq_fuwu">
            <a href="http://www.crec.cn/">集团网站</a>
            <em>|</em>
            <a href="http://www.crecgec.com//portal.php?mod=topic&amp;topicid=4">鲁班服务</a>
            <em>|</em>
            <a href="http://www.crecgec.com//misc.php?mod=faq&amp;action=faq&amp;id=3&amp;messageid=6">联系我们</a>
            <em>|</em>
            <a href="http://www.crecgec.com//misc.php?mod=faq&amp;action=faq&amp;id=3&amp;messageid=7">合作伙伴</a>
            <em>|</em>
            <a href="http://www.crecgec.com//misc.php?mod=faq&amp;action=faq&amp;id=3&amp;messageid=8">法律声明</a>
            <em>|</em>
            <a href="http://www.crecgec.com//misc.php?mod=faq&amp;action=faq&amp;id=3&amp;messageid=4">关于我们</a>
            <em>|</em>
            联系邮箱 crecgec@lubanec.com
          </div>
          <div class="syq_zs">
            <p style="color: black;">©2013 中铁鲁班 All Rights Reserved 鲁班（北京）电子商务科技有限公司版权所有   京ICP备14004333号  |  <a target="_blank" href="http://static.crecgec.com/crecgec/image/icp151026.png">京ICP证151026号</a></p>
          </div>
          <div class="syq_zs">
            <a>客服电话:4006-010100 公司地址:北京市丰台区西客站南广场中盐大厦西塔8楼</a>
          </div>
          <div class="liulanqi">
            请使用IE9以上版本浏览页面，推荐使用<a href="http://rj.baidu.com/soft/detail/14744.html">Chrome浏览器</a>以获得更好的用户体验！<a href="http://exp.jiankongbao.com/load.php?host_id=13794" target="_blank">测试访问速度</a>
          </div>
        </div>
      </div>
      <!-- 底部 BTM -->

    </div>
  </div>
</div>
</body>
</html>
