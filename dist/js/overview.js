// <a class="ui ${(response.live < parseInt(i) + 1) ? `black ` : 'green'} right ribbon label">Day ${parseInt(i) + 1}</a>
const init = () => {
    const response2 = {
        "id": 2,
        "name": "Statement Of Purpose",
        "author": "Peter K Joseph",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iste placeat exercitationem similique porro, voluptatibus nesciunt quo numquam dicta atque quas cum quae ut doloremque optio deserunt neque fugiat ducimus.",
        "url": "./resources/videos/f1.mp4",
        "uploader": "CheckedIt",
        "duration": "d"
    };
    const response = {
        "live": 2,
        "auth": {
            "name": "Checked It",
            "e_name": "Research Expo"
        },
        "event": [{
                "id": 5,
                "name": "Statement Of Purpose",
                "author": "Peter K Joseph",
            }, {
                "id": 5,
                "name": "Statement Of Purpose",
                "author": "Peter K Joseph"
            }, {
                "id": 5,
                "name": "Statement Of Purpose",
                "author": "Peter K Joseph"
            }, {
                "id": 5,
                "name": "Statement Of Purpose",
                "author": "Peter K Joseph"
            }]
    };
    const backgroundServices = {
        "scroll": {
            "isActive": true,
            "oncall": () => {
                if (backgroundServices.scroll.isActive === true && document.getElementsByClassName("chapter")[0] != null) {
                    (document.scrollingElement.scrollTop > (document.getElementsByClassName("chapter")[0].scrollHeight / 100 * 50)) ? $(".navbar").addClass("show") : $(".navbar").removeClass("show");
                    return 0;
                }
                return -1;
            }
        },
        "makeid": () => {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 15; i++)
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            return result;
        },
        "view": {
            "home": `<div class="chapter">
            <div>
                <h3 id="companyIDresolve">Gathering Client Data</h3>
                <div class="liveState">
                    <div class="blob red"></div>
                    <p>We are pulling up details.. Please wait</p>
                </div>
            </div>
        </div>
        <div class="loadDays"></div>
        </div>`
        }
    };
    $(".main").html(backgroundServices.view.home);
    $("#companyIDresolve").html(response.auth.e_name.toUpperCase());
    (response.live == 0) ? $(".liveState").html("<p>No live events</p>") : $(".liveState").html(`<div class="blob red"></div><p>Day ${response.live} is now live</p>`);
    $(".main").removeClass("animate");
    for (let i in response.event) {
        let id = backgroundServices.makeid();
        $(".loadDays").append(`
        <div class="box ${(response.live == parseInt(i) + 1) ? `live` : ''}">
            <div class="detailsPreview">
                <div class="previewBar"></div>
                <h3>${response.event[i].name}</h3>
                <p>${response.event[i].author}</p>
            </div>
            <div>
                ${(response.live > parseInt(i)) ? `<button class="clickable" date-rel="${response.event[i].id}">Watch Session</button>` : `<button class="unavail">Unavailable</button>`}
            </div>
        </div>`);
    }
    $(window).on("scroll", () => {
        backgroundServices.scroll.oncall();
    });
    $(".clickable").off().on("click", (e) => {
        const curr_id = $(e.currentTarget).attr("data-rel");
        $(`.box`).addClass("hide");
        $(e.currentTarget).parent().parent().removeClass("hide").addClass("selected");
        $(".chapter").addClass("hide");
        backgroundServices.scroll.isActive = false;
        $(".navbar").addClass("show");
        $(".isTextControl").html(`<span class="gobackEvent"><i class="angle left icon" style="font-size: 1.6rem;"></i></span> Getting Data...`);
        $(".gobackEvent").off().on("click", () => {
            backgroundServices.scroll.isActive = true;
            document.scrollingElement.scrollTop = 0;
            backgroundServices.scroll.oncall();
            $(".isTextControl").html(`Internation Research Consortium <span>by CheckedIt`);
            init();
        });
        const success = () => {
            $(".main").addClass("animate");
            setTimeout(() => {
                $(".main").html(`<div class="inPlayerMode"><div class="playerInfo">
                <div class="player" id="player"></div>
                <div class="infoBox">
                <h3>${response2.name}</h3>
                <p class="author">${response2.author}</p>
                <p class="message">
                ${response2.desc}
                </p>
                </div></div><div class="commentBox"><div class="goBack"><i class="angle left icon"></i> <p>Go back</p></div>
                <h3>Comments are disabled</h3></div></div>`);
                const player = new Clappr.Player({
                    source: `${response2.url}`,
                    parentId: "#player",
                    height: "100%",
                    width: "100%"
                });
                console.log(player);
                $(".main").removeClass("animate");
                backgroundServices.scroll.isActive = true;
                $(".navbar").removeClass("show");
                $(".goBack").off().on("click", () => {
                    document.scrollingElement.scrollTop = 0;
                    backgroundServices.scroll.oncall();
                    $(".isTextControl").html(`Internation Research Consortium <span>by CheckedIt`);
                    $(".main").addClass("animate");
                    setTimeout(() => {
                        init();
                    }, 300);
                });
            }, 300);
        };
        success();
    });
    $(".loader-bg").addClass("hide");
    setTimeout(() => {
        $(".loader-bg").remove();
    }, 300);
};
setTimeout(init, 500);
