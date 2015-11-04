/*******************************************************************************
 * イベント定義
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 1.0
 ******************************************************************************/
/// <reference path="../../dts/libs/custom.d.ts" />
var JUDGE = {
    touch: typeof window.ontouchstart !== "undefined"
};
var EVENTS = {
    animation: {
        start: 'webkitAnimationStart animationstart webkitTransitionStart transitionstart',
        end: 'webkitAnimationEnd animationend webkitTransitionEnd transitionend' // アニメーション終了
    },
    click: JUDGE.touch ? 'touchend' : 'click',
    mousedown: JUDGE.touch ? 'touchend' : 'mousedown',
    mouseup: JUDGE.touch ? 'touchstart' : 'mouseup'
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9FdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFVQTs7Ozs7Ozs7Z0ZBRmdGO0FBQ2hGLG1EQUFtRDtJQUMvQyxLQUFLLEdBQUc7SUFDVixLQUFLLEVBQUUsT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFdBQVc7Q0FDbEQsQ0FBQztBQUtGLElBQUksTUFBTSxHQUFHO0lBQ1gsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLDJFQUEyRTtRQUNsRixHQUFHLEVBQUUsbUVBQW1FLENBQUcsWUFBWTtLQUN4RixHQUR5RTtJQUUxRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsT0FBTztJQUN6QyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsV0FBVztJQUNqRCxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsU0FBUztDQUNoRCxDQUFDIiwiZmlsZSI6IkV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIuLi9fd3MvdHlwZXNjcmlwdC8iLCJzb3VyY2VzQ29udGVudCI6W251bGxdfQ==