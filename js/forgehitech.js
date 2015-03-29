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
    loadCSVContents();
    initializeEmail();
    
    $("#homePage>div").height($(window).height());
    $("#homePage>div>div").css("margin-top",$(window).height()/2 + "px");
    
});


function is_email(email) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
} 

function initializeEmail()
{
    $('.thirdRowContactDiv').click(function () {
        if(!$("#emailFrom").val())
        {
            $("#emailResponseText").html("Email Address is mandatory...");
            $("#emailResponseText").css("color","red");
            return;
        }
        else if(!is_email($("#emailFrom").val()))
        {
            $("#emailResponseText").html("Please enter valid email address...");
            $("#emailResponseText").css("color","red");
            return;
        }
        else if(!$("#emailContent").val())
        {
            $("#emailResponseText").html("Please type some content...");
            $("#emailResponseText").css("color","red");
            return;
        }
            
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'S2tn5UN3pAf6tFAuk04vGA',
                'message': {
                    'from_email': $("#emailFrom").val(),
                    'to': [
                        {
                            'email': 'karthikarul20@gmail.com',
                            'name': 'Karthik',
                            'type': 'to'
                        },
                        {
                            'email': 'yogesh@forgehitech.com',
                            'name': 'Yogesh',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': "Email from Forgehitech Contact US Page - "+$("#emailName").val(),
                    'html': $("#emailContent").val()+"\n"+"Mobile: "+$("#emailMobile").val()+"\n"+"City: "+$("#emailCity").val()
                }
            },
            success: function (response) {
                if (response)
                {
                    $("#emailFrom").val("");
                    $("#emailName").val("");
                    $("#emailMobile").val("");
                    $("#emailCity").val("");
                    $("#emailContent").val("");
                    $("#emailResponseText").html("Thanks for contacting forgehitech. We will get back to you soon.");
                    $("#emailResponseText").css("color", "rgb(0, 237, 0)");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#emailResponseText").html("Network error. Please try again after some time...");
                $("#emailResponseText").css("color","red");
            },
            complete: function (jqXHR, textStatus) {
                
            }
        });
    });
}




function loadCSVContents()
{
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
                        $("." + data[i][0] + "Menu").append('<li><a onclick="showPage(\'' + data[i][0] + '\', ' + data[i][1] + ')"><img src="images/' + data[i][0] + "/icon_" + data[i][1] + '.png"  style="  width: 25px;height: 25px;float: right;" alt="img10"/><span>' + data[i][2] + '</span></a></li>');
                        //$("." + data[i][0] + "Menu").append('<li><a onclick="showPage(\'' + data[i][0] + '\', ' + data[i][1] + ')"><span>' + data[i][2] + '</span></a></li>');
                    }
                    else if(data[i][0] === "home")
                    {
//                        $(".homeContent"+data[i][1]+" .innerDivHeading").html(data[i][2]);
//                        $(".homeContent"+data[i][1]+" .innerDivDesc").html(data[i][3]);
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
//          var menu = new cbpHorizontalSlideOutMenu(document.getElementById('cbp-hsmenu-wrapper'));
            showPage.menu = new cbpTooltipMenu( document.getElementById( 'cbp-tm-menu' ) );
//            $(".faqQuestion").on("click", function () {
//                $(".faqAnswer").slideUp();
//                $(".faqQuestion").css("font-weight", "normal");
//                $(this).css("font-weight", "bold");
//                $(this.nextElementSibling).slideDown(500);
//            });
        }
    });
}



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


