# Electron项目

## 环境依赖

`elctron-quick-start`
<br />
注释: 未打包，需自行打包

## PClive2Dx1.0

缺点：
1. 渲染速度跟不上，如果操作过快且频繁容易使程序崩溃(Live2D无法正常显示，且长时间不加载)！
2. ICO未报错；
3. 操作麻烦；
4. 任务栏占位置，不好看。

优点：
内存占用非常少，运行流畅！

## PCLive2Dx3.0

缺点：
1. 内存占用相较于 x1.0 较高；
2. Electron框架本身拥有的BUG未能弥补，导致窗口移除屏幕后透明窗口背景效果失效；
3. 拖拽时发生窗口莫名增大现象，原因暂时不明！

优点：
1. 使用鼠标操控；
2. 解决渲染速度跟不上的问题；
3. 修复ICO报错问题；
4. 由任务栏显示改为托盘显示，增加“置顶”、“互动”、“锁定”和“退出”托盘菜单，更加便于管理且美观；
5. 相较于x1.0更加稳定(暂未发现Warning)。

## 导入模型

x1.0请将模型包放置在\PCLive2Dx1.0(根目录)\live2d_models\下，且入口文件必须命名为 “model.json” 。

x2.0请将模型包放置在\PCLive2Dx3.0(根目录)\model\src\下，且入口文件必须命名为 “index.json” 。
