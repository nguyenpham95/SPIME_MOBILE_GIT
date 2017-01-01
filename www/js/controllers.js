var app = angular.module('app')
.controller('mainController', function($scope, $window, $http, $ionicScrollDelegate, $ionicLoading, $ionicPlatform, $cordovaGeolocation, $timeout, $interval, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, $ionicPopup, socket) {
  $ionicPlatform.ready(function() {
    jQuery(document).ready(function () {
      ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
      $scope.materialize = function(){
        $timeout(function(){
          ionicMaterialInk.displayEffect();
          ionicMaterialMotion.ripple();
        },0);
      };
      var showLeftSlider = function () {
        timeouts.push($timeout(function () {
           //ionic.material.ink.displayEffect();
           ionicMaterialInk.displayEffect();
         }, 0));
        jQuery("#sideBarLeft").velocity( { "left": 0 }, {duration: 400});
      };
      var showRightSlider = function () {
        jQuery("#sideBarRight").velocity( { "right": 0 }, {duration: 400});
      };
      $scope.hideLeftSlider = function () {
        jQuery("#sideBarLeft").velocity( {"left": "-101%" }, {duration: 400});
      };
      $scope.hideRightSlider = function () {
        jQuery("#sideBarRight").velocity( {"right": "-101%" }, {duration: 400});
      };
      $scope.showLeftSlider = function () {
        showLeftSlider();
      };

      $scope.showNoti = function () {
        showRightSlider();
        $scope.unseenNotis = 0;
      };
      $scope.deleteThisNoti = function (index) {
        $scope.notis.splice(index, 1);
      }
      jQuery(".sidebar-left").on("swipeleft", function () {
        $scope.hideLeftSlider();
      });

      jQuery(".anchor-job-type").on("click", function (e) {
        e.stopPropagation();
        var ele = jQuery(this);
        jQuery(".anchor-job-type").css( {
          "color": "#B0BEC5"
        });
        ele.css( {
          "color": "#FFF8E1"
        });
      });
      var jobTypeSlideUp = function () {
        jQuery("#divJobType6").velocity( { "bottom": "3px" }, {duration: 400 });
        jQuery("#divJobType5").velocity( { "bottom": "63px" }, {duration: 400 });
        jQuery("#divJobType4").velocity( { "bottom": "123px" }, {duration: 400 });
        jQuery("#divJobType3").velocity( { "bottom": "183px" }, {duration: 400 });
        jQuery("#divJobType2").velocity( { "bottom": "243px" }, {duration: 400 });
        jQuery("#divJobType1").velocity( { "bottom": "303px" }, {duration: 400 });
        jQuery("#divChuaJobSlider").velocity(
          { "bottom": "-202px" },
          { duration: 400 }
        );
      };
      var jobTypeSlideDown = function () {
        // jQuery(".divJobType").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType6").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType5").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType4").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType3").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType2").velocity( { "bottom": "-80px" }, {duration: 400 });
        jQuery("#divJobType1").velocity( { "bottom": "-80px" }, {duration: 400 });
        if ($scope.searchedJobs.length > 0) {
          jQuery("#divChuaJobSlider").velocity(
            { "bottom": "52px" },
            { duration: 400 }
          );
        }
      };
      var jobTypeCount = 0;
      jQuery("#btnChooseJobType").on("click", function (e) {
        e.stopPropagation();
        if (jobTypeCount % 2 == 0) {
          jobTypeSlideUp();
          jobTypeCount += 1;
        }
        else {
          jobTypeSlideDown();
          jobTypeCount += 1;
        }
      });
      jQuery(".job-type-logo-label").on("click", function (e) {
        e.stopPropagation();
        var ele = jQuery(this);
        setTimeout(
          function()
          {
            jQuery(".divJobType").not(ele.parent()).velocity( { "bottom": "-80px" }, {duration: 400 });
            ele.parent().velocity( { "bottom": "3px" }, {duration: 400 });
            jobTypeCount += 1;
          }, 400);
        jQuery(".job-type-logo-label").css( { "background-color": "rgb(52,73,94)", "color": "#B0BEC5" } );
        ele.css( { "background-color": "rgb(255,127,0)", "color": "white" } );
      });
      var timeouts = [];
      var intervals = [];
      $scope.rountingControl;
      jQuery('body').on('swipeleft', 'div.jobKhungFly', function() {
        if ($scope.jobIndex <= $scope.searchedJobs.length - 2) {

          $scope.rountingControl.getPlan().setWaypoints([
            L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
            L.latLng($scope.searchedJobs[$scope.jobIndex + 1].location.latlng.lat, $scope.searchedJobs[$scope.jobIndex + 1].location.latlng.lng)
          ]);

          map.panTo($scope.searchedJobs[$scope.jobIndex + 1].location.latlng);
          $scope.jobIndex += 1;
          jQuery("#divChuaJobSliderDivLon").velocity(
            { "margin-left": - (vw * 0.95 * ($scope.jobIndex) ) },
            { duration: 400 }
          );
        };

      //  $scope.rountingControl.show();


      });
      jQuery('body').on('swiperight', 'div.jobKhungFly', function() {
        if ($scope.jobIndex >= 1) {
          $scope.rountingControl.getPlan().setWaypoints([
            L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
            L.latLng($scope.searchedJobs[$scope.jobIndex - 1].location.latlng.lat, $scope.searchedJobs[$scope.jobIndex - 1].location.latlng.lng)
          ]);


          map.panTo($scope.searchedJobs[$scope.jobIndex - 1].location.latlng);
          $scope.jobIndex -= 1;
          jQuery("#divChuaJobSliderDivLon").velocity(
            { "margin-left": - (vw * 0.95 * ($scope.jobIndex) ) },
            { duration: 400 }
          );
        };

      //  $scope.rountingControl.show();

      });

      $scope.databin = [
        {
          info: {
            title: "Hiring C#, .NET and Mobile Application Developer",
            iconIndex: 1,
            type: "academic",
            requester: "Jankaloer",
            salary: "4000",
            hours: "2",
            description: "Job description is the additional information that help employee understand better about what they are expected to perform. This is of course optional.",
            requirements: ["ASP.NET MVC, C#, SQL Server", "HTML, CSS, Javascript", "Framework such as AngularJs"],
            benefits: ["Excessive environment to grow yourself and your business", "High salary"]
          },
          location: {
            latlng: { lat: 10.888349486031192, lng: 106.80642127990723 },
            city: "hcm",
            district: "thuduc"
          },
          distance: 420,
          timeTravel: 18,
          reviews: [
            {
              from: "Nguyen Thi Van Anh",
              ava: "img/phuong2.png",
              content: "He is a good boss, very nice and supportive. Hope to work for him again.",
              ratings: 4
            },
            {
              from: "Pham Thien Thu",
              ava: "img/thu2.png",
              content: "He is the best boss I have ever meet! He treats his employee so nice and full with support.",
              ratings: 5
            },
            {
              from: "Tran Cao Anh",
              ava: "img/anh2.png",
              content: "Nice boss with high salary!",
              ratings: 5
            }

          ],
          applicants: [
            {
              from: "Tran Binh Minh",
              ava: "img/huy2.png",
              content: "Hi, I need to work for the experience. Please contact me.",
              ratings: 4
            },
            {
              from: "Pham Thien Thu",
              ava: "img/thu2.png",
              content: "Hi boss, please contact me.",
              ratings: 2
            },
            {
              from: "Tran Khanh Tien",
              ava: "img/trung2.png",
              content: "Hi, please choose me!",
              ratings: 3
            },
            {
              from: "Tran Thi My Thanh",
              ava: "img/phuong2.png",
              content: "Hi, please give a try. You wont regret it!",
              ratings: 4
            },
            {
              from: "Vo Anh Kiet",
              ava: "img/anonymous.png",
              content: "Hi, check my profile please!",
              ratings: 2
            }

          ],
          employer: {
            name: "Pham Khoi Nguyen",
            ava: "img/ava.png",
            title: "Mobile and Website Developer",
            ratings: 4
          }
        }
      ];
      $scope.notifications = [
        {
          from: "Pham Thien Thu",
          ava: "img/thu2.png",
          content: "Hi boss, please contact me.",
          ratings: 2
        },
        {
          from: "Tran Thi My Thanh",
          ava: "img/phuong2.png",
          content: "Hi, please give a try. You wont regret it!",
          ratings: 4
        }
      ];
      $scope.notis = [];
      $scope.searchedJobs = [];
      $scope.continueToExpandRadius = false;
      $scope.expandBtnName = "Expand area";
      $scope.selectedJob = "House cleaning";
      $scope.jobMarkers = [];
      $scope.expandBtnClickCount = 0;
      map = L.map('map', {
        closePopupOnClick: false,
        minZoom: 4,
        maxZoom: 21,
        keyboard: true,
        zoomControl: false,
      //  inertiaDeceleration: 400
    }).setView([51.505, -0.09], 16);
      // https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmd1eWVucGhhbSIsImEiOiJjaXFxamY1ZGowMm03Z3NqZnRsNzgyZWFoIn0.KEcyaFUF4YERcI7u0Lw1Sg
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(map);
  //    var googleLayer = new L.Google('ROADMAP');
  //    map.addLayer(googleLayer);
  //    http://{s}.basemaps.cartocdn.com/light_all//{z}/{x}/{y}.png
      $scope.userMarker;
      $scope.userLocationObj;
      $scope.curLoc = null;
      $scope.circleRadius = 10000;             // Initiate starting radius = 400m
      $scope.jobIndex = 0;
      $scope.testLayer = new L.LayerGroup();
      var vw = jQuery(window).width();
      var posOptions = {timeout: 10000, enableHighAccuracy: true};
      // quick and dirty: create a big icon
      L.Icon.Big = L.Icon.Default.extend({
          options: {
          iconSize:     [28, 44], // size of the icon
          iconAnchor:   [14, 44], // point of the icon which will correspond to marker's location
        //  shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      }});
      var userIcon = L.icon({
        iconUrl: 'img/markers/cabin.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [36, 36], // size of the icon
        iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var pinIcon = L.icon({
        iconUrl: 'img/markers/pin.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [36, 36], // size of the icon
        iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var houseWorkIcon = L.icon({
        iconUrl: 'img/markers/watering-can.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [42, 42], // size of the icon
        iconAnchor:   [26, 32], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var educationIcon = L.icon({
        iconUrl: 'img/markers/education.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [19, 26], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var contructionIcon = L.icon({
        iconUrl: 'img/markers/wheelbarrow.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [42, 42], // size of the icon
        iconAnchor:   [22, 26], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var volunteerIcon = L.icon({
        iconUrl: 'img/markers/heart.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      var medicalIcon = L.icon({
        iconUrl: 'img/markers/medical.png',
        shadowUrl: 'img/markers/shadow.png',
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
        shadowSize: [24, 28],
        shadowAnchor: [8, 28],  // the same for the shadow
        popupAnchor:  [1, -44] // point from which the popup should open relative to the iconAnchor
      });
      $scope.bigIcon = new L.Icon.Big();
      // end of variables initiation

      // Initiate functions
      $scope.applyJobName;
      $scope.applyJobRating = 0;
      $scope.returnIconFromIndex = function (index) {
        if (index == 0) {
          return houseWorkIcon;
        }
        if (index == 1) {
          return educationIcon;
        }
        if (index == 2) {
          return contructionIcon;
        }
        if (index == 3) {
          return volunteerIcon;
        }
        if (index == 4) {
          return medicalIcon;
        }
      };
      $scope.tuCheTiTleJob = function (index) {
        if (index % 5 == 0) {
          return "Tìm " + index + " người quét dọn nhà cửa";
        }
        if (index % 5 == 1) {
          return "Tuyển " + index + " sinh viên thực tập, nghiên cứu khoa học";
        }
        if (index % 5 == 2) {
          return "Tuyển " + index + " gia sư tại gia";
        }
        if (index % 5 == 3) {
          return "Cần tuyển " + index + " người lao động công trường";
        }
        if (index % 5 == 4) {
          return "Tìm người chăm sóc người già";
        }
      };
      $scope.tuCheEmployer = function (index) {
        if (index % 5 == 0) {
          return "Jankaloer";
        }
        if (index % 5 == 1) {
          return "Aloha Alfredila";
        }
        if (index % 5 == 2) {
          return "Aurora Thuy Linh";
        }
        if (index % 5 == 3) {
          return "Pham Binh Minh";
        }
        if (index % 5 == 4) {
          return "Ho Thi Khanh Minh";
        }
      };
      $scope.initiateDataBin = function () {
        for (i = 0; i <= 400; i++) {
          var obj = {
            info: {
              title: $scope.tuCheTiTleJob(i),
              iconIndex: Math.floor(Math.random() * 4),
              type: "academic",
              requester: $scope.tuCheEmployer(i),
              salary: i,
              hours: Math.floor(Math.random() * i),
              description: "Job description is the additional information that help employee understand better about what they are expected to perform. This is of course optional.",
              requirements: ["ASP.NET MVC, C#, SQL Server", "HTML, CSS, Javascript", "Framework such as AngularJs"],
              benefits: ["Excessive environment to grow yourself and your business", "High salary"]
            },
            location: {
              latlng: { lat: 10 + Math.random(), lng: 106 + Math.random() },
              city: "hcm",
              district: "thuduc"
            },
            distance: 420,
            timeTravel: 18,
            reviews: [
              {
                from: "Nguyen Thi Van Anh",
                ava: "img/" + Math.floor(Math.random() * 8) + ".png",
                content: "He is a good boss, very nice and supportive. Hope to work for him again.",
                ratings: 4
              },
              {
                from: "Pham Thien Thu",
                ava: "img/" + Math.floor(Math.random() * 8) + ".png",
                content: "He is the best boss I have ever meet! He treats his employee so nice and full with support.",
                ratings: 5
              }

            ],
            applicants: [
              {
                from: "Tran Binh Minh",
                ava: "img/" + Math.floor(Math.random() * 8) + ".png",
                content: "Hi, I need to work for the experience. Please contact me.",
                ratings: 4
              },
              {
                from: "Pham Thien Thu",
                ava: "img/" + Math.floor(Math.random() * 8) + ".png",
                content: "Hi boss, please contact me.",
                ratings: 2
              },
              {
                from: "Tran Khanh Tien",
                ava: "img/" + Math.floor(Math.random() * 8) + ".png",
                content: "Hi, please choose me!",
                ratings: 3
              }

            ],
            employer: {
              name: $scope.tuCheEmployer(i),
              ava: "img/" + Math.floor(Math.random() * 8) + ".png",
              title: "Housewife and Business woman",
              ratings: Math.floor(Math.random() * 5)
            }
          };
          $scope.databin.push(obj);
        };
      };
      $scope.initiateDataBin();
      $scope.initiateLeaftlet = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
            .then(function (position) {
              $scope.userLocationObj = {
                latlng: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              };
              $scope.curLoc = $scope.userLocationObj.latlng;
              map.panTo($scope.curLoc);
              $scope.userMarker = new L.marker($scope.curLoc, {
                icon: userIcon,
                bounceOnAdd: true,
                bounceOnAddOptions: {duration: 400, height: 50}
              }).addTo($scope.testLayer);
              circle = L.circle($scope.curLoc, $scope.circleRadius, {
                color: 'rgba(255,127,0,0.5)',
                fillColor: 'rgb(255,127,0)',
                fillOpacity: 0.02
              }).addTo($scope.testLayer);
              $scope.userMarker.circle = circle;
              map.addLayer($scope.testLayer);
              $scope.userMarker.bindPopup("You are here!").openPopup();
              map.panTo($scope.curLoc);
            }, function(err) {
              alert("Error loading Geolocation. Please set your geolocation to ON.");
            });
      };
      function onMarkerClick(e) {
        var latlng = this.getLatLng();
        var index = 0;
        // console.log(latlng);

        for (m = 0; m < $scope.searchedJobs.length; m++) {
        //  console.log($scope.searchedJobs[m].location.latlng.lat + "-" + $scope.searchedJobs[m].location.latlng.lng);
          if ($scope.searchedJobs[m].location.latlng.lat === latlng.lat) {
            index = m;
          };
        };
        $scope.rountingControl.getPlan().setWaypoints([
          L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
          L.latLng(latlng.lat, latlng.lng)
        ]);
        map.panTo(latlng);
      //  console.log(index);
        $scope.jobIndex = index;
        jQuery("#divChuaJobSliderDivLon").css(            // back to the first slide (slider)
          { "margin-left": - (vw * 0.95 * index) }
        );

      };
      var vh = jQuery(window).height();
      $scope.showApplicationForm = function () {
        $scope.applyJobName = $scope.searchedJobs[$scope.jobIndex].info.title;
        $scope.applyJobRating = $scope.searchedJobs[$scope.jobIndex].employer.ratings;
        setTimeout(function () {
          jQuery("#popup-container").velocity("fadeIn", { duration: 1000});
        }, 100);

      };
      $scope.hideApplicationForm = function () {
      //  jQuery("#cardApply").animate( {"margin-top": vh / 2 - 100 }, 400);
      //  setTimeout(function() {
      //    jQuery("#popup-container").hide();
      //  }, 400);
        jQuery("#popup-container").velocity("fadeOut", { duration: 1000});
      };
      $scope.unseenNotis = 1;
      $scope.applyForThisJob = function () {
      //  jQuery("#cardApply").animate( {"margin-top": vh / 2 - 100 }, 400);
        jQuery("#popup-container").velocity("fadeOut", { duration: 1000});
        var noti = {
          title: {
            text: "Application sent successfully",
            class: "primary-color"
          },
          ava: "img/markers/diamond.png", // image for application
          content: "You applied for job: " + $scope.applyJobName,
          time: new Date(),
          data: JSON.stringify($scope.searchedJobs[$scope.jobIndex])
        };
        $scope.notis.push(noti);
      //  setTimeout(function() {
      //    alert("Application sent sucessfully");
      //  }, 1400);
        $scope.unseenNotis += 1;
      };
  //    jQuery(window).resize(function () {
  //      jQuery("#cardApply").css( {"margin-top": jQuery(window).height() / 2 - 120 });
  //    });
      $scope.initiateLeaftlet();
      $scope.pushJobIntoSliderBar = function () {
        if ($scope.curLoc == null) {                        // Wait for the most significant bit to ready
          $timeout($scope.pushJobIntoSliderBar, 400);       // Recal the function every 400ms
        }
        else {                                              // If it is ready, then start here
          jQuery("#divChuaJobSliderDivLon").css(            // back to the first slide (slider)
            { "margin-left": 0 }
          );
          var jobMarkersLengReusable = $scope.jobMarkers.length;
          if (jobMarkersLengReusable > 0) {               // Remove all of the previous job markers
            for (i = 0; i < jobMarkersLengReusable; i++) {
              map.removeLayer($scope.jobMarkers[i]);
            };
          };
          $scope.searchedJobs = [];
          $scope.jobMarkers = [];
          $scope.jobIndex = 0;

          var databinLengReusuable = $scope.databin.length;
          var registeredDistance = $scope.circleRadius / 100000;
          for (i = 0; i < databinLengReusuable; i++) {  // insert jobs from bin folder to display

            $scope.databin[i].distance = Math.sqrt( Math.pow($scope.databin[i].location.latlng.lat - $scope.curLoc.lat, 2) + Math.pow($scope.databin[i].location.latlng.lng - $scope.curLoc.lng, 2) );
            if ( registeredDistance > $scope.databin[i].distance ) {
              $scope.searchedJobs.push($scope.databin[i]);
            };

          };
          var searchedJobsReusable = $scope.searchedJobs.length;
          if (searchedJobsReusable > 0) {
            jQuery("#divChuaJobSliderDivLon").css("width", vw * searchedJobsReusable );
            for (k = 0; k < searchedJobsReusable; k++) {
              var marker = new L.marker($scope.searchedJobs[k].location.latlng, {
                icon: $scope.returnIconFromIndex($scope.searchedJobs[k].info.iconIndex),
                bounceOnAdd: true,
                zIndexOffset: 10000,
                bounceOnAddOptions: {duration: 400 + Math.random() * 400, height: 50}
              }).on('click', onMarkerClick);
              $scope.jobMarkers.push(marker);
              // add the marker as a new layer
              map.addLayer($scope.jobMarkers[k]);
            };
            $scope.searchedJobs.sort( function (a, b) {
              if (a.distance > b.distance) {
                return 1;
              };
              if (a.distance < b.distance) {
                return -1;
              };
              // a must be equal to b
              return 0;
            });
            if ($scope.rountingControl) {
              $scope.rountingControl.getPlan().setWaypoints([
                L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
                L.latLng($scope.searchedJobs[0].location.latlng.lat, $scope.searchedJobs[0].location.latlng.lng)
              ]);
            } else {
              $scope.rountingControl = L.Routing.control({
                router: L.Routing.graphHopper('c743ede6-8a56-401a-bb4a-2479869c79fc'),
                waypoints: [
                  L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
                  L.latLng($scope.searchedJobs[0].location.latlng.lat, $scope.searchedJobs[0].location.latlng.lng)
                ],
                routeWhileDragging: false,
                useZoomParameter: false,
                showAlternatives: false,
                createMarker: function() { return null; },
                lineOptions: {
                  styles: [
                    {color: '#E91E63', opacity: 0.6, weight: 8}
                  ]
                }
              }).addTo(map);

              $scope.rountingControl.hide();
            }


            map.panTo($scope.searchedJobs[0].location.latlng);
            jQuery("#divChuaJobSlider").velocity(
              { "bottom": "52px" },
              { duration: 400 }
            );
          }
          else {
            alert("No job that match your requirement is found in the selected location!\nPlease try again with different settings.");
            jQuery("#divChuaJobSlider").velocity(
              { "bottom": "-202px" },
              { duration: 400 }
            );
          };
        };

      };

      $scope.scanJob = function () {
        if ($scope.expandBtnClickCount % 2 == 0) {
          $scope.continueToExpandRadius = true;
          $scope.expandBtnName = "Stop expand";
          timeCount(20);
          $scope.expandBtnClickCount += 1;
        }
        else {
          $scope.continueToExpandRadius = false;
          $scope.expandBtnName = "Expand area";
          $scope.expandBtnClickCount += 1;
        };
      };
      $scope.relocate = function () {
        $scope.testLayer.removeLayer($scope.userMarker);
        $scope.testLayer.removeLayer($scope.userMarker.circle);
        // delete old jobs markers also
        var jobMarkersLength = $scope.jobMarkers.length;
        if (jobMarkersLength > 0) {
          for (i = 0; i <= jobMarkersLength - 1; i++) {
            map.removeLayer($scope.jobMarkers[i]);
          };
        };
        $scope.curLoc = map.getCenter();
        $scope.userMarker = new L.marker($scope.curLoc, {
          icon: pinIcon,
          bounceOnAdd: true,
          bounceOnAddOptions: {duration: 400, height: 50}
        }).addTo($scope.testLayer);
        circle = L.circle($scope.curLoc, 10, {
          color: 'rgba(255,127,0,0.5)',
          fillColor: 'rgb(255,127,0)',
          fillOpacity: 0.02
        }).addTo($scope.testLayer);
        $scope.userMarker.circle = circle;
        $scope.userMarker.bindPopup("You choose this location!").openPopup();
        $scope.searchedJobs = [];
        jQuery("#divChuaJobSlider").velocity(
          { "bottom": "-202px" },
          { duration: 400 }
        );
        if ($scope.rountingControl != null) {
          map.removeControl($scope.rountingControl);
          $scope.rountingControl = null;
        };

      };
      $scope.locateMeNow = function () {
        var circle = $scope.userMarker.circle;
        $scope.testLayer.removeLayer($scope.userMarker);
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
            .then(function (position) {
              $scope.userLocationObj = {
                latlng: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              };
              $scope.curLoc = $scope.userLocationObj.latlng;
              $scope.userMarker = new L.marker($scope.curLoc, {
                icon: userIcon,
              //  bounceOnAdd: true,
                bounceOnAddOptions: {duration: 400, height: 50}
              }).addTo($scope.testLayer);
        //      circle = L.circle($scope.curLoc, 10, {
        //        color: 'rgba(255,127,0,0.5)',
        //        fillColor: 'rgb(255,127,0)',
        //        fillOpacity: 0.04
        //      }).addTo($scope.testLayer);
              $scope.userMarker.circle = circle;
              $scope.userMarker.bindPopup("You are here!").openPopup();
              setTimeout(
                function()
                {
                  map.panTo($scope.userLocationObj.latlng);
                }, 400);
                if ($scope.rountingControl) {
                  $scope.rountingControl.getPlan().setWaypoints([
                    L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
                    L.latLng($scope.searchedJobs[$scope.jobIndex].location.latlng.lat, $scope.searchedJobs[$scope.jobIndex].location.latlng.lng)
                  ]);
                };
            }, function(err) {
              alert("Error loading Geolocation. Please set your geolocation to ON.");
            });
      };
      var timeoutId = 0;    // use this variable to clear the time out count
      function timeCount(radius) {
        timeoutId = $timeout(
          function()
          {
            $scope.testLayer.removeLayer($scope.userMarker.circle);
            circle = L.circle($scope.curLoc, radius, {
              color: 'rgba(255,127,0,0.5)',
              fillColor: 'rgb(255,127,0)',
              fillOpacity: 0.02
            }).addTo($scope.testLayer);
            $scope.userMarker.circle = circle;
            if ($scope.continueToExpandRadius) {
              timeCount(radius + 82);
              $scope.circleRadius = radius;
            }
            else {
              clearTimeout(timeoutId);
              alert("You have search for job types: " + $scope.selectedJob + "\nArea information:" + "\n - Lat: " + $scope.curLoc.lat + "\n - Long: " + $scope.curLoc.lng + "\n - Expand radius: " + $scope.circleRadius + "m");
              // call some function here with package
              var package = {
                job: $scope.selectedJob,
                center: $scope.curLoc,
                radius: $scope.circleRadius
              };
              $scope.pushJobIntoSliderBar();
            };


          }, 70);

      };

      $scope.inspecThisJob = function (index) {
        setTimeout(function() {
          $scope.showMap();
          setTimeout(function () {
            $scope.jobIndex = index;
            // Rounte

            // slider
            jQuery("#divChuaJobSliderDivLon").css(            // back to the first slide (slider)
              { "margin-left": - (vw * 0.95 * index) }
            );
            // Pan to
            map.panTo($scope.searchedJobs[$scope.jobIndex].location.latlng);
            if ($scope.rountingControl) {
              $scope.rountingControl.getPlan().setWaypoints([
                L.latLng($scope.curLoc.lat, $scope.curLoc.lng),
                L.latLng($scope.searchedJobs[$scope.jobIndex].location.latlng.lat, $scope.searchedJobs[$scope.jobIndex].location.latlng.lng)
              ]);
            };
          }, 400);
        }, 400);


      };

      map.on("click", function (e) {
        console.log(e.latlng.lat + " " + e.latlng.lng);
      });

      $scope.BackToHomeFromJobDetail = function () {
      //  jQuery(".divNenDen").velocity( { "opacity": 0 }, { duration: 400, display: 'none' });
        jQuery("#jobDetail").animate( {scrollTop: 0}, 400);
        jQuery("#jobDetail").velocity("fadeOut", { duration: 1000 } );
      };

      jQuery(".xin-dung-trigger-parent-event").on("click", function (e) {
        e.stopPropagation();
      });
      jQuery("#sideBarRight").on("swiperight", function () {
        $scope.hideRightSlider();
      });
  //    jQuery(".divNenDen").on("swiperight", function () {
  //      $scope.BackToHomeFromJobDetail();
  //    });
  //    jQuery(".divNenDen").on("click", function () {
  //      $scope.hideLeftSlider();
  //    });
  //    jQuery(".divNenDen").on("swipeleft", function () {
  //      $scope.hideLeftSlider();
  //    });


      // start code of job detail package
      $scope.selectedJobToView = {
        info: {
          title: "Hiring C#, .NET and Mobile Application Developer",
          type: "academic",
          requester: "Jankaloer",
          salary: "20",
          hours: "2",
          description: "Job description is the additional information that help employee understand better about what they are expected to perform. This is of course optional.",
          requirements: ["ASP.NET MVC, C#, SQL Server", "HTML, CSS, Javascript", "Framework such as AngularJs"],
          benefits: ["Excessive environment to grow yourself and your business", "High salary"]
        },
        location: {
          latlng: { lat: 10.888349486031192, lng: 106.80642127990723 },
          city: "hcm",
          district: "thuduc"
        },
        distance: 420,
        timeTravel: 18,
        reviews: [
          {
            from: "Nguyen Thi Van Anh",
            ava: "img/phuong2.png",
            content: "He is a good boss, very nice and supportive. Hope to work for him again.",
            ratings: 4
          },
          {
            from: "Pham Thien Thu",
            ava: "img/thu2.png",
            content: "He is the best boss I have ever meet! He treats his employee so nice and full with support.",
            ratings: 5
          },
          {
            from: "Tran Cao Anh",
            ava: "img/anh2.png",
            content: "Nice boss with high salary!",
            ratings: 5
          }

        ],
        applicants: [
          {
            from: "Tran Binh Minh",
            ava: "img/huy2.png",
            content: "Hi, I need to work for the experience. Please contact me.",
            ratings: 4
          },
          {
            from: "Pham Thien Thu",
            ava: "img/thu2.png",
            content: "Hi boss, please contact me.",
            ratings: 2
          },
          {
            from: "Tran Khanh Tien",
            ava: "img/trung2.png",
            content: "Hi, please choose me!",
            ratings: 3
          },
          {
            from: "Tran Thi My Thanh",
            ava: "img/phuong2.png",
            content: "Hi, please give a try. You wont regret it!",
            ratings: 4
          },
          {
            from: "Vo Anh Kiet",
            ava: "img/anonymous.png",
            content: "Hi, check my profile please!",
            ratings: 2
          }

        ]
      };
      $scope.showMeThisJobDetail = function (index) {
        $scope.selectedJobToView = $scope.searchedJobs[index];
        setTimeout(function() {
        //  jQuery(".divNenDen").velocity( { "opacity": 1 }, { duration: 400, display: 'inline-block' });
          jQuery("#jobDetail").velocity("fadeIn", { duration: 1000 } );
          setTimeout(function() {
          //  jQuery(".divNenDen").velocity( { "opacity": 1 }, { duration: 400, display: 'inline-block' });

          }, 400);

        }, 400);
      };
      $scope.rangeRating = function(count){

        var ratings = [];

        for (var i = 0; i < count; i++) {
          ratings.push(i)
        }

        return ratings;
      };
      $scope.floor = function (value) {
        return Math.floor(value);
      };
      $scope.roundToOneDecimal = function (number) {
        return (Math.round(number * 10)/10).toFixed(1);
      };
      $scope.showGrid = function () {
        jQuery("#home").css( {"opacity": 0, "display": 'none' } );
        jQuery("#grid").velocity( {"top": 0, "opacity": 1}, {duration: 400, display: 'inline-block'});
      };
      $scope.showMap = function () {
        jQuery("#home").velocity( {"opacity": 1}, {duration: 400, display: 'inline-block'});//.velocity( {"opacity": 1}, {duration: 400 });
        jQuery("#grid").css( {"top": "-10px", "opacity": 0, "display": 'none' } );
      };
      L.DomUtil.get('showGridBtn').onclick = function() {
        $scope.showGrid();
      };
      L.DomUtil.get('showMapBtn').onclick = function() {
        $scope.showMap();
      };
      $timeout(function () {                          // Nhin location cua minh trong 1s
        $scope.pushJobIntoSliderBar();                // sau do pan qua dia diem moi
      }, 4000);                                       // Khoang thoi gian cho phu thuoc vao computation power cua platform

//      map.on("zoomend", function () {
//        if ($scope.searchedJobs.length > 0) {
//          map.panTo($scope.searchedJobs[$scope.jobIndex].location.latlng);
//        };
//      });


    });


  });
  // Initiate variables

});
