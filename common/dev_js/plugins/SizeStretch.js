/*******************************************************************************
 * Google Map
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
///<reference path="../../dts/libs/jquery.d.ts" />
///<reference path="../assets/Cmn.ts"/>
var SizeStretch = (function () {
    function SizeStretch() {
        this.w = 0;
        this.h = 0;
        this.mapH = 0;
        this.editH = 0;
        // ターゲット
        this.target = {
            areaMap: '#areaMap',
            areaEdit: '#areaEdit',
            btnEdit: '#btnEdit'
        };
        // クラス
        this.cls = {
            edit: 'onEdit'
        };
        var _t = this;
        _t.setup();
        window.addEventListener('resize', this.setup);
        // Editボタンを押す
        $(_t.target.btnEdit).on('touchend', function (e) {
            console.log('a');
            e.preventDefault();
            var hasClose = $(this).hasClass(_t.cls.edit);
            $(this).toggleClass(_t.cls.edit);
            if (hasClose === false) {
                $(_t.target.areaMap).css({
                    height: _t.mapH
                });
            }
            else {
                $(_t.target.areaMap).css({
                    height: _t.h
                });
            }
        });
    }
    SizeStretch.prototype.setup = function () {
        var w = Frame.getBrowserWidth(), h = Frame.getBrowserHeight() - 40, target = document.getElementById('areaMap');
        this.w = w;
        this.h = h;
        this.mapH = h * 0.3;
        var __h = h - this.mapH;
        $(this.target.areaEdit).css({ height: __h });
        target.style.width = w + 'px';
        target.style.height = h + 'px';
    };
    return SizeStretch;
})();
jQuery(function ($) {
    new SizeStretch();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvU2l6ZVN0cmV0Y2gudHMiXSwibmFtZXMiOlsiU2l6ZVN0cmV0Y2giLCJTaXplU3RyZXRjaC5jb25zdHJ1Y3RvciIsIlNpemVTdHJldGNoLnNldHVwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Z0ZBUWdGO0FBQ2hGLGtEQUFrRDtBQUNsRCx1Q0FBdUM7QUFFdkMsSUFBTSxXQUFXO0lBa0JmQSxTQWxCSUEsV0FBV0E7UUFDUEMsTUFBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDYkEsTUFBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDYkEsU0FBSUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLFVBQUtBLEdBQVVBLENBQUNBLENBQUNBO1FBRXpCQSxRQUFRQTtRQUNBQSxXQUFNQSxHQUFHQTtZQUNmQSxPQUFPQSxFQUFFQSxVQUFVQTtZQUNuQkEsUUFBUUEsRUFBRUEsV0FBV0E7WUFDckJBLE9BQU9BLEVBQUVBLFVBQVVBO1NBQ3BCQSxDQUFDQTtRQUVGQSxNQUFNQTtRQUNFQSxRQUFHQSxHQUFHQTtZQUNaQSxJQUFJQSxFQUFFQSxRQUFRQTtTQUNmQSxDQUFDQTtRQUdBQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNkQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUVYQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRTlDQSxBQUNBQSxhQURhQTtRQUNiQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQSxVQUFTQSxDQUFDQTtZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDdkIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNiLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0lBRURELDJCQUFLQSxHQUFMQTtRQUNFRSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxFQUM3QkEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUNqQ0EsTUFBTUEsR0FBR0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFOUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVhBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1FBRXBCQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUN4QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBQ0EsTUFBTUEsRUFBQ0EsR0FBR0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFMUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzlCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFDSEYsa0JBQUNBO0FBQURBLENBNURBLEFBNERDQSxJQUFBO0FBR0QsTUFBTSxDQUFDLFVBQVMsQ0FBQztJQUNmLElBQUksV0FBVyxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicGx1Z2lucy9TaXplU3RyZXRjaC5qcyIsInNvdXJjZVJvb3QiOiIuLi9fd3MvdHlwZXNjcmlwdC8iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogR29vZ2xlIE1hcFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS4gQ29kZSBmb3IgS09SSVlBTUEuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogQGF1dGhvcjogTm9idXl1a2kgS29uZG9cbiAqIEB1cmk6IGh0dHA6Ly9rb3JpeWFtYS5pby9cbiAqIEB2ZXJzaW9uOiAxLjBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kdHMvbGlicy9qcXVlcnkuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9hc3NldHMvQ21uLnRzXCIvPlxuXG5jbGFzcyBTaXplU3RyZXRjaCB7XG4gIHByaXZhdGUgdzpudW1iZXIgPSAwO1xuICBwcml2YXRlIGg6bnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtYXBIOm51bWJlciA9IDA7XG4gIHByaXZhdGUgZWRpdEg6bnVtYmVyID0gMDtcblxuICAvLyDjgr/jg7zjgrLjg4Pjg4hcbiAgcHJpdmF0ZSB0YXJnZXQgPSB7XG4gICAgYXJlYU1hcDogJyNhcmVhTWFwJyxcbiAgICBhcmVhRWRpdDogJyNhcmVhRWRpdCcsXG4gICAgYnRuRWRpdDogJyNidG5FZGl0J1xuICB9O1xuXG4gIC8vIOOCr+ODqeOCuVxuICBwcml2YXRlIGNscyA9IHtcbiAgICBlZGl0OiAnb25FZGl0J1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdmFyIF90ID0gdGhpcztcbiAgICBfdC5zZXR1cCgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0dXApO1xuXG4gICAgLy8gRWRpdOODnOOCv+ODs+OCkuaKvOOBmVxuICAgICQoX3QudGFyZ2V0LmJ0bkVkaXQpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgY29uc29sZS5sb2coJ2EnKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBoYXNDbG9zZSA9ICQodGhpcykuaGFzQ2xhc3MoX3QuY2xzLmVkaXQpO1xuXG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKF90LmNscy5lZGl0KTtcblxuICAgICAgaWYoaGFzQ2xvc2UgPT09IGZhbHNlKXtcbiAgICAgICAgJChfdC50YXJnZXQuYXJlYU1hcCkuY3NzKHtcbiAgICAgICAgICBoZWlnaHQ6IF90Lm1hcEhcbiAgICAgICAgfSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgJChfdC50YXJnZXQuYXJlYU1hcCkuY3NzKHtcbiAgICAgICAgICBoZWlnaHQ6IF90LmhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cCgpe1xuICAgIHZhciB3ID0gRnJhbWUuZ2V0QnJvd3NlcldpZHRoKCksXG4gICAgICBoID0gRnJhbWUuZ2V0QnJvd3NlckhlaWdodCgpIC0gNDAsICAgIC8vIOODmOODg+ODgOODvOOBrumrmOOBleOCkuW8leOBj1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWFNYXAnKTtcblxuICAgIHRoaXMudyA9IHc7XG4gICAgdGhpcy5oID0gaDtcblxuICAgIHRoaXMubWFwSCA9IGggKiAwLjM7XG5cbiAgICB2YXIgX19oID0gaCAtIHRoaXMubWFwSDtcbiAgICAkKHRoaXMudGFyZ2V0LmFyZWFFZGl0KS5jc3Moe2hlaWdodDpfX2h9KTtcblxuICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgfVxufVxuXG5cbmpRdWVyeShmdW5jdGlvbigkKXtcbiAgbmV3IFNpemVTdHJldGNoKCk7XG59KTtcblxuXG4iXX0=