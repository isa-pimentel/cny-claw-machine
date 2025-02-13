// Existing variables
var playAgain_el = document.querySelector("#play-again")
var download_el = document.querySelector("#download")
var window_el = document.querySelector("#result-window")
var result_img_el = document.querySelector("#result-image")

var result = sessionStorage.getItem("result")

function loadPage() {
    window_el.style.opacity = "1"
    window_el.style.transform = "translateY(0px)"
    download_el.style.opacity = "1"
    playAgain_el.style.opacity = "1"
    result_img_el.src = `Assets/preview_imgs/preview${result}.png`
}

loadPage();

// Improved download handling
download_el.addEventListener("click", async () => {
    try {
        // First check if the image exists
        const response = await fetch(`Assets/prize_imgs/prize${result}.png`);
        if (!response.ok) {
            throw new Error('Image not found');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lucky-envelope-prize-${result}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Sorry, the prize image is not available for download. Please try again later.');
    }
});

playAgain_el.addEventListener("click", ()=> {
    window.location.replace("index.html");
    window_el.style.opacity = "0"
    window_el.style.transform = "translateY(10px)"
    download_el.style.opacity = "0"
    playAgain_el.style.opacity = "0"
})
