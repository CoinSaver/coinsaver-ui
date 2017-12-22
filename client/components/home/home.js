angular.module('coinsaver')
  .component('home', {
    bindings: {
    },
    controller(Auth, $state) {

      this.login = function (){
        // logwin.showProgress = true;
        Auth.$signInWithPopup('google')
          .then((result) => {
            location.reload()
          })
      }

      this.$onInit = () => {
        
        Auth.$onAuthStateChanged(function(firebaseUser) {
          if (firebaseUser) {
            console.log('user exists, redirecting')
            // $state.go('stats')
            // $state.reload('stats')
            // $state.transitionTo('stats', null, {reload: true, notify:true});
            // location.reload()
          } else {
            console.log("Signed out");
          }
        });
  
      };
    },
    template: `

    <!--
    <md-content layout="column" flex>
      <md-nav-bar nav-bar-aria-label="home login links">
      -->
        <!-- Spacer -->
        <!--
        <span class="fill-space"></span>
          <md-nav-item md-nav-click="$ctrl.login('google')" name="login">
            [ Login ]
          </md-nav-item>
      </md-nav-bar>
    </md-content>
    -->

    <div>

<!-- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING -->
<!-- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING ---- START MESSING -->
<!DOCTYPE html>
<style>
/* 
    Created on : Jul 4, 2017, 12:43:10 AM
    Author     : Atta-Ur-Rehman Shah (http://attacomsian.com)
*/

/*Google fonts*/
@import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');

html,
body {
    width: 100%;
    height: 100%;
}
body{
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
    background-color: #FAFAFA;
}
h1,h2,h3,h4,h5,h6{
    font-weight: 700;
}
.text-primary{
  color: #ffb300 !important;
}
a:-webkit-any-link{
  color: #ffb300 !important;
}
b, strong{
    font-weight: 500;
}
.brand-logo{
    width: 180px;
}
.navbar{
    min-height: 80px;
}
.navbar-nav .nav-item .nav-link{
    font-weight: 500;
}
.navbar-brand {
    font-weight: 700;
}
.navbar-inverse .navbar-nav .nav-link, .navbar .navbar-brand, .navbar-toggler span {
    color: rgba(255,255,255,.8);
}
.navbar .nav-item .active, .navbar .nav-link:hover,.navbar .nav-link:focus, .navbar .navbar-brand:hover{
    color: #fff !important;
}
.sticky-navigation{
    top: 0px;
    background-color: transparent;
}
.hero{
    height: 100vh;
    min-height: 500px;
    padding: 100px 0;
}
.hero .brand{
    margin-top: 100px;
}
@media (max-width: 768px){
    .hero .brand {
        margin-top: 0px; 
    }
}
.store-img
{
    width: 170px;
}
.hero h1{
    font-weight: 100;
} 
.hero h1 b{
    font-weight: 700;
} 
a {
    color: #007600;
    -webkit-transition: all .35s;
    -moz-transition: all .35s;
    transition: all .35s;
}
a:hover,
a:focus {
    color: #007600 !important;
    outline: 0;
    text-decoration: none !important;
}
section{
    padding: 80px 0px;
}
.img-team{
    width: 150px;
    box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.15);
    -webkit-transition: 350ms ease all;
    transition: 350ms ease all;
}
.img-team:hover{
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.15);
}
.team h5{
    padding: 35px 0 15px 0;
    font-weight: 500;
}
.team p{
    color: #999;
}
.card-outline-primary{
    border: solid 1px #007600;
}
.small-xl{
    font-size: 90%;
}
.small-xs{
    font-size: 70%;
}
.badge {
    color: #fff; 
}
/*===============================================
* Background Colors
================================================*/
.bg-texture{
    background-image: url("./images/alt-bitcoin.png");
  }
.bg-texture-collage{
    background:-webkit-linear-gradient(-45deg, #ffb300 33%, transparent 0%),
        linear-gradient(-45deg, #007600 67%, transparent 33%),
        linear-gradient(-45deg, #ffb300 100%, transparent 67%);
    background:-moz-linear-gradient(-45deg, #ffb300 33%, transparent 0%),
        linear-gradient(-45deg, #007600 67%, transparent 33%),
        linear-gradient(-45deg, #ffb300 100%, transparent 67%);
    background:linear-gradient(-45deg, #00c400 33%, transparent 0%),
        linear-gradient(-45deg, #006200 67%, transparent 33%),
        linear-gradient(-45deg, #00c400 100%, transparent 67%);
}
.bg-alt {
    background-color: #fff;
}
.bg-faded{
    background-color: #FAFAFA;
}
.bg-primary{
    background-color: #007600 !important;
}
.bg-footer{
    background-color: #171717;
}
/*===============================================
* Text Colors
================================================*/
.text-faded {
    color: #FAFAFA;
}
.text-dark {
    color: #37474F;
}
.text-muted{
    color: #999 !important;
}
.text-white {
    color: #fff;
}
.text-primary {
    color: #007600 !important;
}
.text-primary-light{
    color: #ffb300;
}

/*===============================================
* Icon Sizes
================================================*/
.icon-lg {
    font-size: 60px;
    line-height: 18px;
}
.icon-md {
    font-size: 50px;
    line-height: 14px;
}
.icon-sm {
    font-size: 30px;
    line-height: 14px;
}
/*===============================================
* Colored Buttons
================================================*/
.btn{
    box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.15);
    -webkit-transition: 350ms ease all;
    transition: 350ms ease all;
    text-transform: uppercase;
    font-weight: 500;
    padding: .6rem 1.5rem;
}
.btn:hover, .btn:focus {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.15);
}
.btn-white {
    color: #ffb300 !important;
    background-color: #fff;
    border-color: #fff;
}
.btn-white:hover{
    color: #00c400;
}
.btn-primary{
    background-color: #00c400 !important;
    border-color: #00c400 !important;
}
.btn-primary:hover, .btn-primary:focus{
    color: #fff !important;
}
.btn-radius{
    border-radius: 50px;
}
/*===============================================
* Borders Utilities
================================================*/
.border-none{
    border: none !important;
    border-color: transparent !important;
}
.border-all{
    border: 1px solid #DEE5E5 !important;
}
.border-left{
    border-left: 1px solid #DEE5E5 !important;
}
.border-right{
    border-right: 1px solid #DEE5E5 !important;
}
.border-top{
    border-top: 1px solid #DEE5E5 !important;
}
.border-bottom{
    border-bottom: 1px solid #DEE5E5 !important;
}
/*===============================================
* Social Icons
================================================*/
.text-twitter-alt, .text-facebook-alt, .text-linkedin-alt, .text-google-alt, .text-github-alt{
    color:#007600;
}
.text-twitter, .text-twitter-alt:hover{
    color:#00aced;
}
.text-facebook, .text-facebook-alt:hover{
    color: #3b5998;
}
.text-google, .text-google-alt:hover{
    color: #dd4b39;
}
.text-linkedin, .text-linkedin-alt:hover{
    color: #007bb6;
}
.text-github, .text-github-alt:hover{
    color: #000000;
}
/*===============================================
* Cards
================================================*/
.card{
    border: none;
    margin-bottom: 30px;
}
.card .card-body .icon-box{
    padding: 20px 0;
    color: #007600;
}
.card .card-body h6{
    padding-bottom: 15px;
    font-size: 1.2rem;
    font-weight: 500;
}
.card:hover{
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.15);
}
/*
Pricing tables & lists
*/
.pricing-list{
    padding-top: 25px;
    padding-bottom: 25px;
}
.pricing-list li {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 15px;
}
.list-default{
    list-style: none;
    padding-left: 25px;
}
.list-default>li {
    position: relative;
    padding: 6px 0;
    line-height: 1.55em;
    font-size: 0.94rem;
}
.list-default>li:before {
    content: "\f21b";
    position: absolute;
    left: -25px;
    top: 8px;
    font-size: 10px;
    color: #007600;
    font-family: "Ionicons";
}
::selection {
    color: #fff;
    text-shadow: none;
    background: #007600;
}
</style>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--Bootstrap 4-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
        <!--icons-->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />

        <script>
        /* 
        Created on : Jul 4, 2017, 12:43:10 AM
        Author     : Atta-Ur-Rehman Shah (http://attacomsian.com)
        */
       $(function () {
           //init 
           init();
           //init wow effects
           new WOW().init();
       
           //scroll menu
           $(window).scroll(function () {
               init();
           });
       
           //page scroll
           $('a.page-scroll').bind('click', function (event) {
               var $anchor = $(this);
               $('html, body').stop().animate({
                   scrollTop: $($anchor.attr('href')).offset().top - 50
               }, 1500, 'easeInOutExpo');
               event.preventDefault();
           });
       
           //init function
           function init() {
               var secondFeature = $('#features').offset().top;
               var scroll = $(window).scrollTop();
               if (scroll >= 150) {
                   $('.sticky-navigation').css({"background-color": '#d81b60'});
               } else {
                   $('.sticky-navigation').css({"background-color": 'transparent'});
               }
               if (scroll >= secondFeature - 200) {
                   $(".mobileScreen").css({'background-position': 'center top'});
               }
               return false;
           }
       });
       </script>
    </head>
    <body>
        <!--header-->
        <nav class="navbar navbar-expand-md navbar-dark fixed-top sticky-navigation">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="ion-grid icon-sm"></span>
            </button>
            <a class="navbar-brand hero-heading" href="#">COINSAVER</a>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" ng-click="$ctrl.login('google')"> LOGIN <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" href="#features">Features</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" href="#pricing">Pricing</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" href="#team">Team</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" href="#blog">Blog</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!--main section-->
        <section class="bg-texture hero" id="main">
            <div class="container">
                <div class="row d-md-flex brand">
                    <div class="col-md-6 hidden-sm-down wow fadeIn">
                        <!--<img class="img-fluid mx-auto d-block" src="img/product.png"/>-->
                    </div>
                    <div class="col-md-6 col-sm-12 text-white wow fadeIn">
                        <h2 class="pt-4">Welcome to <b class="text-primary-light">Coinsaver</b></h2>
                        <!--<h2 class="pt-4">Start saving in crypto today!</h2>-->
                        <p class="mt-3">
                            Here at coinsaver we believe in the future of crypto as an industry and fiat standard. Our aim is to allow you easy, one click access to start saving in crypto today.
                        </p>
                        <p class="mt-3">
                            <!--<a href="#pricing" class="btn btn-primary mr-2 mb-2 page-scroll">Buy Now</a>-->
                            <a href="#download" class="btn btn-white mb-2 page-scroll">Start Now</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!--features-->
        <section class="bg-light" id="features">
            <div class="container">
                <div class="row mb-3">
                    <div class="col-md-6 col-sm-8 mx-auto text-center wow fadeIn">
                        <!--<h2 class="text-primary">Amazing Features</h2>-->
                        <p class="lead mt-1">
                            Coinsaver is secure, easy to use and simple to set up
                        </p>
                    </div>
                </div>
                <div class="row mt-5 text-center">
                  <div class="col-md-4 wow fadeIn">
                    <div class="card">
                      <div class="card-body">
                        <div class="icon-box">
                            <em class="ion-ios-locked-outline icon-md"></em>
                        </div>
                        <h6>Highly Secure</h6>
                          <p>
                            Coinsaver uses the best practices in authorization and security to ensure your business is safe with us.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 wow fadeIn">
                    <div class="card">
                        <div class="card-body">
                            <div class="icon-box">
                                <em class="ion-ios-cloud-upload-outline icon-md"></em>
                            </div>
                            <h6>Coinbase-linked Auth</h6>
                            <p>
                              By utilizing your coinbase account, we can ensure all your wallets and data are protected to the maximum level.
                            </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 wow fadeIn">
                    <div class="card">
                        <div class="card-body">
                            <div class="icon-box">
                                <em class="ion-ios-settings icon-md"></em>
                            </div>
                            <h6>Advanced Control</h6>
                            <p>
                                Change your settings to save every month, only based on change, or easily remove your data should you please.
                            </p>
                        </div>
                      </div>
                    </div>
                    <!--<div class="col-md-4 wow fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <div class="icon-box">
                                    <em class="ion-ios-game-controller-b-outline icon-md"></em>
                                </div>
                                <h6>Unlimited Gaming</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <div class="icon-box">
                                    <em class="ion-android-wifi icon-md"></em>
                                </div>
                                <h6>Built-in Wifi</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <div class="icon-box">
                                    <em class="ion-android-color-palette icon-md"></em>
                                </div>
                                <h6>Unlimited Colors</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                </p>
                            </div>
                        </div>
                    </div>-->
                </div>
            </div>
        </section>

        <section class="bg-white p-0">
            <div class="container-fluid">
                <div class="row d-md-flex mt-5">
                    <div class="col-sm-6 p-0 wow fadeInLeft">
                        <img class="img-fluid" src="./components/home/img/product2.jpg" alt="Gallery">
                    </div>
                    <div class="col-sm-6 pl-5 pr-5 pt-5 pb-4 wow fadeInRight">
                        <h3><a href="#">How does coinsaver work?</a></h3>
                        <p class="lead pt-4">Coinsaver takes your daily purchases and rounds up to the nearest dollar, saving that change to be invested at the end of the week.</p>
                        <ul class="pt-4 pb-3 list-default">
                            <li>By using coinbase, our service is fast, simple and easy.</li>
                            <li>We only request read access of your transactions and don't store any sensitive information.</li>
                            <li>Secure.</li>
                            <li>Buzzwords.</li>
                            <li>Crypto.</li>
                            <li>These are the words of the future son.</li>
                            <li>Get with the times. Get rich. Get COINSAVED.</li>
                        </ul>
                        <!--<a href="#purchase" class="btn btn-primary mr-2 page-scroll">Get Started with Comply</a>-->
                    </div>
                </div>
            </div>
        </section>

        <!--pricing-
        <section class="bg-light" id="pricing">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12 text-center">
                        <h2 class="text-primary">Pricing</h2>
                        <p class="lead pt-3">
                            Our no-nonsense pricing.
                        </p>
                    </div>
                </div>
                <div class="row d-md-flex mt-4 text-center">
                    <div class="col-sm-4 mt-4 wow fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title pt-4 text-orange">Basic</h5>
                                <h3 class="card-title text-primary pt-4">FREE</h3>
                                <p class="card-text text-muted pb-3 border-bottom">per month</p>
                                <ul class="list-unstyled pricing-list">
                                    <li>Free setup</li>
                                    <li>100MB storage</li>
                                    <li>1GB bandwidth</li>
                                    <li>Basic support</li>
                                </ul>
                                <a href="#" class="btn btn-primary btn-radius">Order Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-0 wow fadeIn">
                        <div class="card pt-4 pb-4">
                            <div class="card-body">
                                <h5 class="card-title pt-4 text-orange">Standard <small class="badge bg-primary small-xs">Popular</small></h5>
                                <h3 class="card-title text-primary pt-4"><sup>$</sup> 9.99</h3>
                                <p class="card-text text-muted pb-3 border-bottom">per month</p>
                                <ul class="list-unstyled pricing-list">
                                    <li>Free setup</li>
                                    <li>5GB storage</li>
                                    <li>Unlimited bandwidth</li>
                                    <li>Priority support</li>
                                </ul>
                                <a href="#" class="btn btn-primary btn-radius">Order Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-4 wow fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title pt-4 text-orange">Advanced</h5>
                                <h3 class="card-title text-primary pt-4"><sup>$</sup> 19.99</h3>
                                <p class="card-text text-muted pb-3 border-bottom">per month</p>
                                <ul class="list-unstyled pricing-list">
                                    <li>Free setup</li>
                                    <li>Unlimited storage</li>
                                    <li>Unlimited bandwidth</li>
                                    <li>24/7 support</li>
                                </ul>
                                <a href="#" class="btn btn-primary btn-radius">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        -->

        <!--download-->
        <!--
        <section class="bg-orange pt-0" id="download">
            <div class="container">
                <div class="row d-md-flex text-center wow fadeIn">
                    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-xs-12">
                        <h5 class="text-primary-light">Download Our Mixtape</h5>
                        <p class="mt-4">
                            it's fire
                        </p>-->
                        <!--<p class="mt-5">
                            <a href="#" class="mr-2"><img src="img/google-play.png" class="store-img"/></a>
                            <a href="#"><img src="img/apple_store.png" class="store-img"/> </a>
                        </p>--><!--
                    </div>
                </div>
            </div>
        </section>
        -->

        <!--team-->
        <section class="bg-white"  style="background-color:rgb(48,48,48)!important" id="team">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-8 mx-auto text-center">
                        <h2 class="text-primary-light">Meet the CoinSaver Devs</h2>
                        <p class="lead pt-3">
                            Leading the way in secured crypto futures
                        </p>
                    </div>
                </div>
                <div class="row d-md-flex mt-1 text-center">
                    <div class="team col-sm-4 mt-2 wow fadeInLeft">
                        <img src="./components/home/img/team-1.jpg" alt="it alex" class="img-team img-fluid rounded-circle"/>
                        <h5>Alex Brawley</h5>
                        <p>Cryptologist Expert</p>
                    </div>
                    <div class="team col-sm-4 mt-2 wow fadeIn">
                        <img src="./components/home/img/team-2.jpg" alt="it rich" class="img-team img-fluid rounded-circle"/>
                        <h5>Richard Oh</h5>
                        <p>The guy we ask to do github stuff</p>
                    </div>
                    <div class="team col-sm-4 mt-2 wow fadeIn">
                        <img src="./components/home/img/team-3.jpg" alt="it mike" class="img-team img-fluid rounded-circle"/>
                        <h5>Michael Walker</h5>
                        <p>"The Muscle"</p>
                    </div>
                </div>
            </div>
        </section>

        <!--blog
        <section class="bg-light" id="blog">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12 text-center">
                        <h2 class="text-primary">From Our Blog</h2>
                        <p class="lead pt-3">
                            The latest news from Comply blog.
                        </p>
                    </div>
                </div>
                <div class="row d-md-flex mt-5">
                    <div class="col-sm-4 mt-2 wow fadeIn">
                        <div class="card">
                            <img class="card-img-top" src="img/blog-1.jpg" alt="Image">
                            <div class="card-body">
                                <p class="card-text text-muted small-xl">
                                    <em class="ion-ios-calendar-outline"></em> 22h ago &nbsp;&nbsp;
                                    <em class="ion-ios-person-outline"></em> Kahtrine Kaif &nbsp;&nbsp;
                                    <em class="ion-ios-time-outline"></em> 5min read
                                </p>
                                <h5 class="card-title"><a href="#">Comply version 5.0 is available now.</a></h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div class="card-body text-right">
                                <a href="#" class="card-link"><strong>Read more</strong></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2 wow fadeIn">
                        <div class="card">
                            <img class="card-img-top" src="img/blog-2.jpg" alt="Image">
                            <div class="card-body">
                                <p class="card-text text-muted small-xl">
                                    <em class="ion-ios-calendar-outline"></em> 1week ago &nbsp;&nbsp;
                                    <em class="ion-ios-person-outline"></em> John Deo &nbsp;&nbsp;
                                    <em class="ion-ios-time-outline"></em> 2min read
                                </p>
                                <h5 class="card-title"><a href="#">We celebrated our success with cake.</a></h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div class="card-body text-right">
                                <a href="#" class="card-link"><strong>Read more</strong></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2 wow fadeIn">
                        <div class="card">
                            <img class="card-img-top" src="img/blog-3.jpg" alt="Image">
                            <div class="card-body">
                                <p class="card-text text-muted small-xl">
                                    <em class="ion-ios-calendar-outline"></em> 1mon ago &nbsp;&nbsp;
                                    <em class="ion-ios-person-outline"></em> Kathrine Kaif &nbsp;&nbsp;
                                    <em class="ion-ios-time-outline"></em> 10min read
                                </p>
                                <h5 class="card-title"><a href="#">Connecting virtual reality with the people.</a></h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div class="card-body text-right">
                                <a href="#" class="card-link"><strong>Read more</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       -->

        <!--contact-->
        <section class="bg-texture-collage p-0" id="contact">
            <div class="container">
                <div class="row d-md-flex text-white text-center wow fadeIn">
                    <div class="col-sm-4 p-5">
                        <p><em class="ion-ios-telephone-outline icon-md"></em></p>
                        <p class="lead">+1 5456 87595</p>
                    </div>
                    <div class="col-sm-4 p-5">
                        <p><em class="ion-ios-email-outline icon-md"></em></p>
                        <p class="lead">coinsaver@gmail.com</p>
                    </div>
                    <div class="col-sm-4 p-5">
                        <p><em class="ion-ios-location-outline icon-md"></em></p>
                        <p class="lead">Los Angeles, California</p>
                    </div>
                </div>
            </div>
        </section>

        <!--footer-->
        <section class="bg-footer" id="connect">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12 text-center wow fadeIn">
                        <p class="mt-4">
                            <a href="https://twitter.com/" target="_blank"><em class="ion-social-twitter text-twitter-alt icon-sm mr-3"></em></a>
                            <a href="https://facebook.com/" target="_blank"><em class="ion-social-github text-facebook-alt icon-sm mr-3"></em></a>
                            <a href="https://www.linkedin.com/" target="_blank"><em class="ion-social-linkedin text-linkedin-alt icon-sm mr-3"></em></a>
                            <a href="https://plus.google.com/" target="_blank"><em class="ion-social-googleplus text-google-alt icon-sm mr-3"></em></a>
                        </p>
                        <p class="pt-2 text-muted">
                            &copy; 2017, CoinsaverAPP Dev Team.
                            <a href="https://github.com/coinsaver">ARMS</a>. Developed by <a href="https://github.com/mdubbpro">@mdubbpro</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>


        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js"></script>
        <script src="./components/home/js/scripts.js"></script>
    </body>
</html>



<!-- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING -->
<!-- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING ---- END MESSING -->


    </div>
  `,
  });
