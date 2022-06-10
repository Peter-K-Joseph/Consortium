const backgroundServices = {}

const init = () => {
    $(".loader-bg").addClass("hide");
    setTimeout(()=>{
        $(".loader-bg").remove();
    }, 300)
}

setTimeout(init, 500)