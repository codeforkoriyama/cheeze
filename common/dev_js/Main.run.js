/*******************************************************************************
 * Main Run
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
///<reference path="../dts/libs/jquery.d.ts" />
///<reference path="../dts/libs/custom.d.ts" />
///<reference path="assets/Cmn.ts"/>
/** 向き検知 */
var isLandScape = function () {
    var orient = Math.abs(window.orientation);
    if (orient === 90) {
        // Landscape
        $('.portrait').addClass('hide');
        $('.landscape').removeClass('hide');
    }
    else {
        // Portrait
        $('.portrait').removeClass('hide');
        $('.landscape').addClass('hide');
    }
};
jQuery(function ($) {
    if (Cmn.device.pc === false) {
        isLandScape();
        $(window).on('resize orientationchange', function () {
            isLandScape();
        });
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1haW4ucnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztnRkFRZ0Y7QUFDaEYsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQyxvQ0FBb0M7QUFFcEMsQUFDQSxXQURXO0lBQ1AsV0FBVyxHQUFHO0lBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTFDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQSxDQUFDO1FBQ2hCLEFBQ0EsWUFEWTtRQUNaLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUEsSUFBSSxDQUFBLENBQUM7UUFDSixBQUNBLFdBRFc7UUFDWCxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUdGLE1BQU0sQ0FBQyxVQUFTLENBQUM7SUFDZixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFdBQVcsRUFBRSxDQUFDO1FBRWQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtZQUN2QyxXQUFXLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJNYWluLnJ1bi5qcyIsInNvdXJjZVJvb3QiOiIuLi9fd3MvdHlwZXNjcmlwdC8iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogTWFpbiBSdW5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUuIENvZGUgZm9yIEtPUklZQU1BLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIEBhdXRob3I6IE5vYnV5dWtpIEtvbmRvXG4gKiBAdXJpOiBodHRwOi8va29yaXlhbWEuaW8vXG4gKiBAdmVyc2lvbjogMS4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vZHRzL2xpYnMvanF1ZXJ5LmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vZHRzL2xpYnMvY3VzdG9tLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiYXNzZXRzL0Ntbi50c1wiLz5cblxuLyoqIOWQkeOBjeaknOefpSAqL1xudmFyIGlzTGFuZFNjYXBlID0gZnVuY3Rpb24oKXtcbiAgdmFyIG9yaWVudCA9IE1hdGguYWJzKHdpbmRvdy5vcmllbnRhdGlvbik7XG5cbiAgaWYob3JpZW50ID09PSA5MCl7XG4gICAgLy8gTGFuZHNjYXBlXG4gICAgJCgnLnBvcnRyYWl0JykuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAkKCcubGFuZHNjYXBlJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgfWVsc2V7XG4gICAgLy8gUG9ydHJhaXRcbiAgICAkKCcucG9ydHJhaXQnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICQoJy5sYW5kc2NhcGUnKS5hZGRDbGFzcygnaGlkZScpO1xuICB9XG59O1xuXG5cbmpRdWVyeShmdW5jdGlvbigkKXtcbiAgaWYoQ21uLmRldmljZS5wYyA9PT0gZmFsc2UpIHtcbiAgICBpc0xhbmRTY2FwZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCAoKT0+IHtcbiAgICAgIGlzTGFuZFNjYXBlKCk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cbiJdfQ==