var JUDGE={touch:typeof window.ontouchstart!=="undefined"};var EVENTS={animation:{start:"webkitAnimationStart animationstart webkitTransitionStart transitionstart",end:"webkitAnimationEnd animationend webkitTransitionEnd transitionend"},click:JUDGE.touch?"touchend":"click",mousedown:JUDGE.touch?"touchend":"mousedown",mouseup:JUDGE.touch?"touchstart":"mouseup"};