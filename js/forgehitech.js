/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
    $('#ei-slider').eislideshow({
        animation: 'center',
        autoplay: true,
        slideshow_interval: 3000,
        titlesFactor: 0
    });
    Papa.parse("js/settings.csv", {
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            var data =results.data;
            if (data)
            {
                for (var i = 0; i < data.length; i++)
                {
                    if (data[i][0] === "product" || data[i][0] === "service")
                    {
                        var obj = {
                            title: data[i][2],
                            desc: data[i][3],
                            image: data[i][4],
                            icon: data[i][5]
                        };
                        showPage.pageSettings[data[i][0]][data[i][1]] = obj;
                        $("." + data[i][0] + "Menu").append('<li><a onclick="showPage(\'' + data[i][0] + '\', ' + data[i][1] + ')"><img src="images/' + data[i][0] + "/icon_" + data[i][1] + '.png" alt="img10"/><span>' + data[i][2] + '</span></a></li>');
                    }
                    else if(data[i][0] === "home")
                    {
                        $(".homeContent"+data[i][1]+" .innerDivHeading").html(data[i][2]);
                        $(".homeContent"+data[i][1]+" .innerDivDesc").html(data[i][3]);
                    }
                    else if(data[i][0] === "faq")
                    {
                        var faqContent='<div class="innerFaqDiv">';
                        faqContent   +='    <div class="faqQuestion">'+data[i][1]+'. '+data[i][2]+'</div>';
                        faqContent   +='    <div class="faqAnswer">'+data[i][3]+'</div>';
                        faqContent   +='</div>';
                        $(".outerFaqDiv").append(faqContent);
                        
                    }
                    
                }
            }
            var menu = new cbpHorizontalSlideOutMenu(document.getElementById('cbp-hsmenu-wrapper'));
            $(".faqQuestion").on("click", function () {
                $(".faqAnswer").slideUp();
                $(".faqQuestion").css("font-weight", "normal");
                $(this).css("font-weight", "bold");
                $(this.nextElementSibling).slideDown(500);
            });
        }
    });



    $('.thirdRowContactDiv').click(function () {
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'S2tn5UN3pAf6tFAuk04vGA',
                'message': {
                    'from_email': 'karthikarul20@gmail.com',
                    'to': [
                        {
                            'email': 'karthikarul20@gmail.com',
                            'name': 'Karthik',
                            'type': 'to'
                        },
                        {
                            'email': 'karthik@apilinx.com',
                            'name': 'Karthik',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'YOUR SUBJECT HERE!',
                    'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
                }
            }
        }).done(function (response) {
            console.log(response); // if you're into that sorta thing
        });
    });
});



function toggelSocialIcon(ele)
{
    if (ele.src.indexOf("social_light_bg") !== -1)
    {
        ele.src = ele.src.replace("social_light_bg", "social_dark_bg");
    }
    else
    {
        ele.src = ele.src.replace("social_dark_bg", "social_light_bg");
    }
}


showPage.pageSettings = {product: {}, service: {}};
function showPage(page, id)
{
    $(".page").hide();
    if (page === "product" || page === "service")
    {
        $("#" + page + " .ps_title").html(showPage.pageSettings[page][id].title);
        $("#" + page + " .ps_desc").html(showPage.pageSettings[page][id].desc);
        $("#" + page + " .ps_pic").css("background", "url(images/" + page + "/" + showPage.pageSettings[page][id].image + ") fixed");
        $("#" + page + " .ps_pic").css("background-size", "cover");
    }
    $("#" + page).show();
}