$(function () {
   var location = [1, 2, 3, 5];
   (function () {
      for (var i = 0; i < location.length; i++) {
         var $menuItem = $(".menu-item").eq(location[i]);
         var $hover = $("#hovers").children().eq(i);
         if ($hover.length > 0 && $menuItem.length > 0) {
            var left = $menuItem.position().left + ($menuItem.width() / 2) - $hover.width() / 2;
            $hover.offset({left: left, top: $menuItem.height()});
         }
      }
   })();
   for (var i = 0; i < location.length; i++) {
      var $menuItem = $(".menu-item").eq(location[i]);
      var $hover = $("#hovers").children().eq(i);
      (function ($menuItem, $hover) {
         $menuItem.hover(function () {
            if ($hover.length > 0) {
               if ($(this).is(":hover")) {
                  $hover.hover(function () {
                     if (!$hover.is(":hover")) {
                        $hover.hide();
                     }
                  });
                  $hover.show();
               } else {
                  if (!$hover.is(":hover")) {
                     $hover.hide();
                  }
               }
            }
         })
      })($menuItem, $hover);
   }
   var $notice = $(".notice");
   var temp = 3;
   gonggao();

   function gonggao() {
      var length = $notice.children().length;
      if (length === 3) {
         $notice.animate({scrollTop: 50}, "slow", function () {
            $notice.children(":first-child").remove();
            $notice.scrollTop(0);
            $notice.append("<span>第一眼遇见，第二眼沦陷" + temp + "</span>");
            setTimeout(function () {
               temp++;
               gonggao();
            }, 3000)
         });
      } else {
         for (var i = 0; i < 3 - length; i++) {
            $notice.append("<span>第一眼遇见，第二眼沦陷" + i + "</span>");
         }
         setTimeout(function () {
            gonggao();
         }, 3000)
      }
   }

   (function () {
      var canvas = document.getElementById("bigWord");
      if (canvas.getContext) {
         var context = canvas.getContext('2d');
         context.fillStyle = '#33bb99';
         context.textBaseline = "ideographic";
         var fontSize = 15;
         context.font = "normal " + fontSize + "px 微软雅黑";
         var words = "生活，多一点简单，少一点烦恼  ";
         var indexs = [];
         var originBottom = canvas.height - 0.15 * canvas.height;
         for (var i = 0; i < words.length; i++) {
            indexs.push({offset: context.measureText(words.substring(0, i)).width, bottom: originBottom});
         }
         var next = 0;
         var task = setInterval(function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            var finish;
            for (i = 0; i < indexs.length; i++) {
               var word = indexs[i];
               if (i === next) {
                  if (next === 0) {
                     word.bottom = word.bottom - 2;
                     var last = indexs[indexs.length - 1];
                     if (last.bottom < originBottom) {
                        last.bottom = last.bottom + 2;
                     }

                  }
                  // else if (next === indexs.length - 1) {
                  //    finish = true;
                  //
                  // }
                  else {
                     indexs[i - 1].bottom = indexs[i - 1].bottom + 2;
                     word.bottom = word.bottom - 2;
                  }
                  if (originBottom - word.bottom >= fontSize) {
                     word.bottom = originBottom - fontSize;
                     if (next === indexs.length - 1) {
                        next = 0;
                     } else {
                        next++;
                     }
                  }
               }
               context.fillText(words.charAt(i), word.offset, word.bottom);
            }
            // if (finish) {
            //    clearInterval(task);
            // }
         }, 10);
      }
   })();
   (function () {
      var image = new Image();
      image.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538141850015&di=2a7d1d9ce0ee61a037b39f0f07bc6d34&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1567198807%2C2377896336%26fm%3D214%26gp%3D0.jpg";
      image.onload = function () {
         initImage();
      };

      function initImage() {
         $(".center-card-contain").children().each(function (index, value) {
            var $2 = $(this);
            var px = 0, py = 0;
            var color;
            var sizeX = image.width, sizeY = image.height;
            var offsetX = sizeX / 2 - $2.width(), offsetY=sizeY/2-$2.height();
            switch (index) {
               case 0:
                  color = "#09f";
                  break;
               case 1:
                  color = "#f90";
                  px = -$2.width() - 10;
                  break;
               case 2:
                  py = -$2.height()-10;
                  color = "#8e0";
                  break;
               case 3:
                  color = "#f33";
                  px = -$2.width() - 10;
                  py = -$2.height() - 10;
                  break;
            }
            $2.css({
               "background": "url('"+image.src+"') no-repeat",
               "background-position-y": py - offsetY + "px",
               "background-position-x": px - offsetX + "px",
               "background-color": color,
               // "background-size": sizeX + "px " + sizeY + "px",
            });
         });
      }
   })()
});

