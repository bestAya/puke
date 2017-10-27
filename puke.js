$(function () {
    let types = ['c', 'd', 'h', 's'];
    let poke = [];
    let flag = {};
    let index = 0;
    let bR = $('.btnT');
    let bL = $('.btnB');
    while (poke.length < 52) {
        let hua = types[Math.floor(Math.random() * types.length)];
        let num = Math.floor(Math.random() * 13 + 1);
        if (!flag[`${hua}_${num}`]) {
            poke.push({hua, num});
        }
        flag[`${hua}_${num}`] = true;
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            let left = 300 - 50 * i + 100 * j,
                top = 50 * i;
            index++;
            $('<div>').addClass('poke')
                .attr('id', `${i}_${j}`).data('nub', poke[index]['num'])
                .css({
                    background: `url(images/${poke[index]['num']}${poke[index]['hua']}.jpg`
                    , backgroundSize: 'contain'
                }).appendTo('.box').delay(i * 20).animate({left, top,opacity:1});
        }

    }
    for (; index < poke.length; index++) {
        $('<div>').addClass('poke zuo')
            .attr('id', `${-2}_${-2}`).data('nub', poke[index]['num'])
            .css({
                background: `url(images/${poke[index]['num']}${poke[index]['hua']}.jpg`
                , backgroundSize: 'contain'
            })
            .appendTo('.box').delay(index * 10).animate({left: 0, top: 450,opacity:1});
    }
    let frist = null;
    $('.box').on('click', '.poke', function (e) {

        let element = $(e.target);
        let em = element.attr('id').split('_'),
            em1 = `#${em[0] * 1 + 1}_${em[1] * 1}`,
            em2 = `#${em[0] * 1 + 1}_${em[1] * 1 + 1}`;
        if ($(em1).length || $(em2).length) {
            return;
        }
        element.toggleClass('active');

        if (element.hasClass('active')) {

            element.animate({top: "-=10"})
            element.stop(true,true);
        } else {
            element.animate({top: "+=10"})
            element.stop(true,true);
        }
        if (!frist) {
            frist = $(e.target);
        } else {
            if (frist.data('nub') + element.data('nub') == 14) {
                $('.active').animate({top: 0, left: 600, opacity: 0}, function () {
                    $(this).remove();
                })
            } else {
                $('.active').animate({top: '+=10'}, function () {
                    $(this).removeClass('active');

                });
            }
            frist = null;
        }


    });
    let i=0;
    bR.on('click',function (e) {
        if(!$('.zuo').length){return}
        e.preventDefault();
        $('.zuo').last().animate({top:450,left:600})
            .css('zIndex',i++)
            .removeClass('zuo').addClass('you');
    })
    bL.on('click',function (e) {
        if(!$('.you').length){return}
        i=0;
        e.preventDefault();
        $('.you').each(function (index) {
        $(this).delay(index*30).animate({top:450,left:0})
                .css('zIndex',i++)
                .removeClass('you').addClass('zuo');
        })
    })
});