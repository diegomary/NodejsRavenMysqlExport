angular.module('moduleApp129', [])
    .factory('Customers', function ($http) {              
        this.getCustomers = function () {          
			//dataTosend = $.param({ userName : "Diego", password : "password" })  // Jquery method to create parameters
            var datatoSend = [{ user: 'Diego', password: 'password' }, { user: 'MAria', password: 'marypassword' }];            
            var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } };
            alert("Diego");
            alert(JSON.stringify(datatoSend));
            return $http.post('http://localhost:8080', datatoSend, config);			
        };
        this.getCustomersJquery = function () {
             var datatoSend = [{ user: 'Diego', password: 'password' }, { user: 'MAria', password: 'marypassword' }]
           return  $.ajax({
                url: 'http://localhost:8080',
                data: JSON.stringify(datatoSend),
                type: 'POST',
                datatype: "json", // The content we expect from the server
                contentType: "application/x-www-form-urlencoded", // The type of data we send   this is the default. the other value can be  "application/json; charset=utf-8" but doesn't work in chrome and firefox with cross domain calls
                // notice that for file upload we can use instead  "multipart/form-data" as contentType
                success: function (dataret) {                  
                },
                error: function (xhr, status, error) {
                    alert(error)
                }
            });
        };
        return this;
    })
    .controller('CustomerController', ['$scope', 'Customers', function ($scope, Customers) {
        $scope.customers = [];      
        $scope.getData = function () { Customers.getCustomers().then(function (dataResponse) {$scope.customers = dataResponse.data;}); }
        $scope.getDataJqueryAjax = function () {
            Customers.getCustomersJquery().done(function(data){ // data is the response of jquery call in factory
                if (data) { // The done function is a callback.
                    alert(data[0].CustomerID);
                    $scope.customers = data;
                    $scope.$apply(); // must be called because Jquery ajax is outside the 
                    // context that angular doesn't know about (the jQuery ajax call in this case).
                }
                else alert('error');
            });
        }
        $scope.getDataJqueryAjaxPromise = function () {
            Customers.getCustomersJquery().promise() // the jquery syntax for promise.
                .then(function (data) { // data is the response of jquery call in factory
                if (data) { // The done function is a callback.
                   // alert(data[0].CustomerID);
                    $scope.customers = data;
                    $scope.$apply(); // must be called because Jquery ajax is outside the 
                    // context that angular doesn't know about (the jQuery ajax call in this case).
                }
                else alert('error');
                })
                .then(alert('All data has been read'));
        }

        $scope.clearData = function () { $scope.customers = []; }


       

    }])
   






























//angular.module('moduleApp129', ['ngAnimate'])
//    .factory('Customers', function ($http) {
//        var custs = {};
//        custs.getCustomers = function (callBackfunc) {
//            $http({
//                method: 'GET',
//                url: '/Home/GetData1',
//                params: 'limit=3, sort_by=city'
//            }).success(function (data) {
//                callBackfunc(data);
//            }).error(function () {
//                alert("error");
//            });

//        };
//        return custs;
//    })
//         .controller('CustomerController', ['$scope', 'Customers', function ($scope, Customers) {
//             $scope.customers = [];
//             $scope.getInnerData = function (name) { alert(name); }
//             $scope.getData = function () {
//                 Customers.getCustomers(function (dataResponse) {
//                     $scope.customers = dataResponse;
//                 });
//             }
//             $scope.nametosearch;
//             $scope.$watch('nametosearch', function (newValue, oldValue) {
//                 //The callback is on initialization and each time the model changes
//                 if (newValue === oldValue) { return; }
//                 // here the code that fires on property change
//             }, true);
//             $scope.addCustomer = function () {
//                 $scope.customers.push({ name: $scope.inputData.name, city: $scope.inputData.city });
//             };
//         }])
//         .controller('OrderController', ['$scope', function ($scope) {
//             $scope.codeName = "Diego Burlando";
//         }])
//         .controller('DetailsController', ['$scope', function ($scope) {
//             $scope.detailName = "MAria Burlando";
//         }]);