showPage.menu;
showPage.pageSettings = {product: {}, service: {}};
showPage.pageSettingsNew = {product: {
        1:{
            title:"What is HomeAutomation?",
            desc:"Home Automation enables the automatic control of commonly used elements such as lighting, security, temperature, music and other home devices in a manner that is personalized to the needs of each family. Automated homes are referred to as \"Smart Homes\". Following are the benefits of home automation."
            +"<ul>"
            +"<li><b>Convenience:</b> An automated home is about the convenience of saving your time and effort by having your home automatically do routine functions such as watering your grass (but only if it has not rained recently) or turning off all lights, setting the thermostat to economy mode and arming the security system when you retire for the night. Its about enjoying home theater time by having the lights dim, curtains close, TV and DVD player turn on and popcorn popper start... all with the touch of just one button.</li>"
            +"<li><b>Security:</b>  Home automation is about the security you have knowing that you can look in on your home remotely from anywhere in the world, or that your home will phone you if anything is amiss, or that a fire will alert your home to wake you, shut down the gas and ventilation system and turn on a lighting path for your escape.</li>"
            +"<li><b>Savings:</b> Its about the energy savings you will enjoy by assigning your home the responsibility of regulating the operation of lights, water heater, HVAC system, entertainment components, appliances and irrigation system so these devices are on only when needed. The benefits of an automated home are only limited by your imagination.</li>"
            +"</ul>"
        },
        2:{
            title:"Multiroom Audio Benefits",
            desc:"One of the most valuable benefits of the integrated home is the opportunity to enjoy multi room audio. Multi room audio systems enable home owners to listen to their favorite audio everywhere around the house and also in the garden. A multi room audio system can deliver music from one central source (media server) or from distributed sources (such as iPods that can feed music in various rooms). Since each person in the house is going to have his or her own tastes and preferences, a multi room audio system will be able to deliver different sources simultaneously to different rooms. Conversely, when you're entertaining or just as you're moving around your house, you might want your system to be playing the same synchronized source to every zone in the house. The following are the benefits of the Multi-Room audio system such as the HiFi by HAI system:"
            +"<ul>"
            +"<li><b>Very easy to use.</b> The Volume-Source Control (VSC) has a routed IR repeater. The main unit is mounted on a closet wall for a neat professional installation.</li>"
            +"<li><b>Enjoy Music Anywhere In The House.</b> Instead of taking sources from the audio rack, this is designed to take sources from all over the home such as a PC in the office, a TV in the kitchen, iPods etc. All the sources can be scattered around the house as they normally would be, but you can enjoy them anywhere in the house where you have a keypad and speaker.</li>"       
            +"<li><b>Affordable high fidelity performance.</b> It has three times more power than \"amplified keypad\" systems at similar cost. In addition to this power, there are two variable outputs (Zones 1 and 8) for connections to external power amplifiers and a page/mute input.</li>"       
            +"<li><b>Plug and Play with HAI's Omni home control systems.</b> The Hi-Fi system can be controlled by the user through the OmniTouch touchscreen or through automation programming. The home control system can select the source and set the volume for each zone to coordinate the audio system with your activities.</li>"
            +"</ul>"
            +"Hi-Fi by HAI is a built in Whole Home Audio System with sleek wall mounted controls that replace bulky speakers and components in your rooms. Hi-Fi by HAI offers the ability to share any music in your house with any other room in the house. HAI's many user interfaces including the Omnitouch touchscreen consoles Snap-Link Home Control for Windows Media Center and Web-Link II. The wall mounted Volume and Source Control (VSC) features an easy-to-use turn knob for music selection and volume control and also acts as an infrared repeater for source component control. Remote Input Modules (RIMs) can be located throughout the house to pick up music from your home theater, kitchen, TV, computer, personal music player, satellite, radio, Media Center, CD player- any source with an audio output. HAI includes a basic remote control that can select source and volume with the Hi-Fi system."
        },
        3:{
            title:"Lighting Automation Benefits",
            desc:"A lighting control system enables one-touch control of all lights throughout the house using mood-based scenes which can be created resulting in convenience and elegance. With the touch of a button, you can turn lights on or off, dim lights, control fans and more from anywhere in the house. Forgehitech designs and installs wired and wireless lighting control systems personalized to the needs of each family. Lighting control systems can be programmed easily based on time of day, motion, security, mood, and many other factors. For example, with a lighting control system you can program your lights to automatically turn on when you enter the house or turn off during nights or when you leave the house. You can program lighting scenes consistent with a relaxing evening, a late night party or a holiday dinner. Lighting control systems do not take away from your ability to control individual lights the way you have always done. "
            +"<br>The following are some examples of the benefits of a lighting control system."
            +"<ul>"
            +"<li><b>Welcome Home: </b>Return to your home that has a pathway of light from the garage to the kitchen providing security and convenience.</li>"
            +"<li><b>Kitchen and Dining Room:</b>Create scenes for the different tasks such as dining, cooking and cleaning.</li>"
            +"<li> <b>Master Bedroom: </b>  Control zones of lights from the bedside to turn ON and OFF lights outside, downstairs or throughout the home.</li>"
            +"<li> <b>Landscape and Garden:</b>  Schedule when the garden path lights turn ON and OFF, or combine all the outdoor lights to activate at once for security.</li>"
            +"<li> <b>Staircase and Hallways:</b>  Ensure safety by turning on lights at appropriate lighting levels throughout the day and night.</li>"
            +"<li> <b>Living Room:</b>  Add elegance and intimacy. Lighting is one of the most powerful methods Interior Designers use to change moods in a room.</li>"
            +"<li> <b>Family Room or Great Room:</b>  Select a lighting scene for one person to read a good book, or the entire family to celebrate a birthday party.</li>"
            +"</ul>"
        },
        4:{
            title:"Motorized curtains can be of immense value in the following ways ",
            desc:"<ul>"
            +"<li>  <b>Lighting Moods:</b>  Contribute to providing the right blend of natural lighting and indoor lighting; for example, curtains can automatically be opened in the morning to allow light into the home, closed during the day hours to conserve energy, opened in the evening hours to enjoy views or allow for fresh air and then closed again at night for privacy. Automation of curtains makes the opening and closing of curtains convenient and enables home owners to enjoy the benefits of natural lighting.</li>"
            +"<li>  <b>Energy Savings:</b>  Automatic closing of curtains during warm days can keep indoors cool and contribute to energy savings</li>"
            +"<li>  <b>Preservation of Interiors:</b>  Motorized curtains enable protection of expensive interiors by blocking harmful sun's rays during the day time.</li>"
            +"<li>  <b>Privacy</b>   Motorized curtains can be integrated with home automation systems to automatically close at nights to enable privacy.</li>"
            +"</ul>"
        },
        5:{
            title:"Energy Management",
            desc:"Energy management is becoming important as awareness about energy conservation has increased. The following are key areas of energy conservation in which Forgehitech can contribute"
            +"<ul>"
            +"<li>Automation of Heating, Ventilation and Air-Conditioning Systems and programming them for optimal utilization of energy.</li>"
            +"<li>Installation of occupancy sensors to conserve electricity.</li>"
            +"<li>Automation of lighting systems for optimal utilization of energy.</li>"
            +"<li>Motorized curtain controls can maintain cool indoors and conserve energy.</li>"
            +"<li>Solar Power solutions in partnership with reputable firms.</li>"
            +"</ul>"
        },
        6:{
            title:"Home Theater Benefits",
            desc:"Bring the movies to your home! Home theaters are becoming increasingly popular as a lifestyle enhancement feature that gives joy to families. Forgehitech can design and build home theaters with exceptional performance and beauty. Our theaters include high quality audio processing equipment, aesthetic in-wall speakers, stunning high-definition projectors and large screens that will display life size images when watching your favorite movies or sports events. We perform acoustic analysis and tune the system for optimal performance. Forgehitech specializes in building home theaters that can also be used for other complementary purposes such as home disco, karaoke and performance stage for kids with recording capabilities at minimal additional costs. We can transform family rooms or media rooms into the space of your dreams! "
            +"<ul>"
            +"<li>You love the perfection of high definition video</li>"
            +"<li>You demand to view it in a super-sized screen with images as large as life</li>"
            +"<li>You demand to be surrounded by sound that will place you smack-dab in middle of the action</li>"
            +"<li>You demand movie theater effects such as lights that dim as the action begins</li>"
            +"<li>You love to gather with your family and have some fun or watch sports with your buddies</li>"
            +"<li>You demand all this and more in the most affordable manner</li>"
            +"</ul>"
        },
        7:{
            title:"Why should I have a security alarm system?",
            desc:"Security systems provide safety to families from incidents such as burglary, fire and gas leaks. <br>We are all at risk of not only losing our valuables but also suffering possible harm to our dear ones. You can however protect yourself from intruders to a significant extent with the installation of an electronic security system.Security alarm systems have for decades successfully saved valuable properties and life worldwide. Many burglars are scared away just by the presence of a loud siren from security systems. Further, the security system will immediately call family, neighbors and friends to alert them about the burglary which can result in timely intervention. <br>You own a gorgeous home and possess valuable pieces of art, furniture and electronics. You wouldn't want your home to be burglarized, but you don't really like the idea of running wires along your walls to install a security system. Well, why not buy a wireless security system which can be easily installed?<br>Motion detectors will trigger the alarm upon sensing any motion in the house when the system is armed. Window and door sensors will trigger the alarm when there is a break-in.<br>Go ahead and ensure your family's safety with Forgehitech's SecureMax1000 burglar alarm system."
        },
        8:{
            title:"Surveillance",
            desc:"Surveillance Systems offer the following advantages in the protection of people and property"
            +"<ul>"
            +"<li>Offer 24/7 protection of premises monitored with cameras that record video to Digital Video Recorders (DVR).</li>"
            +"<li>Valuable clues can be obtained toward solving crimes by reviewing recorded video.</li>"
            +"<li>Serve as deterrents against crime.</li>"
            +"<li>Reduce the need for security guards.</li>"
            +"<li>Possible discounts in insurance premiums.</li>"
            +"</ul>"
        },
        9:{
            title:"Access Control",
            desc:"Access control systems provide the following benefits"
            +"<ul>"
            +"<li>Monitoring entry and exit of people in and out of protected areas.</li>"
            +"<li>The access card can be reprogrammed as needed instead of having to make additional keys.</li>"
            +"<li>Minimize the need for security guards.</li>"
            +"<li>Detecting crime and theft from electronic access records.</li>"
            +"</ul>"
        },
        10:{
            title:"Digital Door Locks",
            desc:"Digital Door Locks provide the following advantages in applications such as homes and hotels"
            +"<ul>"
            +"<li>Keyless secure access with biometric, card or numbers.</li>"
            +"<li>Key can be used as needed.</li>"
            +"<li>Integration with automation systems possible, which will enable users to open digital door locks from inside the premises or from remote locations using their Smart phones.</li>"
            +"<li>Digital Door Locks can add beauty to doors in homes and provide pride of ownership.</li>"
            +"</ul>"
        },
}};
function showPage(page, id)
{
    $(".page").hide();
    if (page === "product")
    {
        $("#" + page + " .ps_title").html(showPage.pageSettingsNew[page][id].title);
        $("#" + page + " .ps_desc").html(showPage.pageSettingsNew[page][id].desc);
        $("#" + page + " .ps_pic").css("background", "url(images/" + page + "/" + showPage.pageSettings[page][id].image + ") fixed");
        $("#" + page + " .ps_pic").css("background-size", "cover");
    }
    $("#" + page).show();
    $("body").animate({
        scrollTop: $(window).height()
    }, 1000); /* increase / decrease animation speed */
}


function backToTop()
{
    $("body").animate({
        scrollTop: 0
    }, 1000); /* increase / decrease animation speed */
}